import { useStore } from '@nanostores/react';
import type { JobDefinition } from '../../blueprints/registry';
import { useJobForm } from '../../hooks/useJobForm';
import { useSubmitJob } from '../../hooks/useSubmitJob';
import { useJobPrice } from '../../hooks/useJobPrice';
import { formatCost } from '../../hooks/useQuotes';
import { encodeJobArgs } from '../../contracts/generic-encoder';
import { infraStore } from '../../stores/infra';
import { BlueprintJobForm } from './BlueprintJobForm';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { cn } from '../../utils';

interface JobExecutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: JobDefinition;
  serviceId: bigint;
  context?: Record<string, unknown>;
  onSuccess?: () => void;
}

export function JobExecutionDialog({
  open,
  onOpenChange,
  job,
  serviceId,
  context,
  onSuccess,
}: JobExecutionDialogProps) {
  const infra = useStore(infraStore);
  const { values, errors, onChange, validate, reset } = useJobForm(job);
  const { submitJob, status, error: txError, txHash, reset: resetTx } = useSubmitJob();

  // Per-job RFQ: fetch price from operator before submission
  const operatorRpcUrl = infra.serviceInfo?.operators?.[0]?.rpcAddress;
  const blueprintId = BigInt(infra.blueprintId || '0');
  const { quote, isLoading: priceLoading, isSolvingPow, formattedPrice, error: priceError } = useJobPrice(
    operatorRpcUrl,
    serviceId,
    job.id,
    blueprintId,
    open && !!operatorRpcUrl && serviceId > 0n,
  );

  // Fallback price from multiplier (base rate = 0.001 TNT = 1e15 wei)
  const estimatedPrice = BigInt(job.pricingMultiplier) * 1_000_000_000_000_000n;
  const jobValue = quote?.price ?? estimatedPrice;
  const hasRfqPrice = !!quote && !priceError;

  const hasFields = job.fields.filter((f) => !f.internal).length > 0;

  const handleSubmit = async () => {
    if (hasFields && !validate()) return;
    const args = encodeJobArgs(job, values, context);
    const hash = await submitJob({
      serviceId,
      jobId: job.id,
      args,
      label: job.label,
      value: jobValue,
    });
    if (hash) {
      onSuccess?.();
    }
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      reset();
      resetTx();
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display flex items-center gap-2">
            <div className={`${job.icon} text-lg`} />
            {job.label}
          </DialogTitle>
          <DialogDescription>{job.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {job.warning && (
            <div className="glass-card rounded-lg p-3 border-amber-500/30">
              <div className="flex items-center gap-2">
                <div className="i-ph:warning text-sm text-amber-400" />
                <p className="text-xs text-amber-400">{job.warning}</p>
              </div>
            </div>
          )}

          {hasFields && (
            <BlueprintJobForm job={job} values={values} onChange={onChange} errors={errors} />
          )}

          {/* Job Price -- from RFQ or fallback estimate */}
          <div className="glass-card rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="i-ph:tag text-sm text-bp-elements-textTertiary" />
                <span className="text-sm font-display text-bp-elements-textSecondary">
                  Job Price
                </span>
              </div>
              <div className="flex items-center gap-2">
                {priceLoading || isSolvingPow ? (
                  <span className="text-xs font-data text-bp-elements-textTertiary animate-pulse">
                    {isSolvingPow ? 'Solving PoW...' : 'Fetching quote...'}
                  </span>
                ) : (
                  <span className={cn(
                    'text-sm font-data font-semibold',
                    hasRfqPrice ? 'text-teal-400' : 'text-bp-elements-textSecondary',
                  )}>
                    {hasRfqPrice ? formattedPrice : `~${formatCost(estimatedPrice)}`}
                  </span>
                )}
              </div>
            </div>
            {hasRfqPrice && (
              <p className="text-[10px] text-bp-elements-textTertiary mt-1.5">
                Signed quote from operator — expires in {Math.max(0, Number(quote!.expiry) - Math.floor(Date.now() / 1000))}s
              </p>
            )}
            {!hasRfqPrice && !priceLoading && (
              <p className="text-[10px] text-bp-elements-textTertiary mt-1.5">
                Estimate ({job.pricingMultiplier}x base rate) — no operator RFQ available
              </p>
            )}
          </div>

          {/* TX Status */}
          {status !== 'idle' && (
            <div
              className={cn(
                'glass-card rounded-lg p-3',
                status === 'confirmed' && 'border-teal-500/30',
                status === 'failed' && 'border-crimson-500/30',
              )}
            >
              <div className="flex items-center gap-3">
                {(status === 'signing' || status === 'pending') && (
                  <div className="i-ph:circle-fill text-sm text-blue-400 animate-pulse" />
                )}
                {status === 'confirmed' && <div className="i-ph:check-circle-fill text-sm text-teal-400" />}
                {status === 'failed' && <div className="i-ph:x-circle-fill text-sm text-crimson-400" />}
                <div>
                  <p className="text-sm font-display font-medium text-bp-elements-textPrimary">
                    {status === 'signing' && 'Waiting for wallet signature...'}
                    {status === 'pending' && 'Transaction submitted...'}
                    {status === 'confirmed' && 'Transaction confirmed!'}
                    {status === 'failed' && 'Transaction failed'}
                  </p>
                  {txHash && (
                    <p className="text-xs font-data text-bp-elements-textTertiary mt-0.5 truncate max-w-xs">
                      TX: {txHash}
                    </p>
                  )}
                  {txError && <p className="text-xs text-crimson-400 mt-0.5">{txError}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => handleClose(false)}>
              {status === 'confirmed' ? 'Close' : 'Cancel'}
            </Button>
            {status !== 'confirmed' && (
              <Button
                onClick={handleSubmit}
                disabled={status === 'signing' || status === 'pending' || priceLoading}
              >
                {status === 'signing' || status === 'pending' ? (
                  <>
                    <div className="i-ph:circle-fill text-sm animate-pulse" />
                    Submitting...
                  </>
                ) : priceLoading ? (
                  'Loading price...'
                ) : (
                  <>Submit ({hasRfqPrice ? formattedPrice : `~${formatCost(estimatedPrice)}`})</>
                )}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
