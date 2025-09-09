import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// AJOUTE CES 2 LIGNES ICI AUSSI !!! 
export const dynamic = 'force-dynamic'
export const revalidate = 0

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
  { id: '3', name: "Chewy", image: "/images/chewy.png", description: "Futuristic mecha warriors forged on Monad" },
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
  { id: '25', name: "Sealuminati", image: "/images/seal-uminati.jpg", description: "Honor-bound seal warriors" },
  { id: '26', name: "Buns", image: "/images/buns.png", description: "Colorful and quirky bunnies hopping through the Monad universe" },
  { id: '27', name: "Beholdak", image: "/images/beholdak.jpg", description: "Mythical Monanimal on Monad" },
  { id: '28', name: "Gmonad", image: "/images/gmonad.jpg", description: "A playful mascot full of Monad energy" },
  { id: '29', name: "Bobr", image: "/images/bobr.jpg", description: "Beavers in all their forms" },
  { id: '30', name: "NadRoots", image: "/images/nadroots.jpg", description: "Rootified characters for reforestation" },
  { id: '31', name: "Clay Molandaks", image: "/images/claymolandaks.jpg", description: "A 100% AI generated collection mixing clay aesthetics with digital art" },
  { id: '32', name: "Hell of Steve", image: "/images/hellofsteve.jpg", description: "The magnificent and diverse world of Steve" },
  { id: '33', name: "R3tard", image: "/images/r3tard.jpg", description: "The r3tards of Monad" },
  { id: '34', name: "T3mu", image: "/images/t3mu.jpg", description: "There is no utility" },
]

export async function GET() {
  try {
    console.log('🔍 Starting results API call...')
    
    // Get all votes and count them manually since Supabase doesn't support COUNT(*) directly
    const { data: votes, error } = await supabase
      .from('votes')
      .select('project_id')
    
    if (error) {
      console.error('❌ Error fetching votes:', error)
      return NextResponse.json(
        { error: 'Failed to fetch votes' },
        { 
          status: 500,
          headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          }
        }
      )
    }

    console.log('📊 Raw database votes:', votes)
    
    // Count votes per project
    const counts = (votes || []).reduce((acc: Record<string, number>, vote) => {
      acc[vote.project_id] = (acc[vote.project_id] || 0) + 1
      return acc
    }, {})
    
    console.log('📊 Vote counts per project:', counts)

    // Combine project info with vote counts
    const results = projects
      .map(project => ({
        ...project,
        votes: counts[project.id] || 0
      }))
      .sort((a, b) => b.votes - a.votes) // Sort by vote count descending

    console.log('🗳️ Mapped project data with vote counts:', results)
    console.log('📈 Total votes:', Object.values(counts).reduce((sum: number, count: any) => sum + count, 0))

    const response = {
      results,
      totalVotes: Object.values(counts).reduce((sum: number, count: any) => sum + count, 0)
    }

    console.log('🚀 Final response data:', response)

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    })

  } catch (error) {
    console.error('💥 Results API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        }
      }
    )
  }
}