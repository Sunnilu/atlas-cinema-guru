/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enforce type safety during build
  },
  reactStrictMode: true, // Helps catch issues in development
};

export default nextConfig;
