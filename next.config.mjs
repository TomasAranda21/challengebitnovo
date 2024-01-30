/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['payments.pre-bnvo.com'],
  },
  env: {
    NEXT_TOKEN: process.env.NEXT_TOKEN,
  }
};

export default nextConfig;