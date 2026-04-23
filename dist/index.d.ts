import { ClassValue } from 'clsx';
import * as viem from 'viem';
import { Chain, Address, PublicClient } from 'viem';
export { bpThemeTokens } from './preset.js';
import * as nanostores from 'nanostores';
import { WritableAtom } from 'nanostores';
import * as node_modules_viem__types_actions_siwe_verifySiweMessage from 'node_modules/viem/_types/actions/siwe/verifySiweMessage';
import * as node_modules_viem__types_utils_ccip from 'node_modules/viem/_types/utils/ccip';
import { J as JobDefinition } from './registry-JhwB9BPD.js';
export { A as AbiContextParam, B as BlueprintDefinition, a as JobCategory, b as JobFieldDef, g as getAllBlueprints, c as getBlueprint, d as getBlueprintJobs, e as getJobById, r as registerBlueprint } from './registry-JhwB9BPD.js';
export { BlueprintAppEntry, BlueprintAppModuleBinding, BlueprintAppResolvedView, BlueprintAppVisibility, BlueprintExperienceTier, BlueprintExternalAppConfig, BlueprintExternalAppMode, BlueprintExternalAppTrust, BlueprintPermissionDescriptor, BlueprintPermissionScope, BlueprintPublisher, BlueprintPublisherVerification, BlueprintResourceModel, BlueprintResourceRoute, BlueprintSlugPolicy, BlueprintUiManifest, BlueprintUiSurface, buildCanonicalBlueprintSlug, canPublisherClaimSlug, deriveBlueprintRequestedSlug, getBlueprintExperienceTierLabel, getBlueprintPath, getBlueprintPublisherVerificationLabel, getBlueprintServicePath, getBlueprintSlugPolicyLabel, getBlueprintSurfaceLabel, getExternalAppTrustLabel, isTrustedExternalAppHost, isVerifiedBlueprintPublisher, resolveBlueprintAppView, sanitizeBlueprintSlugPart, toBlueprintAppEntry } from './host.js';
export { B as BlueprintHostHero, a as BlueprintHostHeroProps, b as BlueprintHostPanel, c as BlueprintHostPanelProps } from './BlueprintHostPanel-6iVEh-f1.js';
export { mainnet } from 'viem/chains';
import 'react/jsx-runtime';
import 'react';
import 'class-variance-authority/types';
import 'class-variance-authority';

declare function cn(...inputs: ClassValue[]): string;

/** Rewrite operator RPC hostname for browser reachability. */
declare function resolveOperatorRpc(raw: string): string;

declare function getTangleWalletChains(localChain?: Chain): readonly [Chain, ...Chain[]];
declare const tangleWalletChains: readonly [Chain, ...Chain[]];
declare function createTangleTransports(localChain?: Pick<Chain, 'id' | 'rpcUrls'>): {
    [localChain.id]: viem.HttpTransport<undefined, false>;
    3799: viem.HttpTransport<undefined, false>;
    5845: viem.HttpTransport<undefined, false>;
    1: viem.HttpTransport<undefined, false>;
};
declare const defaultConnectKitOptions: {
    readonly hideBalance: false;
    readonly hideTooltips: false;
    readonly hideQuestionMarkCTA: true;
    readonly overlayBlur: 4;
};

/**
 * JSON serializer that handles bigint values (converts to `{__bigint: "123"}`).
 * Needed because TrackedTx.blockNumber and gasUsed are bigints.
 */
declare function serializeWithBigInt(value: unknown): string;
/** Deserialize JSON produced by `serializeWithBigInt`. */
declare function deserializeWithBigInt<T>(raw: string): T;
interface PersistedAtomOpts<T> {
    /** localStorage key */
    key: string;
    /** Default value when nothing is stored */
    initial: T;
    /** Custom serializer (defaults to JSON.stringify) */
    serialize?: (value: T) => string;
    /** Custom deserializer (defaults to JSON.parse) */
    deserialize?: (raw: string) => T;
}
/**
 * A nanostores atom backed by localStorage.
 * Restores on init, persists on every `.set()`.
 * SSR-safe: falls back to `initial` when `window` is unavailable.
 */
declare function persistedAtom<T>(opts: PersistedAtomOpts<T>): WritableAtom<T>;

interface SessionEntry {
    token: string;
    address: string;
    expiresAt: number;
    sandboxId: string;
}
/**
 * Persisted session tokens keyed by sandbox ID.
 * Auto-cleaned on read if expired.
 */
declare const sessionMapStore: nanostores.WritableAtom<Record<string, SessionEntry>>;
/** Active session for a given sandbox. */
declare function getSession(sandboxId: string): SessionEntry | null;
declare function setSession(entry: SessionEntry): void;
declare function removeSession(sandboxId: string): void;
/** Clean up all expired sessions. */
declare function gcSessions(): void;

interface TrackedTx {
    hash: `0x${string}`;
    label: string;
    status: 'pending' | 'confirmed' | 'failed';
    timestamp: number;
    chainId: number;
    blockNumber?: bigint;
    gasUsed?: bigint;
}
declare const txListStore: nanostores.WritableAtom<TrackedTx[]>;
declare const pendingCount: nanostores.ReadableAtom<number>;
declare function addTx(hash: `0x${string}`, label: string, chainId: number): void;
declare function updateTx(hash: `0x${string}`, update: Partial<Pick<TrackedTx, 'status' | 'blockNumber' | 'gasUsed'>>): void;
declare function clearTxs(): void;

interface OperatorInfo {
    address: string;
    rpcAddress: string;
}
interface InfraConfig {
    blueprintId: string;
    serviceId: string;
    /** Whether the user has validated the service on-chain */
    serviceValidated: boolean;
    /** Cached service info from last validation */
    serviceInfo?: {
        active: boolean;
        operatorCount: number;
        owner: string;
        blueprintId: string;
        permitted: boolean;
        /** Operators with RPC endpoints (cached for RFQ) */
        operators?: OperatorInfo[];
    };
}
declare const infraStore: nanostores.WritableAtom<InfraConfig>;
declare function updateInfra(update: Partial<InfraConfig>): void;
declare function getInfra(): InfraConfig;

type Theme = 'dark' | 'light';
declare const kTheme = "bp_theme";
declare const DEFAULT_THEME = "dark";
declare const themeStore: nanostores.PreinitializedWritableAtom<Theme> & object;
declare function themeIsDark(): boolean;
declare function toggleTheme(): void;

/**
 * Tangle core precompile ABIs — shared across all blueprints.
 * Blueprint-specific ABIs (agentSandboxBlueprintAbi, tradingBlueprintAbi, etc.)
 * stay in each consuming app.
 */
