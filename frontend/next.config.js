/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol:'https',
        hostname:'www.citypng.com',
      },
    ],
  },
}

module.exports = nextConfig
