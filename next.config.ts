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
      // 2026-10-17: the eye-shape post's April Thai-script slug still gets
      // crawled (Search Console 404). Send it to the live slug.
      {
        source: "/th/blog/%E0%B8%95%E0%B9%88%E0%B8%AD%E0%B8%82%E0%B8%99%E0%B8%95%E0%B8%B2%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B9%84%E0%B8%AB%E0%B8%99%E0%B8%94%E0%B8%B5",
        destination: "/th/blog/tor-khon-ta-baeb-nai-dee",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