declare const tangleJobsAbi: readonly [{
    readonly type: "function";
    readonly name: "submitJob";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
    }, {
        readonly name: "job";
        readonly type: "uint8";
    }, {
        readonly name: "args";
        readonly type: "bytes";
    }];
    readonly outputs: readonly [{
        readonly name: "callId";
        readonly type: "uint64";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "event";
    readonly name: "JobCalled";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "job";
        readonly type: "uint8";
        readonly indexed: true;
    }, {
        readonly name: "callId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "caller";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "args";
        readonly type: "bytes";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "JobResultReceived";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "job";
        readonly type: "uint8";
        readonly indexed: true;
    }, {
        readonly name: "callId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "outputs";
        readonly type: "bytes";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "JobSubmitted";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "callId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "jobIndex";
        readonly type: "uint8";
        readonly indexed: false;
    }, {
        readonly name: "caller";
        readonly type: "address";
        readonly indexed: false;
    }, {
        readonly name: "inputs";
        readonly type: "bytes";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "JobCompleted";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "callId";
        readonly type: "uint64";
        readonly indexed: true;
    }];
}, {
    readonly type: "event";
    readonly name: "JobResultSubmitted";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "callId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "output";
        readonly type: "bytes";
        readonly indexed: false;
    }];
}];
declare const tangleServicesAbi: readonly [{
    readonly type: "function";
    readonly name: "requestService";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
    }, {
        readonly name: "operators";
        readonly type: "address[]";
    }, {
        readonly name: "config";
        readonly type: "bytes";
    }, {
        readonly name: "permittedCallers";
        readonly type: "address[]";
    }, {
        readonly name: "ttl";
        readonly type: "uint64";
    }, {
        readonly name: "paymentToken";
        readonly type: "address";
    }, {
        readonly name: "paymentAmount";
        readonly type: "uint256";
    }];
    readonly outputs: readonly [{
        readonly name: "requestId";
        readonly type: "uint64";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "createServiceFromQuotes";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
    }, {
        readonly name: "quotes";
        readonly type: "tuple[]";
        readonly components: readonly [{
            readonly name: "details";
            readonly type: "tuple";
            readonly components: readonly [{
                readonly name: "blueprintId";
                readonly type: "uint64";
            }, {
                readonly name: "ttlBlocks";
                readonly type: "uint64";
            }, {
                readonly name: "totalCost";
                readonly type: "uint256";
            }, {
                readonly name: "timestamp";
                readonly type: "uint64";
            }, {
                readonly name: "expiry";
                readonly type: "uint64";
            }, {
                readonly name: "confidentiality";
                readonly type: "uint8";
            }, {
                readonly name: "securityCommitments";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "asset";
                    readonly type: "tuple";
                    readonly components: readonly [{
                        readonly name: "kind";
                        readonly type: "uint8";
                    }, {
                        readonly name: "token";
                        readonly type: "address";
                    }];
                }, {
                    readonly name: "exposureBps";
                    readonly type: "uint16";
                }];
            }, {
                readonly name: "resourceCommitments";
                readonly type: "tuple[]";
                readonly components: readonly [{
                    readonly name: "kind";
                    readonly type: "uint8";
                }, {
                    readonly name: "count";
                    readonly type: "uint64";
                }];
            }];
        }, {
            readonly name: "signature";
            readonly type: "bytes";
        }, {
            readonly name: "operator";
            readonly type: "address";
        }];
    }, {
        readonly name: "config";
        readonly type: "bytes";
    }, {
        readonly name: "permittedCallers";
        readonly type: "address[]";
    }, {
        readonly name: "ttl";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
    }];
    readonly stateMutability: "payable";
}, {
    readonly type: "function";
    readonly name: "getService";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "blueprintId";
            readonly type: "uint64";
        }, {
            readonly name: "owner";
            readonly type: "address";
        }, {
            readonly name: "createdAt";
            readonly type: "uint64";
        }, {
            readonly name: "ttl";
            readonly type: "uint64";
        }, {
            readonly name: "terminatedAt";
            readonly type: "uint64";
        }, {
            readonly name: "lastPaymentAt";
            readonly type: "uint64";
        }, {
            readonly name: "operatorCount";
            readonly type: "uint32";
        }, {
            readonly name: "minOperators";
            readonly type: "uint32";
        }, {
            readonly name: "maxOperators";
            readonly type: "uint32";
        }, {
            readonly name: "membership";
            readonly type: "uint8";
        }, {
            readonly name: "pricing";
            readonly type: "uint8";
        }, {
            readonly name: "status";
            readonly type: "uint8";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isServiceActive";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getServiceOperators";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "address[]";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isPermittedCaller";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
    }, {
        readonly name: "caller";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "ServiceRequested";
    readonly inputs: readonly [{
        readonly name: "requestId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "blueprintId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "requester";
        readonly type: "address";
        readonly indexed: true;
    }];
}, {
    readonly type: "event";
    readonly name: "ServiceActivated";
    readonly inputs: readonly [{
        readonly name: "serviceId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "requestId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "blueprintId";
        readonly type: "uint64";
        readonly indexed: true;
    }];
}];
declare const tangleOperatorsAbi: readonly [{
    readonly type: "function";
    readonly name: "blueprintOperatorCount";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "isOperatorRegistered";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
    }, {
        readonly name: "operator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "";
        readonly type: "bool";
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "function";
    readonly name: "getOperatorPreferences";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
    }, {
        readonly name: "operator";
        readonly type: "address";
    }];
    readonly outputs: readonly [{
        readonly name: "preferences";
        readonly type: "tuple";
        readonly components: readonly [{
            readonly name: "ecdsaPublicKey";
            readonly type: "bytes";
        }, {
            readonly name: "rpcAddress";
            readonly type: "string";
        }];
    }];
    readonly stateMutability: "view";
}, {
    readonly type: "event";
    readonly name: "OperatorRegistered";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: true;
    }, {
        readonly name: "ecdsaPublicKey";
        readonly type: "bytes";
        readonly indexed: false;
    }, {
        readonly name: "rpcAddress";
        readonly type: "string";
        readonly indexed: false;
    }];
}, {
    readonly type: "event";
    readonly name: "OperatorUnregistered";
    readonly inputs: readonly [{
        readonly name: "blueprintId";
        readonly type: "uint64";
        readonly indexed: true;
    }, {
        readonly name: "operator";
        readonly type: "address";
        readonly indexed: true;
    }];
}];

/**
 * Resolve RPC URL for the current environment.
 * Handles local dev (hostname swap), Vite dev proxy, and remote access.
 */
