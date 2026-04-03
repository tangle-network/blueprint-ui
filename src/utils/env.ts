type ImportMetaEnvLike = {
  DEV?: boolean;
  VITE_RPC_URL?: string;
  VITE_CHAIN_ID?: string;
  VITE_BLUEPRINT_ID?: string;
  VITE_SERVICE_ID?: string;
  VITE_SERVICE_IDS?: string;
  VITE_OPERATOR_API_URL?: string;
};

function readImportMetaEnv(): ImportMetaEnvLike {
  return ((import.meta as ImportMeta & { env?: ImportMetaEnvLike }).env ?? {});
}

export function getEnvVar(key: keyof ImportMetaEnvLike): string | undefined {
  const value = readImportMetaEnv()[key];
  return typeof value === 'string' ? value : undefined;
}

export function isDevEnv(): boolean {
  return Boolean(readImportMetaEnv().DEV);
}
