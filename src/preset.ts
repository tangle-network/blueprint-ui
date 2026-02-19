/**
 * Blueprint UI semantic token theme for UnoCSS.
 *
 * Components in this package use classes like `text-bp-elements-textPrimary`.
 * Each consuming app maps these to their own CSS variables by adding this
 * theme object under a `bp` key in their UnoCSS config:
 *
 *   import { bpThemeTokens } from '@tangle/blueprint-ui/preset';
 *   // theme: { colors: { bp: bpThemeTokens('cloud') } }
 *   // theme: { colors: { bp: bpThemeTokens('arena') } }
 */

export function bpThemeTokens(prefix: string) {
  return {
    elements: {
      borderColor: `var(--${prefix}-elements-borderColor)`,
      borderColorActive: `var(--${prefix}-elements-borderColorActive)`,
      background: {
        depth: {
          1: `var(--${prefix}-elements-bg-depth-1)`,
          2: `var(--${prefix}-elements-bg-depth-2)`,
          3: `var(--${prefix}-elements-bg-depth-3)`,
          4: `var(--${prefix}-elements-bg-depth-4)`,
        },
      },
      textPrimary: `var(--${prefix}-elements-textPrimary)`,
      textSecondary: `var(--${prefix}-elements-textSecondary)`,
      textTertiary: `var(--${prefix}-elements-textTertiary)`,
      button: {
        primary: {
          background: `var(--${prefix}-elements-button-primary-background)`,
          backgroundHover: `var(--${prefix}-elements-button-primary-backgroundHover)`,
          text: `var(--${prefix}-elements-button-primary-text)`,
        },
        secondary: {
          background: `var(--${prefix}-elements-button-secondary-background)`,
          backgroundHover: `var(--${prefix}-elements-button-secondary-backgroundHover)`,
          text: `var(--${prefix}-elements-button-secondary-text)`,
        },
        danger: {
          background: `var(--${prefix}-elements-button-danger-background)`,
          backgroundHover: `var(--${prefix}-elements-button-danger-backgroundHover)`,
          text: `var(--${prefix}-elements-button-danger-text)`,
        },
      },
      icon: {
        success: `var(--${prefix}-elements-icon-success)`,
        error: `var(--${prefix}-elements-icon-error)`,
        warning: `var(--${prefix}-elements-icon-warning)`,
        primary: `var(--${prefix}-elements-icon-primary)`,
        secondary: `var(--${prefix}-elements-icon-secondary)`,
      },
      dividerColor: `var(--${prefix}-elements-dividerColor)`,
      item: {
        backgroundHover: `var(--${prefix}-elements-item-backgroundHover)`,
        backgroundActive: `var(--${prefix}-elements-item-backgroundActive)`,
      },
      focus: `var(--${prefix}-elements-focus)`,
    },
  };
}
