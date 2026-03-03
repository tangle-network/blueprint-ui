import type { Chain } from 'viem';
import { http } from 'wagmi';
import { mainnet, rpcUrl, tangleLocal, tangleMainnet, tangleTestnet } from '../contracts/chains';

export const tangleWalletChains: readonly [Chain, ...Chain[]] = [tangleLocal, tangleTestnet, tangleMainnet, mainnet];

export function createTangleTransports() {
  return {
    [tangleLocal.id]: http(rpcUrl),
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
