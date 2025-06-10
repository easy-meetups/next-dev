const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'ui-avatars.com',
      'oclb.com.br',
      'blog.zooxsmart.com',
      'encrypted-tbn0.gstatic.com',
      'miro.medium.com',
    ],
  },
};

module.exports = withPWA(nextConfig);
