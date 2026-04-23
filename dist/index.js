import {
  DEFAULT_THEME,
  addTx,
  allTangleChains,
  clearTxs,
  configureNetworks,
  createTangleLocalChain,
  deserializeWithBigInt,
  encodeJobArgs,
  formatCost,
  getAddresses,
  getEnvVar,
  getInfra,
  getNetworks,
  getPublicClient,
  infraStore,
  kTheme,
  mainnet,
  pendingCount,
  persistedAtom,
  publicClient,
  publicClientStore,
  resolveOperatorRpc,
  resolveRpcUrl,
  rpcUrl,
  sanitizeSelectedChainId,
  selectedChainIdStore,
  serializeWithBigInt,
  solvePoW,
  tangleJobsAbi,
  tangleLocal,
  tangleMainnet,
  tangleOperatorsAbi,
  tangleServicesAbi,
  tangleTestnet,
  themeIsDark,
  themeStore,
  toggleTheme,
  txListStore,
  updateInfra,
  updateTx,
  useJobForm,
  useJobPrice,
  useJobPrices,
  useQuotes,
  useSubmitJob,
  useThemeValue
} from "./chunk-A6PJT5YQ.js";
import {
  BlueprintHostHero,
  BlueprintHostPanel,
  buildCanonicalBlueprintSlug,
  canPublisherClaimSlug,
  cn,
  deriveBlueprintRequestedSlug,
  getBlueprintExperienceTierLabel,
  getBlueprintPath,
  getBlueprintPublisherVerificationLabel,
  getBlueprintServicePath,
  getBlueprintSlugPolicyLabel,
  getBlueprintSurfaceLabel,
  getExternalAppTrustLabel,
  isTrustedExternalAppHost,
  isVerifiedBlueprintPublisher,
  resolveBlueprintAppView,
  sanitizeBlueprintSlugPart,
  toBlueprintAppEntry
} from "./chunk-GD3AZEJL.js";
import {
  bpThemeTokens
} from "./chunk-37ADATBT.js";

// src/utils/web3.ts
import { http } from "wagmi";
function getTangleWalletChains(localChain = tangleLocal) {
  return [localChain, tangleTestnet, tangleMainnet, mainnet];
}
var tangleWalletChains = getTangleWalletChains();
function createTangleTransports(localChain = tangleLocal) {
  const localRpcUrl = localChain.rpcUrls.default.http[0] ?? rpcUrl;
  return {
    [localChain.id]: http(localRpcUrl),
    [tangleTestnet.id]: http("https://testnet-rpc.tangle.tools"),
    [tangleMainnet.id]: http("https://rpc.tangle.tools"),
    [mainnet.id]: http()
  };
}
var defaultConnectKitOptions = {
  hideBalance: false,
  hideTooltips: false,
  hideQuestionMarkCTA: true,
  overlayBlur: 4
};

// src/stores/session.ts
var sessionMapStore = persistedAtom({
  key: "bp_sessions",
  initial: {}
});
function getSession(sandboxId) {
  const map = sessionMapStore.get();
  const entry = map[sandboxId];
  if (!entry) return null;
  if (Date.now() / 1e3 > entry.expiresAt - 60) {
    removeSession(sandboxId);
    return null;
  }
  return entry;
}
function setSession(entry) {
  const map = { ...sessionMapStore.get() };
  map[entry.sandboxId] = entry;
  sessionMapStore.set(map);
}
function removeSession(sandboxId) {
  const map = { ...sessionMapStore.get() };
  delete map[sandboxId];
  sessionMapStore.set(map);
}
function gcSessions() {
  const now = Date.now() / 1e3;
  const map = sessionMapStore.get();
  const cleaned = {};
  let changed = false;
  for (const [key, entry] of Object.entries(map)) {
    if (entry.expiresAt > now) {
      cleaned[key] = entry;
    } else {
      changed = true;
    }
  }
  if (changed) {
    sessionMapStore.set(cleaned);
  }
}

