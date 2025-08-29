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
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gradient">
  Monad d&apos;Or Results 🏆
</h1>
        <p className="text-xl text-gray-300 mb-4">
          See which projects are leading the race!
        </p>
        <p className="text-sm text-gray-400">
          Last updated: {lastUpdate.toLocaleTimeString()} • Updates every 10s
        </p>
      </div>

      {results.length > 0 && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-monad-gold to-monad-gold-dark p-1 rounded-2xl">
            <div className="bg-black rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">👑</div>
              <h2 className="text-3xl font-bold text-monad-gold mb-2">Current Leader</h2>
              <h3 className="text-2xl font-semibold text-white mb-2">{results[0]?.name}</h3>
              <p className="text-monad-gold font-bold text-xl">{results[0]?.votes} votes</p>
            </div>
          </div>
        </div>
      )}

      <RankingTable results={results} />

      {results.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🗳️</div>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">No votes yet!</h2>
          <p className="text-gray-400 mb-8">Be the first to cast your vote and shape the rankings.</p>
          <a
            href="/vote"
            className="inline-block px-8 py-4 bg-gradient-to-r from-monad-purple to-monad-purple-dark text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 glow-purple"
          >
            Start Voting
          </a>
        </div>
      )}
    </div>
  )
}
