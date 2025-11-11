'use client'

import { useState } from 'react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { Agent } from '@/lib/types'

interface AgentPricingProps
{
    pricing: Agent[ 'pricing' ]
    walletAddress: string
    agentName: string
}

export function AgentPricing ( { pricing, walletAddress, agentName }: AgentPricingProps )
{
    const { publicKey, sendTransaction } = useWallet()
    const { connection } = useConnection()
    const [ isLoading, setIsLoading ] = useState( false )
    const [ fundAmount, setFundAmount ] = useState( '0.1' )

    const handleFundAgent = async () =>
    {
        if ( !publicKey )
        {
            alert( 'Please connect your wallet first!' )
            return
        }

        try
        {
            setIsLoading( true )

            const agentPublicKey = new PublicKey( walletAddress )
            const lamports = parseFloat( fundAmount ) * LAMPORTS_PER_SOL

            const transaction = new Transaction().add(
                SystemProgram.transfer( {
                    fromPubkey: publicKey,
                    toPubkey: agentPublicKey,
                    lamports,
                } )
            )

            const signature = await sendTransaction( transaction, connection )

            await connection.confirmTransaction( signature, 'confirmed' )

            alert( `Successfully funded ${ agentName } with ${ fundAmount } SOL!\nTransaction: ${ signature }` )
        } catch ( error )
        {
            console.error( 'Error funding agent:', error )
            alert( 'Failed to fund agent. Please try again.' )
        } finally
        {
            setIsLoading( false )
        }
    }

    return (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl shadow-sm border-2 border-purple-200 dark:border-purple-800 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                💰 Pricing & Hire
            </h2>

            <div className="space-y-4 mb-6">
                { pricing.hourlyRate && (
                    <PricingOption
                        label="Hourly Rate"
                        price={ pricing.hourlyRate }
                        icon="⏱️"
                    />
                ) }
                { pricing.taskBased && (
                    <PricingOption
                        label="Task-Based"
                        price={ pricing.taskBased }
                        icon="📋"
                    />
                ) }
                { pricing.subscription && (
                    <PricingOption
                        label="Monthly Subscription"
                        price={ pricing.subscription }
                        icon="📅"
                    />
                ) }
            </div>

            {/* Fund Amount Input */ }
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Fund Amount (SOL)
                </label>
                <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={ fundAmount }
                    onChange={ ( e ) => setFundAmount( e.target.value ) }
                    className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.1"
                />
            </div>

            <div className="space-y-3">
                <button
                    onClick={ handleFundAgent }
                    disabled={ isLoading || !publicKey }
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                    { isLoading ? 'Processing...' : publicKey ? 'Fund Wallet & Deploy' : 'Connect Wallet to Fund' }
                </button>

                <button className="w-full py-3 px-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-colors">
                    Message Agent
                </button>
            </div>

            {/* Wallet Address */ }
            <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-2">
                    Agent Wallet
                </p>
                <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                    <code className="flex-1 text-xs text-gray-700 dark:text-gray-300 truncate">
                        { walletAddress }
                    </code>
                    <button
                        className="flex-shrink-0 text-purple-600 hover:text-purple-700 dark:text-purple-400"
                        onClick={ () =>
                        {
                            navigator.clipboard.writeText( walletAddress )
                            alert( 'Wallet address copied!' )
                        } }
                        title="Copy wallet address"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                    Fund this wallet to deploy { agentName } instantly
                </p>
            </div>

            {/* Quick Actions */ }
            { publicKey && (
                <div className="mt-6 pt-6 border-t border-purple-200 dark:border-purple-800">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">
                        Quick Fund
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={ () => setFundAmount( '0.1' ) }
                            className="flex-1 py-2 px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                        >
                            0.1 SOL
                        </button>
                        <button
                            onClick={ () => setFundAmount( '0.5' ) }
                            className="flex-1 py-2 px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                        >
                            0.5 SOL
                        </button>
                        <button
                            onClick={ () => setFundAmount( '1.0' ) }
                            className="flex-1 py-2 px-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700 transition-colors"
                        >
                            1.0 SOL
                        </button>
                    </div>
                </div>
            ) }
        </div>
    )
}

function PricingOption ( { label, price, icon }: { label: string; price: string; icon: string } )
{
    return (
        <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
                <span className="text-xl">{ icon }</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    { label }
                </span>
            </div>
            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                { price }
            </span>
        </div>
    )
}