declare function resolveRpcUrl(envUrl?: string): string;
declare const rpcUrl: string;
interface LocalChainOptions {
    chainId?: number;
    rpcUrl?: string;
}
declare function createTangleLocalChain(options?: LocalChainOptions): {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: number;
    name: "Tangle Local";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly [string];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
};
declare const tangleLocal: {
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: number;
    name: "Tangle Local";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly [string];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
};
declare const tangleTestnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Tangle Explorer";
            readonly url: "https://testnet-explorer.tangle.tools";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 3799;
    name: "Tangle Testnet";
    nativeCurrency: {
        readonly name: "Tangle";
        readonly symbol: "tTNT";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.tangle.tools"];
            readonly webSocket: readonly ["wss://testnet-rpc.tangle.tools"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
};
declare const tangleMainnet: {
    blockExplorers: {
        readonly default: {
            readonly name: "Tangle Explorer";
            readonly url: "https://explorer.tangle.tools";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 5845;
    name: "Tangle";
    nativeCurrency: {
        readonly name: "Tangle";
        readonly symbol: "TNT";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.tangle.tools"];
            readonly webSocket: readonly ["wss://rpc.tangle.tools"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
};
/** Minimum required contract addresses for Tangle core hooks. */
interface CoreAddresses {
    jobs: Address;
    services: Address;
    [key: string]: Address;
}
interface NetworkConfig<T extends CoreAddresses = CoreAddresses> {
    chain: Chain;
    rpcUrl: string;
    label: string;
    shortLabel: string;
    addresses: T;
}
/** Register networks with app-specific address shapes at startup. */
declare function configureNetworks<T extends CoreAddresses>(nets: Record<number, NetworkConfig<T>>): void;
declare function getNetworks<T extends CoreAddresses = CoreAddresses>(): Record<number, NetworkConfig<T>>;

declare const allTangleChains: readonly [{
    blockExplorers: {
        readonly default: {
            readonly name: "Explorer";
            readonly url: "";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: number;
    name: "Tangle Local";
    nativeCurrency: {
        readonly name: "Ether";
        readonly symbol: "ETH";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly [string];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "Tangle Explorer";
            readonly url: "https://testnet-explorer.tangle.tools";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 3799;
    name: "Tangle Testnet";
    nativeCurrency: {
        readonly name: "Tangle";
        readonly symbol: "tTNT";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://testnet-rpc.tangle.tools"];
            readonly webSocket: readonly ["wss://testnet-rpc.tangle.tools"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
}, {
    blockExplorers: {
        readonly default: {
            readonly name: "Tangle Explorer";
            readonly url: "https://explorer.tangle.tools";
        };
    };
    blockTime?: number | undefined | undefined;
    contracts: {
        readonly multicall3: {
            readonly address: "0xcA11bde05977b3631167028862bE2a173976CA11";
        };
    };
    ensTlds?: readonly string[] | undefined;
    id: 5845;
    name: "Tangle";
    nativeCurrency: {
        readonly name: "Tangle";
        readonly symbol: "TNT";
        readonly decimals: 18;
    };
    experimental_preconfirmationTime?: number | undefined | undefined;
    rpcUrls: {
        readonly default: {
            readonly http: readonly ["https://rpc.tangle.tools"];
            readonly webSocket: readonly ["wss://rpc.tangle.tools"];
        };
    };
    sourceId?: number | undefined | undefined;
    testnet?: boolean | undefined | undefined;
    custom?: Record<string, unknown> | undefined;
    extendSchema?: Record<string, unknown> | undefined;
    fees?: viem.ChainFees<undefined> | undefined;
    formatters?: undefined;
    prepareTransactionRequest?: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | [fn: ((args: viem.PrepareTransactionRequestParameters, options: {
        phase: "beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters";
    }) => Promise<viem.PrepareTransactionRequestParameters>) | undefined, options: {
        runAt: readonly ("beforeFillTransaction" | "beforeFillParameters" | "afterFillParameters")[];
    }] | undefined;
    serializers?: viem.ChainSerializers<undefined, viem.TransactionSerializable> | undefined;
    verifyHash?: ((client: viem.Client, parameters: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>) | undefined;
}];

declare const selectedChainIdStore: nanostores.WritableAtom<number>;
declare function sanitizeSelectedChainId(): number;
declare const publicClientStore: nanostores.PreinitializedWritableAtom<{
    account: undefined;
    batch?: {
        multicall?: boolean | viem.Prettify<viem.MulticallBatchOptions> | undefined;
    } | undefined;
    cacheTime: number;
    ccipRead?: false | {
        request?: (parameters: viem.CcipRequestParameters) => Promise<node_modules_viem__types_utils_ccip.CcipRequestReturnType>;
    } | undefined;
    chain: viem.Chain | undefined;
    dataSuffix?: viem.DataSuffix | undefined;
    experimental_blockTag?: viem.BlockTag | undefined;
    key: string;
    name: string;
    pollingInterval: number;
    request: viem.EIP1193RequestFn<viem.PublicRpcSchema>;
    transport: viem.TransportConfig<string, viem.EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    call: (parameters: viem.CallParameters<viem.Chain | undefined>) => Promise<viem.CallReturnType>;
    createAccessList: (parameters: viem.CreateAccessListParameters<viem.Chain | undefined>) => Promise<{
        accessList: viem.AccessList;
        gasUsed: bigint;
    }>;
    createBlockFilter: () => Promise<viem.CreateBlockFilterReturnType>;
    createContractEventFilter: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi> | undefined, args extends viem.MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<viem.CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
    createEventFilter: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, _EventName extends string | undefined = viem.MaybeAbiEventName<abiEvent>, _Args extends viem.MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: viem.CreateEventFilterParameters<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args> | undefined) => Promise<viem.CreateEventFilterReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args>>;
    createPendingTransactionFilter: () => Promise<viem.CreatePendingTransactionFilterReturnType>;
    estimateContractGas: <chain extends viem.Chain | undefined, const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "nonpayable" | "payable">, args extends viem.ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: viem.EstimateContractGasParameters<abi, functionName, args, chain>) => Promise<viem.EstimateContractGasReturnType>;
    estimateGas: (args: viem.EstimateGasParameters<viem.Chain | undefined>) => Promise<viem.EstimateGasReturnType>;
    fillTransaction: <chainOverride extends viem.Chain | undefined = undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.FillTransactionParameters<viem.Chain | undefined, viem.Account | undefined, chainOverride, accountOverride>) => Promise<viem.FillTransactionReturnType<viem.Chain | undefined, chainOverride>>;
    getBalance: (args: viem.GetBalanceParameters) => Promise<viem.GetBalanceReturnType>;
    getBlobBaseFee: () => Promise<viem.GetBlobBaseFeeReturnType>;
    getBlock: <includeTransactions extends boolean = false, blockTag extends viem.BlockTag = "latest">(args?: viem.GetBlockParameters<includeTransactions, blockTag> | undefined) => Promise<{
        number: blockTag extends "pending" ? null : bigint;
        nonce: blockTag extends "pending" ? null : `0x${string}`;
        hash: blockTag extends "pending" ? null : `0x${string}`;
        logsBloom: blockTag extends "pending" ? null : `0x${string}`;
        baseFeePerGas: bigint | null;
        blobGasUsed: bigint;
        difficulty: bigint;
        excessBlobGas: bigint;
        extraData: viem.Hex;
        gasLimit: bigint;
        gasUsed: bigint;
        miner: viem.Address;
        mixHash: viem.Hash;
        parentBeaconBlockRoot?: `0x${string}` | undefined;
        parentHash: viem.Hash;
        receiptsRoot: viem.Hex;
        sealFields: viem.Hex[];
        sha3Uncles: viem.Hash;
        size: bigint;
        stateRoot: viem.Hash;
        timestamp: bigint;
        totalDifficulty: bigint | null;
        transactionsRoot: viem.Hash;
        uncles: viem.Hash[];
        withdrawals?: viem.Withdrawal[] | undefined | undefined;
        withdrawalsRoot?: `0x${string}` | undefined;
        transactions: includeTransactions extends true ? ({
            type: "legacy";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            chainId?: number | undefined;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity?: undefined | undefined;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
        } | {
            type: "eip2930";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            accessList: viem.AccessList;
            authorizationList?: undefined | undefined;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
        } | {
            type: "eip1559";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            accessList: viem.AccessList;
            authorizationList?: undefined | undefined;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
        } | {
            type: "eip4844";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes: readonly viem.Hex[];
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas: bigint;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            accessList: viem.AccessList;
            authorizationList?: undefined | undefined;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
        } | {
            type: "eip7702";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            accessList: viem.AccessList;
            authorizationList: viem.SignedAuthorizationList;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
        })[] : `0x${string}`[];
    }>;
    getBlockNumber: (args?: viem.GetBlockNumberParameters | undefined) => Promise<viem.GetBlockNumberReturnType>;
    getBlockTransactionCount: (args?: viem.GetBlockTransactionCountParameters | undefined) => Promise<viem.GetBlockTransactionCountReturnType>;
    getBytecode: (args: viem.GetBytecodeParameters) => Promise<viem.GetBytecodeReturnType>;
    getChainId: () => Promise<viem.GetChainIdReturnType>;
    getCode: (args: viem.GetBytecodeParameters) => Promise<viem.GetBytecodeReturnType>;
    getContractEvents: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getEip712Domain: (args: viem.GetEip712DomainParameters) => Promise<viem.GetEip712DomainReturnType>;
    getEnsAddress: (args: viem.GetEnsAddressParameters) => Promise<viem.GetEnsAddressReturnType>;
    getEnsAvatar: (args: viem.GetEnsAvatarParameters) => Promise<viem.GetEnsAvatarReturnType>;
    getEnsName: (args: viem.GetEnsNameParameters) => Promise<viem.GetEnsNameReturnType>;
    getEnsResolver: (args: viem.GetEnsResolverParameters) => Promise<viem.GetEnsResolverReturnType>;
    getEnsText: (args: viem.GetEnsTextParameters) => Promise<viem.GetEnsTextReturnType>;
    getFeeHistory: (args: viem.GetFeeHistoryParameters) => Promise<viem.GetFeeHistoryReturnType>;
    estimateFeesPerGas: <chainOverride extends viem.Chain | undefined = undefined, type extends viem.FeeValuesType = "eip1559">(args?: viem.EstimateFeesPerGasParameters<viem.Chain | undefined, chainOverride, type> | undefined) => Promise<viem.EstimateFeesPerGasReturnType<type>>;
    getFilterChanges: <filterType extends viem.FilterType, const abi extends viem.Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetFilterChangesParameters<filterType, abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetFilterChangesReturnType<filterType, abi, eventName, strict, fromBlock, toBlock>>;
    getFilterLogs: <const abi extends viem.Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetFilterLogsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetFilterLogsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getGasPrice: () => Promise<viem.GetGasPriceReturnType>;
    getLogs: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args?: viem.GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined) => Promise<viem.GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
    getProof: (args: viem.GetProofParameters) => Promise<viem.GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <chainOverride extends viem.Chain | undefined = undefined>(args?: {
        chain: chainOverride | null;
    } | undefined) => Promise<viem.EstimateMaxPriorityFeePerGasReturnType>;
    getStorageAt: (args: viem.GetStorageAtParameters) => Promise<viem.GetStorageAtReturnType>;
    getTransaction: <blockTag extends viem.BlockTag = "latest">(args: viem.GetTransactionParameters<blockTag>) => Promise<{
        type: "legacy";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        chainId?: number | undefined;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity?: undefined | undefined;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
    } | {
        type: "eip2930";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        accessList: viem.AccessList;
        authorizationList?: undefined | undefined;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
    } | {
        type: "eip1559";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        accessList: viem.AccessList;
        authorizationList?: undefined | undefined;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
    } | {
        type: "eip4844";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes: readonly viem.Hex[];
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas: bigint;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        accessList: viem.AccessList;
        authorizationList?: undefined | undefined;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
    } | {
        type: "eip7702";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        accessList: viem.AccessList;
        authorizationList: viem.SignedAuthorizationList;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
    }>;
    getTransactionConfirmations: (args: viem.GetTransactionConfirmationsParameters<viem.Chain | undefined>) => Promise<viem.GetTransactionConfirmationsReturnType>;
    getTransactionCount: (args: viem.GetTransactionCountParameters) => Promise<viem.GetTransactionCountReturnType>;
    getTransactionReceipt: (args: viem.GetTransactionReceiptParameters) => Promise<viem.TransactionReceipt>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: viem.MulticallParameters<contracts, allowFailure>) => Promise<viem.MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const request extends viem.PrepareTransactionRequestRequest<viem.Chain | undefined, chainOverride>, chainOverride extends viem.Chain | undefined = undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.PrepareTransactionRequestParameters<viem.Chain | undefined, viem.Account | undefined, chainOverride, accountOverride, request>) => Promise<viem.UnionRequiredBy<Extract<viem.UnionOmit<viem.ExtractChainFormatterParameters<viem.DeriveChain<viem.Chain | undefined, chainOverride>, "transactionRequest", viem.TransactionRequest>, "from"> & (viem.DeriveChain<viem.Chain | undefined, chainOverride> extends infer T_1 ? T_1 extends viem.DeriveChain<viem.Chain | undefined, chainOverride> ? T_1 extends viem.Chain ? {
        chain: T_1;
    } : {
        chain?: undefined;
    } : never : never) & (viem.DeriveAccount<viem.Account | undefined, accountOverride> extends infer T_2 ? T_2 extends viem.DeriveAccount<viem.Account | undefined, accountOverride> ? T_2 extends viem.Account ? {
        account: T_2;
        from: viem.Address;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), viem.IsNever<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : viem.ExactPartial<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_8 ? T_8 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_8 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_9 ? T_9 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_9 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_10 ? T_10 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_10 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_11 ? T_11 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_11 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_12 ? T_12 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_12 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "type" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") extends infer T_13 ? T_13 extends (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "type" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") ? T_13 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_13 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T ? { [K in keyof T]: T[K]; } : never>;
    readContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "pure" | "view">, const args extends viem.ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: viem.ReadContractParameters<abi, functionName, args>) => Promise<viem.ReadContractReturnType<abi, functionName, args>>;
    sendRawTransaction: (args: viem.SendRawTransactionParameters) => Promise<viem.SendRawTransactionReturnType>;
    sendRawTransactionSync: (args: viem.SendRawTransactionSyncParameters) => Promise<viem.TransactionReceipt>;
    simulate: <const calls extends readonly unknown[]>(args: viem.SimulateBlocksParameters<calls>) => Promise<viem.SimulateBlocksReturnType<calls>>;
    simulateBlocks: <const calls extends readonly unknown[]>(args: viem.SimulateBlocksParameters<calls>) => Promise<viem.SimulateBlocksReturnType<calls>>;
    simulateCalls: <const calls extends readonly unknown[]>(args: viem.SimulateCallsParameters<calls>) => Promise<viem.SimulateCallsReturnType<calls>>;
    simulateContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "payable" | "nonpayable">, const args_1 extends viem.ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>, chainOverride extends viem.Chain | undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.SimulateContractParameters<abi, functionName, args_1, viem.Chain | undefined, chainOverride, accountOverride>) => Promise<viem.SimulateContractReturnType<abi, functionName, args_1, viem.Chain | undefined, viem.Account | undefined, chainOverride, accountOverride>>;
    verifyHash: (args: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>;
    verifyMessage: (args: viem.VerifyMessageActionParameters) => Promise<viem.VerifyMessageActionReturnType>;
    verifySiweMessage: (args: node_modules_viem__types_actions_siwe_verifySiweMessage.VerifySiweMessageParameters) => Promise<node_modules_viem__types_actions_siwe_verifySiweMessage.VerifySiweMessageReturnType>;
    verifyTypedData: (args: viem.VerifyTypedDataActionParameters) => Promise<viem.VerifyTypedDataActionReturnType>;
    uninstallFilter: (args: viem.UninstallFilterParameters) => Promise<viem.UninstallFilterReturnType>;
    waitForTransactionReceipt: (args: viem.WaitForTransactionReceiptParameters<viem.Chain | undefined>) => Promise<viem.TransactionReceipt>;
    watchBlockNumber: (args: viem.WatchBlockNumberParameters) => viem.WatchBlockNumberReturnType;
    watchBlocks: <includeTransactions extends boolean = false, blockTag extends viem.BlockTag = "latest">(args: viem.WatchBlocksParameters<viem.Transport, viem.Chain | undefined, includeTransactions, blockTag>) => viem.WatchBlocksReturnType;
    watchContractEvent: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi>, strict extends boolean | undefined = undefined>(args: viem.WatchContractEventParameters<abi, eventName, strict, viem.Transport>) => viem.WatchContractEventReturnType;
    watchEvent: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined>(args: viem.WatchEventParameters<abiEvent, abiEvents, strict, viem.Transport>) => viem.WatchEventReturnType;
    watchPendingTransactions: (args: viem.WatchPendingTransactionsParameters<viem.Transport>) => viem.WatchPendingTransactionsReturnType;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        dataSuffix?: undefined;
        experimental_blockTag?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & viem.ExactPartial<Pick<viem.PublicActions<viem.Transport, viem.Chain | undefined, undefined>, "prepareTransactionRequest" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<viem.WalletActions<viem.Chain | undefined, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: viem.Client<viem.Transport, viem.Chain | undefined, undefined, viem.PublicRpcSchema, viem.PublicActions<viem.Transport, viem.Chain | undefined>>) => client) => viem.Client<viem.Transport, viem.Chain | undefined, undefined, viem.PublicRpcSchema, { [K in keyof client]: client[K]; } & viem.PublicActions<viem.Transport, viem.Chain | undefined>>;
}> & object;
declare function getPublicClient(): PublicClient;
declare const publicClient: {
    account: undefined;
    batch?: {
        multicall?: boolean | viem.Prettify<viem.MulticallBatchOptions> | undefined;
    } | undefined;
    cacheTime: number;
    ccipRead?: false | {
        request?: (parameters: viem.CcipRequestParameters) => Promise<node_modules_viem__types_utils_ccip.CcipRequestReturnType>;
    } | undefined;
    chain: viem.Chain | undefined;
    dataSuffix?: viem.DataSuffix | undefined;
    experimental_blockTag?: viem.BlockTag | undefined;
    key: string;
    name: string;
    pollingInterval: number;
    request: viem.EIP1193RequestFn<viem.PublicRpcSchema>;
    transport: viem.TransportConfig<string, viem.EIP1193RequestFn> & Record<string, any>;
    type: string;
    uid: string;
    call: (parameters: viem.CallParameters<viem.Chain | undefined>) => Promise<viem.CallReturnType>;
    createAccessList: (parameters: viem.CreateAccessListParameters<viem.Chain | undefined>) => Promise<{
        accessList: viem.AccessList;
        gasUsed: bigint;
    }>;
    createBlockFilter: () => Promise<viem.CreateBlockFilterReturnType>;
    createContractEventFilter: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi> | undefined, args extends viem.MaybeExtractEventArgsFromAbi<abi, eventName> | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.CreateContractEventFilterParameters<abi, eventName, args, strict, fromBlock, toBlock>) => Promise<viem.CreateContractEventFilterReturnType<abi, eventName, args, strict, fromBlock, toBlock>>;
    createEventFilter: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, _EventName extends string | undefined = viem.MaybeAbiEventName<abiEvent>, _Args extends viem.MaybeExtractEventArgsFromAbi<abiEvents, _EventName> | undefined = undefined>(args?: viem.CreateEventFilterParameters<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args> | undefined) => Promise<viem.CreateEventFilterReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock, _EventName, _Args>>;
    createPendingTransactionFilter: () => Promise<viem.CreatePendingTransactionFilterReturnType>;
    estimateContractGas: <chain extends viem.Chain | undefined, const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "nonpayable" | "payable">, args extends viem.ContractFunctionArgs<abi, "nonpayable" | "payable", functionName>>(args: viem.EstimateContractGasParameters<abi, functionName, args, chain>) => Promise<viem.EstimateContractGasReturnType>;
    estimateGas: (args: viem.EstimateGasParameters<viem.Chain | undefined>) => Promise<viem.EstimateGasReturnType>;
    fillTransaction: <chainOverride extends viem.Chain | undefined = undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.FillTransactionParameters<viem.Chain | undefined, viem.Account | undefined, chainOverride, accountOverride>) => Promise<viem.FillTransactionReturnType<viem.Chain | undefined, chainOverride>>;
    getBalance: (args: viem.GetBalanceParameters) => Promise<viem.GetBalanceReturnType>;
    getBlobBaseFee: () => Promise<viem.GetBlobBaseFeeReturnType>;
    getBlock: <includeTransactions extends boolean = false, blockTag extends viem.BlockTag = "latest">(args?: viem.GetBlockParameters<includeTransactions, blockTag> | undefined) => Promise<{
        number: blockTag extends "pending" ? null : bigint;
        nonce: blockTag extends "pending" ? null : `0x${string}`;
        hash: blockTag extends "pending" ? null : `0x${string}`;
        logsBloom: blockTag extends "pending" ? null : `0x${string}`;
        baseFeePerGas: bigint | null;
        blobGasUsed: bigint;
        difficulty: bigint;
        excessBlobGas: bigint;
        extraData: viem.Hex;
        gasLimit: bigint;
        gasUsed: bigint;
        miner: viem.Address;
        mixHash: viem.Hash;
        parentBeaconBlockRoot?: `0x${string}` | undefined;
        parentHash: viem.Hash;
        receiptsRoot: viem.Hex;
        sealFields: viem.Hex[];
        sha3Uncles: viem.Hash;
        size: bigint;
        stateRoot: viem.Hash;
        timestamp: bigint;
        totalDifficulty: bigint | null;
        transactionsRoot: viem.Hash;
        uncles: viem.Hash[];
        withdrawals?: viem.Withdrawal[] | undefined | undefined;
        withdrawalsRoot?: `0x${string}` | undefined;
        transactions: includeTransactions extends true ? ({
            type: "legacy";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            accessList?: undefined | undefined;
            authorizationList?: undefined | undefined;
            chainId?: number | undefined;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity?: undefined | undefined;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
        } | {
            type: "eip2930";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice: bigint;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas?: undefined | undefined;
            maxPriorityFeePerGas?: undefined | undefined;
            accessList: viem.AccessList;
            authorizationList?: undefined | undefined;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
        } | {
            type: "eip1559";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            accessList: viem.AccessList;
            authorizationList?: undefined | undefined;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
        } | {
            type: "eip4844";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes: readonly viem.Hex[];
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas: bigint;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            accessList: viem.AccessList;
            authorizationList?: undefined | undefined;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
        } | {
            type: "eip7702";
            to: viem.Address | null;
            from: viem.Address;
            gas: bigint;
            nonce: number;
            value: bigint;
            blobVersionedHashes?: undefined | undefined;
            gasPrice?: undefined | undefined;
            maxFeePerBlobGas?: undefined | undefined;
            maxFeePerGas: bigint;
            maxPriorityFeePerGas: bigint;
            accessList: viem.AccessList;
            authorizationList: viem.SignedAuthorizationList;
            chainId: number;
            r: viem.Hex;
            s: viem.Hex;
            v: bigint;
            yParity: number;
            hash: viem.Hash;
            input: viem.Hex;
            typeHex: viem.Hex | null;
            blockNumber: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : bigint : never : never;
            blockHash: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : `0x${string}` : never : never;
            transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
        })[] : `0x${string}`[];
    }>;
    getBlockNumber: (args?: viem.GetBlockNumberParameters | undefined) => Promise<viem.GetBlockNumberReturnType>;
    getBlockTransactionCount: (args?: viem.GetBlockTransactionCountParameters | undefined) => Promise<viem.GetBlockTransactionCountReturnType>;
    getBytecode: (args: viem.GetBytecodeParameters) => Promise<viem.GetBytecodeReturnType>;
    getChainId: () => Promise<viem.GetChainIdReturnType>;
    getCode: (args: viem.GetBytecodeParameters) => Promise<viem.GetBytecodeReturnType>;
    getContractEvents: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi> | undefined = undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetContractEventsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetContractEventsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getEip712Domain: (args: viem.GetEip712DomainParameters) => Promise<viem.GetEip712DomainReturnType>;
    getEnsAddress: (args: viem.GetEnsAddressParameters) => Promise<viem.GetEnsAddressReturnType>;
    getEnsAvatar: (args: viem.GetEnsAvatarParameters) => Promise<viem.GetEnsAvatarReturnType>;
    getEnsName: (args: viem.GetEnsNameParameters) => Promise<viem.GetEnsNameReturnType>;
    getEnsResolver: (args: viem.GetEnsResolverParameters) => Promise<viem.GetEnsResolverReturnType>;
    getEnsText: (args: viem.GetEnsTextParameters) => Promise<viem.GetEnsTextReturnType>;
    getFeeHistory: (args: viem.GetFeeHistoryParameters) => Promise<viem.GetFeeHistoryReturnType>;
    estimateFeesPerGas: <chainOverride extends viem.Chain | undefined = undefined, type extends viem.FeeValuesType = "eip1559">(args?: viem.EstimateFeesPerGasParameters<viem.Chain | undefined, chainOverride, type> | undefined) => Promise<viem.EstimateFeesPerGasReturnType<type>>;
    getFilterChanges: <filterType extends viem.FilterType, const abi extends viem.Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetFilterChangesParameters<filterType, abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetFilterChangesReturnType<filterType, abi, eventName, strict, fromBlock, toBlock>>;
    getFilterLogs: <const abi extends viem.Abi | readonly unknown[] | undefined, eventName extends string | undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args: viem.GetFilterLogsParameters<abi, eventName, strict, fromBlock, toBlock>) => Promise<viem.GetFilterLogsReturnType<abi, eventName, strict, fromBlock, toBlock>>;
    getGasPrice: () => Promise<viem.GetGasPriceReturnType>;
    getLogs: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined, fromBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined, toBlock extends viem.BlockNumber | viem.BlockTag | undefined = undefined>(args?: viem.GetLogsParameters<abiEvent, abiEvents, strict, fromBlock, toBlock> | undefined) => Promise<viem.GetLogsReturnType<abiEvent, abiEvents, strict, fromBlock, toBlock>>;
    getProof: (args: viem.GetProofParameters) => Promise<viem.GetProofReturnType>;
    estimateMaxPriorityFeePerGas: <chainOverride extends viem.Chain | undefined = undefined>(args?: {
        chain: chainOverride | null;
    } | undefined) => Promise<viem.EstimateMaxPriorityFeePerGasReturnType>;
    getStorageAt: (args: viem.GetStorageAtParameters) => Promise<viem.GetStorageAtReturnType>;
    getTransaction: <blockTag extends viem.BlockTag = "latest">(args: viem.GetTransactionParameters<blockTag>) => Promise<{
        type: "legacy";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        chainId?: number | undefined;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity?: undefined | undefined;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T ? T extends (blockTag extends "pending" ? true : false) ? T extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_1 ? T_1 extends (blockTag extends "pending" ? true : false) ? T_1 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_2 ? T_2 extends (blockTag extends "pending" ? true : false) ? T_2 extends true ? null : number : never : never;
    } | {
        type: "eip2930";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice: bigint;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
        accessList: viem.AccessList;
        authorizationList?: undefined | undefined;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_3 ? T_3 extends (blockTag extends "pending" ? true : false) ? T_3 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_4 ? T_4 extends (blockTag extends "pending" ? true : false) ? T_4 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_5 ? T_5 extends (blockTag extends "pending" ? true : false) ? T_5 extends true ? null : number : never : never;
    } | {
        type: "eip1559";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        accessList: viem.AccessList;
        authorizationList?: undefined | undefined;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_6 ? T_6 extends (blockTag extends "pending" ? true : false) ? T_6 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_7 ? T_7 extends (blockTag extends "pending" ? true : false) ? T_7 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_8 ? T_8 extends (blockTag extends "pending" ? true : false) ? T_8 extends true ? null : number : never : never;
    } | {
        type: "eip4844";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes: readonly viem.Hex[];
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas: bigint;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        accessList: viem.AccessList;
        authorizationList?: undefined | undefined;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_9 ? T_9 extends (blockTag extends "pending" ? true : false) ? T_9 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_10 ? T_10 extends (blockTag extends "pending" ? true : false) ? T_10 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_11 ? T_11 extends (blockTag extends "pending" ? true : false) ? T_11 extends true ? null : number : never : never;
    } | {
        type: "eip7702";
        to: viem.Address | null;
        from: viem.Address;
        gas: bigint;
        nonce: number;
        value: bigint;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas: bigint;
        maxPriorityFeePerGas: bigint;
        accessList: viem.AccessList;
        authorizationList: viem.SignedAuthorizationList;
        chainId: number;
        r: viem.Hex;
        s: viem.Hex;
        v: bigint;
        yParity: number;
        hash: viem.Hash;
        input: viem.Hex;
        typeHex: viem.Hex | null;
        blockNumber: (blockTag extends "pending" ? true : false) extends infer T_12 ? T_12 extends (blockTag extends "pending" ? true : false) ? T_12 extends true ? null : bigint : never : never;
        blockHash: (blockTag extends "pending" ? true : false) extends infer T_13 ? T_13 extends (blockTag extends "pending" ? true : false) ? T_13 extends true ? null : `0x${string}` : never : never;
        transactionIndex: (blockTag extends "pending" ? true : false) extends infer T_14 ? T_14 extends (blockTag extends "pending" ? true : false) ? T_14 extends true ? null : number : never : never;
    }>;
    getTransactionConfirmations: (args: viem.GetTransactionConfirmationsParameters<viem.Chain | undefined>) => Promise<viem.GetTransactionConfirmationsReturnType>;
    getTransactionCount: (args: viem.GetTransactionCountParameters) => Promise<viem.GetTransactionCountReturnType>;
    getTransactionReceipt: (args: viem.GetTransactionReceiptParameters) => Promise<viem.TransactionReceipt>;
    multicall: <const contracts extends readonly unknown[], allowFailure extends boolean = true>(args: viem.MulticallParameters<contracts, allowFailure>) => Promise<viem.MulticallReturnType<contracts, allowFailure>>;
    prepareTransactionRequest: <const request extends viem.PrepareTransactionRequestRequest<viem.Chain | undefined, chainOverride>, chainOverride extends viem.Chain | undefined = undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.PrepareTransactionRequestParameters<viem.Chain | undefined, viem.Account | undefined, chainOverride, accountOverride, request>) => Promise<viem.UnionRequiredBy<Extract<viem.UnionOmit<viem.ExtractChainFormatterParameters<viem.DeriveChain<viem.Chain | undefined, chainOverride>, "transactionRequest", viem.TransactionRequest>, "from"> & (viem.DeriveChain<viem.Chain | undefined, chainOverride> extends infer T_1 ? T_1 extends viem.DeriveChain<viem.Chain | undefined, chainOverride> ? T_1 extends viem.Chain ? {
        chain: T_1;
    } : {
        chain?: undefined;
    } : never : never) & (viem.DeriveAccount<viem.Account | undefined, accountOverride> extends infer T_2 ? T_2 extends viem.DeriveAccount<viem.Account | undefined, accountOverride> ? T_2 extends viem.Account ? {
        account: T_2;
        from: viem.Address;
    } : {
        account?: undefined;
        from?: undefined;
    } : never : never), viem.IsNever<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_3 ? T_3 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_3 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_4 ? T_4 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_4 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_5 ? T_5 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_5 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_6 ? T_6 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_6 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_7 ? T_7 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_7 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)> extends true ? unknown : viem.ExactPartial<((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_8 ? T_8 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_8 extends "legacy" ? viem.TransactionRequestLegacy : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_9 ? T_9 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_9 extends "eip1559" ? viem.TransactionRequestEIP1559 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_10 ? T_10 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_10 extends "eip2930" ? viem.TransactionRequestEIP2930 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_11 ? T_11 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_11 extends "eip4844" ? viem.TransactionRequestEIP4844 : never : never : never) | ((request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) extends infer T_12 ? T_12 extends (request["type"] extends string | undefined ? request["type"] : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)> extends "legacy" ? unknown : viem.GetTransactionType<request, (request extends {
        accessList?: undefined | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & viem.FeeValuesLegacy ? "legacy" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } & (viem.OneOf<{
        maxFeePerGas: viem.FeeValuesEIP1559["maxFeePerGas"];
    } | {
        maxPriorityFeePerGas: viem.FeeValuesEIP1559["maxPriorityFeePerGas"];
    }, viem.FeeValuesEIP1559> & {
        accessList?: viem.TransactionSerializableEIP2930["accessList"] | undefined;
    }) ? "eip1559" : never) | (request extends {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: bigint | undefined;
        sidecars?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: undefined | undefined;
        maxPriorityFeePerGas?: undefined | undefined;
    } & {
        accessList: viem.TransactionSerializableEIP2930["accessList"];
    } ? "eip2930" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: undefined | undefined;
        blobs?: readonly `0x${string}`[] | readonly viem.ByteArray[] | undefined;
        blobVersionedHashes?: readonly `0x${string}`[] | undefined;
        maxFeePerBlobGas?: bigint | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: false | readonly viem.BlobSidecar<`0x${string}`>[] | undefined;
    }) & (viem.ExactPartial<viem.FeeValuesEIP4844> & viem.OneOf<{
        blobs: viem.TransactionSerializableEIP4844["blobs"];
    } | {
        blobVersionedHashes: viem.TransactionSerializableEIP4844["blobVersionedHashes"];
    } | {
        sidecars: viem.TransactionSerializableEIP4844["sidecars"];
    }, viem.TransactionSerializableEIP4844>) ? "eip4844" : never) | (request extends ({
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    } | {
        accessList?: viem.AccessList | undefined;
        authorizationList?: viem.SignedAuthorizationList | undefined;
        blobs?: undefined | undefined;
        blobVersionedHashes?: undefined | undefined;
        gasPrice?: undefined | undefined;
        maxFeePerBlobGas?: undefined | undefined;
        maxFeePerGas?: bigint | undefined;
        maxPriorityFeePerGas?: bigint | undefined;
        sidecars?: undefined | undefined;
    }) & {
        authorizationList: viem.TransactionSerializableEIP7702["authorizationList"];
    } ? "eip7702" : never) | (request["type"] extends string | undefined ? Extract<request["type"], string> : never)>) ? T_12 extends "eip7702" ? viem.TransactionRequestEIP7702 : never : never : never)>> & {
        chainId?: number | undefined;
    }, (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "type" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") extends infer T_13 ? T_13 extends (request["parameters"] extends readonly viem.PrepareTransactionRequestParameterType[] ? request["parameters"][number] : "fees" | "type" | "gas" | "nonce" | "blobVersionedHashes" | "chainId") ? T_13 extends "fees" ? "gasPrice" | "maxFeePerGas" | "maxPriorityFeePerGas" : T_13 : never : never> & (unknown extends request["kzg"] ? {} : Pick<request, "kzg">) extends infer T ? { [K in keyof T]: T[K]; } : never>;
    readContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "pure" | "view">, const args extends viem.ContractFunctionArgs<abi, "pure" | "view", functionName>>(args: viem.ReadContractParameters<abi, functionName, args>) => Promise<viem.ReadContractReturnType<abi, functionName, args>>;
    sendRawTransaction: (args: viem.SendRawTransactionParameters) => Promise<viem.SendRawTransactionReturnType>;
    sendRawTransactionSync: (args: viem.SendRawTransactionSyncParameters) => Promise<viem.TransactionReceipt>;
    simulate: <const calls extends readonly unknown[]>(args: viem.SimulateBlocksParameters<calls>) => Promise<viem.SimulateBlocksReturnType<calls>>;
    simulateBlocks: <const calls extends readonly unknown[]>(args: viem.SimulateBlocksParameters<calls>) => Promise<viem.SimulateBlocksReturnType<calls>>;
    simulateCalls: <const calls extends readonly unknown[]>(args: viem.SimulateCallsParameters<calls>) => Promise<viem.SimulateCallsReturnType<calls>>;
    simulateContract: <const abi extends viem.Abi | readonly unknown[], functionName extends viem.ContractFunctionName<abi, "payable" | "nonpayable">, const args_1 extends viem.ContractFunctionArgs<abi, "payable" | "nonpayable", functionName>, chainOverride extends viem.Chain | undefined, accountOverride extends viem.Account | viem.Address | undefined = undefined>(args: viem.SimulateContractParameters<abi, functionName, args_1, viem.Chain | undefined, chainOverride, accountOverride>) => Promise<viem.SimulateContractReturnType<abi, functionName, args_1, viem.Chain | undefined, viem.Account | undefined, chainOverride, accountOverride>>;
    verifyHash: (args: viem.VerifyHashActionParameters) => Promise<viem.VerifyHashActionReturnType>;
    verifyMessage: (args: viem.VerifyMessageActionParameters) => Promise<viem.VerifyMessageActionReturnType>;
    verifySiweMessage: (args: node_modules_viem__types_actions_siwe_verifySiweMessage.VerifySiweMessageParameters) => Promise<node_modules_viem__types_actions_siwe_verifySiweMessage.VerifySiweMessageReturnType>;
    verifyTypedData: (args: viem.VerifyTypedDataActionParameters) => Promise<viem.VerifyTypedDataActionReturnType>;
    uninstallFilter: (args: viem.UninstallFilterParameters) => Promise<viem.UninstallFilterReturnType>;
    waitForTransactionReceipt: (args: viem.WaitForTransactionReceiptParameters<viem.Chain | undefined>) => Promise<viem.TransactionReceipt>;
    watchBlockNumber: (args: viem.WatchBlockNumberParameters) => viem.WatchBlockNumberReturnType;
    watchBlocks: <includeTransactions extends boolean = false, blockTag extends viem.BlockTag = "latest">(args: viem.WatchBlocksParameters<viem.Transport, viem.Chain | undefined, includeTransactions, blockTag>) => viem.WatchBlocksReturnType;
    watchContractEvent: <const abi extends viem.Abi | readonly unknown[], eventName extends viem.ContractEventName<abi>, strict extends boolean | undefined = undefined>(args: viem.WatchContractEventParameters<abi, eventName, strict, viem.Transport>) => viem.WatchContractEventReturnType;
    watchEvent: <const abiEvent extends viem.AbiEvent | undefined = undefined, const abiEvents extends readonly viem.AbiEvent[] | readonly unknown[] | undefined = abiEvent extends viem.AbiEvent ? [abiEvent] : undefined, strict extends boolean | undefined = undefined>(args: viem.WatchEventParameters<abiEvent, abiEvents, strict, viem.Transport>) => viem.WatchEventReturnType;
    watchPendingTransactions: (args: viem.WatchPendingTransactionsParameters<viem.Transport>) => viem.WatchPendingTransactionsReturnType;
    extend: <const client extends {
        [x: string]: unknown;
        account?: undefined;
        batch?: undefined;
        cacheTime?: undefined;
        ccipRead?: undefined;
        chain?: undefined;
        dataSuffix?: undefined;
        experimental_blockTag?: undefined;
        key?: undefined;
        name?: undefined;
        pollingInterval?: undefined;
        request?: undefined;
        transport?: undefined;
        type?: undefined;
        uid?: undefined;
    } & viem.ExactPartial<Pick<viem.PublicActions<viem.Transport, viem.Chain | undefined, undefined>, "prepareTransactionRequest" | "call" | "createContractEventFilter" | "createEventFilter" | "estimateContractGas" | "estimateGas" | "getBlock" | "getBlockNumber" | "getChainId" | "getContractEvents" | "getEnsText" | "getFilterChanges" | "getGasPrice" | "getLogs" | "getTransaction" | "getTransactionCount" | "getTransactionReceipt" | "readContract" | "sendRawTransaction" | "simulateContract" | "uninstallFilter" | "watchBlockNumber" | "watchContractEvent"> & Pick<viem.WalletActions<viem.Chain | undefined, undefined>, "sendTransaction" | "writeContract">>>(fn: (client: viem.Client<viem.Transport, viem.Chain | undefined, undefined, viem.PublicRpcSchema, viem.PublicActions<viem.Transport, viem.Chain | undefined>>) => client) => viem.Client<viem.Transport, viem.Chain | undefined, undefined, viem.PublicRpcSchema, { [K in keyof client]: client[K]; } & viem.PublicActions<viem.Transport, viem.Chain | undefined>>;
};
declare function getAddresses<T extends CoreAddresses = CoreAddresses>(): T;

