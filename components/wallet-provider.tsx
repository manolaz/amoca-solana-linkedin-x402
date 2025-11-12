'use client'

import { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { clusterApiUrl } from '@solana/web3.js'
import { useFaremeter } from '@/lib/use-faremeter'

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css'

// Create a context for the Faremeter fetch function
const FaremeterContext = createContext<{ fetchWithPayer: typeof fetch }>( { fetchWithPayer: fetch } );

// Custom hook to use the Faremeter fetch
export const useFaremeterFetch = () => useContext( FaremeterContext );

interface WalletContextProviderProps
{
    children: ReactNode
}

const FaremeterProvider: FC<{ children: ReactNode }> = ( { children } ) =>
{
    const { fetchWithPayer } = useFaremeter();
    return (
        <FaremeterContext.Provider value={ { fetchWithPayer } }>
            { children }
        </FaremeterContext.Provider>
    );
};

export const WalletContextProvider: FC<WalletContextProviderProps> = ( { children } ) =>
{
    // Use devnet for development
    const network = WalletAdapterNetwork.Devnet
    const endpoint = useMemo( () => clusterApiUrl( network ), [ network ] )

    // Initialize wallet adapters
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    )

    return (
        <ConnectionProvider endpoint={ endpoint }>
            <WalletProvider wallets={ wallets } autoConnect>
                <WalletModalProvider>
                    <FaremeterProvider>
                        { children }
                    </FaremeterProvider>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
}
