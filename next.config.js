/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  }
};

module.exports = nextConfig; 