/**
 * Generic ABI encoder for any blueprint job.
 *
 * Builds the ordered parameter array from:
 *   1. contextParams (e.g. sidecar_url, sandbox_id) — prepended first
 *   2. fields with abiType set — appended in definition order
 *
 * Delegates to job.customEncoder when present (for nested-struct jobs like batch_create).
 */
declare function encodeJobArgs(job: JobDefinition, formValues: Record<string, unknown>, context?: Record<string, unknown>): `0x${string}`;

interface DiscoveredOperator {
    address: Address;
    ecdsaPublicKey: string;
    rpcAddress: string;
}
interface OperatorDiscoveryClient {
    readContract(args: Record<string, unknown>): Promise<unknown>;
    getLogs(args: Record<string, unknown>): Promise<Array<Record<string, unknown>>>;
    multicall(args: Record<string, unknown>): Promise<Array<Record<string, unknown>>>;
}
interface OperatorDiscoveryResult {
    operators: DiscoveredOperator[];
    operatorCount: bigint;
}
/**
 * Shared discovery logic for operator lookup.
 * Tries multicall first for efficiency, then falls back to direct reads when
 * multicall is unavailable in local/dev environments.
 */
declare function discoverOperatorsWithClient(client: OperatorDiscoveryClient, servicesAddress: Address, blueprintId: bigint): Promise<OperatorDiscoveryResult>;
/**
 * Discover operators registered for a blueprint by scanning OperatorRegistered
 * events, then verifying each is still active. Falls back to direct reads when
 * multicall is unavailable.
 */
