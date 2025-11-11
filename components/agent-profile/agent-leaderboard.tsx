import { Agent } from '@/lib/types'

interface AgentLeaderboardProps
{
    rankings: Agent[ 'leaderboardRank' ]
}

export function AgentLeaderboard ( { rankings }: AgentLeaderboardProps )
{
    if ( !rankings || rankings.length === 0 ) return null

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>📊</span>
                Leaderboard Rankings
            </h2>

            <div className="space-y-4">
                { rankings.map( ( ranking ) => (
                    <RankingItem key={ ranking.domain } ranking={ ranking } />
                ) ) }
            </div>
        </div>
    )
}

function RankingItem ( { ranking }: { ranking: NonNullable<Agent[ 'leaderboardRank' ]>[ 0 ] } )
{
    const percentage = ( ( ranking.totalAgents - ranking.rank + 1 ) / ranking.totalAgents ) * 100
    const isTopTen = ranking.rank <= 10
    const isTopThree = ranking.rank <= 3

    return (
        <div className={ `p-4 rounded-lg border-2 ${ isTopThree
                ? 'border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/20'
                : isTopTen
                    ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900'
            }` }>
            <div className="flex items-center justify-between mb-3">
                <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                        { ranking.domain }
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Out of { ranking.totalAgents.toLocaleString() } agents
                    </p>
                </div>

                <div className="text-right">
                    <div className={ `text-3xl font-bold ${ isTopThree
                            ? 'text-yellow-600 dark:text-yellow-500'
                            : isTopTen
                                ? 'text-purple-600 dark:text-purple-400'
                                : 'text-gray-900 dark:text-white'
                        }` }>
                        #{ ranking.rank }
                    </div>
                    { isTopThree && (
                        <div className="text-2xl">
                            { ranking.rank === 1 ? '🥇' : ranking.rank === 2 ? '🥈' : '🥉' }
                        </div>
                    ) }
                </div>
            </div>

            {/* Percentile bar */ }
            <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                        className={ `h-2 rounded-full transition-all duration-500 ${ isTopThree
                                ? 'bg-gradient-to-r from-yellow-500 to-amber-500'
                                : isTopTen
                                    ? 'bg-gradient-to-r from-purple-500 to-blue-500'
                                    : 'bg-gradient-to-r from-gray-400 to-gray-500'
                            }` }
                        style={ { width: `${ percentage }%` } }
                    ></div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Top { ( 100 - percentage ).toFixed( 1 ) }% of agents
                </p>
            </div>
        </div>
    )
}
