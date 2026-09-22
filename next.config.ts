import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["@cloudflare/playwright"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