declare function useOperators(blueprintId: bigint): {
    operators: DiscoveredOperator[];
    isLoading: boolean;
    error: Error | null;
    operatorCount: bigint;
};

interface JobFormState {
    values: Record<string, unknown>;
    errors: Record<string, string>;
    onChange: (name: string, value: unknown) => void;
    validate: () => boolean;
    reset: () => void;
}
declare function useJobForm(job: JobDefinition | null): JobFormState;

/**
 * Per-job RFQ hook — fetches price quotes for a specific job before submission.
 *
 * Implements the GetJobPrice protocol:
 * 1. Solve PoW challenge (same as service-level RFQ)
 * 2. POST to operator's /pricing/job-quote endpoint
 * 3. Return signed JobQuoteDetails for submitJobFromQuote()
 *
 * This is the per-job counterpart to useQuotes (which handles service creation).
 * Together they provide full RFQ coverage for the UI.
 */
interface JobQuote {
    serviceId: bigint;
    jobIndex: number;
    price: bigint;
    timestamp: bigint;
    expiry: bigint;
    signature: `0x${string}`;
    operatorAddress: Address;
}
interface UseJobPriceResult {
    quote: JobQuote | null;
    isLoading: boolean;
    isSolvingPow: boolean;
    error: string | null;
    formattedPrice: string;
    refetch: () => void;
}
declare function useJobPrice(operatorRpcUrl: string | undefined, serviceId: bigint, jobIndex: number, blueprintId: bigint, enabled: boolean): UseJobPriceResult;
/**
 * Batch version — fetches job prices for multiple jobs at once.
 * Used by the blueprint job list to show all prices simultaneously.
 */
