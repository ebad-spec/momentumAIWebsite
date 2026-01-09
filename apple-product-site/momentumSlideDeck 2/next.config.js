/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  basePath: '/deck',
  images: {
    unoptimized: true,
  },
  // Ensure fast refresh works in dev mode
  reactStrictMode: true,
}

module.exports = nextConfig

