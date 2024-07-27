/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.soorya-u.dev",
      },
    ],
  },
};

export default nextConfig;
