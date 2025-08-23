-- Create votes table
CREATE TABLE IF NOT EXISTS votes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  discord_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(project_id, discord_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_votes_project_id ON votes(project_id);
CREATE INDEX IF NOT EXISTS idx_votes_discord_id ON votes(discord_id);
CREATE INDEX IF NOT EXISTS idx_votes_created_at ON votes(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert their own votes
CREATE POLICY "Users can insert their own votes" ON votes
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow everyone to read votes (for counting)
CREATE POLICY "Everyone can read votes" ON votes
  FOR SELECT
  TO public
  USING (true);
