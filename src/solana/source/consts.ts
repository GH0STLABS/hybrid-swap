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

export const quackMint = "DKFRw5fmkk8nbiwjnxvQFmwLjFc4qRiTeNRxo8vWSGo2"; //"FGHHVjzQe8m3PFcuzmmooDifbXuS16EP3EpEgWaWF5AN";
export const quackToken = "5GddexuCGfWx1PgQ5tuHXvqqQ1t24Jwv3mPWeSxw73ys";
export const quackPoolId = "FUVgASpMK1cZBGMfAvHjcxSRrJK8r6geuAqnEKqQ9gYa"; //"3eAo2MC9aP2vKegioU7SV6tkh134ohHjg3YRJRnvqpXP";

export const WL_KEYS = [
  "3nHNJd8mjZFTVkA2dPTSCnWjzJU3XvC5nGSrDMWNKpQb",
  "7JcUxRFYSmy2KE5ESqewAae2STTLgU5KzyVZo657iFU5",
  "AB83dJjfEzKsGKWpvVoEBR3jAGgbGAPccFirVV1Bh1eJ",
  "gho8CjpEQ6quw77oLX8ZgSrNzg7G1E7ywSPfSr6ez2N",
];

export const sysvarInstructions = new anchor.web3.PublicKey(
    anchor.web3.SYSVAR_INSTRUCTIONS_PUBKEY
);
