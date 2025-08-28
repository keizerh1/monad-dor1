'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { ProjectCard } from '@/components/ProjectCard'
import { LoginPrompt } from '@/components/LoginPrompt'

interface Project {
  id: string
  name: string
  description: string
  image: string
}

const projects: Project[] = [
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

export default function VotePage() {
  const { data: session, status } = useSession()
  const [hasVoted, setHasVoted] = useState(false)
  const [votedProjectId, setVotedProjectId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchUserVoteStatus()
    } else {
      setLoading(false)
    }
  }, [session])

  const fetchUserVoteStatus = async () => {
    try {
      const response = await fetch('/api/vote/status')
      if (response.ok) {
        const data = await response.json()
        setHasVoted(data.hasVoted)
        setVotedProjectId(data.votedProjectId)
      }
    } catch (error) {
      console.error('Error fetching vote status:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (projectId: string) => {
    if (hasVoted) {
      alert('You have already voted!')
      return
    }

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      })

      if (response.ok) {
        setHasVoted(true)
        setVotedProjectId(projectId)
        alert('Vote recorded successfully!')
      } else {
        const error = await response.json()
        alert(error.error || 'Failed to vote')
      }
    } catch (error) {
      console.error('Error voting:', error)
      alert('Failed to vote')
    }
  }

  // PARTIE CORRIGÉE ICI
  if (status === 'unauthenticated') {
    return <LoginPrompt />
  }

  if (status === 'loading' || loading || !session) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-monad-purple"></div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
          Vote for Your Favorite Monad NFT Collection
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Choose the best NFT project in the Monad ecosystem
        </p>
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 inline-block">
          {hasVoted ? (
            <p className="text-monad-gold">
              ✅ Thank you <span className="font-semibold">{session.user?.name}</span>! 
              You have already voted for <span className="font-semibold">
                {projects.find(p => p.id === votedProjectId)?.name}
              </span>.
            </p>
          ) : (
            <p className="text-monad-gold">
              Welcome, <span className="font-semibold">{session.user?.name}</span>! 
              You can vote for <span className="font-semibold text-white">one project only</span>.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 items-start">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            hasVoted={project.id === votedProjectId}
            onVote={hasVoted ? undefined : handleVote}
            disabled={hasVoted && project.id !== votedProjectId}
          />
        ))}
      </div>
    </div>
  )
}