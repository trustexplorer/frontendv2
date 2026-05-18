/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint now runs during builds to catch real bugs
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "encrypted-tbn2.gstatic.com" },
    ],
  },
};

module.exports = nextConfig;
