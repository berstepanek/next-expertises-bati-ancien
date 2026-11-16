import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "expertises-bati-ancien.fr",
      },
    ],
  },
};

export default nextConfig;
