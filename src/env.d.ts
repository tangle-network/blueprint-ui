/** Vite env types — consumer provides the actual env values at build time. */
interface ImportMetaEnv {
  readonly VITE_RPC_URL?: string;
  readonly VITE_CHAIN_ID?: string;
  readonly VITE_BLUEPRINT_ID?: string;
  readonly VITE_SERVICE_ID?: string;
  readonly VITE_SERVICE_IDS?: string;
  readonly DEV?: boolean;
  [key: string]: unknown;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
