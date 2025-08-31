import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

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
      <body className={`${inter.className} text-white min-h-screen`}>
        <div className="min-h-screen flex flex-col" style={{background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f23 50%, #1a1a2e 100%)'}}>
          {/* Existing overlay if present */}
          <Providers>
            <Navbar />
            <main className="container mx-auto px-4 py-8 flex-grow relative z-10">
              {children}
            </main>
            <Footer />
          </Providers>
        </div>
      </body>
    </html>
  )
}