interface JobPriceEntry {
    jobIndex: number;
    jobName: string;
    price: bigint;
    formattedPrice: string;
    mode: 'flat' | 'dynamic' | 'free';
    quote: JobQuote | null;
    error: string | null;
}
interface UseJobPricesResult {
    prices: JobPriceEntry[];
    isLoading: boolean;
    error: string | null;
    refetch: () => void;
}
declare function useJobPrices(operatorRpcUrl: string | undefined, serviceId: bigint, blueprintId: bigint, jobIndexes: {
    index: number;
    name: string;
    multiplier: number;
}[], enabled: boolean): UseJobPricesResult;

interface ServiceInfo {
    active: boolean;
    blueprintId: bigint;
    owner: Address;
    operatorCount: number;
    operators: Address[];
    permitted: boolean;
    ttl: bigint;
    createdAt: bigint;
}
/**
 * Validate a service on-chain: check if active, fetch operators,
 * verify the current user is a permitted caller.
 */
declare function useServiceValidation(): {
    validate: (serviceId: bigint, userAddress?: Address) => Promise<ServiceInfo | null>;
    reset: () => void;
    isValidating: boolean;
    serviceInfo: ServiceInfo | null;
    error: string | null;
};

interface UseAuthenticatedFetchOptions {
    sandboxId: string;
    apiUrl?: string;
}
/**
 * Returns a `fetch` wrapper that injects the Bearer session token.
 * If the token is expired or a 401 is received, triggers re-authentication.
 */
