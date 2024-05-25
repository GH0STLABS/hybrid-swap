/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'assets.aceternity.com',
      'firebasestorage.googleapis.com',
      'www.soldev.app',
      'avatar.vercel.sh',
      'arweave.net',
      'i.imgur.com',
      'quackassets.pages.dev',
      'shdw-drive.genesysgo.net',
      'gateway.irys.xyz'
    ]
  }
};

export default nextConfig;
