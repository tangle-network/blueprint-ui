import type { Chain } from 'viem';
import { http } from 'wagmi';
import { mainnet, rpcUrl, tangleLocal, tangleMainnet, tangleTestnet } from '../contracts/chains';

export function getTangleWalletChains(localChain: Chain = tangleLocal): readonly [Chain, ...Chain[]] {
  return [localChain, tangleTestnet, tangleMainnet, mainnet];
}

export const tangleWalletChains: readonly [Chain, ...Chain[]] = getTangleWalletChains();

export function createTangleTransports(localChain: Pick<Chain, 'id' | 'rpcUrls'> = tangleLocal) {
  const localRpcUrl = localChain.rpcUrls.default.http[0] ?? rpcUrl;

  return {
    [localChain.id]: http(localRpcUrl),
    [tangleTestnet.id]: http('https://testnet-rpc.tangle.tools'),
    [tangleMainnet.id]: http('https://rpc.tangle.tools'),
    [mainnet.id]: http(),
  };
}

export const defaultConnectKitOptions = {
  hideBalance: false,
  hideTooltips: false,
  hideQuestionMarkCTA: true,
  overlayBlur: 4,
} as const;
