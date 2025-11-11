'use client'

import { useState, useMemo } from 'react'
import { mockAgents } from '@/lib/mock-agents'
import { AgentCard } from '@/components/agent-card'
import { AgentDomain } from '@/lib/types'

type SortOption = 'featured' | 'rating' | 'tasks' | 'price-low' | 'price-high'

export default function AgentsPage ()
{
    const [ searchQuery, setSearchQuery ] = useState( '' )
    const [ selectedDomain, setSelectedDomain ] = useState<string>( 'all' )
    const [ selectedStatus, setSelectedStatus ] = useState<string>( 'all' )
    const [ minRating, setMinRating ] = useState<number>( 0 )
    const [ sortBy, setSortBy ] = useState<SortOption>( 'featured' )

    // Filter and sort agents
    const filteredAgents = useMemo( () =>
    {
        let filtered = mockAgents.filter( agent =>
        {
            // Search filter
            if ( searchQuery )
            {
                const query = searchQuery.toLowerCase()
                const matchesSearch =
                    agent.name.toLowerCase().includes( query ) ||
                    agent.tagline.toLowerCase().includes( query ) ||
                    agent.description.toLowerCase().includes( query ) ||
                    agent.domain.some( d => d.toLowerCase().includes( query ) ) ||
                    agent.skills.some( s => s.name.toLowerCase().includes( query ) ) ||
                    agent.specialties.some( s => s.toLowerCase().includes( query ) )

                if ( !matchesSearch ) return false
            }

            // Domain filter
            if ( selectedDomain !== 'all' )
            {
                if ( !agent.domain.includes( selectedDomain as AgentDomain ) ) return false
            }

            // Status filter
            if ( selectedStatus !== 'all' )
            {
                if ( agent.status !== selectedStatus ) return false
            }

            // Rating filter
            if ( minRating > 0 )
            {
                if ( agent.stats.rating < minRating ) return false
            }

            return true
        } )

        // Sort agents
        switch ( sortBy )
        {
            case 'rating':
                filtered.sort( ( a, b ) => b.stats.rating - a.stats.rating )
                break
            case 'tasks':
                filtered.sort( ( a, b ) => b.stats.tasksCompleted - a.stats.tasksCompleted )
                break
            case 'price-low':
                filtered.sort( ( a, b ) =>
                {
                    const priceA = parseFloat( a.pricing.hourlyRate?.replace( '$', '' ) || '999' )
                    const priceB = parseFloat( b.pricing.hourlyRate?.replace( '$', '' ) || '999' )
                    return priceA - priceB
                } )
                break
            case 'price-high':
                filtered.sort( ( a, b ) =>
                {
                    const priceA = parseFloat( a.pricing.hourlyRate?.replace( '$', '' ) || '0' )
                    const priceB = parseFloat( b.pricing.hourlyRate?.replace( '$', '' ) || '0' )
                    return priceB - priceA
                } )
                break
            default: // featured
                // Keep original order
                break
        }

        return filtered
    }, [ searchQuery, selectedDomain, selectedStatus, minRating, sortBy ] )

    const availableCount = mockAgents.filter( a => a.status === 'available' ).length
    const avgRating = ( mockAgents.reduce( ( sum, a ) => sum + a.stats.rating, 0 ) / mockAgents.length ).toFixed( 2 )
    const totalTasks = mockAgents.reduce( ( sum, a ) => sum + a.stats.tasksCompleted, 0 )

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
                                value={ searchQuery }
                                onChange={ ( e ) => setSearchQuery( e.target.value ) }
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
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Domain</h3>
                            <div className="flex flex-wrap gap-2">
                                <FilterButton
                                    label="All Agents"
                                    active={ selectedDomain === 'all' }
                                    onClick={ () => setSelectedDomain( 'all' ) }
                                />
                                <FilterButton
                                    label="Code Debugging"
                                    active={ selectedDomain === 'Code Debugging' }
                                    onClick={ () => setSelectedDomain( 'Code Debugging' ) }
                                />
                                <FilterButton
                                    label="Content Creation"
                                    active={ selectedDomain === 'Content Creation' }
                                    onClick={ () => setSelectedDomain( 'Content Creation' ) }
                                />
                                <FilterButton
                                    label="Trading Strategies"
                                    active={ selectedDomain === 'Trading Strategies' }
                                    onClick={ () => setSelectedDomain( 'Trading Strategies' ) }
                                />
                                <FilterButton
                                    label="Data Analysis"
                                    active={ selectedDomain === 'Data Analysis' }
                                    onClick={ () => setSelectedDomain( 'Data Analysis' ) }
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Status</h3>
                                <div className="flex gap-2">
                                    <FilterButton
                                        label="All"
                                        active={ selectedStatus === 'all' }
                                        onClick={ () => setSelectedStatus( 'all' ) }
                                    />
                                    <FilterButton
                                        label="Available"
                                        active={ selectedStatus === 'available' }
                                        onClick={ () => setSelectedStatus( 'available' ) }
                                    />
                                    <FilterButton
                                        label="Busy"
                                        active={ selectedStatus === 'busy' }
                                        onClick={ () => setSelectedStatus( 'busy' ) }
                                    />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Min Rating</h3>
                                <div className="flex gap-2">
                                    <FilterButton
                                        label="Any"
                                        active={ minRating === 0 }
                                        onClick={ () => setMinRating( 0 ) }
                                    />
                                    <FilterButton
                                        label="4+ ⭐"
                                        active={ minRating === 4 }
                                        onClick={ () => setMinRating( 4 ) }
                                    />
                                    <FilterButton
                                        label="4.5+ ⭐"
                                        active={ minRating === 4.5 }
                                        onClick={ () => setMinRating( 4.5 ) }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Bar */ }
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-b border-purple-200 dark:border-purple-800">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <StatItem icon="🤖" label="Total Agents" value={ mockAgents.length.toString() } />
                        <StatItem icon="✅" label="Available Now" value={ availableCount.toString() } />
                        <StatItem icon="⭐" label="Avg Rating" value={ avgRating } />
                        <StatItem icon="📊" label="Total Tasks" value={ ( totalTasks / 1000 ).toFixed( 1 ) + 'K' } />
                    </div>
                </div>
            </div>

            {/* Agents Grid */ }
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        { filteredAgents.length } Agent{ filteredAgents.length !== 1 ? 's' : '' } Found
                    </h2>

                    <select
                        value={ sortBy }
                        onChange={ ( e ) => setSortBy( e.target.value as SortOption ) }
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="featured">Sort by: Featured</option>
                        <option value="rating">Sort by: Rating</option>
                        <option value="tasks">Sort by: Tasks Completed</option>
                        <option value="price-low">Sort by: Price (Low to High)</option>
                        <option value="price-high">Sort by: Price (High to Low)</option>
                    </select>
                </div>

                { filteredAgents.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No agents found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Try adjusting your filters or search query
                        </p>
                        <button
                            onClick={ () =>
                            {
                                setSearchQuery( '' )
                                setSelectedDomain( 'all' )
                                setSelectedStatus( 'all' )
                                setMinRating( 0 )
                            } }
                            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        { filteredAgents.map( ( agent ) => (
                            <AgentCard key={ agent.id } agent={ agent } />
                        ) ) }
                    </div>
                ) }
            </div>
        </div>
    )
}

function FilterButton ( { label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void } )
{
    return (
        <button
            onClick={ onClick }
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
