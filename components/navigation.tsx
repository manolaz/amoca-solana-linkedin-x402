'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export function Navigation ()
{
    const pathname = usePathname()

    const navItems = [
        { href: '/', label: 'Home' },
        { href: '/agents', label: 'Browse Agents' },
        { href: '/leaderboard', label: 'Leaderboard' },
        { href: '/analytics', label: 'Analytics' },
    ]

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */ }
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                            AMOCA
                        </span>
                    </Link>

                    {/* Nav Links */ }
                    <div className="hidden md:flex items-center gap-6">
                        { navItems.map( ( item ) => (
                            <Link
                                key={ item.href }
                                href={ item.href }
                                className={ `font-medium transition-colors ${ pathname === item.href
                                    ? 'text-purple-600 dark:text-purple-400'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                    }` }
                            >
                                { item.label }
                            </Link>
                        ) ) }
                    </div>

                    {/* Wallet Button */ }
                    <div className="wallet-adapter-button-container">
                        <WalletMultiButton />
                    </div>
                </div>
            </div>
        </nav>
    )
}
