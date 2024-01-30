/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['payments.pre-bnvo.com'],
  },
};

export default nextConfig;