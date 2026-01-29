import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
  // Enable compression
  compress: true,
  // Optimize production builds
  poweredByHeader: false,
  // Enable React strict mode for better development
  reactStrictMode: true,
};

export default nextConfig;
