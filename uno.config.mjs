import { icons as phIcons } from '@iconify-json/ph';
import { defineConfig, presetIcons } from 'unocss';
import { presetAnimations } from 'unocss-preset-animations';
import { presetWind4 } from 'unocss/preset-wind4';

function themeTokens(prefix) {
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

export default defineConfig({
  blocklist: ['--', '?', '??'],
  theme: {
    colors: {
      bp: themeTokens('bp'),
      cloud: themeTokens('cloud'),
      arena: themeTokens('arena'),
    },
  },
  presets: [
    presetWind4({
      dark: {
        light: '[data-theme="light"]',
        dark: '[data-theme="dark"]',
      },
    }),
    presetAnimations(),
    presetIcons({
      warn: true,
      collections: {
        ph: () => phIcons,
      },
    }),
  ],
});
