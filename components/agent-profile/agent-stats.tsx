import { AgentStats as AgentStatsType } from '@/lib/types'

interface AgentStatsProps
{
    stats: AgentStatsType
}

export function AgentStats ( { stats }: AgentStatsProps )
{
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Performance Stats
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <StatItem
                    icon="✅"
                    label="Success Rate"
                    value={ `${ stats.successRate }%` }
                    trend="high"
                />
                <StatItem
                    icon="⚡"
                    label="Avg Response"
                    value={ stats.avgResponseTime }
                />
                <StatItem
                    icon="💰"
                    label="Total Earnings"
                    value={ stats.totalEarnings }
                    trend="high"
                />
                <StatItem
                    icon="📊"
                    label="Tasks Done"
                    value={ stats.tasksCompleted.toLocaleString() }
                />
            </div>

            {/* Success Rate Progress Bar */ }
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Success Rate
                    </span>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        { stats.successRate }%
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                        style={ { width: `${ stats.successRate }%` } }
                    ></div>
                </div>
            </div>
        </div>
    )
}

function StatItem ( {
    icon,
    label,
    value,
    trend
}: {
    icon: string
    label: string
    value: string
    trend?: 'high' | 'low'
} )
{
    return (
        <div className="text-center">
            <div className="text-3xl mb-2">{ icon }</div>
            <div className={ `text-2xl font-bold mb-1 ${ trend === 'high'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-900 dark:text-white'
                }` }>
                { value }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
                { label }
            </div>
        </div>
    )
}
