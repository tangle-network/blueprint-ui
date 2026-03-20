import { useState, useEffect } from 'react';
import type { Address } from 'viem';
import { tangleOperatorsAbi } from '../contracts/abi';
import { publicClient, getAddresses } from '../contracts/publicClient';

export interface DiscoveredOperator {
  address: Address;
  ecdsaPublicKey: string;
  rpcAddress: string;
}

interface OperatorDiscoveryClient {
  readContract(args: Record<string, unknown>): Promise<unknown>;
  getLogs(args: Record<string, unknown>): Promise<Array<Record<string, unknown>>>;
  multicall(args: Record<string, unknown>): Promise<Array<Record<string, unknown>>>;
}

interface OperatorDiscoveryResult {
  operators: DiscoveredOperator[];
  operatorCount: bigint;
}

function readPreferenceValue(
  result: unknown,
  field: 'ecdsaPublicKey' | 'rpcAddress',
): string {
  if (Array.isArray(result)) {
    return String(result[field === 'ecdsaPublicKey' ? 0 : 1] ?? '');
  }
  if (result && typeof result === 'object') {
    return String((result as Record<string, unknown>)[field] ?? '');
  }
  return '';
}

async function verifyCandidatesWithMulticall(
  client: OperatorDiscoveryClient,
  servicesAddress: Address,
  blueprintId: bigint,
  candidates: DiscoveredOperator[],
): Promise<DiscoveredOperator[] | null> {
  const [registrationResults, preferencesResults] = await Promise.all([
    client.multicall({
      contracts: candidates.map((op) => ({
        address: servicesAddress,
        abi: tangleOperatorsAbi,
        functionName: 'isOperatorRegistered' as const,
        args: [blueprintId, op.address] as const,
      })),
    }),
    client.multicall({
      contracts: candidates.map((op) => ({
        address: servicesAddress,
        abi: tangleOperatorsAbi,
        functionName: 'getOperatorPreferences' as const,
        args: [blueprintId, op.address] as const,
      })),
    }),
  ]);

  const hadRegistrationFailure = registrationResults.some((result) => result?.status === 'failure');
  const hadPreferenceFailure = preferencesResults.some((result) => result?.status === 'failure');

  const active: DiscoveredOperator[] = [];
  candidates.forEach((op, i) => {
    if (registrationResults[i]?.result !== true) return;
    const prefs = preferencesResults[i];
    if (prefs?.status === 'success' && prefs.result != null) {
      active.push({
        ...op,
        ecdsaPublicKey: readPreferenceValue(prefs.result, 'ecdsaPublicKey') || op.ecdsaPublicKey,
        rpcAddress: readPreferenceValue(prefs.result, 'rpcAddress') || op.rpcAddress,
      });
      return;
    }
    active.push(op);
  });

  if (active.length === 0 && (hadRegistrationFailure || hadPreferenceFailure)) {
    return null;
  }

  return active;
}

async function verifyCandidatesDirectly(
  client: OperatorDiscoveryClient,
  servicesAddress: Address,
  blueprintId: bigint,
  candidates: DiscoveredOperator[],
): Promise<DiscoveredOperator[]> {
  const results = await Promise.allSettled(
    candidates.map(async (op) => {
      const registration = await client.readContract({
        address: servicesAddress,
        abi: tangleOperatorsAbi,
        functionName: 'isOperatorRegistered',
        args: [blueprintId, op.address],
      });

      if (registration !== true) {
        return null;
      }

      try {
        const preferences = await client.readContract({
          address: servicesAddress,
          abi: tangleOperatorsAbi,
          functionName: 'getOperatorPreferences',
          args: [blueprintId, op.address],
        });

        return {
          ...op,
          ecdsaPublicKey: readPreferenceValue(preferences, 'ecdsaPublicKey') || op.ecdsaPublicKey,
          rpcAddress: readPreferenceValue(preferences, 'rpcAddress') || op.rpcAddress,
        };
      } catch {
        return op;
      }
    }),
  );

  const active = results
    .filter((result): result is PromiseFulfilledResult<DiscoveredOperator | null> => result.status === 'fulfilled')
    .map((result) => result.value)
    .filter((op): op is DiscoveredOperator => op != null);

  if (active.length > 0) {
    return active;
  }

  const failure = results.find((result): result is PromiseRejectedResult => result.status === 'rejected');
  if (failure) {
    throw failure.reason instanceof Error ? failure.reason : new Error(String(failure.reason));
  }

  return [];
}

/**
 * Shared discovery logic for operator lookup.
 * Tries multicall first for efficiency, then falls back to direct reads when
 * multicall is unavailable in local/dev environments.
 */
export async function discoverOperatorsWithClient(
  client: OperatorDiscoveryClient,
  servicesAddress: Address,
  blueprintId: bigint,
): Promise<OperatorDiscoveryResult> {
  const count = await client.readContract({
    address: servicesAddress,
    abi: tangleOperatorsAbi,
    functionName: 'blueprintOperatorCount',
    args: [blueprintId],
  });
  const operatorCount = count as bigint;

  if (operatorCount === 0n) {
    return { operators: [], operatorCount };
  }

  const registeredLogs = await client.getLogs({
    address: servicesAddress,
    event: {
      type: 'event' as const,
      name: 'OperatorRegistered',
      inputs: [
        { name: 'blueprintId', type: 'uint64', indexed: true },
        { name: 'operator', type: 'address', indexed: true },
        { name: 'ecdsaPublicKey', type: 'bytes', indexed: false },
        { name: 'rpcAddress', type: 'string', indexed: false },
      ],
    },
    args: { blueprintId },
    fromBlock: 0n,
    toBlock: 'latest',
  });

  const byAddress = new Map<Address, DiscoveredOperator>();
  for (const log of registeredLogs) {
    const args = (log.args ?? {}) as Record<string, unknown>;
    const addr = args.operator as Address | undefined;
    if (!addr) continue;
    byAddress.set(addr, {
      address: addr,
      ecdsaPublicKey: String(args.ecdsaPublicKey ?? '0x'),
      rpcAddress: String(args.rpcAddress ?? ''),
    });
  }

  const candidates = Array.from(byAddress.values());
  if (candidates.length === 0) {
    return { operators: [], operatorCount };
  }

  try {
    const active = await verifyCandidatesWithMulticall(client, servicesAddress, blueprintId, candidates);
    if (active != null) {
      return { operators: active, operatorCount };
    }
  } catch {
    // Fall through to direct reads below.
  }

  const active = await verifyCandidatesDirectly(client, servicesAddress, blueprintId, candidates);
  return { operators: active, operatorCount };
}

/**
 * Discover operators registered for a blueprint by scanning OperatorRegistered
 * events, then verifying each is still active. Falls back to direct reads when
 * multicall is unavailable.
 */
export function useOperators(blueprintId: bigint) {
  const [operators, setOperators] = useState<DiscoveredOperator[]>([]);
  const [operatorCount, setOperatorCount] = useState<bigint>(0n);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    const addrs = getAddresses();

    async function discover() {
      setIsLoading(true);
      setError(null);

      try {
        const result = await discoverOperatorsWithClient(publicClient, addrs.services, blueprintId);
        if (cancelled) return;
        setOperatorCount(result.operatorCount);
        setOperators(result.operators);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    discover();
    return () => { cancelled = true; };
  }, [blueprintId]);

  return { operators, isLoading, error, operatorCount };
}