declare function useAuthenticatedFetch({ sandboxId, apiUrl }: UseAuthenticatedFetchOptions): {
    authFetch: (url: string, init?: RequestInit) => Promise<Response>;
};

/**
 * RFQ (Request for Quote) hook — fetches pricing quotes from operators.
 *
 * Implements the Tangle pricing protocol:
 * 1. Solve PoW challenge (SHA256 with 20-bit difficulty)
 * 2. Send gRPC GetPrice request to each operator's registered RPC
 * 3. Collect signed QuoteDetails for createServiceFromQuotes()
 *
 * When operators don't have a pricing engine (no rpcAddress), falls back to
 * multiplier-based estimation from the on-chain getDefaultJobRates().
 */
type SecurityCommitment = {
    asset: {
        kind: number;
        token: Address;
    };
    exposureBps: number;
};
type ResourceCommitment = {
    kind: number;
    count: bigint;
};
interface OperatorQuote {
    operator: Address;
    totalCost: bigint;
    signature: `0x${string}`;
    details: {
        blueprintId: bigint;
        ttlBlocks: bigint;
        totalCost: bigint;
        timestamp: bigint;
        expiry: bigint;
        confidentiality: number;
        securityCommitments: readonly SecurityCommitment[];
        resourceCommitments: readonly ResourceCommitment[];
    };
    costRate: number;
    teeAttested?: boolean;
    teeProvider?: string;
}
interface UseQuotesResult {
    quotes: OperatorQuote[];
    isLoading: boolean;
    isSolvingPow: boolean;
    errors: Map<Address, string>;
    totalCost: bigint;
    refetch: () => void;
}
declare function solvePoW(blueprintId: bigint, timestamp: bigint): Promise<{
    hash: Uint8Array;
    nonce: number;
    proof: Uint8Array;
}>;
declare function formatCost(totalCost: bigint): string;
declare function useQuotes(operators: DiscoveredOperator[], blueprintId: bigint, ttlBlocks: bigint, enabled: boolean, requireTee?: boolean): UseQuotesResult;

