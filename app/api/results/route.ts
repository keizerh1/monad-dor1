import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Mock projects data - in a real app, this would come from the database
const mockProjects = [
  {
    id: '1',
    name: 'MonadMonkeys',
    description: 'A collection of unique pixel art monkeys living on the Monad blockchain',
    image: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: '2',
    name: 'Purple Pandas',
    description: 'Mystical pandas with purple energy, bringing luck to the Monad ecosystem',
    image: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: '3',
    name: 'Cosmic Cats',
    description: 'Intergalactic felines exploring the vast Monad universe',
    image: 'https://picsum.photos/400/400?random=3'
  },
  {
    id: '4',
    name: 'Digital Dragons',
    description: 'Ancient dragons awakened in the digital realm of Monad',
    image: 'https://picsum.photos/400/400?random=4'
  },
  {
    id: '5',
    name: 'Neon Knights',
    description: 'Cyberpunk warriors defending the Monad metaverse',
    image: 'https://picsum.photos/400/400?random=5'
  },
  {
    id: '6',
    name: 'Golden Griffins',
    description: 'Legendary creatures soaring through Monad&apos;s golden age',
    image: 'https://picsum.photos/400/400?random=6'
  }
]

export async function GET() {
  try {
    // Get vote counts for each project
    const { data: voteCounts, error } = await supabase
      .from('votes')
      .select('project_id')
      .then(({ data, error }) => {
        if (error) throw error
        
        // Count votes per project
        const counts = (data || []).reduce((acc: Record<string, number>, vote) => {
          acc[vote.project_id] = (acc[vote.project_id] || 0) + 1
          return acc
        }, {})
        
        return { data: counts, error: null }
      })

    if (error) {
      console.error('Error fetching vote counts:', error)
      return NextResponse.json(
        { error: 'Failed to fetch results' },
        { status: 500 }
      )
    }

    // Combine project info with vote counts
    const results = mockProjects
      .map(project => ({
        ...project,
        votes: voteCounts[project.id] || 0
      }))
      .sort((a, b) => b.votes - a.votes) // Sort by vote count descending

    return NextResponse.json({
      results,
      totalVotes: Object.values(voteCounts).reduce((sum: number, count: any) => sum + count, 0)
    })

  } catch (error) {
    console.error('Results API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
