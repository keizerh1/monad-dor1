'use client'

import Image from 'next/image'
import { useState } from 'react'

interface Project {
  id: string
  name: string
  description: string
  image: string
  votes?: number
}

interface ProjectCardProps {
  project: Project
  hasVoted: boolean
  onVote?: (projectId: string) => Promise<void>
  disabled?: boolean
  votes?: number
}

export function ProjectCard({ project, hasVoted, onVote, disabled = false, votes = 0 }: ProjectCardProps) {
  const [isVoting, setIsVoting] = useState(false)

  const handleVote = async () => {
    if (hasVoted || isVoting || disabled || !onVote) return
    
    setIsVoting(true)
    try {
      await onVote(project.id)
    } finally {
      setIsVoting(false)
    }
  }

  const isButtonDisabled = hasVoted || isVoting || disabled || !onVote

  return (
    <div className={`group bg-gray-900/50 backdrop-blur-sm rounded-lg overflow-hidden border transition-all duration-300 h-full flex flex-col justify-between ${
      hasVoted 
        ? 'border-monad-gold shadow-lg shadow-monad-gold/20' 
        : disabled 
        ? 'border-gray-600/20 opacity-75' 
        : 'border-purple-500/20 hover:border-purple-500/40 hover:transform hover:scale-105'
    }`}>
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          width={256}
          height={200}
          className={`w-full h-48 object-cover transition-transform duration-300 ${
            !disabled ? 'group-hover:scale-110' : ''
          }`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          !disabled ? 'opacity-0 group-hover:opacity-100' : 'opacity-30'
        }`}></div>
        
        {hasVoted && (
          <div className="absolute top-3 right-3 bg-monad-gold text-black px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
            <span>✓</span>
            <span>Your Vote</span>
          </div>
        )}

        {disabled && !hasVoted && (
          <div className="absolute top-3 right-3 bg-gray-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            Voting Closed
          </div>
        )}

        {/* Vote count badge */}
        <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg flex items-center space-x-1">
          <span className="text-monad-gold font-bold text-sm">{votes}</span>
          <span className="text-xs">{votes === 1 ? 'vote' : 'votes'}</span>
        </div>
      </div>

      <div className="p-3">
        <h3 className={`font-semibold text-base mb-1 transition-colors ${
          hasVoted 
            ? 'text-monad-gold' 
            : disabled 
            ? 'text-gray-400' 
            : 'text-white group-hover:text-monad-purple'
        }`}>
          {project.name}
        </h3>
        <p className={`text-xs text-gray-400 mb-3 line-clamp-2 ${
          disabled ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {project.description}
        </p>

        <button
          onClick={handleVote}
          disabled={isButtonDisabled}
          className={`w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 text-sm ${
            hasVoted
              ? 'bg-monad-gold text-black cursor-default'
              : isVoting
              ? 'bg-monad-purple/50 text-white cursor-wait'
              : disabled
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-monad-purple to-monad-purple-dark text-white hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105 active:scale-95'
          }`}
        >
          {isVoting ? (
            <div className="flex items-center justify-center space-x-1">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
              <span>Voting...</span>
            </div>
          ) : hasVoted ? (
            <div className="flex items-center justify-center space-x-1">
              <span>🏆</span>
              <span>Your Choice</span>
            </div>
          ) : disabled ? (
            <div className="flex items-center justify-center space-x-1">
              <span>🚫</span>
              <span>Already Voted</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <span>🗳️</span>
              <span>Vote Now</span>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}