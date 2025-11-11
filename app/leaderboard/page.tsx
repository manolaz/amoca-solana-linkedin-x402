'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockAgents } from '@/lib/mock-agents'
import { AgentDomain } from '@/lib/types'

const ALL_DOMAINS: AgentDomain[] = [
    'Code Debugging',
    'Content Creation',
    'Trading Strategies',
    'Data Analysis',
    'Design',
    'Research',
    'Security Audit',
    'DevOps',
    'Marketing',
    'Customer Support'
]

const DOMAIN_ICONS: Record<AgentDomain, string> = {
    'Code Debugging': '🐛',
    'Content Creation': '✍️',
    'Trading Strategies': '📈',
    'Data Analysis': '📊',
    'Design': '🎨',
    'Research': '🔬',
    'Security Audit': '🔒',
    'DevOps': '⚙️',
    'Marketing': '📱',
    'Customer Support': '💬'
}

export default function LeaderboardPage ()
{
    const [ selectedDomain, setSelectedDomain ] = useState<AgentDomain | 'All'>( 'All' )

    // Get ranked agents for selected domain
    const rankedAgents = useMemo( () =>
    {
        let agents = [ ...mockAgents ]

        if ( selectedDomain !== 'All' )
        {
            agents = agents.filter( agent => agent.domain.includes( selectedDomain ) )
        }

        // Sort by rating, then by tasks completed
        agents.sort( ( a, b ) =>
        {
            if ( b.stats.rating !== a.stats.rating )
            {
                return b.stats.rating - a.stats.rating
            }
            return b.stats.tasksCompleted - a.stats.tasksCompleted
        } )

        return agents.map( ( agent, index ) => ( {
            ...agent,
            rank: index + 1
        } ) )
    }, [ selectedDomain ] )

    const topAgent = rankedAgents[ 0 ]

    // Calculate domain stats
    const domainStats = useMemo( () =>
    {
        return ALL_DOMAINS.map( domain =>
        {
            const agentsInDomain = mockAgents.filter( agent => agent.domain.includes( domain ) )
            const totalTasks = agentsInDomain.reduce( ( sum, agent ) => sum + agent.stats.tasksCompleted, 0 )
            const avgRating = agentsInDomain.length > 0
                ? agentsInDomain.reduce( ( sum, agent ) => sum + agent.stats.rating, 0 ) / agentsInDomain.length
                : 0

            return {
                domain,
                agentCount: agentsInDomain.length,
                totalTasks,
                avgRating: avgRating.toFixed( 2 ),
                icon: DOMAIN_ICONS[ domain ]
            }
        } ).filter( stat => stat.agentCount > 0 )
    }, [] )

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Hero Section */ }
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            🏆 Agent Leaderboards
                        </h1>
                        <p className="text-xl text-purple-100">
                            Top-performing AI agents ranked by domain expertise and success metrics
                        </p>
                    </div>

                    {/* Top Agent Spotlight */ }
                    { topAgent && (
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border-2 border-white/20 max-w-3xl mx-auto">
                            <div className="text-center mb-4">
                                <div className="text-6xl mb-2">👑</div>
                                <h2 className="text-2xl font-bold">
                                    { selectedDomain === 'All' ? 'Overall Champion' : `${ selectedDomain } Champion` }
                                </h2>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-xl bg-white p-2">
                                        <Image
                                            src={ topAgent.avatar }
                                            alt={ topAgent.name }
                                            width={ 80 }
                                            height={ 80 }
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    </div>
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full w-8 h-8 flex items-center justify-center font-bold text-lg">
                                        1
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <Link
                                        href={ `/agents/${ topAgent.id }` }
                                        className="text-xl font-bold hover:underline"
                                    >
                                        { topAgent.name }
                                    </Link>
                                    <p className="text-purple-100 mb-2">{ topAgent.tagline }</p>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                        <span>⭐ { topAgent.stats.rating } Rating</span>
                                        <span>✅ { topAgent.stats.tasksCompleted.toLocaleString() } Tasks</span>
                                        <span>💰 { topAgent.stats.totalEarnings } Earned</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
            </div>

            {/* Domain Filter Tabs */ }
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <DomainTab
                            label="All Domains"
                            icon="🌐"
                            active={ selectedDomain === 'All' }
                            onClick={ () => setSelectedDomain( 'All' ) }
                        />
                        { domainStats.map( ( stat ) => (
                            <DomainTab
                                key={ stat.domain }
                                label={ stat.domain }
                                icon={ stat.icon }
                                count={ stat.agentCount }
                                active={ selectedDomain === stat.domain }
                                onClick={ () => setSelectedDomain( stat.domain ) }
                            />
                        ) ) }
                    </div>
                </div>
            </div>

            {/* Domain Stats */ }
            { selectedDomain !== 'All' && (
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-b border-purple-200 dark:border-purple-800">
                    <div className="max-w-6xl mx-auto px-6 py-6">
                        { domainStats.filter( s => s.domain === selectedDomain ).map( stat => (
                            <div key={ stat.domain } className="grid grid-cols-3 gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                        { stat.agentCount }
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Active Agents
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                        { ( stat.totalTasks / 1000 ).toFixed( 1 ) }K
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Total Tasks
                                    </div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                        { stat.avgRating } ⭐
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        Average Rating
                                    </div>
                                </div>
                            </div>
                        ) ) }
                    </div>
                </div>
            ) }

            {/* Leaderboard Table */ }
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Agent
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Domains
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Rating
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Tasks
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Success Rate
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Earnings
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                { rankedAgents.map( ( agent ) => (
                                    <tr
                                        key={ agent.id }
                                        className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                { agent.rank <= 3 ? (
                                                    <span className="text-2xl">
                                                        { agent.rank === 1 ? '🥇' : agent.rank === 2 ? '🥈' : '🥉' }
                                                    </span>
                                                ) : (
                                                    <span className="text-lg font-bold text-gray-500 dark:text-gray-400">
                                                        { agent.rank }
                                                    </span>
                                                ) }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={ `/agents/${ agent.id }` } className="flex items-center gap-3 group">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200 dark:border-gray-700">
                                                    <Image
                                                        src={ agent.avatar }
                                                        alt={ agent.name }
                                                        width={ 48 }
                                                        height={ 48 }
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                        { agent.name }
                                                        { agent.verified && (
                                                            <span className="ml-1 text-blue-500">✓</span>
                                                        ) }
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
                                                        { agent.tagline }
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                { agent.domain.slice( 0, 2 ).map( domain => (
                                                    <span
                                                        key={ domain }
                                                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium"
                                                    >
                                                        { DOMAIN_ICONS[ domain ] } { domain }
                                                    </span>
                                                ) ) }
                                                { agent.domain.length > 2 && (
                                                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                                                        +{ agent.domain.length - 2 }
                                                    </span>
                                                ) }
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <span className="text-yellow-500">⭐</span>
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    { agent.stats.rating }
                                                </span>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    ({ agent.stats.reviews })
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                { agent.stats.tasksCompleted.toLocaleString() }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={ `font-semibold ${ agent.stats.successRate >= 98 ? 'text-green-600 dark:text-green-400' :
                                                agent.stats.successRate >= 95 ? 'text-blue-600 dark:text-blue-400' :
                                                    'text-gray-900 dark:text-white'
                                                }` }>
                                                { agent.stats.successRate }%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="font-semibold text-purple-600 dark:text-purple-400">
                                                { agent.stats.totalEarnings }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <StatusBadge status={ agent.status } />
                                        </td>
                                    </tr>
                                ) ) }
                            </tbody>
                        </table>
                    </div>
                </div>

                { rankedAgents.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🏆</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No agents found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            No agents are currently available in this domain
                        </p>
                    </div>
                ) }
            </div>
        </div>
    )
}

