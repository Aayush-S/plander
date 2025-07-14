/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "/api/main.py",
      },
    ];
  },
};

module.exports = nextConfig;
