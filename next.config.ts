import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // 2026-10-11: the lash lifting guide posts were merged into the service
      // pages, which are now the single home for the lash lifting cluster.
      {
        source: "/blog/lash-lifting-chiang-mai",
        destination: "/services/lash-lifting",
        permanent: true,
      },
      {
        source: "/th/blog/lifting-khon-ta-chiang-mai",
        destination: "/th/services/lash-lifting",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
