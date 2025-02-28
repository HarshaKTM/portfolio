/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['your-domain.com'],
  },
}

module.exports = nextConfig 