/**
 * Tangle core precompile ABIs — shared across all blueprints.
 * Blueprint-specific ABIs (agentSandboxBlueprintAbi, tradingBlueprintAbi, etc.)
 * stay in each consuming app.
 */

export const tangleJobsAbi = [
  {
    type: 'function',
    name: 'submitJob',
    inputs: [
      { name: 'serviceId', type: 'uint64' },
      { name: 'job', type: 'uint8' },
      { name: 'args', type: 'bytes' },
    ],
    outputs: [{ name: 'callId', type: 'uint64' }],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    name: 'JobCalled',
    inputs: [
      { name: 'serviceId', type: 'uint64', indexed: true },
      { name: 'job', type: 'uint8', indexed: true },
      { name: 'callId', type: 'uint64', indexed: true },
      { name: 'caller', type: 'address', indexed: false },
      { name: 'args', type: 'bytes', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'JobResultReceived',
    inputs: [
      { name: 'serviceId', type: 'uint64', indexed: true },
      { name: 'job', type: 'uint8', indexed: true },
      { name: 'callId', type: 'uint64', indexed: true },
      { name: 'operator', type: 'address', indexed: false },
      { name: 'outputs', type: 'bytes', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'JobSubmitted',
    inputs: [
      { name: 'serviceId', type: 'uint64', indexed: true },
      { name: 'callId', type: 'uint64', indexed: true },
      { name: 'jobIndex', type: 'uint8', indexed: false },
      { name: 'caller', type: 'address', indexed: false },
      { name: 'inputs', type: 'bytes', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'JobCompleted',
    inputs: [
      { name: 'serviceId', type: 'uint64', indexed: true },
      { name: 'callId', type: 'uint64', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'JobResultSubmitted',
    inputs: [
      { name: 'serviceId', type: 'uint64', indexed: true },
      { name: 'callId', type: 'uint64', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
      { name: 'output', type: 'bytes', indexed: false },
    ],
  },
] as const;

export const tangleServicesAbi = [
  {
    type: 'function',
    name: 'requestService',
    inputs: [
      { name: 'blueprintId', type: 'uint64' },
      { name: 'operators', type: 'address[]' },
      { name: 'config', type: 'bytes' },
      { name: 'permittedCallers', type: 'address[]' },
      { name: 'ttl', type: 'uint64' },
      { name: 'paymentToken', type: 'address' },
      { name: 'paymentAmount', type: 'uint256' },
    ],
    outputs: [{ name: 'requestId', type: 'uint64' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'createServiceFromQuotes',
    inputs: [
      { name: 'blueprintId', type: 'uint64' },
      {
        name: 'quotes',
        type: 'tuple[]',
        components: [
          {
            name: 'details',
            type: 'tuple',
            components: [
              { name: 'blueprintId', type: 'uint64' },
              { name: 'ttlBlocks', type: 'uint64' },
              { name: 'totalCost', type: 'uint256' },
              { name: 'timestamp', type: 'uint64' },
              { name: 'expiry', type: 'uint64' },
              {
                name: 'securityCommitments',
                type: 'tuple[]',
                components: [
                  {
                    name: 'asset',
                    type: 'tuple',
                    components: [
                      { name: 'kind', type: 'uint8' },
                      { name: 'token', type: 'address' },
                    ],
                  },
                  { name: 'exposureBps', type: 'uint16' },
                ],
              },
            ],
          },
          { name: 'signature', type: 'bytes' },
          { name: 'operator', type: 'address' },
        ],
      },
      { name: 'config', type: 'bytes' },
      { name: 'permittedCallers', type: 'address[]' },
      { name: 'ttl', type: 'uint64' },
    ],
    outputs: [{ name: 'serviceId', type: 'uint64' }],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    name: 'getService',
    inputs: [{ name: 'serviceId', type: 'uint64' }],
    outputs: [
      {
        name: '',
        type: 'tuple',
        components: [
          { name: 'blueprintId', type: 'uint64' },
          { name: 'owner', type: 'address' },
          { name: 'createdAt', type: 'uint64' },
          { name: 'ttl', type: 'uint64' },
          { name: 'terminatedAt', type: 'uint64' },
          { name: 'lastPaymentAt', type: 'uint64' },
          { name: 'operatorCount', type: 'uint32' },
          { name: 'minOperators', type: 'uint32' },
          { name: 'maxOperators', type: 'uint32' },
          { name: 'membership', type: 'uint8' },
          { name: 'pricing', type: 'uint8' },
          { name: 'status', type: 'uint8' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isServiceActive',
    inputs: [{ name: 'serviceId', type: 'uint64' }],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getServiceOperators',
    inputs: [{ name: 'serviceId', type: 'uint64' }],
    outputs: [{ name: '', type: 'address[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isPermittedCaller',
    inputs: [
      { name: 'serviceId', type: 'uint64' },
      { name: 'caller', type: 'address' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'ServiceRequested',
    inputs: [
      { name: 'requestId', type: 'uint64', indexed: true },
      { name: 'blueprintId', type: 'uint64', indexed: true },
      { name: 'requester', type: 'address', indexed: true },
    ],
  },
  {
    type: 'event',
    name: 'ServiceActivated',
    inputs: [
      { name: 'serviceId', type: 'uint64', indexed: true },
      { name: 'requestId', type: 'uint64', indexed: true },
      { name: 'blueprintId', type: 'uint64', indexed: true },
    ],
  },
] as const;

export const tangleOperatorsAbi = [
  {
    type: 'function',
    name: 'blueprintOperatorCount',
    inputs: [{ name: 'blueprintId', type: 'uint64' }],
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'isOperatorRegistered',
    inputs: [
      { name: 'blueprintId', type: 'uint64' },
      { name: 'operator', type: 'address' },
    ],
    outputs: [{ name: '', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getOperatorPreferences',
    inputs: [
      { name: 'blueprintId', type: 'uint64' },
      { name: 'operator', type: 'address' },
    ],
    outputs: [
      {
        name: 'preferences',
        type: 'tuple',
        components: [
          { name: 'ecdsaPublicKey', type: 'bytes' },
          { name: 'rpcAddress', type: 'string' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'OperatorRegistered',
    inputs: [
      { name: 'blueprintId', type: 'uint64', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
      { name: 'ecdsaPublicKey', type: 'bytes', indexed: false },
      { name: 'rpcAddress', type: 'string', indexed: false },
    ],
  },
  {
    type: 'event',
    name: 'OperatorUnregistered',
    inputs: [
      { name: 'blueprintId', type: 'uint64', indexed: true },
      { name: 'operator', type: 'address', indexed: true },
    ],
  },
] as const;
