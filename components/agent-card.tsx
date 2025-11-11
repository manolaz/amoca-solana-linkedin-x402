import Link from 'next/link'
import { Agent } from '@/lib/types'

interface AgentCardProps
{
    agent: Agent
}

export function AgentCard ( { agent }: AgentCardProps )
{
    return (
        <Link
            href={ `/agents/${ agent.id }` }
            className="block bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-200 overflow-hidden group"
        >
            {/* Cover Image */ }
            { agent.coverImage && (
                <div className="w-full h-32 bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden flex items-center justify-center">
                    <span className="text-6xl">{ agent.coverImage }</span>
                </div>
            ) }

            <div className="p-5">
                {/* Avatar & Header */ }
                <div className="flex gap-4 mb-4 -mt-12">
                    <div className="relative flex-shrink-0">
                        <div className="w-20 h-20 rounded-xl border-4 border-white dark:border-gray-800 bg-white shadow-lg overflow-hidden flex items-center justify-center">
                            <span className="text-4xl">{ agent.avatar }</span>
                        </div>
                        { agent.verified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        ) }
                    </div>

                    <div className="flex-1 min-w-0 pt-8">
                        <StatusBadge status={ agent.status } />
                    </div>
                </div>

                {/* Name & Title */ }
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 truncate group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    { agent.name }
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                    { agent.tagline }
                </p>

                {/* Domains */ }
                <div className="flex flex-wrap gap-2 mb-4">
                    { agent.domain.slice( 0, 2 ).map( ( domain ) => (
                        <span
                            key={ domain }
                            className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs font-medium"
                        >
                            { domain }
                        </span>
                    ) ) }
                    { agent.domain.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                            +{ agent.domain.length - 2 }
                        </span>
                    ) }
                </div>

                {/* Stats */ }
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-yellow-500">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm font-bold">{ agent.stats.rating }</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">({ agent.stats.reviews })</span>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold text-gray-900 dark:text-white">
                            { agent.stats.tasksCompleted.toLocaleString() }
                        </span> tasks
                    </div>

                    { agent.pricing.hourlyRate && (
                        <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                            { agent.pricing.hourlyRate }/hr
                        </div>
                    ) }
                </div>

                {/* Top Ranking Badge */ }
                { agent.leaderboardRank && agent.leaderboardRank[ 0 ]?.rank <= 3 && (
                    <div className="mt-3 px-3 py-2 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-2">
                        <span className="text-xl">
                            { agent.leaderboardRank[ 0 ].rank === 1 ? '🥇' : agent.leaderboardRank[ 0 ].rank === 2 ? '🥈' : '🥉' }
                        </span>
                        <span className="text-xs font-semibold text-yellow-800 dark:text-yellow-300">
                            #{ agent.leaderboardRank[ 0 ].rank } in { agent.leaderboardRank[ 0 ].domain }
                        </span>
                    </div>
                ) }
            </div>
        </Link>
    )
}

function StatusBadge ( { status }: { status: Agent[ 'status' ] } )
{
    const statusConfig = {
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

    const config = statusConfig[ status ]

    return (
        <span className={ `inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${ config.bg } ${ config.text }` }>
            <span className={ `w-1.5 h-1.5 rounded-full ${ config.dot }` }></span>
            { config.label }
        </span>
    )
}
