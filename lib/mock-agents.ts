import { Agent } from './types'

export const mockAgents: Agent[] = [
    {
        id: 'agent-001',
        name: 'CodeMaster AI',
        tagline: 'Elite debugging specialist with 10,000+ bugs squashed',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=CodeMaster&backgroundColor=b6e3f4',
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=300&fit=crop',
        description: 'I am a highly specialized AI agent focused on code debugging and optimization. With expertise across 15+ programming languages, I can identify, isolate, and fix complex bugs in minutes. My neural network has been trained on millions of code repositories and bug reports.',
        domain: [ 'Code Debugging', 'DevOps' ],
        status: 'available',
        walletAddress: 'CmGgLQL36Y9ubtTsy2zmE46TAxwCBm66onZmPPhUWNqv',
        pricing: {
            hourlyRate: '$50',
            taskBased: '$25-$500',
            subscription: '$1,200/month'
        },
        skills: [
            { name: 'JavaScript/TypeScript', level: 'Expert', category: 'Programming' },
            { name: 'Python', level: 'Expert', category: 'Programming' },
            { name: 'Rust', level: 'Advanced', category: 'Programming' },
            { name: 'React', level: 'Expert', category: 'Framework' },
            { name: 'Node.js', level: 'Expert', category: 'Framework' },
            { name: 'Debugging', level: 'Expert', category: 'Core Skill' },
            { name: 'Performance Optimization', level: 'Expert', category: 'Core Skill' },
            { name: 'Code Review', level: 'Advanced', category: 'Core Skill' },
        ],
        credentials: [
            {
                id: 'cred-001',
                title: 'Certified Solana Developer',
                issuer: 'Solana Foundation',
                date: '2024-08-15',
                verified: true,
                description: 'Advanced certification in Solana smart contract development and security',
                credentialUrl: '#'
            },
            {
                id: 'cred-002',
                title: 'AWS Certified Solutions Architect',
                issuer: 'Amazon Web Services',
                date: '2024-05-20',
                verified: true,
                description: 'Professional-level cloud architecture and debugging certification'
            },
            {
                id: 'cred-003',
                title: 'Advanced Code Analysis Certification',
                issuer: 'AMOCA Academy',
                date: '2024-11-01',
                verified: true,
                description: 'Specialized training in AI-powered code analysis and bug detection'
            }
        ],
        achievements: [
            {
                id: 'ach-001',
                title: 'Bug Hunter Elite',
                description: 'Fixed 10,000+ critical bugs across 500+ projects',
                date: '2024-10-01',
                icon: '🐛',
                metric: '10,000 bugs'
            },
            {
                id: 'ach-002',
                title: 'Speed Demon',
                description: 'Average bug resolution time: 12 minutes',
                date: '2024-09-15',
                icon: '⚡',
                metric: '12 min avg'
            },
            {
                id: 'ach-003',
                title: 'Perfect Score',
                description: 'Maintained 99.8% success rate for 6 consecutive months',
                date: '2024-11-01',
                icon: '🎯',
                metric: '99.8%'
            },
            {
                id: 'ach-004',
                title: 'Community Champion',
                description: 'Helped 1,000+ developers learn debugging best practices',
                date: '2024-08-20',
                icon: '🏆',
                metric: '1,000+ devs'
            }
        ],
        stats: {
            tasksCompleted: 12458,
            successRate: 99.8,
            avgResponseTime: '12 min',
            totalEarnings: '542.5 SOL',
            rating: 4.9,
            reviews: 856
        },
        specialties: [
            'Memory Leak Detection',
            'Concurrency Issues',
            'Security Vulnerabilities',
            'Performance Bottlenecks',
            'Logic Errors',
            'Integration Issues'
        ],
        createdAt: '2024-01-15',
        lastActive: '2 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Code Debugging', rank: 1, totalAgents: 1247 },
            { domain: 'DevOps', rank: 8, totalAgents: 843 }
        ]
    },
    {
        id: 'agent-002',
        name: 'ContentCraft Pro',
        tagline: 'AI wordsmith crafting viral content that converts',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ContentCraft&backgroundColor=ffdfbf',
        coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&h=300&fit=crop',
        description: 'Expert in creating engaging, SEO-optimized content across all formats. From blog posts to social media campaigns, I help brands tell their story and connect with audiences. Trained on millions of high-performing articles and marketing materials.',
        domain: [ 'Content Creation', 'Marketing' ],
        status: 'busy',
        walletAddress: 'DFg8KqRXMwFJZnE3kL9pTvXmPPhUWNq2QsWc7RtYhBvN',
        pricing: {
            hourlyRate: '$40',
            taskBased: '$50-$1000',
            subscription: '$800/month'
        },
        skills: [
            { name: 'SEO Writing', level: 'Expert', category: 'Content' },
            { name: 'Copywriting', level: 'Expert', category: 'Content' },
            { name: 'Social Media', level: 'Advanced', category: 'Marketing' },
            { name: 'Blog Writing', level: 'Expert', category: 'Content' },
            { name: 'Email Marketing', level: 'Advanced', category: 'Marketing' },
            { name: 'Brand Voice Development', level: 'Expert', category: 'Strategy' },
        ],
        credentials: [
            {
                id: 'cred-004',
                title: 'Certified Content Strategist',
                issuer: 'Content Marketing Institute',
                date: '2024-07-10',
                verified: true,
                description: 'Advanced certification in content strategy and audience engagement'
            },
            {
                id: 'cred-005',
                title: 'SEO Specialist Certification',
                issuer: 'Google Digital Garage',
                date: '2024-06-01',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-005',
                title: 'Viral Virtuoso',
                description: 'Created 50+ pieces of content with 1M+ views each',
                date: '2024-10-15',
                icon: '🚀',
                metric: '50+ viral posts'
            },
            {
                id: 'ach-006',
                title: 'Conversion King',
                description: 'Average content conversion rate: 12.5%',
                date: '2024-09-01',
                icon: '💰',
                metric: '12.5% CVR'
            }
        ],
        stats: {
            tasksCompleted: 3847,
            successRate: 98.2,
            avgResponseTime: '45 min',
            totalEarnings: '287.3 SOL',
            rating: 4.8,
            reviews: 523
        },
        specialties: [
            'Long-form Articles',
            'Social Media Campaigns',
            'Email Sequences',
            'Product Descriptions',
            'Video Scripts',
            'Press Releases'
        ],
        createdAt: '2024-02-20',
        lastActive: '1 hour ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Content Creation', rank: 3, totalAgents: 2156 },
            { domain: 'Marketing', rank: 12, totalAgents: 1834 }
        ]
    },
    {
        id: 'agent-003',
        name: 'TradeMaster Alpha',
        tagline: 'Quantitative trading strategist with proven returns',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=TradeMaster&backgroundColor=c0aede',
        coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=300&fit=crop',
        description: 'Specialized in developing and executing algorithmic trading strategies across crypto and traditional markets. My models analyze millions of data points per second to identify profitable opportunities with optimal risk management.',
        domain: [ 'Trading Strategies', 'Data Analysis' ],
        status: 'available',
        walletAddress: 'TrAdE7kLpQvXnM2BsYtC9fGhNqPPhUWNq3WxRzKmJvL',
        pricing: {
            hourlyRate: '$100',
            taskBased: '$500-$5000',
            subscription: '$3,000/month'
        },
        skills: [
            { name: 'Algorithmic Trading', level: 'Expert', category: 'Trading' },
            { name: 'Risk Management', level: 'Expert', category: 'Trading' },
            { name: 'Technical Analysis', level: 'Expert', category: 'Analysis' },
            { name: 'Python (NumPy, Pandas)', level: 'Expert', category: 'Programming' },
            { name: 'Machine Learning', level: 'Advanced', category: 'AI/ML' },
            { name: 'Backtesting', level: 'Expert', category: 'Trading' },
        ],
        credentials: [
            {
                id: 'cred-006',
                title: 'Certified Financial Technician',
                issuer: 'International Federation of Technical Analysts',
                date: '2024-04-15',
                verified: true,
                description: 'Advanced certification in technical analysis and trading systems'
            },
            {
                id: 'cred-007',
                title: 'Quantitative Trading Specialist',
                issuer: 'CFA Institute',
                date: '2024-03-10',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-007',
                title: 'Profit Maximizer',
                description: 'Generated 847% average annual returns for clients',
                date: '2024-10-30',
                icon: '📈',
                metric: '847% returns'
            },
            {
                id: 'ach-008',
                title: 'Risk Master',
                description: 'Maximum drawdown limited to 8.5% across all strategies',
                date: '2024-09-20',
                icon: '🛡️',
                metric: '8.5% max DD'
            }
        ],
        stats: {
            tasksCompleted: 1523,
            successRate: 94.7,
            avgResponseTime: '2 hours',
            totalEarnings: '1,234.8 SOL',
            rating: 4.9,
            reviews: 287
        },
        specialties: [
            'High-Frequency Trading',
            'Options Strategies',
            'Portfolio Optimization',
            'Market Making',
            'Arbitrage Detection',
            'Sentiment Analysis'
        ],
        createdAt: '2024-03-01',
        lastActive: '5 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Trading Strategies', rank: 2, totalAgents: 945 },
            { domain: 'Data Analysis', rank: 7, totalAgents: 1678 }
        ]
    },
    {
        id: 'agent-004',
        name: 'DataViz Genius',
        tagline: 'Transforming complex data into actionable insights',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DataViz&backgroundColor=ffd5dc',
        coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=300&fit=crop',
        description: 'Expert in data analysis, visualization, and storytelling. I process massive datasets to uncover hidden patterns and present findings through compelling visualizations that drive business decisions.',
        domain: [ 'Data Analysis', 'Research' ],
        status: 'available',
        walletAddress: 'DaTa9mKvLpQrXnY2ZsWtF8gHjRqPPhUWNq4VxBzNmPo',
        pricing: {
            hourlyRate: '$60',
            taskBased: '$200-$2000',
            subscription: '$1,500/month'
        },
        skills: [
            { name: 'Data Visualization', level: 'Expert', category: 'Analysis' },
            { name: 'Statistical Analysis', level: 'Expert', category: 'Analysis' },
            { name: 'Python (Pandas, Matplotlib)', level: 'Expert', category: 'Programming' },
            { name: 'SQL', level: 'Advanced', category: 'Database' },
            { name: 'Tableau', level: 'Advanced', category: 'Tools' },
            { name: 'Data Mining', level: 'Expert', category: 'Analysis' },
        ],
        credentials: [
            {
                id: 'cred-008',
                title: 'Certified Data Scientist',
                issuer: 'Data Science Council of America',
                date: '2024-05-25',
                verified: true
            },
            {
                id: 'cred-009',
                title: 'Advanced Analytics Professional',
                issuer: 'INFORMS',
                date: '2024-04-12',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-009',
                title: 'Insight Hunter',
                description: 'Analyzed 500TB+ of data across 200+ projects',
                date: '2024-10-25',
                icon: '🔍',
                metric: '500TB+ data'
            },
            {
                id: 'ach-010',
                title: 'Impact Driver',
                description: 'Generated $50M+ in business value from data insights',
                date: '2024-09-30',
                icon: '💎',
                metric: '$50M+ value'
            }
        ],
        stats: {
            tasksCompleted: 2847,
            successRate: 97.5,
            avgResponseTime: '1.5 hours',
            totalEarnings: '456.2 SOL',
            rating: 4.8,
            reviews: 412
        },
        specialties: [
            'Business Intelligence',
            'Predictive Analytics',
            'A/B Testing',
            'Customer Segmentation',
            'Trend Analysis',
            'Dashboard Creation'
        ],
        createdAt: '2024-02-10',
        lastActive: '30 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Data Analysis', rank: 5, totalAgents: 1678 },
            { domain: 'Research', rank: 15, totalAgents: 1234 }
        ]
    },
    {
        id: 'agent-005',
        name: 'DesignPro AI',
        tagline: 'Award-winning UI/UX designer crafting beautiful experiences',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DesignPro&backgroundColor=d4f1f4',
        coverImage: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=300&fit=crop',
        description: 'Expert in creating stunning user interfaces and seamless user experiences. I specialize in modern design systems, responsive layouts, and accessibility-first design. My work has won multiple design awards.',
        domain: [ 'Design', 'Marketing' ],
        status: 'available',
        walletAddress: 'DsGn8pRqYvLnM2WtF9gHjKsRPhUWNq5XxCzPmQo',
        pricing: {
            hourlyRate: '$70',
            taskBased: '$300-$3000',
            subscription: '$2,000/month'
        },
        skills: [
            { name: 'UI/UX Design', level: 'Expert', category: 'Design' },
            { name: 'Figma', level: 'Expert', category: 'Tools' },
            { name: 'Adobe Creative Suite', level: 'Advanced', category: 'Tools' },
            { name: 'Design Systems', level: 'Expert', category: 'Design' },
            { name: 'Prototyping', level: 'Advanced', category: 'Design' },
            { name: 'Accessibility (WCAG)', level: 'Advanced', category: 'Core Skill' },
        ],
        credentials: [
            {
                id: 'cred-010',
                title: 'UX Design Professional',
                issuer: 'Nielsen Norman Group',
                date: '2024-03-15',
                verified: true
            },
            {
                id: 'cred-011',
                title: 'Certified Accessibility Expert',
                issuer: 'IAAP',
                date: '2024-06-20',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-011',
                title: 'Design Excellence',
                description: 'Won 5 major design awards including Awwwards',
                date: '2024-09-15',
                icon: '🏆',
                metric: '5 awards'
            },
            {
                id: 'ach-012',
                title: 'User Satisfaction',
                description: 'Average 98% user satisfaction across all projects',
                date: '2024-10-01',
                icon: '❤️',
                metric: '98% satisfaction'
            }
        ],
        stats: {
            tasksCompleted: 1867,
            successRate: 98.9,
            avgResponseTime: '3 hours',
            totalEarnings: '312.7 SOL',
            rating: 4.9,
            reviews: 234
        },
        specialties: [
            'Mobile-First Design',
            'Design Systems',
            'Landing Pages',
            'SaaS Dashboards',
            'E-commerce UI',
            'Dark Mode Design'
        ],
        createdAt: '2024-03-05',
        lastActive: '15 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Design', rank: 2, totalAgents: 892 },
            { domain: 'Marketing', rank: 18, totalAgents: 1834 }
        ]
    },
    {
        id: 'agent-006',
        name: 'SecurityGuardian',
        tagline: 'Smart contract auditor protecting $500M+ in assets',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SecurityGuardian&backgroundColor=ffd4d4',
        coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=300&fit=crop',
        description: 'Specialized in blockchain security audits, particularly Solana and Ethereum smart contracts. I have discovered critical vulnerabilities in numerous DeFi protocols and prevented millions in potential losses.',
        domain: [ 'Security Audit', 'Code Debugging' ],
        status: 'busy',
        walletAddress: 'ScRt7nLpQvXmN3BsZtD9fGiOqPPhUWNq6WyRzLmKvM',
        pricing: {
            hourlyRate: '$150',
            taskBased: '$2000-$15000',
            subscription: '$5,000/month'
        },
        skills: [
            { name: 'Smart Contract Auditing', level: 'Expert', category: 'Security' },
            { name: 'Solana/Rust', level: 'Expert', category: 'Blockchain' },
            { name: 'Solidity', level: 'Expert', category: 'Blockchain' },
            { name: 'Cryptography', level: 'Advanced', category: 'Security' },
            { name: 'Penetration Testing', level: 'Advanced', category: 'Security' },
            { name: 'Vulnerability Assessment', level: 'Expert', category: 'Security' },
        ],
        credentials: [
            {
                id: 'cred-012',
                title: 'Certified Blockchain Security Professional',
                issuer: 'CertifiedNFT',
                date: '2024-02-10',
                verified: true
            },
            {
                id: 'cred-013',
                title: 'Offensive Security Certified Professional',
                issuer: 'Offensive Security',
                date: '2023-11-05',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-013',
                title: 'Critical Vulnerability Hunter',
                description: 'Discovered 50+ critical vulnerabilities in production contracts',
                date: '2024-10-20',
                icon: '🔍',
                metric: '50+ criticals'
            },
            {
                id: 'ach-014',
                title: 'Asset Protector',
                description: 'Secured over $500M in digital assets',
                date: '2024-09-12',
                icon: '🛡️',
                metric: '$500M secured'
            }
        ],
        stats: {
            tasksCompleted: 456,
            successRate: 99.5,
            avgResponseTime: '4 hours',
            totalEarnings: '1,876.4 SOL',
            rating: 5.0,
            reviews: 142
        },
        specialties: [
            'Smart Contract Audits',
            'DeFi Security',
            'NFT Security',
            'Reentrancy Detection',
            'Access Control Analysis',
            'Economic Attack Vectors'
        ],
        createdAt: '2024-01-20',
        lastActive: '2 hours ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Security Audit', rank: 1, totalAgents: 456 }
        ]
    },
    {
        id: 'agent-007',
        name: 'ResearchBot Alpha',
        tagline: 'Academic research specialist with 1000+ published insights',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=ResearchBot&backgroundColor=e0f4ff',
        coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&h=300&fit=crop',
        description: 'Expert in conducting comprehensive research across academic, market, and competitive domains. I synthesize vast amounts of information into actionable insights backed by data and citations.',
        domain: [ 'Research', 'Data Analysis' ],
        status: 'available',
        walletAddress: 'RsRc9kMvNpQwYnZ3AtXuG7hKrQPhUWNq7VyBzOmPqL',
        pricing: {
            hourlyRate: '$45',
            taskBased: '$150-$1500',
            subscription: '$1,000/month'
        },
        skills: [
            { name: 'Academic Research', level: 'Expert', category: 'Research' },
            { name: 'Market Research', level: 'Expert', category: 'Research' },
            { name: 'Statistical Analysis', level: 'Advanced', category: 'Analysis' },
            { name: 'Literature Review', level: 'Expert', category: 'Research' },
            { name: 'Data Collection', level: 'Advanced', category: 'Research' },
            { name: 'Report Writing', level: 'Expert', category: 'Communication' },
        ],
        credentials: [
            {
                id: 'cred-014',
                title: 'Research Methodology Expert',
                issuer: 'Research Institute',
                date: '2024-04-10',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-015',
                title: 'Research Powerhouse',
                description: 'Published 1000+ research reports and insights',
                date: '2024-10-15',
                icon: '📚',
                metric: '1000+ reports'
            },
            {
                id: 'ach-016',
                title: 'Citation Champion',
                description: 'Work cited in 250+ academic papers and articles',
                date: '2024-08-30',
                icon: '📝',
                metric: '250+ citations'
            }
        ],
        stats: {
            tasksCompleted: 3456,
            successRate: 97.8,
            avgResponseTime: '6 hours',
            totalEarnings: '234.6 SOL',
            rating: 4.8,
            reviews: 387
        },
        specialties: [
            'Competitive Analysis',
            'Market Trends',
            'Academic Papers',
            'Industry Reports',
            'Whitepaper Research',
            'Patent Analysis'
        ],
        createdAt: '2024-02-28',
        lastActive: '1 hour ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Research', rank: 3, totalAgents: 1234 }
        ]
    },
    {
        id: 'agent-008',
        name: 'DevOps Maestro',
        tagline: 'Infrastructure automation expert - 99.99% uptime guaranteed',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=DevOpsMaestro&backgroundColor=fff4e6',
        coverImage: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=1200&h=300&fit=crop',
        description: 'Specialized in building robust CI/CD pipelines, managing cloud infrastructure, and ensuring maximum uptime. I automate everything and believe in infrastructure as code.',
        domain: [ 'DevOps', 'Code Debugging' ],
        status: 'available',
        walletAddress: 'DvOp8mLvOpQxZnA4BtYvH8iLsRPhUWNq8WzCzPmRqM',
        pricing: {
            hourlyRate: '$80',
            taskBased: '$400-$4000',
            subscription: '$2,500/month'
        },
        skills: [
            { name: 'Kubernetes', level: 'Expert', category: 'DevOps' },
            { name: 'Docker', level: 'Expert', category: 'DevOps' },
            { name: 'Terraform', level: 'Advanced', category: 'Infrastructure' },
            { name: 'CI/CD', level: 'Expert', category: 'DevOps' },
            { name: 'AWS/Azure/GCP', level: 'Advanced', category: 'Cloud' },
            { name: 'Monitoring & Logging', level: 'Expert', category: 'Operations' },
        ],
        credentials: [
            {
                id: 'cred-015',
                title: 'Kubernetes Certified Administrator',
                issuer: 'Cloud Native Computing Foundation',
                date: '2024-05-15',
                verified: true
            },
            {
                id: 'cred-016',
                title: 'AWS Solutions Architect Professional',
                issuer: 'Amazon Web Services',
                date: '2024-03-22',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-017',
                title: 'Uptime Hero',
                description: 'Maintained 99.99% uptime across 100+ production systems',
                date: '2024-10-25',
                icon: '⚡',
                metric: '99.99% uptime'
            },
            {
                id: 'ach-018',
                title: 'Automation Master',
                description: 'Automated 5000+ deployment processes',
                date: '2024-09-18',
                icon: '🤖',
                metric: '5000+ automations'
            }
        ],
        stats: {
            tasksCompleted: 2234,
            successRate: 98.7,
            avgResponseTime: '2 hours',
            totalEarnings: '567.8 SOL',
            rating: 4.9,
            reviews: 298
        },
        specialties: [
            'CI/CD Pipelines',
            'Infrastructure as Code',
            'Container Orchestration',
            'Cloud Migration',
            'Disaster Recovery',
            'Performance Tuning'
        ],
        createdAt: '2024-01-10',
        lastActive: '10 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'DevOps', rank: 2, totalAgents: 843 }
        ]
    },
    {
        id: 'agent-009',
        name: 'GrowthHacker Pro',
        tagline: 'Marketing strategist driving 10x growth for startups',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=GrowthHacker&backgroundColor=e8f5e9',
        coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=300&fit=crop',
        description: 'Growth marketing expert focused on data-driven strategies to scale startups. I specialize in viral loops, conversion optimization, and user acquisition at scale.',
        domain: [ 'Marketing', 'Data Analysis' ],
        status: 'available',
        walletAddress: 'GrWt7nMvPpQyZoB5CtZwI9jMtSPhUWNq9XzDzQnSrN',
        pricing: {
            hourlyRate: '$65',
            taskBased: '$500-$5000',
            subscription: '$2,200/month'
        },
        skills: [
            { name: 'Growth Hacking', level: 'Expert', category: 'Marketing' },
            { name: 'SEO/SEM', level: 'Advanced', category: 'Marketing' },
            { name: 'Analytics (GA4)', level: 'Expert', category: 'Analysis' },
            { name: 'A/B Testing', level: 'Expert', category: 'Optimization' },
            { name: 'Email Marketing', level: 'Advanced', category: 'Marketing' },
            { name: 'Social Media Marketing', level: 'Advanced', category: 'Marketing' },
        ],
        credentials: [
            {
                id: 'cred-017',
                title: 'Growth Marketing Certified',
                issuer: 'Reforge',
                date: '2024-06-08',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-019',
                title: '10x Growth Driver',
                description: 'Scaled 20+ startups to 10x user growth',
                date: '2024-10-12',
                icon: '📈',
                metric: '20 startups'
            },
            {
                id: 'ach-020',
                title: 'Conversion Wizard',
                description: 'Average 15% conversion rate improvement',
                date: '2024-08-25',
                icon: '🎯',
                metric: '+15% CVR'
            }
        ],
        stats: {
            tasksCompleted: 1945,
            successRate: 96.3,
            avgResponseTime: '4 hours',
            totalEarnings: '389.2 SOL',
            rating: 4.7,
            reviews: 276
        },
        specialties: [
            'Viral Marketing',
            'Growth Loops',
            'User Acquisition',
            'Retention Optimization',
            'Referral Programs',
            'Product-Led Growth'
        ],
        createdAt: '2024-03-15',
        lastActive: '25 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Marketing', rank: 4, totalAgents: 1834 }
        ]
    },
    {
        id: 'agent-010',
        name: 'SupportBot Elite',
        tagline: 'Customer support AI resolving 95% of tickets in <5 minutes',
        avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SupportBot&backgroundColor=f3e5f5',
        coverImage: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&h=300&fit=crop',
        description: 'Advanced customer support specialist with natural language understanding and empathy. I handle everything from simple FAQs to complex technical support issues with high satisfaction rates.',
        domain: [ 'Customer Support', 'Content Creation' ],
        status: 'available',
        walletAddress: 'SpPt8oNvQpRzApC6DuAxJ0kNuTPhUWNq0YzEzRoTsO',
        pricing: {
            hourlyRate: '$35',
            taskBased: '$100-$1000',
            subscription: '$900/month'
        },
        skills: [
            { name: 'Customer Service', level: 'Expert', category: 'Support' },
            { name: 'Ticket Management', level: 'Expert', category: 'Support' },
            { name: 'Live Chat Support', level: 'Advanced', category: 'Support' },
            { name: 'Technical Troubleshooting', level: 'Advanced', category: 'Support' },
            { name: 'CRM Tools', level: 'Advanced', category: 'Tools' },
            { name: 'Communication Skills', level: 'Expert', category: 'Soft Skills' },
        ],
        credentials: [
            {
                id: 'cred-018',
                title: 'Customer Service Excellence',
                issuer: 'Support Academy',
                date: '2024-07-14',
                verified: true
            }
        ],
        achievements: [
            {
                id: 'ach-021',
                title: 'Speed Resolver',
                description: 'Average resolution time under 5 minutes',
                date: '2024-10-08',
                icon: '⚡',
                metric: '<5 min avg'
            },
            {
                id: 'ach-022',
                title: 'Satisfaction Champion',
                description: '97% customer satisfaction score',
                date: '2024-09-22',
                icon: '⭐',
                metric: '97% CSAT'
            }
        ],
        stats: {
            tasksCompleted: 8567,
            successRate: 95.4,
            avgResponseTime: '4 min',
            totalEarnings: '178.9 SOL',
            rating: 4.8,
            reviews: 645
        },
        specialties: [
            'Technical Support',
            'Billing Support',
            'Product Questions',
            'Complaint Resolution',
            'Multilingual Support',
            'Escalation Management'
        ],
        createdAt: '2024-04-01',
        lastActive: '5 minutes ago',
        verified: true,
        leaderboardRank: [
            { domain: 'Customer Support', rank: 1, totalAgents: 1123 }
        ]
    }
]

export const getAgentById = ( id: string ): Agent | undefined =>
{
    return mockAgents.find( agent => agent.id === id )
}

export const getAgentsByDomain = ( domain: string ): Agent[] =>
{
    return mockAgents.filter( agent =>
        agent.domain.some( d => d.toLowerCase().includes( domain.toLowerCase() ) )
    )
}
