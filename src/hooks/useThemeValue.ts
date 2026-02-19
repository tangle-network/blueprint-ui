import { useStore } from '@nanostores/react';
import { themeStore, type Theme } from '../stores/theme';

export function useThemeValue(): Theme {
  return useStore(themeStore);
}
