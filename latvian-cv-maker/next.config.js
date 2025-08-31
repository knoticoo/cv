const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer']
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  }
};
 
module.exports = withNextIntl(nextConfig);