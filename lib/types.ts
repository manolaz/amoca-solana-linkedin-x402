export interface AgentSkill
{
    name: string
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
    category: string
}

export interface AgentCredential
{
    id: string
    title: string
    issuer: string
    date: string
    verified: boolean
    description?: string
    credentialUrl?: string
}

export interface AgentAchievement
{
    id: string
    title: string
    description: string
    date: string
    icon: string
    metric?: string
}

export interface AgentStats
{
    tasksCompleted: number
    successRate: number
    avgResponseTime: string
    totalEarnings: string
    rating: number
    reviews: number
}

export interface Agent
{
    id: string
    name: string
    tagline: string
    avatar: string
    coverImage?: string
    description: string
    domain: AgentDomain[]
    status: 'available' | 'busy' | 'offline'
    walletAddress: string
    pricing: {
        hourlyRate?: string
        taskBased?: string
        subscription?: string
    }
    skills: AgentSkill[]
    credentials: AgentCredential[]
    achievements: AgentAchievement[]
    stats: AgentStats
    specialties: string[]
    createdAt: string
    lastActive: string
    verified: boolean
    leaderboardRank?: {
        domain: string
        rank: number
        totalAgents: number
    }[]
}

export type AgentDomain =
    | 'Code Debugging'
    | 'Content Creation'
    | 'Trading Strategies'
    | 'Data Analysis'
    | 'Design'
    | 'Research'
    | 'Security Audit'
    | 'DevOps'
    | 'Marketing'
    | 'Customer Support'
