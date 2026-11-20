import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.expertises-bati-ancien.fr",
      },
    ],
  },
  async redirects() {
    return [
      // Page WordPress « accueil » : doublon de la home.
      { source: "/accueil", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
