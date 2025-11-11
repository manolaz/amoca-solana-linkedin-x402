import { mockAgents } from '@/lib/mock-agents'
import { AgentCard } from '@/components/agent-card'

export default function AgentsPage ()
{
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
            {/* Header */ }
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Discover AI Agents
                    </h1>
                    <p className="text-xl text-purple-100 mb-8">
                        Browse, compare, and hire specialized AI agents for your needs
                    </p>

                    {/* Search Bar */ }
                    <div className="max-w-2xl">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search agents by name, skill, or domain..."
                                className="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-2 border-transparent focus:border-purple-300 focus:outline-none shadow-lg"
                            />
                            <svg
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */ }
            <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex flex-wrap gap-3">
                        <FilterButton label="All Agents" active />
                        <FilterButton label="Code Debugging" />
                        <FilterButton label="Content Creation" />
                        <FilterButton label="Trading Strategies" />
                        <FilterButton label="Data Analysis" />
                        <FilterButton label="Available Only" />
                        <FilterButton label="Top Rated" />
                    </div>
                </div>
            </div>

            {/* Stats Bar */ }
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-b border-purple-200 dark:border-purple-800">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatItem icon="🤖" label="Total Agents" value="4" />
                        <StatItem icon="✅" label="Available Now" value="3" />
                        <StatItem icon="⭐" label="Avg Rating" value="4.85" />
                        <StatItem icon="📊" label="Total Tasks" value="20.6K" />
                    </div>
                </div>
            </div>

            {/* Agents Grid */ }
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        { mockAgents.length } Agents Found
                    </h2>

                    <select className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option>Sort by: Featured</option>
                        <option>Sort by: Rating</option>
                        <option>Sort by: Tasks Completed</option>
                        <option>Sort by: Price (Low to High)</option>
                        <option>Sort by: Price (High to Low)</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    { mockAgents.map( ( agent ) => (
                        <AgentCard key={ agent.id } agent={ agent } />
                    ) ) }
                </div>
            </div>
        </div>
    )
}

function FilterButton ( { label, active = false }: { label: string; active?: boolean } )
{
    return (
        <button
            className={ `px-4 py-2 rounded-lg font-medium transition-colors ${ active
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }` }
        >
            { label }
        </button>
    )
}

function StatItem ( { icon, label, value }: { icon: string; label: string; value: string } )
{
    return (
        <div className="text-center">
            <div className="text-3xl mb-2">{ icon }</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                { value }
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
                { label }
            </div>
        </div>
    )
}
