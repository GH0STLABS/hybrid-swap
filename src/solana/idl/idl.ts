export type Tritium = {
  "version": "0.1.0",
  "name": "tritium",
  "instructions": [
    {
      "name": "initializeSponsorPool",
      "accounts": [
        {
          "name": "hybridVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "swapFactor",
          "type": {
            "array": [
              "f64",
              3
            ]
          }
        },
        {
          "name": "lamportFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositTokens",
      "accounts": [
        {
          "name": "hybridVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sponsorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swapNftToToken",
      "accounts": [
        {
          "name": "sponsor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sponsorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftCustody",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletTwo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletThree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapTokenToNft",
      "accounts": [
        {
          "name": "sponsor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sponsorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftCustody",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletTwo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletThree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "sponsor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "nftsHeld",
            "type": "u64"
          },
          {
            "name": "swapFactor",
            "type": {
              "array": [
                "f64",
                3
              ]
            }
          },
          {
            "name": "authRulesBump",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lamportFee",
            "type": "u64"
          },
          {
            "name": "withdrawable",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnauthorizedCreation",
      "msg": "Pool initializer is not apart of the whitelist"
    },
    {
      "code": 6001,
      "name": "UnbalancedPool",
      "msg": "There are insufficient tokens to satisfy this swap."
    },
    {
      "code": 6002,
      "name": "InvalidSymbol",
      "msg": "Symbol schema does not match the expected schema."
    },
    {
      "code": 6003,
      "name": "InsufficientTokens",
      "msg": "Insufficent tokens provided for swap."
    },
    {
      "code": 6004,
      "name": "BadMetadata",
      "msg": "bad metadata passed"
    }
  ]
};

export const IDL: Tritium = {
  "version": "0.1.0",
  "name": "tritium",
  "instructions": [
    {
      "name": "initializeSponsorPool",
      "accounts": [
        {
          "name": "hybridVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "swapFactor",
          "type": {
            "array": [
              "f64",
              3
            ]
          }
        },
        {
          "name": "lamportFee",
          "type": "u64"
        }
      ]
    },
    {
      "name": "depositTokens",
      "accounts": [
        {
          "name": "hybridVault",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "collectionMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sponsorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "swapNftToToken",
      "accounts": [
        {
          "name": "sponsor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sponsorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftToken",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftCustody",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletTwo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletThree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "swapTokenToNft",
      "accounts": [
        {
          "name": "sponsor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sponsorTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payerTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftToken",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftEdition",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "nftAuthority",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftCustody",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "sourceTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "destinationTokenRecord",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "feeWallet",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletTwo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "feeWalletThree",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "sysvarInstructions",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRulesProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "authRules",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "sponsor",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "nftMint",
            "type": "publicKey"
          },
          {
            "name": "tokenMint",
            "type": "publicKey"
          },
          {
            "name": "nftsHeld",
            "type": "u64"
          },
          {
            "name": "swapFactor",
            "type": {
              "array": [
                "f64",
                3
              ]
            }
          },
          {
            "name": "authRulesBump",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "lamportFee",
            "type": "u64"
          },
          {
            "name": "withdrawable",
            "type": "bool"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "UnauthorizedCreation",
      "msg": "Pool initializer is not apart of the whitelist"
    },
    {
      "code": 6001,
      "name": "UnbalancedPool",
      "msg": "There are insufficient tokens to satisfy this swap."
    },
    {
      "code": 6002,
      "name": "InvalidSymbol",
      "msg": "Symbol schema does not match the expected schema."
    },
    {
      "code": 6003,
      "name": "InsufficientTokens",
      "msg": "Insufficent tokens provided for swap."
    },
    {
      "code": 6004,
      "name": "BadMetadata",
      "msg": "bad metadata passed"
    }
  ]
};
