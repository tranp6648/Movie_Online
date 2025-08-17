import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'static.nutscdn.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.imgur.com' },
      { protocol: 'https', hostname: 'image.tmdb.org' },
      { protocol: 'https', hostname: 'cdn.myanimelist.net' },
      { protocol: 'https', hostname: 'www.themoviedb.org' },
      { protocol: 'https', hostname: 'www.themoviedb.com' },
      { protocol: 'https', hostname: 'cdn.discordapp.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      // add any others you use:
      // { protocol: 'https', hostname: 'image.tmdb.org' },
    ],
  },
};

export default nextConfig;
