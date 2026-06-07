import type { MetadataRoute } from "next";
import { getAllPosts, getPostUrl } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mylashhouse.com";
  const lastModified = new Date();

  const blogPosts = getAllPosts().flatMap((post) => [
    {
      url: `${base}${getPostUrl(post, "en")}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${base}${getPostUrl(post, "en")}`,
          th: `${base}${getPostUrl(post, "th")}`,
        },
      },
    },
    {
      url: `${base}${getPostUrl(post, "th")}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${base}${getPostUrl(post, "en")}`,
          th: `${base}${getPostUrl(post, "th")}`,
        },
      },
    },
  ]);

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${base}`,
          th: `${base}/th`,
        },
      },
    },
    {
      url: `${base}/th`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      alternates: {
        languages: {
          en: `${base}`,
          th: `${base}/th`,
        },
      },
    },
    {
      url: `${base}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${base}/blog`,
          th: `${base}/th/blog`,
        },
      },
    },
    {
      url: `${base}/th/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${base}/blog`,
          th: `${base}/th/blog`,
        },
      },
    },
    ...blogPosts,
  ];
}
