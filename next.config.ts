import type { NextConfig } from "next";

const nextConfig: NextConfig = {
images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com', // Untuk testing, hapus saat production
      },
    ],
  },
  // Strict mode untuk best practice React
  reactStrictMode: true,
};

export default nextConfig;
