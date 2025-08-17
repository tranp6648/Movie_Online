import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.nutscdn.com' },
      // add any others you use:
      // { protocol: 'https', hostname: 'image.tmdb.org' },
    ],
  },
};

export default nextConfig;
