export const AirSwapPoolAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "_scale", type: "uint256" },
      { internalType: "uint256", name: "_max", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "AddressInvalid",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "AdminNotSet",
    type: "error",
  },
  { inputs: [], name: "AlreadyClaimed", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "AmountInsufficient",
    type: "error",
  },
  { inputs: [], name: "ClaimsNotProvided", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "MaxTooHigh",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "ProofInvalid",
    type: "error",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "ScaleTooHigh",
    type: "error",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "TokenInvalid",
    type: "error",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "TreeDisabled",
    type: "error",
  },
  { inputs: [], name: "Unauthorized", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "AddAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "tokens",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "dest",
        type: "address",
      },
    ],
    name: "DrainTo",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32",
        name: "tree",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "root",
        type: "bytes32",
      },
    ],
    name: "Enable",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferStarted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "admin",
        type: "address",
      },
    ],
    name: "RemoveAdmin",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "max", type: "uint256" },
    ],
    name: "SetMax",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "scale",
        type: "uint256",
      },
    ],
    name: "SetScale",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stakingToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "stakingContract",
        type: "address",
      },
    ],
    name: "SetStaking",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "bytes32[]",
        name: "trees",
        type: "bytes32[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "addAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "admins",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "_value", type: "uint256" },
      { internalType: "address", name: "_token", type: "address" },
    ],
    name: "calculate",
    outputs: [{ internalType: "uint256", name: "amount", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "claimed",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "_tokens", type: "address[]" },
      { internalType: "address", name: "_dest", type: "address" },
    ],
    name: "drainTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "_tree", type: "bytes32" },
      { internalType: "bytes32", name: "_root", type: "bytes32" },
    ],
    name: "enable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_account", type: "address" },
      { internalType: "bytes32[]", name: "_trees", type: "bytes32[]" },
    ],
    name: "getClaimStatusForTrees",
    outputs: [{ internalType: "bool[]", name: "", type: "bool[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "max",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pendingOwner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "removeAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "rootsByTree",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "scale",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_max", type: "uint256" }],
    name: "setMax",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "_scale", type: "uint256" }],
    name: "setScale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_stakingToken", type: "address" },
      { internalType: "address", name: "_stakingContract", type: "address" },
    ],
    name: "setStaking",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stakingToken",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "_participant", type: "address" },
      { internalType: "bytes32", name: "_root", type: "bytes32" },
      { internalType: "uint256", name: "_value", type: "uint256" },
      { internalType: "bytes32[]", name: "_proof", type: "bytes32[]" },
    ],
    name: "verify",
    outputs: [{ internalType: "bool", name: "valid", type: "bool" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "tree", type: "bytes32" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
        ],
        internalType: "struct IPool.Claim[]",
        name: "_claims",
        type: "tuple[]",
      },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_minimumAmount", type: "uint256" },
    ],
    name: "withdraw",
    outputs: [
      { internalType: "uint256", name: "amountWithdrawn", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "tree", type: "bytes32" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
        ],
        internalType: "struct IPool.Claim[]",
        name: "_claims",
        type: "tuple[]",
      },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_minimumAmount", type: "uint256" },
    ],
    name: "withdrawAndStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "tree", type: "bytes32" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
        ],
        internalType: "struct IPool.Claim[]",
        name: "_claims",
        type: "tuple[]",
      },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_minimumAmount", type: "uint256" },
      { internalType: "address", name: "_account", type: "address" },
    ],
    name: "withdrawAndStakeFor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "tree", type: "bytes32" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "bytes32[]", name: "proof", type: "bytes32[]" },
        ],
        internalType: "struct IPool.Claim[]",
        name: "_claims",
        type: "tuple[]",
      },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "uint256", name: "_minimumAmount", type: "uint256" },
      { internalType: "address", name: "_recipient", type: "address" },
    ],
    name: "withdrawFor",
    outputs: [
      { internalType: "uint256", name: "amountWithdrawn", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;