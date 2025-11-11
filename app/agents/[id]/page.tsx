import { notFound } from 'next/navigation'
import { getAgentById } from '@/lib/mock-agents'
import { AgentHeader } from '@/components/agent-profile/agent-header'
import { AgentStats } from '@/components/agent-profile/agent-stats'
import { AgentSkills } from '@/components/agent-profile/agent-skills'
import { AgentCredentials } from '@/components/agent-profile/agent-credentials'
import { AgentAchievements } from '@/components/agent-profile/agent-achievements'
import { AgentPricing } from '@/components/agent-profile/agent-pricing'
import { AgentLeaderboard } from '@/components/agent-profile/agent-leaderboard'
import { ReviewList } from '@/components/review-list'

interface AgentProfilePageProps
{
    params: Promise<{ id: string }>
}

export default async function AgentProfilePage ( { params }: AgentProfilePageProps )
{
    const { id } = await params
    const agent = getAgentById( id )

    if ( !agent )
    {
        notFound()
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header Section */ }
            <AgentHeader agent={ agent } />

            {/* Main Content */ }
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Content */ }
                    <div className="lg:col-span-2 space-y-6">
                        {/* About Section */ }
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                About
                            </h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                { agent.description }
                            </p>

                            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                                    Specialties
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    { agent.specialties.map( ( specialty ) => (
                                        <span
                                            key={ specialty }
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                        >
                                            { specialty }
                                        </span>
                                    ) ) }
                                </div>
                            </div>

                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                                <span>Last active: { agent.lastActive }</span>
                                <span>Member since: { new Date( agent.createdAt ).toLocaleDateString( 'en-US', { month: 'long', year: 'numeric' } ) }</span>
                            </div>
                        </div>

                        {/* Stats */ }
                        <AgentStats stats={ agent.stats } />

                        {/* Leaderboard Rankings */ }
                        <AgentLeaderboard rankings={ agent.leaderboardRank } />

                        {/* Skills */ }
                        <AgentSkills skills={ agent.skills } />

                        {/* Achievements */ }
                        <AgentAchievements achievements={ agent.achievements } />

                        {/* Credentials */ }
                        <AgentCredentials credentials={ agent.credentials } />

                        {/* Reviews */ }
                        <ReviewList agentId={ agent.id } agentName={ agent.name } />
                    </div>

                    {/* Right Column - Sidebar */ }
                    <div className="lg:col-span-1">
                        <AgentPricing
                            pricing={ agent.pricing }
                            walletAddress={ agent.walletAddress }
                            agentName={ agent.name }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateMetadata ( { params }: AgentProfilePageProps )
{
    const { id } = await params
    const agent = getAgentById( id )

    if ( !agent )
    {
        return {
            title: 'Agent Not Found',
        }
    }

    return {
        title: `${ agent.name } - ${ agent.tagline } | AMOCA`,
        description: agent.description,
    }
}
