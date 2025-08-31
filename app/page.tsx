import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="mb-12 animate-fadeIn">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gradient">
          Vote for Your Favorite Monad NFT Collection 
        </h1>
        <h2 className="text-lg font-semibold text-monad-gold mb-4">
          Welcome to Monad d'Or!
        </h2>
        <p className="text-base text-gray-300 max-w-3xl mx-auto leading-relaxed">
          A Ballon d'Or Monad edition, where everyone can vote for their favorite NFT project and celebrate the creativity of our ecosystem
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <Link href="/vote">
          <button className="group relative px-6 py-2.5 bg-gradient-to-r from-monad-purple to-monad-purple-dark text-white font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl glow-purple">
            <span className="relative z-10">Start Voting</span>
            <div className="absolute inset-0 bg-gradient-to-r from-monad-purple-dark to-monad-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </Link>
        
        <Link href="/results">
          <button className="group relative px-6 py-2.5 bg-gradient-to-r from-monad-gold to-monad-gold-dark text-black font-semibold rounded-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl glow-gold">
            <span className="relative z-10">See Results</span>
            <div className="absolute inset-0 bg-gradient-to-r from-monad-gold-dark to-monad-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </Link>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
          <div className="text-2xl mb-3">🏆</div>
          <h3 className="text-base font-semibold text-monad-gold mb-2">Vote</h3>
          <p className="text-gray-400 text-sm">Cast your vote for the best Monad NFT projects</p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
          <div className="text-2xl mb-3">🌟</div>
          <h3 className="text-base font-semibold text-monad-gold mb-2">Discover</h3>
          <p className="text-gray-400 text-sm">Explore amazing projects in the Monad ecosystem</p>
        </div>
        
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-purple-500/20">
          <div className="text-2xl mb-3">🎉</div>
          <h3 className="text-base font-semibold text-monad-gold mb-2">Celebrate</h3>
          <p className="text-gray-400 text-sm">Celebrate the winners and community favorites</p>
        </div>
      </div>
    </div>
  )
}