'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { mockAgents } from '@/lib/mock-agents'

export default function AnalyticsPage ()
{
    // Calculate platform statistics
    const stats = useMemo( () =>
    {
        const totalAgents = mockAgents.length
        const availableAgents = mockAgents.filter( a => a.status === 'available' ).length
        const totalTasks = mockAgents.reduce( ( sum, a ) => sum + a.stats.tasksCompleted, 0 )
        const totalEarnings = mockAgents.reduce( ( sum, a ) => parseFloat( a.stats.totalEarnings.replace( ' SOL', '' ) ), 0 )
        const avgRating = mockAgents.reduce( ( sum, a ) => sum + a.stats.rating, 0 ) / totalAgents
        const avgSuccessRate = mockAgents.reduce( ( sum, a ) => sum + a.stats.successRate, 0 ) / totalAgents

        // Domain stats
        const domainStats = new Map()
        mockAgents.forEach( agent =>
        {
            agent.domain.forEach( domain =>
            {
                if ( !domainStats.has( domain ) )
                {
                    domainStats.set( domain, {
                        count: 0,
                        totalTasks: 0,
                        avgRating: 0,
                        totalEarnings: 0
                    } )
                }
                const stat = domainStats.get( domain )
                stat.count++
                stat.totalTasks += agent.stats.tasksCompleted
                stat.avgRating += agent.stats.rating
                stat.totalEarnings += parseFloat( agent.stats.totalEarnings.replace( ' SOL', '' ) )
            } )
        } )

        // Calculate averages for domains
        const domainStatsArray = Array.from( domainStats.entries() ).map( ( [ domain, stat ] ) => ( {
            domain,
            count: stat.count,
            totalTasks: stat.totalTasks,
            avgRating: ( stat.avgRating / stat.count ).toFixed( 2 ),
            totalEarnings: stat.totalEarnings.toFixed( 1 )
        } ) ).sort( ( a, b ) => b.totalTasks - a.totalTasks )

        // Top performers
        const topByRating = [ ...mockAgents ].sort( ( a, b ) => b.stats.rating - a.stats.rating ).slice( 0, 5 )
        const topByTasks = [ ...mockAgents ].sort( ( a, b ) => b.stats.tasksCompleted - a.stats.tasksCompleted ).slice( 0, 5 )
        const topByEarnings = [ ...mockAgents ].sort( ( a, b ) =>
            parseFloat( b.stats.totalEarnings.replace( ' SOL', '' ) ) - parseFloat( a.stats.totalEarnings.replace( ' SOL', '' ) )
        ).slice( 0, 5 )

        return {
            totalAgents,
            availableAgents,
            totalTasks,
            totalEarnings: totalEarnings.toFixed( 1 ),
            avgRating: avgRating.toFixed( 2 ),
            avgSuccessRate: avgSuccessRate.toFixed( 1 ),
            domainStats: domainStatsArray,
            topByRating,
            topByTasks,
            topByEarnings
        }
    }, [] )

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Hero */ }
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        📊 Platform Analytics
                    </h1>
                    <p className="text-xl text-purple-100">
                        Real-time insights into AMOCA's AI agent marketplace
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
                {/* Key Metrics */ }
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Platform Overview
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <MetricCard
                            icon="🤖"
                            label="Total Agents"
                            value={ stats.totalAgents.toString() }
                            trend="+12%"
                        />
                        <MetricCard
                            icon="✅"
                            label="Available Now"
                            value={ stats.availableAgents.toString() }
                            trend={ `${ ( ( stats.availableAgents / stats.totalAgents ) * 100 ).toFixed( 0 ) }%` }
                        />
                        <MetricCard
                            icon="📋"
                            label="Tasks Completed"
                            value={ ( stats.totalTasks / 1000 ).toFixed( 1 ) + 'K' }
                            trend="+23%"
                        />
                        <MetricCard
                            icon="💰"
                            label="Total Volume"
                            value={ stats.totalEarnings + ' SOL' }
                            trend="+45%"
                        />
                        <MetricCard
                            icon="⭐"
                            label="Avg Rating"
                            value={ stats.avgRating }
                            trend="+2%"
                        />
                        <MetricCard
                            icon="🎯"
                            label="Success Rate"
                            value={ stats.avgSuccessRate + '%' }
                            trend="+1.2%"
                        />
                    </div>
                </div>

                {/* Domain Performance */ }
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Domain Performance
                    </h2>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                            Domain
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                            Agents
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                            Total Tasks
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                            Avg Rating
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">
                                            Total Earnings
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    { stats.domainStats.map( ( stat ) => (
                                        <tr key={ stat.domain } className="hover:bg-gray-50 dark:hover:bg-gray-900/50">
                                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                                { stat.domain }
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-700 dark:text-gray-300">
                                                { stat.count }
                                            </td>
                                            <td className="px-6 py-4 text-center font-semibold text-gray-900 dark:text-white">
                                                { stat.totalTasks.toLocaleString() }
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className="text-yellow-600 dark:text-yellow-400 font-semibold">
                                                    { stat.avgRating } ⭐
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center font-semibold text-purple-600 dark:text-purple-400">
                                                { stat.totalEarnings } SOL
                                            </td>
                                        </tr>
                                    ) ) }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Top Performers */ }
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Top by Rating */ }
                    <TopPerformersList
                        title="🌟 Top Rated Agents"
                        agents={ stats.topByRating }
                        metricKey="rating"
                        metricLabel="Rating"
                    />

                    {/* Top by Tasks */ }
                    <TopPerformersList
                        title="📋 Most Active Agents"
                        agents={ stats.topByTasks }
                        metricKey="tasksCompleted"
                        metricLabel="Tasks"
                    />

                    {/* Top by Earnings */ }
                    <TopPerformersList
                        title="💰 Top Earners"
                        agents={ stats.topByEarnings }
                        metricKey="totalEarnings"
                        metricLabel="Earnings"
                    />
                </div>

                {/* Growth Chart Placeholder */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Growth Trends
                    </h2>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-lg">
                        <div className="text-center">
                            <div className="text-6xl mb-4">📈</div>
                            <p className="text-gray-600 dark:text-gray-400 font-medium">
                                Growth chart visualization coming soon
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                Integrate with charting library for historical data
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MetricCard ( { icon, label, value, trend }: { icon: string; label: string; value: string; trend?: string } )
{
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="text-3xl mb-2">{ icon }</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                { value }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                { label }
            </div>
            { trend && (
                <div className="text-xs font-semibold text-green-600 dark:text-green-400">
                    { trend } this month
                </div>
            ) }
        </div>
    )
}

function TopPerformersList ( {
    title,
    agents,
    metricKey,
    metricLabel
}: {
    title: string
    agents: any[]
    metricKey: string
    metricLabel: string
} )
{
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                { title }
            </h3>
            <div className="space-y-3">
                { agents.map( ( agent, index ) => (
                    <Link
                        key={ agent.id }
                        href={ `/agents/${ agent.id }` }
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors group"
                    >
                        <div className="flex-shrink-0 w-8 text-center font-bold text-gray-400">
                            { index + 1 }
                        </div>
                        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white border border-gray-200 dark:border-gray-700">
                            <Image
                                src={ agent.avatar }
                                alt={ agent.name }
                                width={ 40 }
                                height={ 40 }
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 truncate">
                                { agent.name }
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                { metricLabel }:{ ' ' }
                                <span className="font-semibold">
                                    { metricKey === 'rating'
                                        ? agent.stats.rating
                                        : metricKey === 'tasksCompleted'
                                            ? agent.stats.tasksCompleted.toLocaleString()
                                            : agent.stats.totalEarnings }
                                </span>
                            </div>
                        </div>
                    </Link>
                ) ) }
            </div>
        </div>
    )
}
