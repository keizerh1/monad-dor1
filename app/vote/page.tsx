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

const mockProjects: Project[] = [
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
    description: 'Legendary creatures soaring through Monad\'s golden age',
    image: 'https://picsum.photos/400/400?random=6'
  }
]

export default function VotePage() {
  const { data: session, status } = useSession()
  const [votedProjects, setVotedProjects] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user) {
      fetchUserVotes()
    } else {
      setLoading(false)
    }
  }, [session])

  const fetchUserVotes = async () => {
    try {
      const response = await fetch('/api/votes/user')
      if (response.ok) {
        const data = await response.json()
        setVotedProjects(new Set(data.votedProjects))
      }
    } catch (error) {
      console.error('Error fetching user votes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleVote = async (projectId: string) => {
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId }),
      })

      if (response.ok) {
        setVotedProjects(prev => new Set([...prev, projectId]))
      } else {
        const error = await response.json()
        alert(error.message || 'Failed to vote')
      }
    } catch (error) {
      console.error('Error voting:', error)
      alert('Failed to vote')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-monad-purple"></div>
      </div>
    )
  }

  if (!session) {
    return <LoginPrompt />
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
          Vote for Your Favorites
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Choose the best NFT projects in the Monad ecosystem
        </p>
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20 inline-block">
          <p className="text-monad-gold">
            Welcome, <span className="font-semibold">{session.user?.name}</span>! 
            You can vote once per project.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            hasVoted={votedProjects.has(project.id)}
            onVote={handleVote}
          />
        ))}
      </div>
    </div>
  )
}
