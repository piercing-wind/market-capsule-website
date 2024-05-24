/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: false,
  env: {
    MODE: process.env.MODE,
    API: process.env.API,
    IMG: process.env.IMG,
    PORT: process.env.PORT,
    IMGURL: process.env.IMGURL,
    RAZORPAY_KEY: process.env.RAZORPAY_KEY,
    CURRENCY: process.env.CURRENCY,
    WEB: process.env.WEB
  },
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.marketcapsule.in',
      },
    ],
  },
}

module.exports = nextConfig
