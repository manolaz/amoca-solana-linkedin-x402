'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Review
{
    id: string
    userId: string
    userName: string
    userAvatar: string
    agentId: string
    taskId: string
    rating: number
    title: string
    reviewText: string
    pros: string[]
    cons: string[]
    wouldHireAgain: boolean
    responseTimeRating: number
    qualityRating: number
    communicationRating: number
    valueRating: number
    helpfulCount: number
    createdAt: string
    verifiedHire: boolean
}

interface ReviewListProps
{
    agentId: string
    agentName: string
}

// Mock reviews for demonstration
const mockReviews: Review[] = [
    {
        id: 'review-001',
        userId: 'user-001',
        userName: 'Alice Johnson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        agentId: 'agent-001',
        taskId: 'task-001',
        rating: 5,
        title: 'Exceptional debugging skills!',
        reviewText: 'CodeMaster AI fixed a critical memory leak in our production app within 2 hours. The solution was elegant and came with detailed documentation. Highly recommend!',
        pros: [ 'Fast response', 'Expert knowledge', 'Great documentation' ],
        cons: [],
        wouldHireAgain: true,
        responseTimeRating: 5,
        qualityRating: 5,
        communicationRating: 5,
        valueRating: 5,
        helpfulCount: 24,
        createdAt: '2024-11-05',
        verifiedHire: true
    },
    {
        id: 'review-002',
        userId: 'user-002',
        userName: 'Bob Smith',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        agentId: 'agent-001',
        taskId: 'task-002',
        rating: 4,
        title: 'Great work, minor communication delay',
        reviewText: 'Solved our performance issues quickly. Only minor issue was some delays in communication, but the final result was excellent.',
        pros: [ 'Technical expertise', 'Problem-solving' ],
        cons: [ 'Communication could be faster' ],
        wouldHireAgain: true,
        responseTimeRating: 3,
        qualityRating: 5,
        communicationRating: 4,
        valueRating: 4,
        helpfulCount: 12,
        createdAt: '2024-10-28',
        verifiedHire: true
    }
]

export function ReviewList ( { agentId, agentName }: ReviewListProps )
{
    const [ reviews ] = useState<Review[]>( mockReviews.filter( r => r.agentId === agentId ) )
    const [ sortBy, setSortBy ] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>( 'recent' )

    const sortedReviews = [ ...reviews ].sort( ( a, b ) =>
    {
        switch ( sortBy )
        {
            case 'highest':
                return b.rating - a.rating
            case 'lowest':
                return a.rating - b.rating
            case 'helpful':
                return b.helpfulCount - a.helpfulCount
            default: // recent
                return new Date( b.createdAt ).getTime() - new Date( a.createdAt ).getTime()
        }
    } )

    const avgRating = reviews.reduce( ( sum, r ) => sum + r.rating, 0 ) / reviews.length
    const ratingDistribution = [ 5, 4, 3, 2, 1 ].map( star => ( {
        star,
        count: reviews.filter( r => r.rating === star ).length,
        percentage: ( reviews.filter( r => r.rating === star ).length / reviews.length ) * 100
    } ) )

    return (
        <div className="space-y-6">
            {/* Review Summary */ }
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Reviews & Ratings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Overall Rating */ }
                    <div className="text-center">
                        <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                            { avgRating.toFixed( 1 ) }
                        </div>
                        <div className="flex items-center justify-center gap-1 mb-2">
                            { [ ...Array( 5 ) ].map( ( _, i ) => (
                                <svg
                                    key={ i }
                                    className={ `w-6 h-6 ${ i < Math.round( avgRating ) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                        }` }
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ) ) }
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            Based on { reviews.length } reviews
                        </div>
                    </div>

                    {/* Rating Distribution */ }
                    <div className="space-y-2">
                        { ratingDistribution.map( ( { star, count, percentage } ) => (
                            <div key={ star } className="flex items-center gap-3">
                                <div className="w-12 text-sm text-gray-700 dark:text-gray-300">
                                    { star } ⭐
                                </div>
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-yellow-400 h-2 rounded-full transition-all"
                                        style={ { width: `${ percentage }%` } }
                                    />
                                </div>
                                <div className="w-12 text-sm text-gray-600 dark:text-gray-400 text-right">
                                    { count }
                                </div>
                            </div>
                        ) ) }
                    </div>
                </div>
            </div>

            {/* Sort Options */ }
            <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    { reviews.length } Review{ reviews.length !== 1 ? 's' : '' }
                </h4>
                <select
                    value={ sortBy }
                    onChange={ ( e ) => setSortBy( e.target.value as any ) }
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <option value="recent">Most Recent</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                    <option value="helpful">Most Helpful</option>
                </select>
            </div>

            {/* Review List */ }
            <div className="space-y-4">
                { sortedReviews.map( ( review ) => (
                    <ReviewCard key={ review.id } review={ review } />
                ) ) }
            </div>

            { reviews.length === 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <div className="text-6xl mb-4">💭</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        No reviews yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        Be the first to hire { agentName } and leave a review!
                    </p>
                </div>
            ) }
        </div>
    )
}

function ReviewCard ( { review }: { review: Review } )
{
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {/* Header */ }
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
                        <Image
                            src={ review.userAvatar }
                            alt={ review.userName }
                            width={ 48 }
                            height={ 48 }
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900 dark:text-white">
                                { review.userName }
                            </span>
                            { review.verifiedHire && (
                                <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                                    ✓ Verified Hire
                                </span>
                            ) }
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                            { new Date( review.createdAt ).toLocaleDateString( 'en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            } ) }
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    { [ ...Array( 5 ) ].map( ( _, i ) => (
                        <svg
                            key={ i }
                            className={ `w-5 h-5 ${ i < review.rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                                }` }
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ) ) }
                </div>
            </div>

            {/* Title */ }
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                { review.title }
            </h4>

            {/* Review Text */ }
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                { review.reviewText }
            </p>

            {/* Pros & Cons */ }
            { ( review.pros.length > 0 || review.cons.length > 0 ) && (
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                    { review.pros.length > 0 && (
                        <div>
                            <div className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                                👍 Pros
                            </div>
                            <ul className="space-y-1">
                                { review.pros.map( ( pro, i ) => (
                                    <li key={ i } className="text-sm text-gray-700 dark:text-gray-300">
                                        • { pro }
                                    </li>
                                ) ) }
                            </ul>
                        </div>
                    ) }
                    { review.cons.length > 0 && (
                        <div>
                            <div className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                                👎 Cons
                            </div>
                            <ul className="space-y-1">
                                { review.cons.map( ( con, i ) => (
                                    <li key={ i } className="text-sm text-gray-700 dark:text-gray-300">
                                        • { con }
                                    </li>
                                ) ) }
                            </ul>
                        </div>
                    ) }
                </div>
            ) }

            {/* Rating Breakdown */ }
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <RatingItem label="Response Time" rating={ review.responseTimeRating } />
                <RatingItem label="Quality" rating={ review.qualityRating } />
                <RatingItem label="Communication" rating={ review.communicationRating } />
                <RatingItem label="Value" rating={ review.valueRating } />
            </div>

            {/* Actions */ }
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                    </svg>
                    Helpful ({ review.helpfulCount })
                </button>
                { review.wouldHireAgain && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Would hire again
                    </div>
                ) }
            </div>
        </div>
    )
}

function RatingItem ( { label, rating }: { label: string; rating: number } )
{
    return (
        <div className="text-center">
            <div className="text-lg font-bold text-gray-900 dark:text-white">
                { rating }.0
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
                { label }
            </div>
        </div>
    )
}
