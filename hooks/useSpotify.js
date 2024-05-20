import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SOLANA_HOST } from "../utils/const";
import { getProgramInstance } from "../utils/utils";
const anchor = require("@project-serum/anchor");
const utf8 = anchor.utils.bytes.utf8;
const { web3, BN} = anchor;
const { SystemProgram } = web3;

const defaultAccounts = {
    tokenProgram: TOKEN_PROGRAM_ID,
    clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    systemProgram: SystemProgram.programId,
};

const useSpotify = (
    musicUrl,
    title,
    setTitle,
    setMusicUrl,
    setShowUploadMusic
) => {
    const wallet = useWallet();
    const { signTransaction } = useWallet();
    const connection = new anchor.web3.Connection(SOLANA_HOST);
    const program = getProgramInstance(connection, wallet);

    const getSongs = async () => {
        console.log("fetching songs");

        const songs = await program.account.musicAccount.all();
        console.log(songs);
        return songs;
    };
//have no idea
    // const newMusic = async () => {
    //     const randomkey = anchor.web3.Keypair.generate().publicKey;

    //     let [music_pda] = await anchor.web3.PublicKey.findProgramAddress(
    //         [utf8.encode("music"), randomkey.toBuffer()],
    //         program.programId
    //     );

    //     const tx = await program.methods.createMusic(title, musicUrl).accounts({
    //         music: music_pda,
    //         randomkey: randomkey,
    //         authority: wallet.publicKey,
    //         ...defaultAccounts,
    //     });

    //     const { blockhash } = await connection.getRecentBlockhash();
    //     tx.recentBlockhash = blockhash;
    //     tx.feePayer = wallet.publicKey;

    //     console.log("Transaction with recentBlockhash:", tx);

    //     // Sign the transaction
    //     const signedTx = await signTransaction(tx);
    //     const txId = await connection.sendRawTransaction(signedTx);
    //     await connection.confirmTransaction(txId, "confirmed");

    //     setTitle("");
    //     setMusicUrl("");
    //     setShowUploadMusic(false);
    // };
//have no idea
    const newMusic = async () => {
        const randomkey = anchor.web3.Keypair.generate().publicKey;

        let [music_pda] = await anchor.web3.PublicKey.findProgramAddress(
            [utf8.encode("music"), randomkey.toBuffer()],
            program.programId
        );

        const tx = await program.methods
            .createMusic(title, musicUrl)
            .accounts({
                music: music_pda,
                randomkey: randomkey,
                authority: wallet.publicKey,
                ...defaultAccounts,
            })
            .transaction();

        const { blockhash } = await connection.getRecentBlockhash();
        tx.recentBlockhash = blockhash;
        tx.feePayer = wallet.publicKey;

        console.log("Transaction with recentBlockhash:", tx);

        // Sign the transaction
        const signedTx = await signTransaction(tx);
        const txId = await connection.sendRawTransaction(signedTx.serialize());
        await connection.confirmTransaction(txId, "confirmed");

        setTitle("");
        setMusicUrl("");
        setShowUploadMusic(false);
    };

    return { newMusic, getSongs };
};

export default useSpotify;
