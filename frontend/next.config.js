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
        hostname:'cdns.iconmonstr.com',
      },
      {
        protocol:'https',
        hostname:'cdn.icon-icons.com',
      },
    ],
  },
}

module.exports = nextConfig
