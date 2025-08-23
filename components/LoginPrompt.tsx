'use client'

import { signIn } from 'next-auth/react'

export function LoginPrompt() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="bg-gray-900/50 backdrop-blur-sm p-12 rounded-2xl border border-purple-500/20 max-w-md mx-auto">
        <div className="text-6xl mb-6">🔐</div>
        
        <h2 className="text-3xl font-bold text-gradient mb-4">
          Login Required
        </h2>
        
        <p className="text-gray-300 text-lg mb-8">
          Connect your Discord account to participate in the Monad d&apos;Or voting and help celebrate the best NFT projects!
        </p>

        <button
          onClick={() => signIn('discord')}
          className="flex items-center justify-center space-x-3 w-full px-6 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white rounded-xl transition-all duration-300 font-semibold text-lg hover:transform hover:scale-105 glow-purple"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <span>Connect Discord Account</span>
        </button>

        <div className="mt-6 text-sm text-gray-400">
          <p>We use Discord to:</p>
          <ul className="mt-2 space-y-1">
            <li>• Prevent vote manipulation</li>
            <li>• Ensure fair community voting</li>
            <li>• Display your username</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-gray-400 mb-4">
          Want to see the current standings?
        </p>
        <a
          href="/results"
          className="inline-block px-6 py-3 bg-gradient-to-r from-monad-gold to-monad-gold-dark text-black font-semibold rounded-xl hover:transform hover:scale-105 transition-all duration-300 glow-gold"
        >
          View Results
        </a>
      </div>
    </div>
  )
}
