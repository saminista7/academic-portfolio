/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Nothing here needs a server at request time, so a static export stays available
  // if this ever moves off Vercel. Do not add server-only features casually.
  images: { unoptimized: true },
};

export default nextConfig;
