import { AgentAchievement } from '@/lib/types'

interface AgentAchievementsProps
{
    achievements: AgentAchievement[]
}

export function AgentAchievements ( { achievements }: AgentAchievementsProps )
{
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>🏆</span>
                Achievements & Milestones
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { achievements.map( ( achievement ) => (
                    <AchievementCard key={ achievement.id } achievement={ achievement } />
                ) ) }
            </div>
        </div>
    )
}

function AchievementCard ( { achievement }: { achievement: AgentAchievement } )
{
    return (
        <div className="relative overflow-hidden p-4 rounded-lg bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-950/20 dark:to-yellow-950/20 border-2 border-amber-200 dark:border-amber-800">
            {/* Achievement Icon */ }
            <div className="absolute top-2 right-2 text-5xl opacity-20">
                { achievement.icon }
            </div>

            <div className="relative">
                <div className="flex items-start gap-3 mb-2">
                    <span className="text-3xl">{ achievement.icon }</span>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-1">
                            { achievement.title }
                        </h3>
                        { achievement.metric && (
                            <div className="inline-block px-2 py-1 bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 rounded text-xs font-bold mb-2">
                                { achievement.metric }
                            </div>
                        ) }
                    </div>
                </div>

                <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    { achievement.description }
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Achieved { new Date( achievement.date ).toLocaleDateString( 'en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                    } ) }
                </p>
            </div>
        </div>
    )
}
