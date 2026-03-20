import { createPublicClient, http } from 'viem';
import type { PublicClient } from 'viem';
import { atom } from 'nanostores';
import { getNetworks, tangleLocal, type CoreAddresses } from './chains';
import { persistedAtom } from '../stores/persistedAtom';

const defaultChainId = Number(import.meta.env.VITE_CHAIN_ID ?? tangleLocal.id);

export const selectedChainIdStore = persistedAtom<number>({
  key: 'bp_selected_chain',
  initial: defaultChainId,
});

const clientCache = new Map<number, PublicClient>();

function configuredDefaultChainId(): number {
  const networks = getNetworks();
  if (networks[defaultChainId]) return defaultChainId;

  for (const [chainId, net] of Object.entries(networks)) {
    if (
      net?.shortLabel === 'Local' ||
      net?.label === 'Tangle Local' ||
      net?.chain?.name === 'Tangle Local'
    ) {
      return Number(chainId);
    }
  }

  const [firstConfigured] = Object.keys(networks);
  return firstConfigured ? Number(firstConfigured) : defaultChainId;
}

function normalizeSelectedChainId(chainId: number): number {
  const networks = getNetworks();
  if (!Object.keys(networks).length) return chainId;
  return networks[chainId] ? chainId : configuredDefaultChainId();
}

export function sanitizeSelectedChainId(): number {
  const normalized = normalizeSelectedChainId(selectedChainIdStore.get());
  if (normalized !== selectedChainIdStore.get()) {
    selectedChainIdStore.set(normalized);
  }
  return normalized;
}

function getOrCreateClient(chainId: number): PublicClient {
  const normalizedChainId = normalizeSelectedChainId(chainId);

  const cached = clientCache.get(normalizedChainId);
  if (cached) return cached;
  const networks = getNetworks();
  const net = networks[normalizedChainId];
  if (!net) {
    const fallback = networks[configuredDefaultChainId()];
    if (!fallback) {
      return createPublicClient({ chain: tangleLocal, transport: http() });
    }
    return createPublicClient({ chain: fallback.chain, transport: http(fallback.rpcUrl) });
  }
  const client = createPublicClient({ chain: net.chain, transport: http(net.rpcUrl) });
  clientCache.set(normalizedChainId, client);
  return client;
}

export const publicClientStore = atom<PublicClient>(getOrCreateClient(sanitizeSelectedChainId()));

selectedChainIdStore.subscribe((chainId: number) => {
  const normalized = normalizeSelectedChainId(chainId);
  if (normalized !== chainId) {
    selectedChainIdStore.set(normalized);
    return;
  }
  publicClientStore.set(getOrCreateClient(normalized));
});

export function getPublicClient(): PublicClient {
  sanitizeSelectedChainId();
  return publicClientStore.get();
}

export const publicClient = new Proxy({} as PublicClient, {
  get(_target, prop) {
    const client = getOrCreateClient(sanitizeSelectedChainId());
    const value = (client as any)[prop];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

export function getAddresses<T extends CoreAddresses = CoreAddresses>(): T {
  const networks = getNetworks<T>();
  const selectedChainId = sanitizeSelectedChainId();
  const net = networks[selectedChainId];
  return net?.addresses ?? networks[configuredDefaultChainId()]?.addresses ?? {} as T;
}
