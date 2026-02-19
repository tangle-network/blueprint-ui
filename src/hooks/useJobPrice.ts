import { useState, useEffect, useCallback, useRef } from 'react';
import type { Address } from 'viem';
import { toHex } from 'viem';
import { solvePoW, formatCost } from './useQuotes';

/**
 * Per-job RFQ hook — fetches price quotes for a specific job before submission.
 *
 * Implements the GetJobPrice protocol:
 * 1. Solve PoW challenge (same as service-level RFQ)
 * 2. POST to operator's /pricing/job-quote endpoint
 * 3. Return signed JobQuoteDetails for submitJobFromQuote()
 *
 * This is the per-job counterpart to useQuotes (which handles service creation).
 * Together they provide full RFQ coverage for the UI.
 */

// ── Types ──

export interface JobQuote {
  serviceId: bigint;
  jobIndex: number;
  price: bigint;
  timestamp: bigint;
  expiry: bigint;
  signature: `0x${string}`;
  operatorAddress: Address;
}

export interface UseJobPriceResult {
  quote: JobQuote | null;
  isLoading: boolean;
  isSolvingPow: boolean;
  error: string | null;
  formattedPrice: string;
  refetch: () => void;
}

/** Rewrite operator RPC hostname for browser reachability */
function resolveOperatorRpc(raw: string): string {
  if (typeof window === 'undefined') return raw;
  const withProto = raw.includes('://') ? raw : `http://${raw}`;
  try {
    const url = new URL(withProto);
    const pageHost = window.location.hostname;
    const isNonRoutable =
      url.hostname.endsWith('.local') ||
      !url.hostname.includes('.') ||
      url.hostname === '127.0.0.1' ||
      url.hostname === 'localhost';
    if (isNonRoutable && pageHost !== url.hostname) {
      url.hostname = pageHost;
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return withProto;
  }
}

// ── Hook ──

export function useJobPrice(
  operatorRpcUrl: string | undefined,
  serviceId: bigint,
  jobIndex: number,
  blueprintId: bigint,
  enabled: boolean,
): UseJobPriceResult {
  const [quote, setQuote] = useState<JobQuote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSolvingPow, setIsSolvingPow] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);
  const cancelledRef = useRef(false);

  const refetch = useCallback(() => setFetchKey((k) => k + 1), []);

  useEffect(() => {
    if (!enabled || !operatorRpcUrl || serviceId === 0n) {
      setQuote(null);
      setError(null);
      return;
    }

    cancelledRef.current = false;
    setIsLoading(true);
    setError(null);
    setQuote(null);

    async function fetchJobQuote() {
      try {
        const rpcUrl = resolveOperatorRpc(operatorRpcUrl!);
        const timestamp = BigInt(Math.floor(Date.now() / 1000));

        // Solve PoW
        setIsSolvingPow(true);
        const { proof } = await solvePoW(blueprintId, timestamp);
        if (cancelledRef.current) return;
        setIsSolvingPow(false);

        // Fetch job price from operator
        const response = await fetch(`${rpcUrl}/pricing/job-quote`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            service_id: String(serviceId),
            job_index: jobIndex,
            proof_of_work: toHex(proof),
            challenge_timestamp: String(timestamp),
          }),
          signal: AbortSignal.timeout(10_000),
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text().catch(() => 'Unknown error')}`);
        }

        const data = await response.json();
        if (cancelledRef.current) return;

        setQuote({
          serviceId: BigInt(data.service_id ?? serviceId),
          jobIndex: data.job_index ?? jobIndex,
          price: BigInt(data.price ?? '0'),
          timestamp: BigInt(data.timestamp ?? timestamp),
          expiry: BigInt(data.expiry ?? '0'),
          signature: (data.signature ?? '0x') as `0x${string}`,
          operatorAddress: data.operator as Address,
        });
      } catch (err) {
        if (!cancelledRef.current) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelledRef.current) {
          setIsLoading(false);
          setIsSolvingPow(false);
        }
      }
    }

    fetchJobQuote();
    return () => {
      cancelledRef.current = true;
    };
  }, [operatorRpcUrl, serviceId, jobIndex, blueprintId, enabled, fetchKey]);

  const formattedPrice = quote ? formatCost(quote.price) : '--';

  return { quote, isLoading, isSolvingPow, error, formattedPrice, refetch };
}

/**
 * Batch version — fetches job prices for multiple jobs at once.
 * Used by the blueprint job list to show all prices simultaneously.
 */
export interface JobPriceEntry {
  jobIndex: number;
  jobName: string;
  price: bigint;
  formattedPrice: string;
  mode: 'flat' | 'dynamic' | 'free';
  quote: JobQuote | null;
  error: string | null;
}

export interface UseJobPricesResult {
  prices: JobPriceEntry[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useJobPrices(
  operatorRpcUrl: string | undefined,
  serviceId: bigint,
  blueprintId: bigint,
  jobIndexes: { index: number; name: string; multiplier: number }[],
  enabled: boolean,
): UseJobPricesResult {
  const [prices, setPrices] = useState<JobPriceEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetchKey, setFetchKey] = useState(0);

  const refetch = useCallback(() => setFetchKey((k) => k + 1), []);

  useEffect(() => {
    if (!enabled || !operatorRpcUrl || serviceId === 0n || jobIndexes.length === 0) {
      setPrices([]);
      setError(null);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setError(null);

    async function fetchAllPrices() {
      try {
        const rpcUrl = resolveOperatorRpc(operatorRpcUrl!);
        const timestamp = BigInt(Math.floor(Date.now() / 1000));
        const { proof } = await solvePoW(blueprintId, timestamp);
        if (cancelled) return;

        // Fetch all job prices in parallel
        const results = await Promise.allSettled(
          jobIndexes.map(async (job) => {
            const response = await fetch(`${rpcUrl}/pricing/job-quote`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                service_id: String(serviceId),
                job_index: job.index,
                proof_of_work: toHex(proof),
                challenge_timestamp: String(timestamp),
              }),
              signal: AbortSignal.timeout(10_000),
            });

            if (!response.ok) return null;
            return response.json();
          }),
        );

        if (cancelled) return;

        const entries: JobPriceEntry[] = jobIndexes.map((job, i) => {
          const result = results[i];
          if (result.status === 'fulfilled' && result.value) {
            const data = result.value;
            const price = BigInt(data.price ?? '0');
            return {
              jobIndex: job.index,
              jobName: job.name,
              price,
              formattedPrice: formatCost(price),
              mode: (data.mode ?? 'flat') as 'flat' | 'dynamic' | 'free',
              quote: {
                serviceId: BigInt(data.service_id ?? serviceId),
                jobIndex: job.index,
                price,
                timestamp: BigInt(data.timestamp ?? timestamp),
                expiry: BigInt(data.expiry ?? '0'),
                signature: (data.signature ?? '0x') as `0x${string}`,
                operatorAddress: data.operator as Address,
              },
              error: null,
            };
          }
          // Fallback: estimate from multiplier (base rate = 0.001 TNT = 1e15 wei)
          const estimatedPrice = BigInt(job.multiplier) * 1_000_000_000_000_000n;
          return {
            jobIndex: job.index,
            jobName: job.name,
            price: estimatedPrice,
            formattedPrice: `~${formatCost(estimatedPrice)}`,
            mode: 'flat' as const,
            quote: null,
            error: 'No RFQ response — showing estimate',
          };
        });

        setPrices(entries);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchAllPrices();
    return () => {
      cancelled = true;
    };
  }, [operatorRpcUrl, serviceId, blueprintId, jobIndexes, enabled, fetchKey]);

  return { prices, isLoading, error, refetch };
}
