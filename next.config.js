/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['placeholder.pics', 'via.placeholder.com', 'picsum.photos', 'cdn.discordapp.com'],
  },
}

module.exports = nextConfig
