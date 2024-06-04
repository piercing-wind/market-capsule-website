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
    WEB: process.env.WEB,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    Facebook_APP_ID: process.env.Facebook_APP_ID,

  },
  i18n,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.marketcapsule.in',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'd1gg24sxbl1rgc.cloudfront.net',
      },
    ],
  },
}

module.exports = nextConfig
