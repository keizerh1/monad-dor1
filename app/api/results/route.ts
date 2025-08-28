import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL or SUPABASE_SERVICE_KEY is missing')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Mock projects data - in a real app, this would come from the database
const projects = [
  { id: '1', name: "BlockNads", image: "/images/block-nads.jpg", description: "Minimalist dark-themed collectibles" },
  { id: '2', name: "Breath of Estova", image: "/images/breath-of-estova.jpg", description: "Pixelated adventures in the Estova realm" },
  { id: '3', name: "Chewy", image: "/images/chewy.png", description: "Mysterious dark entities on Monad" },
  { id: '4', name: "Chog NFT", image: "/images/chog.jpg", description: "Cute collectible characters with kawaii energy" },
  { id: '5', name: "Chogstar", image: "/images/chogstar.jpg", description: "Star-powered creatures exploring the cosmos" },
  { id: '6', name: "Llamao", image: "/images/llamao.jpg", description: "Adorable llama-inspired digital pets" },
  { id: '7', name: "Meowmads", image: "/images/meowwnads.jpg", description: "Magical cats with mystical powers" },
  { id: '8', name: "Monad Nomads", image: "/images/monad-nomads-nft.jpg", description: "Wandering travelers across digital landscapes" },
  { id: '9', name: "Monadverse", image: "/images/monad-verse.jpg", description: "Gateway to the infinite Monad multiverse" },
  { id: '10', name: "Mondana Baddies", image: "/images/monadana-baddies.jpg", description: "Rebellious characters with attitude" },
  { id: '11', name: "Monshape Club", image: "/images/monshape.jpg", description: "Geometric art meets blockchain innovation" },
  { id: '12', name: "Overnads", image: "/images/overnads.jpg", description: "Winged beings soaring through Monad skies" },
  { id: '13', name: "Pepenads", image: "/images/pepenads.jpg", description: "Classic meme culture meets modern NFTs" },
  { id: '14', name: "Skrumpeys", image: "/images/skrumpeys.jpg", description: "Retro-style digital collectibles" },
  { id: '15', name: "SLMND", image: "/images/slmnd.jpg", description: "Skeletal warriors from ancient times" },
  { id: '16', name: "SpikyNads", image: "/images/spikynads.jpg", description: "Pixelated beings with sharp edges" },
  { id: '17', name: "Stonad", image: "/images/stonad.jpg", description: "Stone-like creatures with ancient wisdom" },
  { id: '18', name: "The 10k Squad", image: "/images/the-10k-squad.jpg", description: "Elite collection of 10,000 unique members" },
  { id: '19', name: "The Daks", image: "/images/the-daks.jpg", description: "Duck-inspired characters with personality" },
  { id: '20', name: "Wassie", image: "/images/wassie.jpg", description: "Mystical moon-powered entities" },
  { id: '21', name: "Wonad", image: "/images/wonad.jpg", description: "Plant-based creatures growing on Monad" },
  { id: '22', name: "La Mouch", image: "/images/la-mouch.jpg", description: "French-inspired digital art collection" },
  { id: '23', name: "Monadians", image: "/images/monadians.jpg", description: "Native inhabitants of the Monad ecosystem" },
  { id: '24', name: "Mongang", image: "/images/mongang.jpg", description: "Cyberpunk-style digital avatars" },
  { id: '25', name: "Sealuminati", image: "/images/seal-uminati.jpg", description: "Honor-bound seal warriors" }
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
    const results = projects
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