// src/blueprints/registry.ts
var blueprintRegistry = /* @__PURE__ */ new Map();
function registerBlueprint(bp) {
  blueprintRegistry.set(bp.id, bp);
}
function getBlueprint(id) {
  return blueprintRegistry.get(id);
}
function getAllBlueprints() {
  return Array.from(blueprintRegistry.values());
}
function getBlueprintJobs(blueprintId, category) {
  const bp = blueprintRegistry.get(blueprintId);
  if (!bp) return [];
  return category ? bp.jobs.filter((j) => j.category === category) : bp.jobs;
}
function getJobById(blueprintId, jobId) {
  const bp = blueprintRegistry.get(blueprintId);
  return bp?.jobs.find((j) => j.id === jobId);
}

// src/hooks/useOperators.ts
import { useState, useEffect } from "react";
function readPreferenceValue(result, field) {
  if (Array.isArray(result)) {
    return String(result[field === "ecdsaPublicKey" ? 0 : 1] ?? "");
  }
  if (result && typeof result === "object") {
    return String(result[field] ?? "");
  }
  return "";
}
async function verifyCandidatesWithMulticall(client, servicesAddress, blueprintId, candidates) {
  const [registrationResults, preferencesResults] = await Promise.all([
    client.multicall({
      contracts: candidates.map((op) => ({
        address: servicesAddress,
        abi: tangleOperatorsAbi,
        functionName: "isOperatorRegistered",
        args: [blueprintId, op.address]
      }))
    }),
    client.multicall({
      contracts: candidates.map((op) => ({
        address: servicesAddress,
        abi: tangleOperatorsAbi,
        functionName: "getOperatorPreferences",
        args: [blueprintId, op.address]
      }))
    })
  ]);
  const hadRegistrationFailure = registrationResults.some((result) => result?.status === "failure");
  const hadPreferenceFailure = preferencesResults.some((result) => result?.status === "failure");
  const active = [];
  candidates.forEach((op, i) => {
    if (registrationResults[i]?.result !== true) return;
    const prefs = preferencesResults[i];
    if (prefs?.status === "success" && prefs.result != null) {
      active.push({
        ...op,
        ecdsaPublicKey: readPreferenceValue(prefs.result, "ecdsaPublicKey") || op.ecdsaPublicKey,
        rpcAddress: readPreferenceValue(prefs.result, "rpcAddress") || op.rpcAddress
      });
      return;
    }
    active.push(op);
  });
  if (active.length === 0 && (hadRegistrationFailure || hadPreferenceFailure)) {
    return null;
  }
  return active;
}
async function verifyCandidatesDirectly(client, servicesAddress, blueprintId, candidates) {
  const results = await Promise.allSettled(
    candidates.map(async (op) => {
      const registration = await client.readContract({
        address: servicesAddress,
        abi: tangleOperatorsAbi,
        functionName: "isOperatorRegistered",
        args: [blueprintId, op.address]
      });
      if (registration !== true) {
        return null;
      }
      try {
        const preferences = await client.readContract({
          address: servicesAddress,
          abi: tangleOperatorsAbi,
          functionName: "getOperatorPreferences",
          args: [blueprintId, op.address]
        });
        return {
          ...op,
          ecdsaPublicKey: readPreferenceValue(preferences, "ecdsaPublicKey") || op.ecdsaPublicKey,
          rpcAddress: readPreferenceValue(preferences, "rpcAddress") || op.rpcAddress
        };
      } catch {
        return op;
      }
    })
  );
  const active = results.filter((result) => result.status === "fulfilled").map((result) => result.value).filter((op) => op != null);
  if (active.length > 0) {
    return active;
  }
  const failure = results.find((result) => result.status === "rejected");
  if (failure) {
    throw failure.reason instanceof Error ? failure.reason : new Error(String(failure.reason));
  }
  return [];
}
async function discoverOperatorsWithClient(client, servicesAddress, blueprintId) {
  const count = await client.readContract({
    address: servicesAddress,
    abi: tangleOperatorsAbi,
    functionName: "blueprintOperatorCount",
    args: [blueprintId]
  });
  const operatorCount = count;
  if (operatorCount === 0n) {
    return { operators: [], operatorCount };
  }
  const registeredLogs = await client.getLogs({
    address: servicesAddress,
    event: {
      type: "event",
      name: "OperatorRegistered",
      inputs: [
        { name: "blueprintId", type: "uint64", indexed: true },
        { name: "operator", type: "address", indexed: true },
        { name: "ecdsaPublicKey", type: "bytes", indexed: false },
        { name: "rpcAddress", type: "string", indexed: false }
      ]
    },
    args: { blueprintId },
    fromBlock: 0n,
    toBlock: "latest"
  });
  const byAddress = /* @__PURE__ */ new Map();
  for (const log of registeredLogs) {
    const args = log.args ?? {};
    const addr = args.operator;
    if (!addr) continue;
    byAddress.set(addr, {
      address: addr,
      ecdsaPublicKey: String(args.ecdsaPublicKey ?? "0x"),
      rpcAddress: String(args.rpcAddress ?? "")
    });
  }
  const candidates = Array.from(byAddress.values());
  if (candidates.length === 0) {
    return { operators: [], operatorCount };
  }
  try {
    const active2 = await verifyCandidatesWithMulticall(client, servicesAddress, blueprintId, candidates);
    if (active2 != null) {
      return { operators: active2, operatorCount };
    }
  } catch {
  }
  const active = await verifyCandidatesDirectly(client, servicesAddress, blueprintId, candidates);
  return { operators: active, operatorCount };
}
function useOperators(blueprintId) {
  const [operators, setOperators] = useState([]);
  const [operatorCount, setOperatorCount] = useState(0n);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    const addrs = getAddresses();
    async function discover() {
      setIsLoading(true);
      setError(null);
      try {
        const result = await discoverOperatorsWithClient(publicClient, addrs.services, blueprintId);
        if (cancelled) return;
        setOperatorCount(result.operatorCount);
        setOperators(result.operators);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    discover();
    return () => {
      cancelled = true;
    };
  }, [blueprintId]);
  return { operators, isLoading, error, operatorCount };
}