interface SubmitJobOpts {
    serviceId: bigint;
    jobId: number;
    args: `0x${string}`;
    label?: string;
    value?: bigint;
}
type JobSubmitStatus = 'idle' | 'signing' | 'pending' | 'confirmed' | 'failed';
declare function useSubmitJob(): {
    submitJob: (opts: SubmitJobOpts) => Promise<`0x${string}` | undefined>;
    reset: () => void;
    status: JobSubmitStatus;
    error: string | null;
    txHash: `0x${string}` | undefined;
    callId: number | null;
    isSigning: boolean;
    isConnected: boolean;
};

interface UseSessionAuthOptions {
    sandboxId: string;
    apiUrl?: string;
}
declare function useSessionAuth({ sandboxId, apiUrl }: UseSessionAuthOptions): {
    session: SessionEntry | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    error: string | null;
    authenticate: () => Promise<SessionEntry | null>;
    logout: () => void;
};

type ProvisionPhase = 'queued' | 'image_pull' | 'container_create' | 'container_start' | 'health_check' | 'ready' | 'failed';
interface ProvisionStatus {
    call_id: number;
    sandbox_id: string | null;
    phase: ProvisionPhase;
    message: string | null;
    started_at: number;
    updated_at: number;
    progress_pct: number;
    sidecar_url: string | null;
}
declare function getPhaseLabel(phase: ProvisionPhase): string;
declare function isTerminalPhase(phase: ProvisionPhase): boolean;
interface UseProvisionProgressOptions {
    callId: number | null;
    apiUrl?: string;
    enabled?: boolean;
}
declare function useProvisionProgress({ callId, apiUrl, enabled, }: UseProvisionProgressOptions): {
    status: ProvisionStatus | null;
    error: string | null;
    isPolling: boolean;
    phase: ProvisionPhase | null;
    progressPct: number;
    sandboxId: string | null;
    sidecarUrl: string | null;
    message: string | null;
    isReady: boolean;
    isFailed: boolean;
};

declare function useThemeValue(): Theme;

interface UseSidecarAuthOptions {
    /** Scoping key for token storage (e.g. botId, sandboxId). */
    resourceId: string;
    /** Base URL of the sidecar or operator API. */
    apiUrl: string;
    /**
     * Sign a plaintext message and return the hex signature.
     * Consuming apps wire this to their wallet library (e.g. wagmi's signMessageAsync).
     */
    signMessage: (message: string) => Promise<string>;
}
interface SidecarAuth {
    token: string | null;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    authenticate: () => Promise<string | null>;
    clearCachedToken: () => void;
    error: string | null;
}
/**
 * Generic sidecar PASETO challenge/response auth.
 *
 * Flow:
 * 1. POST /api/auth/challenge  -> { nonce, message, expires_at }
 * 2. signMessage(message)       -> signature (provided by consuming app)
 * 3. POST /api/auth/session     -> { token, address, expires_at }
 *
 * Tokens are cached in localStorage and auto-refreshed 5 minutes before expiry.
 */
declare function useSidecarAuth({ resourceId, apiUrl, signMessage }: UseSidecarAuthOptions): SidecarAuth;

declare function useWagmiSidecarAuth(resourceId: string, apiUrl: string): SidecarAuth;

interface UseWalletEthBalanceOptions {
    address?: string;
    refreshKey?: number | string;
    readBalance: (address: string) => Promise<bigint>;
    pollMs?: number;
    onError?: (error: unknown) => void;
}
interface UseWalletEthBalanceResult {
    balance: string | null;
    hasError: boolean;
}
declare function useWalletEthBalance({ address, refreshKey, readBalance, pollMs, onError, }: UseWalletEthBalanceOptions): UseWalletEthBalanceResult;

export { type CoreAddresses, DEFAULT_THEME, type DiscoveredOperator, type InfraConfig, JobDefinition, type JobFormState, type JobPriceEntry, type JobQuote, type JobSubmitStatus, type NetworkConfig, type OperatorInfo, type OperatorQuote, type ProvisionPhase, type ProvisionStatus, type ServiceInfo, type SessionEntry, type SidecarAuth, type SubmitJobOpts, type Theme, type TrackedTx, type UseJobPriceResult, type UseJobPricesResult, type UseQuotesResult, type UseSidecarAuthOptions, addTx, allTangleChains, clearTxs, cn, configureNetworks, createTangleLocalChain, createTangleTransports, defaultConnectKitOptions, deserializeWithBigInt, discoverOperatorsWithClient, encodeJobArgs, formatCost, gcSessions, getAddresses, getInfra, getNetworks, getPhaseLabel, getPublicClient, getSession, getTangleWalletChains, infraStore, isTerminalPhase, kTheme, pendingCount, persistedAtom, publicClient, publicClientStore, removeSession, resolveOperatorRpc, resolveRpcUrl, rpcUrl, sanitizeSelectedChainId, selectedChainIdStore, serializeWithBigInt, sessionMapStore, setSession, solvePoW, tangleJobsAbi, tangleLocal, tangleMainnet, tangleOperatorsAbi, tangleServicesAbi, tangleTestnet, tangleWalletChains, themeIsDark, themeStore, toggleTheme, txListStore, updateInfra, updateTx, useAuthenticatedFetch, useJobForm, useJobPrice, useJobPrices, useOperators, useProvisionProgress, useQuotes, useServiceValidation, useSessionAuth, useSidecarAuth, useSubmitJob, useThemeValue, useWagmiSidecarAuth, useWalletEthBalance };
