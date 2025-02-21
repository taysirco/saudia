/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['maps.googleapis.com'],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.csv$/,
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: false,
        skipEmptyLines: true
      }
    })
    return config
  },
  async redirects() {
    return [
      {
        source: '/city/:slug',
        destination: '/:slug',
        permanent: true,
      },
      {
        source: '/city/:slug/:service',
        destination: '/:slug/:service',
        permanent: true,
      }
    ]
  }
};

module.exports = nextConfig; 