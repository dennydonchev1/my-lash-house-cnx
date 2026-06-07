import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import FAQAccordion from "@/components/FAQAccordion";
import type { BlogPostMeta } from "@/lib/blog";
import { getPostUrl } from "@/lib/blog";
import { dict, type Lang } from "@/lib/i18n";

const LABELS = {
  en: {
    backToBlog: "All articles",
    publishedOn: "Published",
    readingTime: "min read",
    by: "By",
    home: "Home",
    blog: "Blog",
  },
  th: {
    backToBlog: "ดูบทความทั้งหมด",
    publishedOn: "เผยแพร่",
    readingTime: "นาทีในการอ่าน",
    by: "โดย",
    home: "หน้าหลัก",
    blog: "บทความ",
  },
};

export default function BlogPost({
  post,
  content,
  lang,
}: {
  post: BlogPostMeta;
  content: string;
  lang: Lang;
}) {
  const L = LABELS[lang];
  const blogIndexHref = lang === "th" ? "/th/blog" : "/blog";
  const homeHref = lang === "th" ? "/th" : "/";
  const canonicalUrl = `https://mylashhouse.com${getPostUrl(post, lang)}`;
  // Language toggle should jump to the SAME post in the other language
  const otherLang: Lang = lang === "en" ? "th" : "en";
  const otherLangHref = getPostUrl(post, otherLang);

  // Article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[lang],
    description: post.description[lang],
    image: `https://mylashhouse.com${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: "Certified Eyelash Artist",
      worksFor: { "@type": "BeautySalon", name: "My Lash House Chiang Mai" },
    },
    publisher: {
      "@type": "Organization",
      name: "My Lash House Chiang Mai",
      logo: {
        "@type": "ImageObject",
        url: "https://mylashhouse.com/icon-512.png",
      },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    inLanguage: lang === "th" ? "th-TH" : "en-TH",
  };

  // FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq[lang].map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: L.home, item: `https://mylashhouse.com${homeHref}` },
      { "@type": "ListItem", position: 2, name: L.blog, item: `https://mylashhouse.com${blogIndexHref}` },
      { "@type": "ListItem", position: 3, name: post.title[lang], item: canonicalUrl },
    ],
  };

  // Format date for display
  const dateFormat = lang === "th" ? "th-TH" : "en-US";
  const formattedDate = new Date(post.publishedAt).toLocaleDateString(dateFormat, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Navbar lang={lang} otherLangHref={otherLangHref} />

      <main className="bg-cream pt-24 sm:pt-28">
        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-charcoal-light" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-plum transition-colors">
              {L.home}
            </Link>
            <span className="mx-2">›</span>
            <Link href={blogIndexHref} className="hover:text-plum transition-colors">
              {L.blog}
            </Link>
          </nav>

          {/* Hero image */}
          <div className="mb-8 overflow-hidden rounded-2xl bg-cream-dark">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.heroImage}
              alt={post.heroImageAlt[lang]}
              className="h-auto w-full"
              loading="eager"
            />
          </div>

          {/* Meta */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-rose-dark">
            <span>{L.by} {post.author}</span>
            <span className="text-charcoal-light/50">·</span>
            <span>{formattedDate}</span>
            <span className="text-charcoal-light/50">·</span>
            <span>{post.readingMinutes} {L.readingTime}</span>
          </div>

          {/* Markdown content */}
          <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-charcoal prose-h1:text-4xl prose-h1:sm:text-5xl prose-h2:text-2xl prose-h2:sm:text-3xl prose-h2:mt-12 prose-h3:text-xl prose-h3:sm:text-2xl prose-a:text-plum hover:prose-a:text-rose-dark prose-strong:text-charcoal prose-table:text-sm prose-th:bg-cream-dark prose-th:font-semibold prose-blockquote:border-rose prose-blockquote:not-italic prose-li:my-1">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Skip the markdown's first H1 image (we render hero above) and first H1 heading (we render in the markdown naturally)
                img: ({ src, alt }) => {
                  // Hero is rendered above; skip any markdown image that matches the post's hero image
                  const heroBase = post.heroImage.split("/").pop()?.replace(/\.[^.]+$/, "");
                  if (src && typeof src === "string" && heroBase && src.includes(heroBase)) {
                    return null;
                  }
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src as string} alt={alt ?? ""} loading="lazy" className="rounded-xl" />
                  );
                },
              }}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* FAQ accordion (matches home page FAQ styling) */}
          <section className="mt-16 border-t border-cream-dark pt-12">
            <FAQAccordion
              items={post.faq[lang] as unknown as { q: string; a: string }[]}
              eyebrow={dict[lang].faq.eyebrow}
              heading={dict[lang].faq.heading}
              headingHighlight={dict[lang].faq.headingHighlight}
            />
          </section>

          {/* Back to blog link */}
          <div className="mt-16 mb-12 border-t border-cream-dark pt-8">
            <Link
              href={blogIndexHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-plum transition-colors hover:text-rose-dark"
            >
              <ChevronLeft className="h-4 w-4" />
              {L.backToBlog}
            </Link>
          </div>
        </article>
      </main>

      <Footer lang={lang} />
      <MobileBookingBar lang={lang} />
    </>
  );
}
