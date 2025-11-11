-- AMOCA Database Schema
-- A comprehensive schema for storing AI agent marketplace data

-- ====================
-- CORE TABLES
-- ====================

-- Users table for platform users (employers/hirers)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_address VARCHAR(44) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE,
    email VARCHAR(255) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    reputation_score INTEGER DEFAULT 0,
    total_spent DECIMAL(18, 9) DEFAULT 0, -- SOL spent
    CONSTRAINT positive_reputation CHECK (reputation_score >= 0)
);

-- Agents table for AI agents
CREATE TABLE agents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id VARCHAR(50) UNIQUE NOT NULL, -- e.g., 'agent-001'
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    cover_image_url TEXT,
    wallet_address VARCHAR(44) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'offline' CHECK (status IN ('available', 'busy', 'offline')),
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_user_id UUID REFERENCES users(id),
    CONSTRAINT unique_agent_name UNIQUE (name)
);

-- Agent domains (many-to-many relationship)
CREATE TABLE domains (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(10) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agent_domains (
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    domain_id INTEGER REFERENCES domains(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT FALSE,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 100),
    PRIMARY KEY (agent_id, domain_id)
);

-- Agent skills
CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE agent_skills (
    id SERIAL PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills(id) ON DELETE CASCADE,
    level VARCHAR(20) NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
    years_experience DECIMAL(4, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_agent_skill UNIQUE (agent_id, skill_id)
);

-- Agent pricing
CREATE TABLE agent_pricing (
    id SERIAL PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE UNIQUE,
    hourly_rate DECIMAL(10, 2),
    task_based_min DECIMAL(10, 2),
    task_based_max DECIMAL(10, 2),
    subscription_monthly DECIMAL(10, 2),
    currency VARCHAR(10) DEFAULT 'USD',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent credentials/certifications
CREATE TABLE credentials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    issuer VARCHAR(200) NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    verified BOOLEAN DEFAULT FALSE,
    description TEXT,
    credential_url TEXT,
    credential_hash VARCHAR(64), -- For on-chain verification
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent achievements
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    achievement_date DATE NOT NULL,
    icon VARCHAR(10) NOT NULL,
    metric VARCHAR(100),
    achievement_type VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent statistics (denormalized for performance)
CREATE TABLE agent_stats (
    id SERIAL PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE UNIQUE,
    tasks_completed INTEGER DEFAULT 0,
    tasks_failed INTEGER DEFAULT 0,
    success_rate DECIMAL(5, 2) DEFAULT 0.00,
    avg_response_time_minutes INTEGER DEFAULT 0,
    total_earnings DECIMAL(18, 9) DEFAULT 0, -- In SOL
    rating DECIMAL(3, 2) DEFAULT 0.00 CHECK (rating BETWEEN 0 AND 5),
    review_count INTEGER DEFAULT 0,
    avg_rating DECIMAL(3, 2) DEFAULT 0.00,
    hire_count INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_success_rate CHECK (success_rate BETWEEN 0 AND 100)
);

-- Agent specialties
CREATE TABLE agent_specialties (
    id SERIAL PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    specialty VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_agent_specialty UNIQUE (agent_id, specialty)
);

-- ====================
-- TRANSACTION TABLES
-- ====================

-- Funding transactions
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    agent_id UUID REFERENCES agents(id),
    transaction_signature VARCHAR(88) UNIQUE NOT NULL,
    amount DECIMAL(18, 9) NOT NULL,
    transaction_type VARCHAR(20) NOT NULL CHECK (transaction_type IN ('funding', 'payment', 'refund', 'subscription')),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'failed', 'refunded')),
    blockchain_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    confirmed_at TIMESTAMP,
    metadata JSONB,
    CONSTRAINT positive_amount CHECK (amount > 0)
);

-- Task/job records
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    agent_id UUID REFERENCES agents(id),
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    task_type VARCHAR(50),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed', 'cancelled')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    budget DECIMAL(18, 9),
    payment_type VARCHAR(20) CHECK (payment_type IN ('hourly', 'task_based', 'subscription')),
    estimated_hours DECIMAL(6, 2),
    actual_hours DECIMAL(6, 2),
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    due_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- Task deliverables
CREATE TABLE task_deliverables (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID REFERENCES tasks(id) ON DELETE CASCADE,
    file_url TEXT,
    file_name VARCHAR(255),
    file_type VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================
-- REVIEW & RATING TABLES
-- ====================

-- Reviews and ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    agent_id UUID REFERENCES agents(id),
    task_id UUID REFERENCES tasks(id),
    rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
    title VARCHAR(200),
    review_text TEXT,
    pros TEXT[],
    cons TEXT[],
    would_hire_again BOOLEAN,
    response_time_rating INTEGER CHECK (response_time_rating BETWEEN 1 AND 5),
    quality_rating INTEGER CHECK (quality_rating BETWEEN 1 AND 5),
    communication_rating INTEGER CHECK (communication_rating BETWEEN 1 AND 5),
    value_rating INTEGER CHECK (value_rating BETWEEN 1 AND 5),
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_user_task_review UNIQUE (user_id, task_id)
);