// src/hooks/useServiceValidation.ts
import { useState as useState2, useCallback } from "react";
function useServiceValidation() {
  const [isValidating, setIsValidating] = useState2(false);
  const [serviceInfo, setServiceInfo] = useState2(null);
  const [error, setError] = useState2(null);
  const validate = useCallback(async (serviceId, userAddress) => {
    setIsValidating(true);
    setError(null);
    setServiceInfo(null);
    const addrs = getAddresses();
    try {
      const [isActiveResult, serviceDataResult, operatorsResult, permittedResult] = await Promise.all([
        publicClient.readContract({
          address: addrs.services,
          abi: tangleServicesAbi,
          functionName: "isServiceActive",
          args: [serviceId]
        }).catch(() => false),
        publicClient.readContract({
          address: addrs.services,
          abi: tangleServicesAbi,
          functionName: "getService",
          args: [serviceId]
        }).catch(() => null),
        publicClient.readContract({
          address: addrs.services,
          abi: tangleServicesAbi,
          functionName: "getServiceOperators",
          args: [serviceId]
        }).catch(() => []),
        userAddress ? publicClient.readContract({
          address: addrs.services,
          abi: tangleServicesAbi,
          functionName: "isPermittedCaller",
          args: [serviceId, userAddress]
        }).catch(() => false) : Promise.resolve(true)
      ]);
      const isActive = isActiveResult;
      const serviceData = serviceDataResult;
      const operators = operatorsResult ?? [];
      const permitted = permittedResult;
      if (!serviceData) {
        setError("Service not found");
        setIsValidating(false);
        return null;
      }
      const info = {
        active: isActive,
        blueprintId: serviceData.blueprintId ?? serviceData[0] ?? 0n,
        owner: serviceData.owner ?? serviceData[1] ?? "0x0",
        operatorCount: operators.length,
        operators: [...operators],
        permitted,
        ttl: serviceData.ttl ?? serviceData[3] ?? 0n,
        createdAt: serviceData.createdAt ?? serviceData[2] ?? 0n
      };
      setServiceInfo(info);
      if (!isActive) {
        setError("Service is not active");
      } else if (!permitted && userAddress) {
        setError("You are not a permitted caller for this service");
      }
      setIsValidating(false);
      return info;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setIsValidating(false);
      return null;
    }
  }, []);
  const reset = useCallback(() => {
    setServiceInfo(null);
    setError(null);
  }, []);
  return { validate, reset, isValidating, serviceInfo, error };
}

