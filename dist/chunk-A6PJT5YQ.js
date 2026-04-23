// src/utils/resolveOperatorRpc.ts
function resolveOperatorRpc(raw) {
  if (typeof window === "undefined") return raw;
  const withProto = raw.includes("://") ? raw : `http://${raw}`;
  try {
    const url = new URL(withProto);
    const pageHost = window.location.hostname;
    const isNonRoutable = url.hostname.endsWith(".local") || !url.hostname.includes(".") || url.hostname === "127.0.0.1" || url.hostname === "localhost";
    if (isNonRoutable && pageHost !== url.hostname) {
      url.hostname = pageHost;
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return withProto;
  }
}

// src/contracts/chains.ts
import { defineChain } from "viem";
import { mainnet } from "viem/chains";

// src/utils/env.ts
function readImportMetaEnv() {
  return import.meta.env ?? {};
}
function getEnvVar(key) {
  const value = readImportMetaEnv()[key];
  return typeof value === "string" ? value : void 0;
}
function isDevEnv() {
  return Boolean(readImportMetaEnv().DEV);
}

// src/contracts/chains.ts
function resolveRpcUrl(envUrl) {
  const configured = envUrl ?? getEnvVar("VITE_RPC_URL") ?? "http://localhost:8545";
  if (typeof window === "undefined") return configured;
  try {
    const rpc = new URL(configured);
    const isLocalRpc = rpc.hostname === "127.0.0.1" || rpc.hostname === "localhost";
    const pageHost = window.location.hostname;
    const isLocalPage = pageHost === "127.0.0.1" || pageHost === "localhost";
    if (isLocalRpc && !isLocalPage && isDevEnv()) {
      return `${window.location.origin}/rpc-proxy`;
    }
    if (isLocalRpc && !isLocalPage) {
      rpc.hostname = pageHost;
      return rpc.toString().replace(/\/$/, "");
    }
  } catch {
  }
  return configured;
}
var rpcUrl = resolveRpcUrl();
function createTangleLocalChain(options = {}) {
  const chainId = options.chainId ?? Number(getEnvVar("VITE_CHAIN_ID") ?? 31337);
  const localRpcUrl = resolveRpcUrl(options.rpcUrl);
  return defineChain({
    id: chainId,
    name: "Tangle Local",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: { default: { http: [localRpcUrl] } },
    blockExplorers: { default: { name: "Explorer", url: "" } },
    contracts: { multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11" } }
  });
}
var tangleLocal = createTangleLocalChain();
var tangleTestnet = defineChain({
  id: 3799,
  name: "Tangle Testnet",
  nativeCurrency: { name: "Tangle", symbol: "tTNT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://testnet-rpc.tangle.tools"],
      webSocket: ["wss://testnet-rpc.tangle.tools"]
    }
  },
  blockExplorers: { default: { name: "Tangle Explorer", url: "https://testnet-explorer.tangle.tools" } },
  contracts: { multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11" } }
});
var tangleMainnet = defineChain({
  id: 5845,
  name: "Tangle",
  nativeCurrency: { name: "Tangle", symbol: "TNT", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.tangle.tools"],
      webSocket: ["wss://rpc.tangle.tools"]
    }
  },
  blockExplorers: { default: { name: "Tangle Explorer", url: "https://explorer.tangle.tools" } },
  contracts: { multicall3: { address: "0xcA11bde05977b3631167028862bE2a173976CA11" } }
});
var _networks = {};
function configureNetworks(nets) {
  _networks = nets;
}
function getNetworks() {
  return _networks;
}
var allTangleChains = [tangleLocal, tangleTestnet, tangleMainnet];

// src/stores/persistedAtom.ts
import { atom } from "nanostores";
function serializeWithBigInt(value) {
  return JSON.stringify(
    value,
    (_key, v) => typeof v === "bigint" ? { __bigint: v.toString() } : v
  );
}
function deserializeWithBigInt(raw) {
  return JSON.parse(raw, (_key, v) => {
    if (v && typeof v === "object" && "__bigint" in v && typeof v.__bigint === "string") {
      return BigInt(v.__bigint);
    }
    return v;
  });
}
function persistedAtom(opts) {
  const { key, initial, serialize = JSON.stringify, deserialize = JSON.parse } = opts;
  let restored = initial;
  if (typeof window !== "undefined") {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        restored = deserialize(raw);
      }
    } catch {
    }
  }
  const store = atom(restored);
  if (typeof window !== "undefined") {
    store.subscribe((value) => {
      try {
        localStorage.setItem(key, serialize(value));
      } catch {
      }
    });
  }
  return store;
}

