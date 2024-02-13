/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "img.omdbapi.com",
      },
    ],
  },
};

export default nextConfig;