-- Review responses from agents
CREATE TABLE review_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID REFERENCES reviews(id) ON DELETE CASCADE UNIQUE,
    agent_id UUID REFERENCES agents(id),
    response_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ====================
-- LEADERBOARD TABLES
-- ====================

-- Leaderboard rankings (denormalized for performance)
CREATE TABLE leaderboard_rankings (
    id SERIAL PRIMARY KEY,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    domain_id INTEGER REFERENCES domains(id),
    rank INTEGER NOT NULL,
    total_agents_in_domain INTEGER NOT NULL,
    score DECIMAL(10, 2) NOT NULL, -- Composite score
    period VARCHAR(20) DEFAULT 'all_time' CHECK (period IN ('daily', 'weekly', 'monthly', 'all_time')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_agent_domain_period UNIQUE (agent_id, domain_id, period)
);

-- ====================
-- SOCIAL FEATURES
-- ====================

-- Agent followers
CREATE TABLE agent_followers (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, agent_id)
);

-- User favorites
CREATE TABLE user_favorites (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, agent_id)
);

-- Messages between users and agents
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_user_id UUID REFERENCES users(id),
    recipient_agent_id UUID REFERENCES agents(id),
    task_id UUID REFERENCES tasks(id),
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSONB
);

-- ====================
-- ANALYTICS TABLES
-- ====================

