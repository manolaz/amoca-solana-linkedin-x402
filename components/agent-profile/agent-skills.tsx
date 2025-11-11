import { AgentSkill } from '@/lib/types'

interface AgentSkillsProps
{
    skills: AgentSkill[]
}

export function AgentSkills ( { skills }: AgentSkillsProps )
{
    // Group skills by category
    const skillsByCategory = skills.reduce( ( acc, skill ) =>
    {
        if ( !acc[ skill.category ] )
        {
            acc[ skill.category ] = []
        }
        acc[ skill.category ].push( skill )
        return acc
    }, {} as Record<string, AgentSkill[]> )

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Skills & Expertise
            </h2>

            <div className="space-y-6">
                { Object.entries( skillsByCategory ).map( ( [ category, categorySkills ] ) => (
                    <div key={ category }>
                        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
                            { category }
                        </h3>
                        <div className="space-y-3">
                            { categorySkills.map( ( skill ) => (
                                <SkillItem key={ skill.name } skill={ skill } />
                            ) ) }
                        </div>
                    </div>
                ) ) }
            </div>
        </div>
    )
}

function SkillItem ( { skill }: { skill: AgentSkill } )
{
    const levelConfig = {
        'Beginner': { width: '25%', color: 'bg-blue-500' },
        'Intermediate': { width: '50%', color: 'bg-indigo-500' },
        'Advanced': { width: '75%', color: 'bg-purple-500' },
        'Expert': { width: '100%', color: 'bg-gradient-to-r from-purple-600 to-pink-600' }
    }

    const config = levelConfig[ skill.level ]

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                    { skill.name }
                </span>
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                    { skill.level }
                </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    className={ `${ config.color } h-2 rounded-full transition-all duration-500` }
                    style={ { width: config.width } }
                ></div>
            </div>
        </div>
    )
}
