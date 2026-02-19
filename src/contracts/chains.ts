import { defineChain } from 'viem';
import { mainnet } from 'viem/chains';
import type { Address, Chain } from 'viem';

/**
 * Resolve RPC URL for the current environment.
 * Handles local dev (hostname swap), Vite dev proxy, and remote access.
 */
export function resolveRpcUrl(envUrl?: string): string {
  const configured = envUrl ?? import.meta.env.VITE_RPC_URL ?? 'http://localhost:8545';
  if (typeof window === 'undefined') return configured;
  try {
    const rpc = new URL(configured);
    const isLocalRpc = rpc.hostname === '127.0.0.1' || rpc.hostname === 'localhost';
    const pageHost = window.location.hostname;
    const isLocalPage = pageHost === '127.0.0.1' || pageHost === 'localhost';
    // Dev-mode proxy for LAN access to local RPC
    if (isLocalRpc && !isLocalPage && import.meta.env.DEV) {
      return `${window.location.origin}/rpc-proxy`;
    }
    // Non-dev LAN access: swap hostname
    if (isLocalRpc && !isLocalPage) {
      rpc.hostname = pageHost;
      return rpc.toString().replace(/\/$/, '');
    }
  } catch {
    // malformed
  }
  return configured;
}

export const rpcUrl = resolveRpcUrl();

export const tangleLocal = defineChain({
  id: Number(import.meta.env.VITE_CHAIN_ID ?? 31337),
  name: 'Tangle Local',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: { default: { http: [rpcUrl] } },
  blockExplorers: { default: { name: 'Explorer', url: '' } },
  contracts: { multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11' } },
});

export const tangleTestnet = defineChain({
  id: 3799,
  name: 'Tangle Testnet',
  nativeCurrency: { name: 'Tangle', symbol: 'tTNT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://testnet-rpc.tangle.tools'],
      webSocket: ['wss://testnet-rpc.tangle.tools'],
    },
  },
  blockExplorers: { default: { name: 'Tangle Explorer', url: 'https://testnet-explorer.tangle.tools' } },
  contracts: { multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11' } },
});

export const tangleMainnet = defineChain({
  id: 5845,
  name: 'Tangle',
  nativeCurrency: { name: 'Tangle', symbol: 'TNT', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.tangle.tools'],
      webSocket: ['wss://rpc.tangle.tools'],
    },
  },
  blockExplorers: { default: { name: 'Tangle Explorer', url: 'https://explorer.tangle.tools' } },
  contracts: { multicall3: { address: '0xcA11bde05977b3631167028862bE2a173976CA11' } },
});

/** Minimum required contract addresses for Tangle core hooks. */
export interface CoreAddresses {
  jobs: Address;
  services: Address;
  [key: string]: Address;
}

export interface NetworkConfig<T extends CoreAddresses = CoreAddresses> {
  chain: Chain;
  rpcUrl: string;
  label: string;
  shortLabel: string;
  addresses: T;
}

let _networks: Record<number, NetworkConfig<any>> = {};

/** Register networks with app-specific address shapes at startup. */
export function configureNetworks<T extends CoreAddresses>(
  nets: Record<number, NetworkConfig<T>>,
) {
  _networks = nets;
}

export function getNetworks<T extends CoreAddresses = CoreAddresses>(): Record<number, NetworkConfig<T>> {
  return _networks as Record<number, NetworkConfig<T>>;
}

export { mainnet };
export const allTangleChains = [tangleLocal, tangleTestnet, tangleMainnet] as const;