// src/stores/txHistory.ts
import { computed } from "nanostores";
var MAX_TXS = 50;
var txListStore = persistedAtom({
  key: "bp_tx_history",
  initial: [],
  serialize: serializeWithBigInt,
  deserialize: deserializeWithBigInt
});
var pendingCount = computed(
  txListStore,
  (txs) => txs.filter((tx) => tx.status === "pending").length
);
function addTx(hash, label, chainId) {
  const existing = txListStore.get();
  if (existing.some((tx) => tx.hash === hash)) return;
  const newTx = { hash, label, status: "pending", timestamp: Date.now(), chainId };
  txListStore.set([newTx, ...existing].slice(0, MAX_TXS));
}
function updateTx(hash, update) {
  txListStore.set(
    txListStore.get().map(
      (tx) => tx.hash === hash ? { ...tx, ...update } : tx
    )
  );
}
function clearTxs() {
  txListStore.set([]);
}

// src/stores/infra.ts
var defaultBlueprintId = getEnvVar("VITE_BLUEPRINT_ID") ?? "0";
var defaultServiceId = getEnvVar("VITE_SERVICE_ID") ?? getEnvVar("VITE_SERVICE_IDS")?.split(",")[0] ?? "0";
var infraStore = persistedAtom({
  key: "bp_infra",
  initial: {
    blueprintId: defaultBlueprintId,
    serviceId: defaultServiceId,
    serviceValidated: false
  }
});
function updateInfra(update) {
  infraStore.set({ ...infraStore.get(), ...update });
}
function getInfra() {
  return infraStore.get();
}

// src/stores/theme.ts
import { atom as atom2 } from "nanostores";
var kTheme = "bp_theme";
var DEFAULT_THEME = "dark";
var themeStore = atom2(initStore());
function themeIsDark() {
  return themeStore.get() === "dark";
}
function initStore() {
  if (typeof window !== "undefined") {
    const persisted = localStorage.getItem(kTheme);
    const attr = document.querySelector("html")?.getAttribute("data-theme");
    return persisted ?? attr ?? DEFAULT_THEME;
  }
  return DEFAULT_THEME;
}
function toggleTheme() {
  const next = themeStore.get() === "dark" ? "light" : "dark";
  themeStore.set(next);
  localStorage.setItem(kTheme, next);
  document.querySelector("html")?.setAttribute("data-theme", next);
}

