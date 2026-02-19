import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2.5 py-0.5 text-xs font-semibold font-data uppercase tracking-wider w-fit whitespace-nowrap shrink-0 gap-1 transition-colors',
  {
    variants: {
      variant: {
        default: 'border-bp-elements-borderColor bg-bp-elements-background-depth-3 text-bp-elements-textPrimary',
        secondary: 'border-bp-elements-dividerColor bg-bp-elements-background-depth-2 text-bp-elements-textSecondary',
        destructive: 'border-crimson-500/20 bg-crimson-500/10 text-bp-elements-icon-error',
        success: 'border-teal-500/20 bg-teal-500/10 text-bp-elements-icon-success',
        outline: 'text-bp-elements-textPrimary border-bp-elements-borderColor bg-transparent',
        accent: 'border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-400',
        amber: 'border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-400',
        running: 'border-teal-500/20 bg-teal-500/10 text-teal-600 dark:text-teal-400',
        stopped: 'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
        cold: 'border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400',
      },
    },
    defaultVariants: { variant: 'default' },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';
  return <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
