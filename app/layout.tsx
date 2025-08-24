import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Monad d\'Or 🏆',
  description: 'Vote for your favorite NFT projects and celebrate the Monad ecosystem.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-950">
          <Providers>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </Providers>
        </div>
      </body>
    </html>
  )
}
