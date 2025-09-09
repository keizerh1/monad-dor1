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
  votes?: number
}

const projects: Project[] = [
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
]

export default function VotePage() {
  const { data: session, status } = useSession()
  const [hasVoted, setHasVoted] = useState(false)
  const [votedProjectId, setVotedProjectId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [projectsWithVotes, setProjectsWithVotes] = useState<Project[]>(projects)
  const [totalVotes, setTotalVotes] = useState(0)

  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [pendingVoteProjectId, setPendingVoteProjectId] = useState<string | null>(null)

  useEffect(() => {
    // Charger les résultats des votes
    fetchVoteResults()
    
    // Si l'utilisateur est connecté, vérifier s'il a voté
    if (session?.user) {
      fetchUserVoteStatus()
    } else {
      setLoading(false)
    }
  }, [session])

  // Rafraîchir les résultats toutes les 15 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchVoteResults()
    }, 15000) // 15 secondes

    return () => clearInterval(interval)
  }, [])

  const fetchVoteResults = async () => {
    try {
      // Add timestamp to prevent caching
      const response = await fetch(`/api/results?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      if (response.ok) {
        const data = await response.json()
        setProjectsWithVotes(data.results)
        setTotalVotes(data.totalVotes)
      }
    } catch (error) {
      console.error('Error fetching results:', error)
    }
  }

  const fetchUserVoteStatus = async () => {
    try {
      // Add timestamp and no-cache headers - CORRECTED URL HERE
      const response = await fetch(`/api/vote/status?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        }
      })
      if (response.ok) {
        const data = await response.json()
        console.log('User vote status:', data) // Debug log
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
      // Pas de popup, l'interface montre déjà que l'utilisateur a voté
      return
    }

    // Stocker le projet et afficher la modal de confirmation
    setPendingVoteProjectId(projectId)
    setShowConfirmModal(true)
  }

  const confirmVote = async () => {
    if (!pendingVoteProjectId) return

    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId: pendingVoteProjectId }),
      })

      if (response.ok) {
        // Update local state immediately for instant feedback
        setHasVoted(true)
        setVotedProjectId(pendingVoteProjectId)
        
        // Update the vote count locally for the voted project
        setProjectsWithVotes(prev => prev.map(p => 
          p.id === pendingVoteProjectId 
            ? { ...p, votes: (p.votes || 0) + 1 }
            : p
        ))
        
        // Update total votes count
        setTotalVotes(prev => prev + 1)
        
        // Fermer la modal
        setShowConfirmModal(false)
        setPendingVoteProjectId(null)
        
        console.log('Vote recorded successfully for project:', pendingVoteProjectId)
        
        // Fetch fresh data from server after a short delay to ensure consistency
        setTimeout(() => {
          fetchVoteResults()
          fetchUserVoteStatus()
        }, 500)
        
      } else {
        const error = await response.json()
        console.error('Failed to vote:', error.error || 'Failed to vote')
        setShowConfirmModal(false)
        setPendingVoteProjectId(null)
      }
    } catch (error) {
      console.error('Error voting:', error)
      setShowConfirmModal(false)
      setPendingVoteProjectId(null)
    }
  }

  const cancelVote = () => {
    setShowConfirmModal(false)
    setPendingVoteProjectId(null)
  }

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
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
          Vote for Your Favorite Monad NFT Collection 
        </h1>
        <p className="text-base text-white mb-4 max-w-4xl mx-auto">
          Celebrate the Monad ecosystem by supporting the projects you love
        </p>
        <p className="text-base text-white mb-8 max-w-4xl mx-auto">
          One community, one vote, one vision
        </p>
        
        {/* Affichage du total des votes */}
        <div className="mb-6">
          <p className="text-monad-gold text-base font-semibold">
            Total Votes: {totalVotes}
          </p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm p-3 rounded-xl border border-purple-500/20 inline-block">
          {hasVoted ? (
            <p className="text-sm text-monad-gold">
              ✅ Thank you <span className="font-semibold">{session.user?.name}</span>! 
              You have already voted for <span className="font-semibold">
                {projectsWithVotes.find(p => p.id === votedProjectId)?.name}
              </span>.
            </p>
          ) : (
            <p className="text-sm text-monad-gold">
              Welcome, <span className="font-semibold">{session.user?.name}</span>! 
              You can vote for <span className="font-semibold text-white">one project only</span>.
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        {projectsWithVotes.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            hasVoted={hasVoted && project.id === votedProjectId}
            onVote={hasVoted ? undefined : handleVote}
            disabled={hasVoted && project.id !== votedProjectId}
            votes={project.votes || 0}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-xl p-6 max-w-md mx-4">
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-3">Confirm Your Vote</h3>
              
              <p className="text-gray-300 mb-2">
                You are about to vote for:
              </p>
              
              <p className="text-[#FFD700] font-bold text-lg mb-4">
                {projectsWithVotes.find(p => p.id === pendingVoteProjectId)?.name}
              </p>
              
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-3 mb-6">
                <p className="text-red-400 text-sm font-semibold">
                  ⚠️ Warning: You cannot change your vote during the entire Season 1
                </p>
              </div>
              
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to make this choice?
              </p>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={confirmVote}
                  className="px-6 py-2.5 bg-[#7B61FF] hover:bg-[#6B51EF] text-white font-semibold rounded-lg transition-all transform hover:scale-105"
                >
                  Confirm my vote
                </button>
                <button
                  onClick={cancelVote}
                  className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}