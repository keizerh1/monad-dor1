'use client'

import { useState, useEffect } from 'react'
import { RankingTable } from '@/components/RankingTable'

interface ProjectResult {
  id: string
  name: string
  votes: number
  image: string
  description: string
}

export default function ResultsPage() {
  const [results, setResults] = useState<ProjectResult[]>([])
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())

  const fetchResults = async () => {
    try {
      console.log('🔍 Frontend: Fetching results from API...')
      const response = await fetch('/api/results')
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Frontend: Raw API response:', data)
        console.log('🗳️ Frontend: Results array:', data.results)
        console.log('📈 Frontend: Total votes:', data.totalVotes)
        setResults(data.results)
        setLastUpdate(new Date())
      } else {
        console.error('❌ Frontend: API response not ok:', response.status, response.statusText)
      }
    } catch (error) {
      console.error('💥 Frontend: Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()

    // Poll for updates every 10 seconds
    const interval = setInterval(fetchResults, 10000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-monad-gold"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pb-8">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 pt-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Monad d'Or Results
        </h1>
        <p className="text-base text-gray-300 mb-1 font-light">
          See which projects are leading the race!
        </p>
        <p className="text-xs text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()} • Updates every 10s
        </p>
      </div>

      {results.length > 0 && (
        <div className="mb-6 relative">
          {/* Left rocket - smaller */}
          <div className="absolute -left-16 top-1/2 -translate-y-1/2 hidden lg:block animate-float">
            <img 
              src="/images/monad-moon.gif" 
              alt="Monad Rocket" 
              className="w-20 h-20 object-contain"
            />
          </div>
          
          {/* Current Leader card - more compact */}
          <div className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-0.5 rounded-xl max-w-2xl mx-auto">
            <div className="bg-black rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">👑</div>
              <h2 className="text-lg font-bold mb-2" style={{ color: '#FFD700' }}>Current Leader</h2>
              <h3 className="text-xl font-semibold text-white mb-1">{results[0]?.name}</h3>
              <p className="font-bold text-lg" style={{ color: '#FFD700' }}>{results[0]?.votes} votes</p>
            </div>
          </div>
          
          {/* Right rocket - smaller */}
          <div className="absolute -right-16 top-1/2 -translate-y-1/2 hidden lg:block animate-float" style={{animationDelay: '1s'}}>
            <img 
              src="/images/monad-moon.gif" 
              alt="Monad Rocket" 
              className="w-20 h-20 object-contain transform scale-x-[-1]"
            />
          </div>
        </div>
      )}

      <RankingTable results={results} />

      {results.length === 0 && (
        <div className="text-center py-8">
          <div className="text-3xl mb-3">🗳️</div>
          <h2 className="text-base md:text-lg font-semibold text-gray-300 mb-3">No votes yet!</h2>
          <p className="text-sm text-gray-400 mb-5">Be the first to cast your vote and shape the rankings.</p>
          <a
            href="/vote"
            className="inline-block px-5 py-2 bg-gradient-to-r from-monad-purple to-monad-purple-dark text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 glow-purple"
          >
            Start Voting
          </a>
        </div>
      )}
    </div>
  )
}