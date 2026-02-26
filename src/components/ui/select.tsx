import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../../utils';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function Select({ value, onValueChange, options, placeholder, className, disabled }: SelectProps) {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectPrimitive.Trigger
        className={cn(
          'group flex h-11 w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-base font-body',
          'bg-bp-elements-background-depth-3 dark:bg-bp-elements-background-depth-4 border border-bp-elements-borderColor text-bp-elements-textPrimary',
          'transition-all duration-200 outline-none',
          'hover:border-bp-elements-borderColorActive/40',
          'focus-visible:border-violet-500/40 focus-visible:ring-2 focus-visible:ring-violet-500/10',
          'disabled:pointer-events-none disabled:opacity-40',
          'data-[placeholder]:text-bp-elements-textTertiary',
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder ?? 'Select...'} />
        <SelectPrimitive.Icon className="ml-2 shrink-0 text-bp-elements-textTertiary transition-transform duration-200 group-data-[state=open]:rotate-180">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={4}
          className={cn(
            'relative z-50 max-h-[min(var(--radix-select-content-available-height),280px)] min-w-[var(--radix-select-trigger-width)] overflow-hidden',
            'rounded-xl border border-white/[0.06] bg-neutral-900/95 backdrop-blur-xl shadow-2xl shadow-black/40',
            'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98] data-[state=open]:slide-in-from-top-1',
            'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-[0.98] data-[state=closed]:slide-out-to-top-1',
          )}
        >
          <SelectPrimitive.Viewport className="p-1.5">
            {options.map((opt) => (
              <SelectPrimitive.Item
                key={opt.value}
                value={opt.value}
                className={cn(
                  'relative flex w-full cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm font-body outline-none select-none',
                  'text-neutral-300 transition-colors duration-100',
                  'data-[highlighted]:bg-white/[0.06] data-[highlighted]:text-white',
                  'data-[state=checked]:text-violet-300',
                )}
              >
                <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="ml-auto pl-3">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export { Select };
