import { useState, useRef, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { selectedChainIdStore } from '../../contracts/publicClient';
import { getNetworks } from '../../contracts/chains';

function chainIcon(label: string | undefined, chainName: string | undefined): string {
  if (label === 'Tangle Local' || chainName === 'Tangle Local') return 'i-ph:desktop';
  if (label === 'Tangle Testnet' || chainName === 'Tangle Testnet') return 'i-ph:flask';
  if (label === 'Tangle Mainnet' || chainName === 'Tangle') return 'i-ph:globe-hemisphere-west';
  return 'i-ph:globe';
}

function orderedChainIds(): number[] {
  const priority: Record<string, number> = {
    'Tangle Local': 0,
    'Tangle Testnet': 1,
    'Tangle Mainnet': 2,
    Tangle: 2,
  };

  return Object.entries(getNetworks())
    .sort(([, a], [, b]) => {
      const aPriority = priority[a?.label ?? a?.chain?.name ?? ''] ?? 99;
      const bPriority = priority[b?.label ?? b?.chain?.name ?? ''] ?? 99;
      if (aPriority !== bPriority) return aPriority - bPriority;
      return a.chain.id - b.chain.id;
    })
    .map(([chainId]) => Number(chainId));
}

export function ChainSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selectedChainId = useStore(selectedChainIdStore);
  const current = getNetworks()[selectedChainId];

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  function selectChain(chainId: number) {
    selectedChainIdStore.set(chainId);
    setOpen(false);
    window.location.reload();
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-xs font-data font-medium bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 border border-bp-elements-borderColor hover:border-bp-elements-borderColorActive/40 transition-all"
        title={current?.label ?? 'Select network'}
      >
        <div className={`${chainIcon(current?.label, current?.chain?.name)} text-sm text-bp-elements-icon-success`} />
        <span className="hidden sm:inline text-bp-elements-textSecondary">{current?.shortLabel ?? 'Unknown'}</span>
        <div className={`i-ph:caret-down text-[10px] text-bp-elements-textTertiary transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 glass-card-strong rounded-xl border border-bp-elements-dividerColor/50 py-1.5 z-50 shadow-lg">
          <div className="px-3 py-1.5 text-[10px] font-data uppercase tracking-wider text-bp-elements-textTertiary">Network</div>
          {orderedChainIds().map((chainId) => {
            const net = getNetworks()[chainId];
            if (!net) return null;
            const isSelected = chainId === selectedChainId;
            return (
              <button
                key={chainId}
                onClick={() => selectChain(chainId)}
                className={`flex items-center gap-2.5 w-full px-3 py-2 text-left transition-colors ${
                  isSelected ? 'bg-violet-500/10 text-violet-700 dark:text-violet-400' : 'hover:bg-bp-elements-item-backgroundHover text-bp-elements-textSecondary'
                }`}
              >
                <div className={`${chainIcon(net.label, net.chain.name)} text-sm ${isSelected ? 'text-violet-700 dark:text-violet-400' : 'text-bp-elements-textTertiary'}`} />
                <span className="text-sm font-display font-medium">{net.label}</span>
                {isSelected && <div className="i-ph:check-bold text-xs ml-auto text-violet-700 dark:text-violet-400" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
