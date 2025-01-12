/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // experimental: {
  //   serverActions: true,
  // },
  experimental: {
    outputFileTracing: true,
  },
};

export default nextConfig;
