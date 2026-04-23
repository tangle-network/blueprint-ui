import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    host: 'src/host/index.ts',
    components: 'src/components.ts',
    preset: 'src/preset.ts',
  },
  format: ['esm'],
  dts: true,
  splitting: true,
  clean: true,
  sourcemap: true,
  external: [
    '@nanostores/react',
    '@radix-ui/react-dialog',
    '@radix-ui/react-select',
    '@radix-ui/react-separator',
    '@radix-ui/react-slot',
    '@radix-ui/react-tabs',
    '@radix-ui/react-tooltip',
    '@tanstack/react-query',
    'blo',
    'class-variance-authority',
    'clsx',
    'framer-motion',
    'nanostores',
    'react',
    'react-dom',
    'react-router',
    'sonner',
    'tailwind-merge',
    'viem',
    'wagmi',
  ],
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
});
