import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    components: 'src/components.ts',
    preset: 'src/preset.ts',
    'wallet/index': 'src/wallet/index.ts',
    'iframe/index': 'src/iframe/index.ts',
    'iframe/testing-index': 'src/iframe/testing-index.ts',
  },
  format: ['esm'],
  platform: 'neutral',
  dts: true,
  clean: true,
  sourcemap: true,
  fixedExtension: false,
});
