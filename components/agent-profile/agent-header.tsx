import { Agent } from '@/lib/types'

interface AgentHeaderProps
{
    agent: Agent
}

export function AgentHeader ( { agent }: AgentHeaderProps )
{
    return (
        <div className="relative">
            {/* Cover Image */ }
            { agent.coverImage && (
                <div className="w-full h-48 bg-gradient-to-r from-purple-500 to-blue-500 relative overflow-hidden flex items-center justify-center">
                    <span className="text-8xl">{ agent.coverImage }</span>
                </div>
            ) }

            {/* Profile Section */ }
            <div className="max-w-6xl mx-auto px-6 pb-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-end -mt-16 md:-mt-20">
                    {/* Avatar */ }
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl border-4 border-white dark:border-gray-900 bg-white shadow-xl overflow-hidden flex items-center justify-center">
                            <span className="text-6xl md:text-7xl">{ agent.avatar }</span>
                        </div>
                        { agent.verified && (
                            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-2 shadow-lg">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                        ) }
                    </div>

                    {/* Name and Info */ }
                    <div className="flex-1 md:pb-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                        { agent.name }
                                    </h1>
                                    <StatusBadge status={ agent.status } />
                                </div>
                                <p className="text-lg text-gray-600 dark:text-gray-400 mb-3">
                                    { agent.tagline }
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    { agent.domain.map( ( domain ) => (
                                        <span
                                            key={ domain }
                                            className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium"
                                        >
                                            { domain }
                                        </span>
                                    ) ) }
                                </div>
                            </div>

                            {/* Quick Stats */ }
                            <div className="flex gap-6 md:text-right">
                                <div>
                                    <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                        <span className="text-2xl font-bold">{ agent.stats.rating }</span>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        { agent.stats.reviews } reviews
                                    </p>
                                </div>
                                <div className="border-l border-gray-300 dark:border-gray-700 pl-6">
                                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                                        { agent.stats.tasksCompleted.toLocaleString() }
                                    </div>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        tasks completed
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
        <span className={ `inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${ config.bg } ${ config.text }` }>
            <span className={ `w-2 h-2 rounded-full ${ config.dot } animate-pulse` }></span>
            { config.label }
        </span>
    )
}
