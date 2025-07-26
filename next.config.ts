import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.10.12.25",
        port: "5008",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
