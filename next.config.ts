import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https" as const, // Use const assertion for protocol
        hostname: "github.com",
      },
      {
        protocol: "https" as const,
        hostname: "lh3.googleusercontent.com"
      },
      {
        protocol: "https" as const,
        hostname: "utfs.io"
      }
    ]
  }
};

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

module.exports = withNextIntl(nextConfig);