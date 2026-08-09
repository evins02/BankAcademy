/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.bankacademy.ch" }],
        destination: "https://bankacademy.ch/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Allow microphone access for Web Speech API
          { key: "Permission-Policy", value: "microphone=self" },
        ],
      },
    ];
  },
};

export default nextConfig;
