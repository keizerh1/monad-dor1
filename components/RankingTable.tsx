'use client'

import Image from 'next/image'

interface ProjectResult {
  id: string
  name: string
  votes: number
  image: string
  description: string
}

interface RankingTableProps {
  results: ProjectResult[]
}

export function RankingTable({ results }: RankingTableProps) {
  console.log('🏆 RankingTable: Received results:', results)
  console.log('📊 RankingTable: Number of results:', results.length)
  
  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return `#${position}`
    }
  }

  const getRankStyle = (position: number) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-monad-gold to-monad-gold-dark border-monad-gold glow-gold'
      case 2:
        return 'bg-gradient-to-r from-gray-400 to-gray-500 border-gray-400'
      case 3:
        return 'bg-gradient-to-r from-amber-600 to-amber-700 border-amber-600'
      default:
        return 'bg-gray-900/50 border-purple-500/20 hover:border-purple-500/40'
    }
  }

  const getTextColor = (position: number) => {
    if (position <= 3) return 'text-black'
    return 'text-white'
  }

  return (
    <div className="space-y-4 px-4 max-w-full">
      {results.map((project, index) => {
        const position = index + 1
        const isTopThree = position <= 3
        
        return (
          <div
            key={project.id}
            className={`backdrop-blur-sm rounded-2xl border transition-all duration-300 hover:transform hover:scale-[1.02] ${getRankStyle(position)}`}
          >
            <div className="p-4 w-full">
              <div className="flex items-center justify-between gap-4 w-full">
                {/* Left side: Rank, Image, Project Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  {/* Rank */}
                  <div className="flex-shrink-0 w-12 text-center">
                    <div className={`text-2xl font-bold ${getTextColor(position)}`}>
                      {getRankIcon(position)}
                    </div>
                  </div>

                  {/* Project Image */}
                  <div className="flex-shrink-0">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-white/20"
                    />
                  </div>

                  {/* Project Info */}
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-bold text-base truncate ${getTextColor(position)}`}>
                      {project.name}
                    </h3>
                    <p className={`text-xs opacity-80 truncate ${getTextColor(position)}`}>
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Right side: Vote Count */}
                <div className="text-right flex-shrink-0 min-w-[60px]">
                  <div className={`text-xl font-bold ${getTextColor(position)}`}>
                    {project.votes}
                  </div>
                  <div className={`text-xs opacity-80 ${getTextColor(position)}`}>
                    {project.votes === 1 ? 'vote' : 'votes'}
                  </div>
                </div>
              </div>

              {/* Progress Bar for Top Project */}
              {position === 1 && results[0]?.votes > 0 && (
                <div className="mt-4 pt-4 border-t border-black/20 px-2">
                  <div className="flex justify-between items-center mb-2 gap-4">
                    <span className="text-black font-semibold text-sm truncate">Leading with {project.votes} votes</span>
                    <span className="text-black text-xs flex-shrink-0">
                      {results[1] ? `+${project.votes - results[1].votes} ahead` : 'Uncontested leader'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}

      {results.length > 3 && (
        <div className="text-center py-6 px-4">
          <div className="inline-flex items-center space-x-2 text-gray-400">
            <span className="text-xl">🏆</span>
            <span className="text-base">
              Showing all {results.length} projects
            </span>
          </div>
        </div>
      )}
    </div>
  )
}