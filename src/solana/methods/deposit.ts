import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";
import { getProgram } from "../source/program";
import * as anchor from "@coral-xyz/anchor";
import * as spl from "@solana/spl-token"
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { connection } from "../source/connection";

interface DepositArgs {
    amount: number,
    sponsorPDA: string,
    tokenMint: string,
    collectionMint: string,
}

/**
    -- This method deposits into a swap pool (one-way) --
    @params Wallet as "NodeWallet" type, metadata with "DepositArgs" type
    @returns Transaction object with the deposit instruction
**/
export async function deposit(wallet: NodeWallet, metadata: DepositArgs) {
    let { amount, sponsorPDA, tokenMint, collectionMint } = metadata; 

    const program = await getProgram(wallet);

    let tx = new Transaction();

    let sponsor = new PublicKey(sponsorPDA);
    let tokenMintKey = new PublicKey(tokenMint);
    let collectionMintKey = new PublicKey(collectionMint);

    let sponsorTokenAccount = spl.getAssociatedTokenAddressSync(tokenMintKey, sponsor, true);
    let payerTokenAccount = spl.getAssociatedTokenAddressSync(tokenMintKey, wallet.publicKey);

    let tokenAccountInfo = await connection.getAccountInfo(sponsorTokenAccount);

    // If project token account does not exist, create an instruction and add it to the transaction
    if (!tokenAccountInfo || !tokenAccountInfo.data) {
        console.log("Creating token account...");
        await tx.add(await spl.createAssociatedTokenAccountInstruction(
            wallet.publicKey, 
            sponsorTokenAccount, 
            sponsor, 
            tokenMintKey, 
            spl.TOKEN_PROGRAM_ID,
            spl.ASSOCIATED_TOKEN_PROGRAM_ID
        ));
    };

    let tokenInfo = await connection.getParsedAccountInfo(new PublicKey(tokenMint));
    //@ts-ignore
    let decmials = tokenInfo?.value?.data.parsed.info.decimals;

    let instruction = await program.methods.depositTokens(
        new anchor.BN(amount * Math.pow(10, decmials))
    ).accounts({
        hybridVault: sponsor,
        tokenMint: tokenMintKey,
        payerTokenAccount: payerTokenAccount,
        sponsorTokenAccount: sponsorTokenAccount,
        collectionMint: collectionMintKey,
        payer: wallet.publicKey,
        tokenProgram: spl.TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
        associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID
    }).instruction();

    await tx.add(instruction);

    return tx
}