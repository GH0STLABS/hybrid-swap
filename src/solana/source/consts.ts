import * as anchor from "@coral-xyz/anchor";
import { MPL_TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";

export const feeWallets = [
  "EYNsuoUh4pRCpuNqj5cH8zUDXST4o8YYqRg6vraG7Br7",
  "3nHNJd8mjZFTVkA2dPTSCnWjzJU3XvC5nGSrDMWNKpQb",
  "ghosnnrbJRNUueziNL579JZCqvcLpdHSMXU2zn9uGJS",
];

export const metadataProgram = new anchor.web3.PublicKey(
  MPL_TOKEN_METADATA_PROGRAM_ID
);

export const quackMint = "EMeXmTBy4XwmpDLYVJhJ8e7acmqgN4XD7s1HXLJXeefk"; //"FGHHVjzQe8m3PFcuzmmooDifbXuS16EP3EpEgWaWF5AN";
export const quackToken = "29CF88kz4sqvh8c5Jh6YNtxNf9MqZ3jR7Xd5wSRcQ1Ja";
export const quackPoolId = "3SL53vHFrw5qvrLHtNis7G5RdNtmyT86Gs9B58DNidHg"; //"FUVgASpMK1cZBGMfAvHjcxSRrJK8r6geuAqnEKqQ9gYa"; //"3eAo2MC9aP2vKegioU7SV6tkh134ohHjg3YRJRnvqpXP";

export const WL_KEYS = [
  "3nHNJd8mjZFTVkA2dPTSCnWjzJU3XvC5nGSrDMWNKpQb",
  "7JcUxRFYSmy2KE5ESqewAae2STTLgU5KzyVZo657iFU5",
  "AB83dJjfEzKsGKWpvVoEBR3jAGgbGAPccFirVV1Bh1eJ",
  "gho8CjpEQ6quw77oLX8ZgSrNzg7G1E7ywSPfSr6ez2N",
  "9rdkV51HqRnfFiSYn48PTNo2DMawSJU1RVXXWKs6PReq",
];

export const sysvarInstructions = new anchor.web3.PublicKey(
    anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY
);

export const MPL_TOKEN_AUTH_RULES_PROGRAM = new anchor.web3.PublicKey(
  "auth9SigNpDKz4sJJ1DfCTuZrZNSAgh9sFD3rboVmgg"
);