// src/contracts/abi.ts
var tangleJobsAbi = [
  {
    type: "function",
    name: "submitJob",
    inputs: [
      { name: "serviceId", type: "uint64" },
      { name: "job", type: "uint8" },
      { name: "args", type: "bytes" }
    ],
    outputs: [{ name: "callId", type: "uint64" }],
    stateMutability: "payable"
  },
  {
    type: "event",
    name: "JobCalled",
    inputs: [
      { name: "serviceId", type: "uint64", indexed: true },
      { name: "job", type: "uint8", indexed: true },
      { name: "callId", type: "uint64", indexed: true },
      { name: "caller", type: "address", indexed: false },
      { name: "args", type: "bytes", indexed: false }
    ]
  },
  {
    type: "event",
    name: "JobResultReceived",
    inputs: [
      { name: "serviceId", type: "uint64", indexed: true },
      { name: "job", type: "uint8", indexed: true },
      { name: "callId", type: "uint64", indexed: true },
      { name: "operator", type: "address", indexed: false },
      { name: "outputs", type: "bytes", indexed: false }
    ]
  },
  {
    type: "event",
    name: "JobSubmitted",
    inputs: [
      { name: "serviceId", type: "uint64", indexed: true },
      { name: "callId", type: "uint64", indexed: true },
      { name: "jobIndex", type: "uint8", indexed: false },
      { name: "caller", type: "address", indexed: false },
      { name: "inputs", type: "bytes", indexed: false }
    ]
  },
  {
    type: "event",
    name: "JobCompleted",
    inputs: [
      { name: "serviceId", type: "uint64", indexed: true },
      { name: "callId", type: "uint64", indexed: true }
    ]
  },
  {
    type: "event",
    name: "JobResultSubmitted",
    inputs: [
      { name: "serviceId", type: "uint64", indexed: true },
      { name: "callId", type: "uint64", indexed: true },
      { name: "operator", type: "address", indexed: true },
      { name: "output", type: "bytes", indexed: false }
    ]
  }
];
var tangleServicesAbi = [
  {
    type: "function",
    name: "requestService",
    inputs: [
      { name: "blueprintId", type: "uint64" },
      { name: "operators", type: "address[]" },
      { name: "config", type: "bytes" },
      { name: "permittedCallers", type: "address[]" },
      { name: "ttl", type: "uint64" },
      { name: "paymentToken", type: "address" },
      { name: "paymentAmount", type: "uint256" }
    ],
    outputs: [{ name: "requestId", type: "uint64" }],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "createServiceFromQuotes",
    inputs: [
      { name: "blueprintId", type: "uint64" },
      {
        name: "quotes",
        type: "tuple[]",
        components: [
          {
            name: "details",
            type: "tuple",
            components: [
              { name: "blueprintId", type: "uint64" },
              { name: "ttlBlocks", type: "uint64" },
              { name: "totalCost", type: "uint256" },
              { name: "timestamp", type: "uint64" },
              { name: "expiry", type: "uint64" },
              { name: "confidentiality", type: "uint8" },
              {
                name: "securityCommitments",
                type: "tuple[]",
                components: [
                  {
                    name: "asset",
                    type: "tuple",
                    components: [
                      { name: "kind", type: "uint8" },
                      { name: "token", type: "address" }
                    ]
                  },
                  { name: "exposureBps", type: "uint16" }
                ]
              },
              {
                name: "resourceCommitments",
                type: "tuple[]",
                components: [
                  { name: "kind", type: "uint8" },
                  { name: "count", type: "uint64" }
                ]
              }
            ]
          },
          { name: "signature", type: "bytes" },
          { name: "operator", type: "address" }
        ]
      },
      { name: "config", type: "bytes" },
      { name: "permittedCallers", type: "address[]" },
      { name: "ttl", type: "uint64" }
    ],
    outputs: [{ name: "serviceId", type: "uint64" }],
    stateMutability: "payable"
  },
  {
    type: "function",
    name: "getService",
    inputs: [{ name: "serviceId", type: "uint64" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        components: [
          { name: "blueprintId", type: "uint64" },
          { name: "owner", type: "address" },
          { name: "createdAt", type: "uint64" },
          { name: "ttl", type: "uint64" },
          { name: "terminatedAt", type: "uint64" },
          { name: "lastPaymentAt", type: "uint64" },
          { name: "operatorCount", type: "uint32" },
          { name: "minOperators", type: "uint32" },
          { name: "maxOperators", type: "uint32" },
          { name: "membership", type: "uint8" },
          { name: "pricing", type: "uint8" },
          { name: "status", type: "uint8" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isServiceActive",
    inputs: [{ name: "serviceId", type: "uint64" }],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getServiceOperators",
    inputs: [{ name: "serviceId", type: "uint64" }],
    outputs: [{ name: "", type: "address[]" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isPermittedCaller",
    inputs: [
      { name: "serviceId", type: "uint64" },
      { name: "caller", type: "address" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "ServiceRequested",
    inputs: [
      { name: "requestId", type: "uint64", indexed: true },
      { name: "blueprintId", type: "uint64", indexed: true },
      { name: "requester", type: "address", indexed: true }
    ]
  },
  {
    type: "event",
    name: "ServiceActivated",
    inputs: [
      { name: "serviceId", type: "uint64", indexed: true },
      { name: "requestId", type: "uint64", indexed: true },
      { name: "blueprintId", type: "uint64", indexed: true }
    ]
  }
];
var tangleOperatorsAbi = [
  {
    type: "function",
    name: "blueprintOperatorCount",
    inputs: [{ name: "blueprintId", type: "uint64" }],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "isOperatorRegistered",
    inputs: [
      { name: "blueprintId", type: "uint64" },
      { name: "operator", type: "address" }
    ],
    outputs: [{ name: "", type: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getOperatorPreferences",
    inputs: [
      { name: "blueprintId", type: "uint64" },
      { name: "operator", type: "address" }
    ],
    outputs: [
      {
        name: "preferences",
        type: "tuple",
        components: [
          { name: "ecdsaPublicKey", type: "bytes" },
          { name: "rpcAddress", type: "string" }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "OperatorRegistered",
    inputs: [
      { name: "blueprintId", type: "uint64", indexed: true },
      { name: "operator", type: "address", indexed: true },
      { name: "ecdsaPublicKey", type: "bytes", indexed: false },
      { name: "rpcAddress", type: "string", indexed: false }
    ]
  },
  {
    type: "event",
    name: "OperatorUnregistered",
    inputs: [
      { name: "blueprintId", type: "uint64", indexed: true },
      { name: "operator", type: "address", indexed: true }
    ]
  }
];

// src/contracts/publicClient.ts
import { createPublicClient, http } from "viem";
import { atom as atom3 } from "nanostores";
var defaultChainId = Number(getEnvVar("VITE_CHAIN_ID") ?? tangleLocal.id);
var selectedChainIdStore = persistedAtom({
  key: "bp_selected_chain",
  initial: defaultChainId
});
var clientCache = /* @__PURE__ */ new Map();
function configuredDefaultChainId() {
  const networks = getNetworks();
  if (networks[defaultChainId]) return defaultChainId;
  for (const [chainId, net] of Object.entries(networks)) {
    if (net?.shortLabel === "Local" || net?.label === "Tangle Local" || net?.chain?.name === "Tangle Local") {
      return Number(chainId);
    }
  }
  const [firstConfigured] = Object.keys(networks);
  return firstConfigured ? Number(firstConfigured) : defaultChainId;
}
function normalizeSelectedChainId(chainId) {
  const networks = getNetworks();
  if (!Object.keys(networks).length) return chainId;
  return networks[chainId] ? chainId : configuredDefaultChainId();
}
function sanitizeSelectedChainId() {
  const normalized = normalizeSelectedChainId(selectedChainIdStore.get());
  if (normalized !== selectedChainIdStore.get()) {
    selectedChainIdStore.set(normalized);
  }
  return normalized;
}
function getOrCreateClient(chainId) {
  const normalizedChainId = normalizeSelectedChainId(chainId);
  const cached = clientCache.get(normalizedChainId);
  if (cached) return cached;
  const networks = getNetworks();
  const net = networks[normalizedChainId];
  if (!net) {
    const fallback = networks[configuredDefaultChainId()];
    if (!fallback) {
      return createPublicClient({ chain: tangleLocal, transport: http() });
    }
    return createPublicClient({ chain: fallback.chain, transport: http(fallback.rpcUrl) });
  }
  const client = createPublicClient({ chain: net.chain, transport: http(net.rpcUrl) });
  clientCache.set(normalizedChainId, client);
  return client;
}
var publicClientStore = atom3(getOrCreateClient(sanitizeSelectedChainId()));
selectedChainIdStore.subscribe((chainId) => {
  const normalized = normalizeSelectedChainId(chainId);
  if (normalized !== chainId) {
    selectedChainIdStore.set(normalized);
    return;
  }
  publicClientStore.set(getOrCreateClient(normalized));
});
function getPublicClient() {
  sanitizeSelectedChainId();
  return publicClientStore.get();
}
var publicClient = new Proxy({}, {
  get(_target, prop) {
    const client = getOrCreateClient(sanitizeSelectedChainId());
    const value = client[prop];
    return typeof value === "function" ? value.bind(client) : value;
  }
});
function getAddresses() {
  const networks = getNetworks();
  const selectedChainId = sanitizeSelectedChainId();
  const net = networks[selectedChainId];
  return net?.addresses ?? networks[configuredDefaultChainId()]?.addresses ?? {};
}

// src/contracts/generic-encoder.ts
import { encodeAbiParameters } from "viem";
function encodeJobArgs(job, formValues, context) {
  if (job.customEncoder) {
    return job.customEncoder(formValues, context);
  }
  const abiDefs = [];
  const values = [];
  if (job.contextParams) {
    for (const cp of job.contextParams) {
      abiDefs.push({ name: cp.abiName, type: cp.abiType });
      values.push(coerceValue(context?.[cp.abiName], cp.abiType));
    }
  }
  for (const field of job.fields) {
    if (!field.abiType) continue;
    abiDefs.push({ name: field.abiParam ?? field.name, type: field.abiType });
    values.push(coerceValue(formValues[field.name], field.abiType));
  }
  return encodeAbiParameters(abiDefs, values);
}
function coerceValue(value, abiType) {
  switch (abiType) {
    case "bool":
      return Boolean(value);
    case "uint8":
    case "uint16":
    case "uint32":
      return Number(value) || 0;
    case "uint64":
    case "uint128":
    case "uint256":
      return BigInt(Number(value) || 0);
    case "string":
      return String(value ?? "");
    case "string[]":
      if (Array.isArray(value)) return value.map(String);
      return String(value ?? "").split("\n").filter(Boolean);
    case "address[]":
      if (Array.isArray(value)) return value;
      return String(value ?? "").split("\n").map((s) => s.trim()).filter((s) => /^0x[a-fA-F0-9]{40}$/.test(s));
    default:
      return value;
  }
}

// src/hooks/useJobForm.ts
import { useState, useCallback, useEffect, useMemo } from "react";
function buildDefaults(job) {
  const init = {};
  for (const f of job.fields) {
    if (f.internal) continue;
    if (f.defaultValue !== void 0) {
      init[f.name] = f.defaultValue;
    } else if (f.type === "boolean") {
      init[f.name] = false;
    } else if (f.type === "number") {
      init[f.name] = f.min ?? 0;
    } else {
      init[f.name] = "";
    }
  }
  return init;
}
function useJobForm(job) {
  const defaults = useMemo(() => job ? buildDefaults(job) : {}, [job]);
  const [values, setValues] = useState(defaults);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setValues(defaults);
    setErrors({});
  }, [defaults]);
  const onChange = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);
  const validate = useCallback(() => {
    if (!job) return false;
    const errs = {};
    for (const f of job.fields) {
      if (f.internal) continue;
      const v = values[f.name];
      if (f.required && (v === void 0 || v === null || v === "")) {
        errs[f.name] = `${f.label} is required`;
        continue;
      }
      if (f.type === "number" && typeof v === "number") {
        if (f.min != null && v < f.min) {
          errs[f.name] = `${f.label} must be at least ${f.min}`;
        } else if (f.max != null && v > f.max) {
          errs[f.name] = `${f.label} must be at most ${f.max}`;
        }
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [job, values]);
  const reset = useCallback(() => {
    setValues(defaults);
    setErrors({});
  }, [defaults]);
  return { values, errors, onChange, validate, reset };
}

// src/hooks/useQuotes.ts
import { useState as useState2, useEffect as useEffect2, useCallback as useCallback2 } from "react";
import { sha256 as viemSha256, toHex } from "viem";
var POW_DIFFICULTY = 20;
var WEI_PER_TNT = 1e18;
var RESOURCE_KIND_TO_ID = {
  CPU: 0,
  MemoryMB: 1,
  StorageMB: 2,
  NetworkEgressMB: 3,
  NetworkIngressMB: 4,
  GPU: 5
};
var ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
var DEFAULT_RESOURCE_REQUIREMENTS = [
  { kind: "CPU", count: 1 },
  { kind: "MemoryMB", count: 1024 },
  { kind: "StorageMB", count: 10240 }
];
function sha256(data) {
  return viemSha256(data, "bytes");
}
function generateChallenge(blueprintId, timestamp) {
  const input = new Uint8Array(16);
  const view = new DataView(input.buffer);
  view.setBigUint64(0, blueprintId, false);
  view.setBigUint64(8, timestamp, false);
  return sha256(input);
}
function checkDifficulty(hash, difficulty) {
  const zeroBytes = Math.floor(difficulty / 8);
  const zeroBits = difficulty % 8;
  for (let i = 0; i < zeroBytes; i++) {
    if (hash[i] !== 0) return false;
  }
  if (zeroBits > 0) {
    const mask = 255 << 8 - zeroBits;
    if ((hash[zeroBytes] & mask) !== 0) return false;
  }
  return true;
}
async function solvePoW(blueprintId, timestamp) {
  const challenge = generateChallenge(blueprintId, timestamp);
  const buf = new Uint8Array(challenge.length + 8);
  buf.set(challenge, 0);
  const view = new DataView(buf.buffer);
  for (let nonce = 0; nonce < 4294967296; nonce++) {
    view.setBigUint64(challenge.length, BigInt(nonce), false);
    const hash = sha256(buf);
    if (checkDifficulty(hash, POW_DIFFICULTY)) {
      const proof = new Uint8Array(8 + 32 + 8);
      const pv = new DataView(proof.buffer);
      pv.setBigUint64(0, 32n, true);
      proof.set(hash, 8);
      pv.setBigUint64(40, BigInt(nonce), true);
      return { hash, nonce, proof };
    }
    if (nonce % 5e3 === 0 && nonce > 0) {
      await new Promise((r) => setTimeout(r, 0));
    }
  }
  throw new Error("PoW: exhausted nonce space");
}
function formatCost(totalCost) {
  const tnt = Number(totalCost) / WEI_PER_TNT;
  if (tnt === 0) return "0 TNT";
  if (tnt < 1e-3) return `${(tnt * 1e6).toFixed(2)} \u03BCTNT`;
  if (tnt < 0.01) return `${(tnt * 1e3).toFixed(2)} mTNT`;
  if (tnt < 1e3) return `${tnt.toFixed(4)} TNT`;
  return `${tnt.toLocaleString(void 0, { maximumFractionDigits: 2 })} TNT`;
}
function quoteConfidentiality(requireTee) {
  return requireTee ? 1 : 0;
}
function resourceKindToId(kind) {
  const mapped = RESOURCE_KIND_TO_ID[kind];
  if (mapped === void 0) {
    throw new Error(`Unsupported resource kind in quote: ${kind}`);
  }
  return mapped;
}
function mapJsonSecurityCommitment(sc) {
  return {
    asset: {
      kind: sc.asset?.kind ?? 0,
      token: sc.asset?.token ?? ZERO_ADDRESS
    },
    exposureBps: sc.exposure_bps ?? 0
  };
}
function mapJsonResourceCommitment(resource) {
  return {
    kind: resourceKindToId(String(resource.kind ?? "CPU")),
    count: BigInt(resource.count ?? 0)
  };
}
function useQuotes(operators, blueprintId, ttlBlocks, enabled, requireTee = false) {
  const [quotes, setQuotes] = useState2([]);
  const [isLoading, setIsLoading] = useState2(false);
  const [isSolvingPow, setIsSolvingPow] = useState2(false);
  const [errors, setErrors] = useState2(/* @__PURE__ */ new Map());
  const [fetchKey, setFetchKey] = useState2(0);
  const refetch = useCallback2(() => setFetchKey((k) => k + 1), []);
  useEffect2(() => {
    if (!enabled || operators.length === 0) {
      setQuotes((prev) => prev.length === 0 ? prev : []);
      setErrors((prev) => prev.size === 0 ? prev : /* @__PURE__ */ new Map());
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setIsSolvingPow(true);
    setQuotes([]);
    setErrors(/* @__PURE__ */ new Map());
    async function fetchQuotes() {
      const results = [];
      const errs = /* @__PURE__ */ new Map();
      const promises = operators.map(async (op) => {
        try {
          if (!op.rpcAddress) throw new Error("No RPC address registered");
          const rpcUrl2 = resolveOperatorRpc(op.rpcAddress);
          const timestamp = BigInt(Math.floor(Date.now() / 1e3));
          if (!cancelled) setIsSolvingPow(true);
          const { proof } = await solvePoW(blueprintId, timestamp);
          if (!cancelled) setIsSolvingPow(false);
          const response = await fetchPriceFromOperator(rpcUrl2, {
            blueprintId,
            ttlBlocks,
            proofOfWork: proof,
            challengeTimestamp: timestamp,
            requireTee
          });
          if (!response) throw new Error("No quote returned from operator");
          if (!cancelled) results.push(response);
        } catch (err) {
          if (!cancelled) {
            errs.set(op.address, err instanceof Error ? err.message : String(err));
          }
        }
      });
      await Promise.allSettled(promises);
      if (!cancelled) {
        setQuotes(results);
        setErrors(errs);
        setIsLoading(false);
        setIsSolvingPow(false);
      }
    }
    fetchQuotes();
    return () => {
      cancelled = true;
    };
  }, [operators, blueprintId, ttlBlocks, enabled, fetchKey, requireTee]);
  const totalCost = quotes.reduce((sum, q) => sum + q.totalCost, 0n);
  return { quotes, isLoading, isSolvingPow, errors, totalCost, refetch };
}
async function fetchPriceFromOperator(rpcUrl2, params) {
  try {
    const response = await fetch(`${rpcUrl2}/pricing/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        blueprint_id: String(params.blueprintId),
        ttl_blocks: String(params.ttlBlocks),
        proof_of_work: toHex(params.proofOfWork),
        challenge_timestamp: String(params.challengeTimestamp),
        require_tee: params.requireTee,
        resource_requirements: DEFAULT_RESOURCE_REQUIREMENTS
      }),
      signal: AbortSignal.timeout(1e4)
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return {
      operator: data.operator,
      totalCost: BigInt(data.total_cost ?? "0"),
      signature: data.signature ?? "0x",
      costRate: Number(data.cost_rate ?? 0),
      teeAttested: Boolean(data.tee_attested),
      teeProvider: data.tee_provider || void 0,
      details: {
        blueprintId: BigInt(data.details?.blueprint_id ?? params.blueprintId),
        ttlBlocks: BigInt(data.details?.ttl_blocks ?? params.ttlBlocks),
        totalCost: BigInt(data.details?.total_cost ?? "0"),
        timestamp: BigInt(data.details?.timestamp ?? params.challengeTimestamp),
        expiry: BigInt(data.details?.expiry ?? "0"),
        confidentiality: Number(data.details?.confidentiality ?? quoteConfidentiality(params.requireTee)),
        securityCommitments: (data.details?.security_commitments ?? []).map(mapJsonSecurityCommitment),
        resourceCommitments: (data.details?.resources ?? []).map(mapJsonResourceCommitment)
      }
    };
  } catch {
    return null;
  }
}

// src/hooks/useJobPrice.ts
import { useState as useState3, useEffect as useEffect3, useCallback as useCallback3, useRef } from "react";
import { toHex as toHex2 } from "viem";
function resolveOperatorRpc2(raw) {
  if (typeof window === "undefined") return raw;
  const withProto = raw.includes("://") ? raw : `http://${raw}`;
  try {
    const url = new URL(withProto);
    const pageHost = window.location.hostname;
    const isNonRoutable = url.hostname.endsWith(".local") || !url.hostname.includes(".") || url.hostname === "127.0.0.1" || url.hostname === "localhost";
    if (isNonRoutable && pageHost !== url.hostname) {
      url.hostname = pageHost;
    }
    return url.toString().replace(/\/$/, "");
  } catch {
    return withProto;
  }
}
function useJobPrice(operatorRpcUrl, serviceId, jobIndex, blueprintId, enabled) {
  const [quote, setQuote] = useState3(null);
  const [isLoading, setIsLoading] = useState3(false);
  const [isSolvingPow, setIsSolvingPow] = useState3(false);
  const [error, setError] = useState3(null);
  const [fetchKey, setFetchKey] = useState3(0);
  const cancelledRef = useRef(false);
  const refetch = useCallback3(() => setFetchKey((k) => k + 1), []);
  useEffect3(() => {
    if (!enabled || !operatorRpcUrl || serviceId === 0n) {
      setQuote(null);
      setError(null);
      return;
    }
    cancelledRef.current = false;
    setIsLoading(true);
    setError(null);
    setQuote(null);
    async function fetchJobQuote() {
      try {
        const rpcUrl2 = resolveOperatorRpc2(operatorRpcUrl);
        const timestamp = BigInt(Math.floor(Date.now() / 1e3));
        setIsSolvingPow(true);
        const { proof } = await solvePoW(blueprintId, timestamp);
        if (cancelledRef.current) return;
        setIsSolvingPow(false);
        const response = await fetch(`${rpcUrl2}/pricing/job-quote`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: String(serviceId),
            job_index: jobIndex,
            proof_of_work: toHex2(proof),
            challenge_timestamp: String(timestamp)
          }),
          signal: AbortSignal.timeout(1e4)
        });
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text().catch(() => "Unknown error")}`);
        }
        const data = await response.json();
        if (cancelledRef.current) return;
        setQuote({
          serviceId: BigInt(data.service_id ?? serviceId),
          jobIndex: data.job_index ?? jobIndex,
          price: BigInt(data.price ?? "0"),
          timestamp: BigInt(data.timestamp ?? timestamp),
          expiry: BigInt(data.expiry ?? "0"),
          signature: data.signature ?? "0x",
          operatorAddress: data.operator
        });
      } catch (err) {
        if (!cancelledRef.current) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelledRef.current) {
          setIsLoading(false);
          setIsSolvingPow(false);
        }
      }
    }
    fetchJobQuote();
    return () => {
      cancelledRef.current = true;
    };
  }, [operatorRpcUrl, serviceId, jobIndex, blueprintId, enabled, fetchKey]);
  const formattedPrice = quote ? formatCost(quote.price) : "--";
  return { quote, isLoading, isSolvingPow, error, formattedPrice, refetch };
}
function useJobPrices(operatorRpcUrl, serviceId, blueprintId, jobIndexes, enabled) {
  const [prices, setPrices] = useState3([]);
  const [isLoading, setIsLoading] = useState3(false);
  const [error, setError] = useState3(null);
  const [fetchKey, setFetchKey] = useState3(0);
  const refetch = useCallback3(() => setFetchKey((k) => k + 1), []);
  useEffect3(() => {
    if (!enabled || !operatorRpcUrl || serviceId === 0n || jobIndexes.length === 0) {
      setPrices([]);
      setError(null);
      return;
    }
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    async function fetchAllPrices() {
      try {
        const rpcUrl2 = resolveOperatorRpc2(operatorRpcUrl);
        const timestamp = BigInt(Math.floor(Date.now() / 1e3));
        const { proof } = await solvePoW(blueprintId, timestamp);
        if (cancelled) return;
        const results = await Promise.allSettled(
          jobIndexes.map(async (job) => {
            const response = await fetch(`${rpcUrl2}/pricing/job-quote`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                service_id: String(serviceId),
                job_index: job.index,
                proof_of_work: toHex2(proof),
                challenge_timestamp: String(timestamp)
              }),
              signal: AbortSignal.timeout(1e4)
            });
            if (!response.ok) return null;
            return response.json();
          })
        );
        if (cancelled) return;
        const entries = jobIndexes.map((job, i) => {
          const result = results[i];
          if (result.status === "fulfilled" && result.value) {
            const data = result.value;
            const price = BigInt(data.price ?? "0");
            return {
              jobIndex: job.index,
              jobName: job.name,
              price,
              formattedPrice: formatCost(price),
              mode: data.mode ?? "flat",
              quote: {
                serviceId: BigInt(data.service_id ?? serviceId),
                jobIndex: job.index,
                price,
                timestamp: BigInt(data.timestamp ?? timestamp),
                expiry: BigInt(data.expiry ?? "0"),
                signature: data.signature ?? "0x",
                operatorAddress: data.operator
              },
              error: null
            };
          }
          const estimatedPrice = BigInt(job.multiplier) * 1000000000000000n;
          return {
            jobIndex: job.index,
            jobName: job.name,
            price: estimatedPrice,
            formattedPrice: `~${formatCost(estimatedPrice)}`,
            mode: "flat",
            quote: null,
            error: "No RFQ response \u2014 showing estimate"
          };
        });
        setPrices(entries);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }
    fetchAllPrices();
    return () => {
      cancelled = true;
    };
  }, [operatorRpcUrl, serviceId, blueprintId, jobIndexes, enabled, fetchKey]);
  return { prices, isLoading, error, refetch };
}

// src/hooks/useSubmitJob.ts
import { useCallback as useCallback4, useState as useState4, useMemo as useMemo2 } from "react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { decodeEventLog } from "viem";
import { useEffect as useEffect4 } from "react";
function useSubmitJob() {
  const { address } = useAccount();
  const { writeContractAsync, data: hash, isPending: isSigning } = useWriteContract();
  const [status, setStatus] = useState4("idle");
  const [error, setError] = useState4(null);
  const [txHash, setTxHash] = useState4();
  const { data: receipt, isSuccess, isError } = useWaitForTransactionReceipt({
    hash: txHash
  });
  const callId = useMemo2(() => {
    if (!receipt?.logs) return null;
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: tangleJobsAbi,
          data: log.data,
          topics: log.topics
        });
        if (decoded.eventName === "JobCalled" && "callId" in decoded.args) {
          return Number(decoded.args.callId);
        }
      } catch {
      }
    }
    return null;
  }, [receipt]);
  useEffect4(() => {
    if (isSuccess && txHash) {
      setStatus("confirmed");
      updateTx(txHash, { status: "confirmed" });
    }
    if (isError && txHash) {
      setStatus("failed");
      updateTx(txHash, { status: "failed" });
    }
  }, [isSuccess, isError, txHash]);
  const submitJob = useCallback4(
    async (opts) => {
      if (!address) {
        setError("Wallet not connected");
        return void 0;
      }
      const addrs = getAddresses();
      const label = opts.label ?? `Job #${opts.jobId}`;
      try {
        setStatus("signing");
        setError(null);
        const result = await writeContractAsync({
          address: addrs.jobs,
          abi: tangleJobsAbi,
          functionName: "submitJob",
          args: [opts.serviceId, opts.jobId, opts.args],
          value: opts.value
        });
        setTxHash(result);
        setStatus("pending");
        addTx(result, label, selectedChainIdStore.get());
        return result;
      } catch (err) {
        setStatus("failed");
        const msg = err?.shortMessage ?? err?.message ?? "Transaction failed";
        setError(msg);
        return void 0;
      }
    },
    [address, writeContractAsync]
  );
  const reset = useCallback4(() => {
    setStatus("idle");
    setError(null);
    setTxHash(void 0);
  }, []);
  return {
    submitJob,
    reset,
    status,
    error,
    txHash,
    callId,
    isSigning,
    isConnected: !!address
  };
}

// src/hooks/useThemeValue.ts
import { useStore } from "@nanostores/react";
function useThemeValue() {
  return useStore(themeStore);
}

export {
  resolveOperatorRpc,
  getEnvVar,
  mainnet,
  resolveRpcUrl,
  rpcUrl,
  createTangleLocalChain,
  tangleLocal,
  tangleTestnet,
  tangleMainnet,
  configureNetworks,
  getNetworks,
  allTangleChains,
  serializeWithBigInt,
  deserializeWithBigInt,
  persistedAtom,
  txListStore,
  pendingCount,
  addTx,
  updateTx,
  clearTxs,
  infraStore,
  updateInfra,
  getInfra,
  kTheme,
  DEFAULT_THEME,
  themeStore,
  themeIsDark,
  toggleTheme,
  tangleJobsAbi,
  tangleServicesAbi,
  tangleOperatorsAbi,
  selectedChainIdStore,
  sanitizeSelectedChainId,
  publicClientStore,
  getPublicClient,
  publicClient,
  getAddresses,
  encodeJobArgs,
  useJobForm,
  solvePoW,
  formatCost,
  useQuotes,
  useJobPrice,
  useJobPrices,
  useSubmitJob,
  useThemeValue
};
//# sourceMappingURL=chunk-A6PJT5YQ.js.map