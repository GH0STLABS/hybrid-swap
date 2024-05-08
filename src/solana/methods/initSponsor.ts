import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { getProgram } from "../source/program";
import * as anchor from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

interface InitPoolArgs {
    factors: {
        baseline: number,
        rare: number,
        legendary: number,
    },
    collectionMint: string,
    tokenMint: string,
    lamportFee: number,
}

/**
    -- This method initializes a swap pool --
    @params Wallet as "NodeWallet" type, metadata with "InitPoolArgs" type
    @returns Transaction object with the initialize_sponsor_pool instruction
**/
export async function initSponsor(wallet: NodeWallet, metadata: InitPoolArgs) {
    let { factors, collectionMint, tokenMint, lamportFee } = metadata; 

    const program = await getProgram(wallet);

    let tx = new Transaction();

    let collectionMintKey = new PublicKey(collectionMint);
    let tokenMintKey = new PublicKey(tokenMint);

    let swap_factor = factors.baseline * Math.pow(10, 6);

    const [sponsorPDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            anchor.utils.bytes.utf8.encode("hybrid_sponsor"), 
            wallet.publicKey.toBuffer(), 
            collectionMintKey.toBuffer()
        ],
            program.programId
      );
    
      const [nftAuthorityPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            anchor.utils.bytes.utf8.encode("nft_authority"), 
            sponsorPDA.toBuffer()
        ],
        program.programId
      );

    let instruction = await program.methods.initializeSponsorPool(
        [swap_factor, factors.rare, factors.legendary],
        new anchor.BN(lamportFee)
    )
    .accounts({
        hybridVault: sponsorPDA,
        tokenMint: tokenMintKey,
        collectionMint: collectionMintKey,
        nftAuthority: nftAuthorityPda,
        payer: wallet.publicKey,
        systemProgram: SystemProgram.programId,
    }).instruction();

    await tx.add(instruction);

    return tx
}