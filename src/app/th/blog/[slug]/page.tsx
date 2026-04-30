import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { BLOG_POSTS, getPostBySlug, getPostContent } from "@/lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slugTh ?? p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "th");
  if (!post) return {};

  const enUrl = `https://mylashhouse.com/blog/${post.slug}`;
  const thUrl = `https://mylashhouse.com/th/blog/${post.slugTh ?? post.slug}`;

  return {
    title: post.title.th,
    description: post.description.th,
    keywords: post.tags,
    alternates: {
      canonical: thUrl,
      languages: {
        "en-TH": enUrl,
        "th-TH": thUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: post.title.th,
      description: post.description.th,
      url: thUrl,
      type: "article",
      locale: "th_TH",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [{ url: post.heroImage, alt: post.heroImageAlt.th }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.th,
      description: post.description.th,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPageTh({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "th");
  if (!post) notFound();

  const content = getPostContent(post, "th");
  return <BlogPost post={post} content={content} lang="th" />;
}
