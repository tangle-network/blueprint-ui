/**
 * Builds the operator registration command for a Tangle blueprint.
 *
 * Each blueprint app (trading arena, agent-sandbox, bazaar) used to reimplement
 * this — encoding the `registerOperator` call, building the CLI command, and
 * polling readiness. Lifted here so they install one hook instead of forking.
 */
import { useMemo } from 'react';

export type RegistrationMode = 'cargo-tangle' | 'cast';

export interface RegistrationCommandOptions {
  blueprintId: bigint;
  rpcAddress: string;
  ecdsaPublicKey: string;
  rpcUrl: string;
  registrationInputs?: string;
  mode?: RegistrationMode;
  /** Contract address for cast mode (defaults to TANGLE_CORE placeholder). */
  servicesAddress?: string;
}

export interface RegistrationCommandResult {
  /** The copy-paste command for the operator to run on their VPS. */
  command: string;
  /** A human-readable label for the command type. */
  label: string;
  /** The blueprint id as a plain number (for display). */
  blueprintIdNumber: number;
}

/**
 * Builds the operator registration command string for the given blueprint.
 * Two modes:
 * - `cargo-tangle` (default) — the canonical `cargo tangle blueprint register` flow.
 * - `cast` — raw `cast send` for operators who manage their own keys.
 */
export function useRegistrationCommand(
  options: RegistrationCommandOptions,
): RegistrationCommandResult {
  const {
    blueprintId,
    rpcAddress,
    ecdsaPublicKey,
    rpcUrl,
    registrationInputs = '0x',
    mode = 'cargo-tangle',
    servicesAddress = 'TANGLE_CORE',
  } = options;

  const blueprintIdNumber = Number(blueprintId);

  const command = useMemo(() => {
    if (mode === 'cast') {
      return [
        `cast send ${servicesAddress} \\`,
        `  "registerOperator(uint64,bytes,string,bytes)" \\`,
        `  ${blueprintIdNumber} \\`,
        `  ${ecdsaPublicKey} \\`,
        `  ${rpcAddress} \\`,
        `  ${registrationInputs} \\`,
        `  --rpc-url ${rpcUrl} \\`,
        `  --private-key <YOUR_OPERATOR_KEY>`,
      ].join('\n');
    }

    const wsUrl = rpcUrl.replace(/^http/, 'ws');

    return [
      `cargo tangle blueprint register \\`,
      `  --blueprint-id ${blueprintIdNumber} \\`,
      `  --http-rpc-url ${rpcUrl} \\`,
      `  --ws-rpc-url ${wsUrl} \\`,
      `  --keystore-uri <YOUR_KEYSTORE> \\`,
      `  --rpc-address ${rpcAddress} \\`,
      `  --ecdsa-public-key ${ecdsaPublicKey}`,
    ].join('\n');
  }, [blueprintIdNumber, ecdsaPublicKey, mode, registrationInputs, rpcAddress, rpcUrl, servicesAddress]);

  const label = mode === 'cast' ? 'cast send (raw)' : 'cargo-tangle (canonical)';

  return { command, label, blueprintIdNumber };
}
