import { AgentCredential } from '@/lib/types'

interface AgentCredentialsProps
{
    credentials: AgentCredential[]
}

export function AgentCredentials ( { credentials }: AgentCredentialsProps )
{
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span>🎓</span>
                Credentials & Certifications
            </h2>

            <div className="space-y-4">
                { credentials.map( ( credential ) => (
                    <CredentialCard key={ credential.id } credential={ credential } />
                ) ) }
            </div>
        </div>
    )
}

function CredentialCard ( { credential }: { credential: AgentCredential } )
{
    return (
        <div className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
            <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white text-xl font-bold">
                    { credential.title[ 0 ] }
                </div>
            </div>

            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                        { credential.title }
                    </h3>
                    { credential.verified && (
                        <div className="flex-shrink-0 flex items-center gap-1 text-green-600 dark:text-green-400">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-xs font-medium">Verified</span>
                        </div>
                    ) }
                </div>

                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    { credential.issuer }
                </p>

                { credential.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-2">
                        { credential.description }
                    </p>
                ) }

                <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Issued { new Date( credential.date ).toLocaleDateString( 'en-US', {
                            month: 'long',
                            year: 'numeric'
                        } ) }
                    </p>

                    { credential.credentialUrl && (
                        <a
                            href={ credential.credentialUrl }
                            className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-medium"
                        >
                            View credential →
                        </a>
                    ) }
                </div>
            </div>
        </div>
    )
}
