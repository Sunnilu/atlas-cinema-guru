/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false, // Enforce type safety during build
  },
  reactStrictMode: true, // Optional: helps catch issues in development
  swcMinify: true,        // Optional: enables faster builds with SWC
};

export default nextConfig;
