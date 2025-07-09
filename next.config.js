/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/rooms/:path*",
          destination: "http://localhost:8000/rooms/:path*",
        },
        {
          source: "/activities/:path*",
          destination: "http://localhost:8000/activities/:path*",
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;
