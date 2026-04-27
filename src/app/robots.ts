import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://mylashhouse.com/sitemap.xml",
    host: "https://mylashhouse.com",
  };
}