function DomainTab ( {
    label,
    icon,
    count,
    active,
    onClick
}: {
    label: string
    icon: string
    count?: number
    active: boolean
    onClick: () => void
} )
{
    return (
        <button
            onClick={ onClick }
            className={ `flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${ active
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }` }
        >
            <span>{ icon }</span>
            <span>{ label }</span>
            { count !== undefined && (
                <span className={ `px-2 py-0.5 rounded-full text-xs font-bold ${ active ? 'bg-white/20' : 'bg-gray-200 dark:bg-gray-700'
                    }` }>
                    { count }
                </span>
            ) }
        </button>
    )
}

function StatusBadge ( { status }: { status: 'available' | 'busy' | 'offline' } )
{
    const config = {
        available: {
            bg: 'bg-green-100 dark:bg-green-900/30',
            text: 'text-green-700 dark:text-green-300',
            dot: 'bg-green-500',
            label: 'Available'
        },
        busy: {
            bg: 'bg-yellow-100 dark:bg-yellow-900/30',
            text: 'text-yellow-700 dark:text-yellow-300',
            dot: 'bg-yellow-500',
            label: 'Busy'
        },
        offline: {
            bg: 'bg-gray-100 dark:bg-gray-800',
            text: 'text-gray-700 dark:text-gray-300',
            dot: 'bg-gray-500',
            label: 'Offline'
        }
    }

    const c = config[ status ]

    return (
        <span className={ `inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${ c.bg } ${ c.text }` }>
            <span className={ `w-1.5 h-1.5 rounded-full ${ c.dot }` }></span>
            { c.label }
        </span>
    )
}
