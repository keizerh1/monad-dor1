'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id: string
  name: string
  description: string
  image: string
}

interface ProjectCardProps {
  project: Project
  hasVoted: boolean
  onVote: (projectId: string) => Promise<void>
}

export function ProjectCard({ project, hasVoted, onVote }: ProjectCardProps) {
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async () => {
    if (hasVoted || isVoting) return
    
    setIsVoting(true)
    try {
      await onVote(project.id)
    } finally {
      setIsVoting(false)
    }
  }

  return (
    <div className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105">
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {hasVoted && (
          <div className="absolute top-4 right-4 bg-monad-gold text-black px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
            <span>✓</span>
            <span>Voted</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-monad-purple transition-colors">
          {project.name}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          {project.description}
        </p>

        <button
          onClick={handleVote}
          disabled={hasVoted || isVoting}
          className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
            hasVoted
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : isVoting
              ? 'bg-monad-purple/50 text-white cursor-wait'
              : 'bg-gradient-to-r from-monad-purple to-monad-purple-dark text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95'
          }`}
        >
          {isVoting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Voting...</span>
            </div>
          ) : hasVoted ? (
            <div className="flex items-center justify-center space-x-2">
              <span>✓</span>
              <span>Already Voted</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>🗳️</span>
              <span>Vote Now</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