// src/hooks/useAuthenticatedFetch.ts
import { useCallback as useCallback3 } from "react";

// src/hooks/useSessionAuth.ts
import { useCallback as useCallback2, useState as useState3 } from "react";
import { useSignMessage } from "wagmi";
function useSessionAuth({ sandboxId, apiUrl }) {
  const baseUrl = apiUrl ?? getEnvVar("VITE_OPERATOR_API_URL") ?? "http://localhost:9090";
  const { signMessageAsync } = useSignMessage();
  const [isAuthenticating, setIsAuthenticating] = useState3(false);
  const [error, setError] = useState3(null);
  const session = getSession(sandboxId);
  const authenticate = useCallback2(async () => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const challengeRes = await fetch(`${baseUrl}/api/auth/challenge`, {
        method: "POST"
      });
      if (!challengeRes.ok) {
        throw new Error(`Challenge request failed: HTTP ${challengeRes.status}`);
      }
      const challenge = await challengeRes.json();
      const signature = await signMessageAsync({ message: challenge.message });
      const sessionRes = await fetch(`${baseUrl}/api/auth/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nonce: challenge.nonce,
          signature
        })
      });
      if (!sessionRes.ok) {
        const body = await sessionRes.json().catch(() => ({}));
        throw new Error(body.error ?? `Session exchange failed: HTTP ${sessionRes.status}`);
      }
      const sessionData = await sessionRes.json();
      const entry = {
        token: sessionData.token,
        address: sessionData.address,
        expiresAt: sessionData.expires_at,
        sandboxId
      };
      setSession(entry);
      return entry;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg);
      return null;
    } finally {
      setIsAuthenticating(false);
    }
  }, [baseUrl, sandboxId, signMessageAsync]);
  const logout = useCallback2(() => {
    removeSession(sandboxId);
  }, [sandboxId]);
  return {
    session,
    isAuthenticated: session !== null,
    isAuthenticating,
    error,
    authenticate,
    logout
  };
}

// src/hooks/useAuthenticatedFetch.ts
function useAuthenticatedFetch({ sandboxId, apiUrl }) {
  const { authenticate } = useSessionAuth({ sandboxId, apiUrl });
  const authFetch = useCallback3(
    async (url, init) => {
      let session = getSession(sandboxId);
      if (!session) {
        session = await authenticate();
        if (!session) {
          throw new Error("Authentication required");
        }
      }
      const headers = new Headers(init?.headers);
      headers.set("Authorization", `Bearer ${session.token}`);
      const res = await fetch(url, { ...init, headers });
      if (res.status === 401) {
        session = await authenticate();
        if (!session) {
          throw new Error("Re-authentication failed");
        }
        const retryHeaders = new Headers(init?.headers);
        retryHeaders.set("Authorization", `Bearer ${session.token}`);
        return fetch(url, { ...init, headers: retryHeaders });
      }
      return res;
    },
    [sandboxId, authenticate]
  );
  return { authFetch };
}

// src/hooks/useProvisionProgress.ts
import { useCallback as useCallback4, useEffect as useEffect2, useRef, useState as useState4 } from "react";
var PHASE_LABELS = {
  queued: "Queued",
  image_pull: "Pulling image",
  container_create: "Creating container",
  container_start: "Starting container",
  health_check: "Health check",
  ready: "Ready",
  failed: "Failed"
};
function getPhaseLabel(phase) {
  return PHASE_LABELS[phase] ?? phase;
}
function isTerminalPhase(phase) {
  return phase === "ready" || phase === "failed";
}
var POLL_INTERVAL = 2e3;
function useProvisionProgress({
  callId,
  apiUrl,
  enabled = true
}) {
  const [status, setStatus] = useState4(null);
  const [error, setError] = useState4(null);
  const [isPolling, setIsPolling] = useState4(false);
  const intervalRef = useRef(null);
  const baseUrl = apiUrl ?? getEnvVar("VITE_OPERATOR_API_URL") ?? "http://localhost:9090";
  const fetchProgress = useCallback4(async () => {
    if (callId == null) return;
    try {
      const res = await fetch(`${baseUrl}/api/provisions/${callId}`);
      if (res.status === 404) {
        return;
      }
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setStatus(data);
      setError(null);
      if (isTerminalPhase(data.phase) && intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setIsPolling(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch provision status");
    }
  }, [callId, baseUrl]);
  useEffect2(() => {
    if (!enabled || callId == null) return;
    setIsPolling(true);
    fetchProgress();
    intervalRef.current = setInterval(fetchProgress, POLL_INTERVAL);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setIsPolling(false);
    };
  }, [enabled, callId, fetchProgress]);
  return {
    status,
    error,
    isPolling,
    phase: status?.phase ?? null,
    progressPct: status?.progress_pct ?? 0,
    sandboxId: status?.sandbox_id ?? null,
    sidecarUrl: status?.sidecar_url ?? null,
    message: status?.message ?? null,
    isReady: status?.phase === "ready",
    isFailed: status?.phase === "failed"
  };
}

// src/hooks/useSidecarAuth.ts
import { useState as useState5, useCallback as useCallback5, useEffect as useEffect3, useRef as useRef2 } from "react";
function storageKey(resourceId, apiUrl) {
  return `sidecar_session_${resourceId}__${apiUrl}`;
}
function loadSession(resourceId, apiUrl) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey(resourceId, apiUrl));
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (data.expiresAt * 1e3 - Date.now() < 6e4) {
      localStorage.removeItem(storageKey(resourceId, apiUrl));
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
function saveSession(resourceId, apiUrl, token, expiresAt) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(storageKey(resourceId, apiUrl), JSON.stringify({ token, expiresAt }));
  } catch {
  }
}
function clearSession(resourceId, apiUrl) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(storageKey(resourceId, apiUrl));
}
function useSidecarAuth({ resourceId, apiUrl, signMessage }) {
  const cached = loadSession(resourceId, apiUrl);
  const [token, setToken] = useState5(cached?.token ?? null);
  const [expiresAt, setExpiresAt] = useState5(cached?.expiresAt ?? 0);
  const [isAuthenticating, setIsAuthenticating] = useState5(false);
  const [error, setError] = useState5(null);
  const refreshTimerRef = useRef2();
  const clearCachedToken = useCallback5(() => {
    setToken(null);
    setExpiresAt(0);
    clearSession(resourceId, apiUrl);
  }, [resourceId, apiUrl]);
  const authenticate = useCallback5(async () => {
    if (!apiUrl) return null;
    setIsAuthenticating(true);
    setError(null);
    try {
      const challengeRes = await fetch(`${apiUrl}/api/auth/challenge`, {
        method: "POST"
      });
      if (!challengeRes.ok) {
        throw new Error(`Challenge failed: ${challengeRes.status}`);
      }
      const { nonce, message } = await challengeRes.json();
      const signature = await signMessage(message);
      const sessionRes = await fetch(`${apiUrl}/api/auth/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nonce, signature })
      });
      if (!sessionRes.ok) {
        const text = await sessionRes.text();
        throw new Error(text || `Session exchange failed: ${sessionRes.status}`);
      }
      const { token: newToken, expires_at } = await sessionRes.json();
      setToken(newToken);
      setExpiresAt(expires_at);
      saveSession(resourceId, apiUrl, newToken, expires_at);
      return newToken;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
      clearCachedToken();
      return null;
    } finally {
      setIsAuthenticating(false);
    }
  }, [resourceId, apiUrl, signMessage, clearCachedToken]);
  useEffect3(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    if (!token || !expiresAt) return;
    const msUntilRefresh = (expiresAt - 300) * 1e3 - Date.now();
    if (msUntilRefresh <= 0) {
      clearCachedToken();
      return;
    }
    refreshTimerRef.current = setTimeout(() => {
      authenticate().catch(() => {
        clearCachedToken();
      });
    }, msUntilRefresh);
    return () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    };
  }, [token, expiresAt, authenticate, clearCachedToken]);
  return {
    token,
    isAuthenticated: token !== null,
    isAuthenticating,
    authenticate,
    clearCachedToken,
    error
  };
}

