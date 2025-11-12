
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, VersionedTransaction } from "@solana/web3.js";
import { createPaymentHandler } from "@faremeter/payment-solana/exact";
import { wrap } from "@faremeter/fetch";
import { lookupKnownSPLToken } from "@faremeter/info/solana";
import { useMemo } from "react";

export function useFaremeter ()
{
    const { wallet, publicKey, signTransaction } = useWallet();
    const { connection } = useConnection();

    const fetchWithPayer = useMemo( () =>
    {
        if ( !wallet || !publicKey || !signTransaction )
        {
            return fetch;
        }

        const network = wallet.adapter.network || "devnet";
        const usdcInfo = lookupKnownSPLToken( network, "USDC" );
        if ( !usdcInfo )
        {
            // Potentially handle this case more gracefully
            return fetch;
        }
        const usdcMint = new PublicKey( usdcInfo.address );

        const faremeterWallet = {
            network,
            publicKey,
            updateTransaction: async ( tx: VersionedTransaction ) =>
            {
                const signedTx = await signTransaction( tx );
                return signedTx;
            },
        };

        const handler = createPaymentHandler( faremeterWallet, usdcMint, connection );
        return wrap( fetch, { handlers: [ handler ] } );
    }, [ wallet, publicKey, signTransaction, connection ] );

    return { fetchWithPayer };
}
