import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'res.cloudinary.com' },
    { protocol: 'https', hostname: 'i.pravatar.cc' },
    { protocol: 'https', hostname: 'image.tmdb.org' },
    { protocol: 'https', hostname: 'cdn.myanimelist.net' },
    { protocol: 'https', hostname: 'i.imgur.com' },
    { protocol: 'https', hostname: 'static.nutscdn.com' },
    { protocol: 'https', hostname: 'i.ytimg.com' },
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'picsum.photos' },
  ],
},


};

export default nextConfig;
