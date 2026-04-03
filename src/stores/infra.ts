import { persistedAtom } from './persistedAtom';
import { getEnvVar } from '../utils/env';

const defaultBlueprintId = getEnvVar('VITE_BLUEPRINT_ID') ?? '0';
const defaultServiceId = getEnvVar('VITE_SERVICE_ID') ?? getEnvVar('VITE_SERVICE_IDS')?.split(',')[0] ?? '0';

export interface OperatorInfo {
  address: string;
  rpcAddress: string;
}

export interface InfraConfig {
  blueprintId: string;
  serviceId: string;
  /** Whether the user has validated the service on-chain */
  serviceValidated: boolean;
  /** Cached service info from last validation */
  serviceInfo?: {
    active: boolean;
    operatorCount: number;
    owner: string;
    blueprintId: string;
    permitted: boolean;
    /** Operators with RPC endpoints (cached for RFQ) */
    operators?: OperatorInfo[];
  };
}

export const infraStore = persistedAtom<InfraConfig>({
  key: 'bp_infra',
  initial: {
    blueprintId: defaultBlueprintId,
    serviceId: defaultServiceId,
    serviceValidated: false,
  },
});

export function updateInfra(update: Partial<InfraConfig>) {
  infraStore.set({ ...infraStore.get(), ...update });
}

export function getInfra(): InfraConfig {
  return infraStore.get();
}