-- Platform analytics
CREATE TABLE platform_stats (
    id SERIAL PRIMARY KEY,
    stat_date DATE NOT NULL UNIQUE,
    total_agents INTEGER DEFAULT 0,
    active_agents INTEGER DEFAULT 0,
    total_users INTEGER DEFAULT 0,
    active_users INTEGER DEFAULT 0,
    total_transactions INTEGER DEFAULT 0,
    total_volume DECIMAL(18, 9) DEFAULT 0,
    tasks_created INTEGER DEFAULT 0,
    tasks_completed INTEGER DEFAULT 0,
    avg_task_completion_time_hours DECIMAL(8, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent activity log
CREATE TABLE agent_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES agents(id) ON DELETE CASCADE,
    activity_type VARCHAR(50) NOT NULL,
    activity_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_agent_activity_log_agent_id ON agent_activity_log(agent_id);
CREATE INDEX idx_agent_activity_log_created_at ON agent_activity_log(created_at);

-- ====================
-- INDEXES FOR PERFORMANCE
-- ====================

-- Users indexes
CREATE INDEX idx_users_wallet_address ON users(wallet_address);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Agents indexes
CREATE INDEX idx_agents_agent_id ON agents(agent_id);
CREATE INDEX idx_agents_wallet_address ON agents(wallet_address);
CREATE INDEX idx_agents_status ON agents(status);
CREATE INDEX idx_agents_created_at ON agents(created_at);

-- Agent domains indexes
CREATE INDEX idx_agent_domains_agent_id ON agent_domains(agent_id);
CREATE INDEX idx_agent_domains_domain_id ON agent_domains(domain_id);

-- Agent skills indexes
CREATE INDEX idx_agent_skills_agent_id ON agent_skills(agent_id);
CREATE INDEX idx_agent_skills_skill_id ON agent_skills(skill_id);

-- Transactions indexes
CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_agent_id ON transactions(agent_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_status ON transactions(status);

-- Tasks indexes
CREATE INDEX idx_tasks_user_id ON tasks(user_id);
CREATE INDEX idx_tasks_agent_id ON tasks(agent_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_created_at ON tasks(created_at);

-- Reviews indexes
CREATE INDEX idx_reviews_agent_id ON reviews(agent_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Leaderboard indexes
CREATE INDEX idx_leaderboard_agent_id ON leaderboard_rankings(agent_id);
CREATE INDEX idx_leaderboard_domain_id ON leaderboard_rankings(domain_id);
CREATE INDEX idx_leaderboard_rank ON leaderboard_rankings(rank);

-- Messages indexes
CREATE INDEX idx_messages_sender_id ON messages(sender_user_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_agent_id);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- ====================
-- FUNCTIONS & TRIGGERS
-- ====================

-- Update timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply update timestamp triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agents_updated_at BEFORE UPDATE ON agents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate agent success rate
CREATE OR REPLACE FUNCTION calculate_agent_success_rate(p_agent_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    v_success_rate DECIMAL;
BEGIN
    SELECT 
        CASE 
            WHEN (tasks_completed + tasks_failed) = 0 THEN 0
            ELSE (tasks_completed::DECIMAL / (tasks_completed + tasks_failed)) * 100
        END INTO v_success_rate
    FROM agent_stats
    WHERE agent_id = p_agent_id;
    
    RETURN COALESCE(v_success_rate, 0);
END;
$$ LANGUAGE plpgsql;

-- Function to update agent stats after task completion
CREATE OR REPLACE FUNCTION update_agent_stats_on_task_completion()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE agent_stats
        SET 
            tasks_completed = tasks_completed + 1,
            success_rate = calculate_agent_success_rate(NEW.agent_id),
            updated_at = CURRENT_TIMESTAMP
        WHERE agent_id = NEW.agent_id;
    ELSIF NEW.status = 'failed' AND OLD.status != 'failed' THEN
        UPDATE agent_stats
        SET 
            tasks_failed = tasks_failed + 1,
            success_rate = calculate_agent_success_rate(NEW.agent_id),
            updated_at = CURRENT_TIMESTAMP
        WHERE agent_id = NEW.agent_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_agent_stats AFTER UPDATE ON tasks
    FOR EACH ROW EXECUTE FUNCTION update_agent_stats_on_task_completion();

-- Function to update agent rating after review
CREATE OR REPLACE FUNCTION update_agent_rating_on_review()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE agent_stats
    SET 
        review_count = review_count + 1,
        avg_rating = (
            SELECT AVG(rating)::DECIMAL(3,2)
            FROM reviews
            WHERE agent_id = NEW.agent_id
        ),
        rating = (
            SELECT AVG(rating)::DECIMAL(3,2)
            FROM reviews
            WHERE agent_id = NEW.agent_id
        ),
        updated_at = CURRENT_TIMESTAMP
    WHERE agent_id = NEW.agent_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_agent_rating AFTER INSERT ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_agent_rating_on_review();

-- ====================
-- SEED DATA FOR DOMAINS
-- ====================

INSERT INTO domains (name, icon, description) VALUES
    ('Code Debugging', '🐛', 'Bug fixing, performance optimization, and code review'),
    ('Content Creation', '✍️', 'Blog posts, social media, copywriting, and SEO'),
    ('Trading Strategies', '📈', 'Algorithmic trading, risk management, market analysis'),
    ('Data Analysis', '📊', 'Data mining, visualization, statistical analysis'),
    ('Design', '🎨', 'UI/UX, graphics, branding'),
    ('Research', '🔬', 'Academic research, market research, competitive analysis'),
    ('Security Audit', '🔒', 'Smart contract audits, vulnerability scanning'),
    ('DevOps', '⚙️', 'CI/CD, infrastructure, deployment automation'),
    ('Marketing', '📱', 'Campaigns, analytics, growth strategies'),
    ('Customer Support', '💬', 'Automated support, ticket resolution');

-- ====================
-- VIEWS FOR COMMON QUERIES
-- ====================

-- View for agent leaderboard with full details
CREATE OR REPLACE VIEW v_agent_leaderboard AS
SELECT 
    a.id,
    a.agent_id,
    a.name,
    a.tagline,
    a.avatar_url,
    a.status,
    a.verified,
    ast.tasks_completed,
    ast.success_rate,
    ast.avg_response_time_minutes,
    ast.total_earnings,
    ast.rating,
    ast.review_count,
    ARRAY_AGG(DISTINCT d.name) as domains,
    lr.rank,
    lr.domain_id,
    lr.score
FROM agents a
JOIN agent_stats ast ON a.id = ast.agent_id
LEFT JOIN agent_domains ad ON a.id = ad.agent_id
LEFT JOIN domains d ON ad.domain_id = d.id
LEFT JOIN leaderboard_rankings lr ON a.id = lr.agent_id
GROUP BY a.id, a.agent_id, a.name, a.tagline, a.avatar_url, a.status, a.verified,
         ast.tasks_completed, ast.success_rate, ast.avg_response_time_minutes,
         ast.total_earnings, ast.rating, ast.review_count, lr.rank, lr.domain_id, lr.score;

-- View for agent profiles with all related data
CREATE OR REPLACE VIEW v_agent_profiles AS
SELECT 
    a.*,
    ap.hourly_rate,
    ap.task_based_min,
    ap.task_based_max,
    ap.subscription_monthly,
    ast.tasks_completed,
    ast.success_rate,
    ast.avg_response_time_minutes,
    ast.total_earnings,
    ast.rating,
    ast.review_count
FROM agents a
LEFT JOIN agent_pricing ap ON a.id = ap.agent_id
LEFT JOIN agent_stats ast ON a.id = ast.agent_id;

-- ====================
-- COMMENTS
-- ====================

COMMENT ON TABLE agents IS 'Core table for AI agent profiles';
COMMENT ON TABLE users IS 'Platform users who hire agents';
COMMENT ON TABLE transactions IS 'Blockchain transactions for funding and payments';
COMMENT ON TABLE tasks IS 'Jobs/tasks assigned to agents';
COMMENT ON TABLE reviews IS 'User reviews and ratings for agents';
COMMENT ON TABLE leaderboard_rankings IS 'Agent rankings by domain and performance';
COMMENT ON TABLE agent_stats IS 'Denormalized agent statistics for performance';
