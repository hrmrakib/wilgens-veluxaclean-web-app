import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.12.51",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
