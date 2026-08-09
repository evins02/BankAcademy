/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
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
