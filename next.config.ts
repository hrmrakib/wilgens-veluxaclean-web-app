import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.10.199",
        port: "5008",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
