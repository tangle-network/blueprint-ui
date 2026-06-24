/**
 * OperatorOnboardingGuide — shared component for operator registration.
 *
 * Renders the registration command (cargo-tangle or cast) with a copy button.
 * Each blueprint app (trading, sandbox, bazaar) used to reimplement this;
 * now they install <OperatorOnboardingGuide> and pass their blueprint config.
 */
import { type FC, useCallback, useState } from 'react';
import { Button } from './ui/button';
import {
  useRegistrationCommand,
  type RegistrationCommandOptions,
} from '../hooks/useRegistrationCommand';

export interface OperatorOnboardingGuideProps
  extends RegistrationCommandOptions {
  /** Optional title override. Defaults to "Register as operator". */
  title?: string;
  /** Optional description shown above the command. */
  description?: string;
}

export const OperatorOnboardingGuide: FC<OperatorOnboardingGuideProps> = ({
  title = 'Register as operator',
  description = 'Run this command on your operator VPS to register for this blueprint on-chain.',
  ...commandOptions
}) => {
  const { command, label, blueprintIdNumber } =
    useRegistrationCommand(commandOptions);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [command]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>

      <div className="rounded-lg border border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
            Blueprint #{blueprintIdNumber} · {label}
          </span>
          <Button size="sm" variant="outline" onClick={handleCopy}>
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <pre className="text-sm font-mono text-foreground overflow-x-auto whitespace-pre-wrap break-all">
          {command}
        </pre>
      </div>
    </div>
  );
};
