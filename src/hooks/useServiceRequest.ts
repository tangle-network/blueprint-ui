/**
 * Hook to request a service instance on-chain.
 * Thin wrapper around wagmi's useWriteContract + the existing tangleServicesAbi.
 */
import { useWriteContract } from 'wagmi';
import { tangleServicesAbi } from '../contracts/abi';
import { getAddresses } from '../contracts/publicClient';
import type { Address } from 'viem';
import { useCallback } from 'react';

export interface ServiceRequestParams {
  blueprintId: bigint;
  operators: Address[];
  config: `0x${string}`;
  permittedCallers: Address[];
  ttl: bigint;
  paymentToken: Address;
  paymentAmount: bigint;
}

export function useServiceRequest(): {
  requestService: (params: ServiceRequestParams) => Promise<`0x${string}`>;
  isPending: boolean;
  error: Error | null;
  txHash: `0x${string}` | undefined;
} {
  const { writeContractAsync, isPending, error, data: txHash } =
    useWriteContract();

  const requestService = useCallback(
    async (params: ServiceRequestParams) => {
      const addresses = getAddresses();
      return writeContractAsync({
        address: addresses.services,
        abi: tangleServicesAbi,
        functionName: 'requestService',
        args: [
          params.blueprintId,
          params.operators,
          params.config,
          params.permittedCallers,
          params.ttl,
          params.paymentToken,
          params.paymentAmount,
        ],
      });
    },
    [writeContractAsync],
  );

  return { requestService, isPending, error, txHash };
}