// src/hooks/useWagmiSidecarAuth.ts
import { useSignMessage as useSignMessage2 } from "wagmi";
function useWagmiSidecarAuth(resourceId, apiUrl) {
  const { signMessageAsync } = useSignMessage2();
  return useSidecarAuth({
    resourceId,
    apiUrl,
    signMessage: (msg) => signMessageAsync({ message: msg })
  });
}

// src/hooks/useWalletEthBalance.ts
import { useEffect as useEffect4, useState as useState6 } from "react";
var WEI_PER_ETH = 1000000000000000000n;
var DISPLAY_SCALE = 1000n;
function formatEthBalance(wei) {
  const whole = wei / WEI_PER_ETH;
  const fraction = wei % WEI_PER_ETH * DISPLAY_SCALE / WEI_PER_ETH;
  return `${whole.toString()}.${fraction.toString().padStart(3, "0")}`;
}
function useWalletEthBalance({
  address,
  refreshKey,
  readBalance,
  pollMs = 15e3,
  onError
}) {
  const [balance, setBalance] = useState6(null);
  const [hasError, setHasError] = useState6(false);
  useEffect4(() => {
    if (!address) {
      setBalance(null);
      setHasError(false);
      return;
    }
    let cancelled = false;
    const fetchBalance = () => {
      readBalance(address).then((wei) => {
        if (cancelled) return;
        setBalance(formatEthBalance(wei));
        setHasError(false);
      }).catch((error) => {
        if (cancelled) return;
        setHasError(true);
        onError?.(error);
      });
    };
    fetchBalance();
    const interval = setInterval(fetchBalance, pollMs);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [address, refreshKey, readBalance, pollMs, onError]);
  return { balance, hasError };
}
export {
  BlueprintHostHero,
  BlueprintHostPanel,
  DEFAULT_THEME,
  addTx,
  allTangleChains,
  bpThemeTokens,
  buildCanonicalBlueprintSlug,
  canPublisherClaimSlug,
  clearTxs,
  cn,
  configureNetworks,
  createTangleLocalChain,
  createTangleTransports,
  defaultConnectKitOptions,
  deriveBlueprintRequestedSlug,
  deserializeWithBigInt,
  discoverOperatorsWithClient,
  encodeJobArgs,
  formatCost,
  gcSessions,
  getAddresses,
  getAllBlueprints,
  getBlueprint,
  getBlueprintExperienceTierLabel,
  getBlueprintJobs,
  getBlueprintPath,
  getBlueprintPublisherVerificationLabel,
  getBlueprintServicePath,
  getBlueprintSlugPolicyLabel,
  getBlueprintSurfaceLabel,
  getExternalAppTrustLabel,
  getInfra,
  getJobById,
  getNetworks,
  getPhaseLabel,
  getPublicClient,
  getSession,
  getTangleWalletChains,
  infraStore,
  isTerminalPhase,
  isTrustedExternalAppHost,
  isVerifiedBlueprintPublisher,
  kTheme,
  mainnet,
  pendingCount,
  persistedAtom,
  publicClient,
  publicClientStore,
  registerBlueprint,
  removeSession,
  resolveBlueprintAppView,
  resolveOperatorRpc,
  resolveRpcUrl,
  rpcUrl,
  sanitizeBlueprintSlugPart,
  sanitizeSelectedChainId,
  selectedChainIdStore,
  serializeWithBigInt,
  sessionMapStore,
  setSession,
  solvePoW,
  tangleJobsAbi,
  tangleLocal,
  tangleMainnet,
  tangleOperatorsAbi,
  tangleServicesAbi,
  tangleTestnet,
  tangleWalletChains,
  themeIsDark,
  themeStore,
  toBlueprintAppEntry,
  toggleTheme,
  txListStore,
  updateInfra,
  updateTx,
  useAuthenticatedFetch,
  useJobForm,
  useJobPrice,
  useJobPrices,
  useOperators,
  useProvisionProgress,
  useQuotes,
  useServiceValidation,
  useSessionAuth,
  useSidecarAuth,
  useSubmitJob,
  useThemeValue,
  useWagmiSidecarAuth,
  useWalletEthBalance
};
//# sourceMappingURL=index.js.map