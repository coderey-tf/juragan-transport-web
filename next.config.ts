import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(self)",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.tiktok.com https://*.tiktok.com https://lf16-tiktok-web.tiktokcdn-us.com https://*.tiktokcdn.com https://*.ttwstatic.com https://fonts.googleapis.com https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.ttwstatic.com",
              "font-src 'self' https://fonts.gstatic.com https://*.ttwstatic.com",
              "img-src 'self' data: blob: https: http:",
              "media-src 'self' https://*.tiktokcdn.com https://*.tiktok.com https://*.ttwstatic.com",
              "frame-src 'self' https://www.tiktok.com https://*.tiktok.com https://www.google.com https://maps.googleapis.com",
              "connect-src 'self' https://*.tiktok.com https://*.tiktokcdn.com https://*.ttwstatic.com https://fonts.googleapis.com https://fonts.gstatic.com https://www.google-analytics.com",
              "worker-src blob:",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
