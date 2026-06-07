import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import { BLOG_POSTS, getPostBySlug, getPostContent } from "@/lib/blog";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  if (!post) return {};

  const url = `https://mylashhouse.com/blog/${post.slug}`;
  const thUrl = `https://mylashhouse.com/th/blog/${post.slugTh ?? post.slug}`;
  const metaTitleEn = post.metaTitle?.en ?? post.title.en;

  return {
    title: metaTitleEn,
    description: post.description.en,
    keywords: post.tags,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        th: thUrl,
        "x-default": url,
      },
    },
    openGraph: {
      title: metaTitleEn,
      description: post.description.en,
      url,
      type: "article",
      locale: "en_TH",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      images: [{ url: post.heroImage, alt: post.heroImageAlt.en }],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitleEn,
      description: post.description.en,
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug, "en");
  if (!post) notFound();

  const content = getPostContent(post, "en");
  return <BlogPost post={post} content={content} lang="en" />;
}
