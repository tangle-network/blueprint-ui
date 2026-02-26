import { useCallback, useState, useMemo } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { decodeEventLog } from 'viem';
import { tangleJobsAbi } from '../contracts/abi';
import { getAddresses } from '../contracts/publicClient';
import { addTx, updateTx } from '../stores/txHistory';
import { selectedChainIdStore } from '../contracts/publicClient';
import { useEffect } from 'react';

export interface SubmitJobOpts {
  serviceId: bigint;
  jobId: number;
  args: `0x${string}`;
  label?: string;
  value?: bigint;
}

export type JobSubmitStatus = 'idle' | 'signing' | 'pending' | 'confirmed' | 'failed';

export function useSubmitJob() {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending: isSigning } = useWriteContract();
  const [status, setStatus] = useState<JobSubmitStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  const { data: receipt, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Extract callId from the JobCalled event in the receipt logs
  const callId = useMemo<number | null>(() => {
    if (!receipt?.logs) return null;
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: tangleJobsAbi,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === 'JobCalled' && 'callId' in decoded.args) {
          return Number(decoded.args.callId);
        }
      } catch {
        // Not a matching event, skip
      }
    }
    return null;
  }, [receipt]);

  useEffect(() => {
    if (isSuccess && txHash) {
      setStatus('confirmed');
      updateTx(txHash, { status: 'confirmed' });
    }
    if (isError && txHash) {
      setStatus('failed');
      updateTx(txHash, { status: 'failed' });
    }
  }, [isSuccess, isError, txHash]);

  const submitJob = useCallback(
    async (opts: SubmitJobOpts) => {
      if (!address) {
        setError('Wallet not connected');
        return undefined;
      }

      const addrs = getAddresses();
      const label = opts.label ?? `Job #${opts.jobId}`;

      try {
        setStatus('signing');
        setError(null);

        const result = await writeContractAsync({
          address: addrs.jobs,
          abi: tangleJobsAbi,
          functionName: 'submitJob',
          args: [opts.serviceId, opts.jobId, opts.args],
          value: opts.value,
        });

        setTxHash(result);
        setStatus('pending');
        addTx(result, label, selectedChainIdStore.get());

        return result;
      } catch (err: any) {
        setStatus('failed');
        const msg = err?.shortMessage ?? err?.message ?? 'Transaction failed';
        setError(msg);
        return undefined;
      }
    },
    [address, writeContractAsync],
  );

  const reset = useCallback(() => {
    setStatus('idle');
    setError(null);
    setTxHash(undefined);
  }, []);

  return {
    submitJob,
    reset,
    status,
    error,
    txHash,
    callId,
    isSigning,
    isConnected: !!address,
  };
}
