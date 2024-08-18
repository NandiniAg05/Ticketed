/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'img.clerk.com' },
      { hostname: 'firebasestorage.googleapis.com' },
      { hostname: 'ticketed.netlify.app' }, // Ensure this is a separate pattern
    ],
  },
};

export default nextConfig;
