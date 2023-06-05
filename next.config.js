/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    ARBITRUM_GOERLI_API_URL: process.env.ARBITRUM_GOERLI_API_URL,
  },
}

module.exports = nextConfig
