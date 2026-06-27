import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import {
  ChevronLeft,
  Clock,
  CalendarDays,
  Sparkles,
  AlertTriangle,
  Moon,
  RefreshCw,
  ShieldCheck,
  HelpCircle,
  BookOpen,
  MessageCircle,
  Lightbulb,
  Eye,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import FAQAccordion from "@/components/FAQAccordion";
import type { BlogPostMeta } from "@/lib/blog";
import { getPostUrl } from "@/lib/blog";
import { dict, type Lang } from "@/lib/i18n";

// Recursively extract plain text from React children so we can keyword-match
// against heading content even when there are bold/italic/link nested elements.
function extractText(children: React.ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && "props" in children) {
    return extractText((children as { props?: { children?: React.ReactNode } }).props?.children);
  }
  return "";
}

// Keyword → icon map for auto-prefixing blog H2s. Pattern-matches against the
// plain text of the heading. Bilingual (EN + TH keywords).
const HEADING_ICON_RULES: Array<{ keywords: RegExp; Icon: LucideIcon }> = [
  { keywords: /short answer|คำตอบสั้น|tldr|tl;dr/i, Icon: Lightbulb },
  { keywords: /24 hour|first day|24 ชั่วโมง/i, Icon: Clock },
  { keywords: /first week|week 1|สัปดาห์แรก/i, Icon: CalendarDays },
  { keywords: /daily|clean|brush|care routine|ดูแลประจำวัน|ทำความสะอาด/i, Icon: Sparkles },
  { keywords: /avoid|skip|never|don'?t|ห้าม|หลีกเลี่ยง|เลี่ยง/i, Icon: AlertTriangle },
  { keywords: /sleep|pillow|นอน|หมอน/i, Icon: Moon },
  { keywords: /refill|come back|กลับมา|เติม/i, Icon: RefreshCw },
  { keywords: /guarantee|retouch|warranty|รับประกัน|รีทัช/i, Icon: ShieldCheck },
  { keywords: /how (was|this) .*(written|guide)|เขียนขึ้น|คู่มือนี้/i, Icon: BookOpen },
  { keywords: /send a message|message|book|contact|ส่งข้อความ|ทัก|จอง/i, Icon: MessageCircle },
  { keywords: /style|eye shape|รูปตา|ทรง/i, Icon: Eye },
  { keywords: /water|wet|น้ำ|โดนน้ำ/i, Icon: Droplets },
  { keywords: /\?|คำถาม|how|what|when|why|where|which/i, Icon: HelpCircle },
];

function iconForHeading(text: string): LucideIcon | null {
  for (const rule of HEADING_ICON_RULES) {
    if (rule.keywords.test(text)) return rule.Icon;
  }
  return null;
}

// Blockquote prefixes that trigger callout styling. The marker is stripped from
// the rendered text so writers can use clean markdown:
//   > ⚠️ Don't skip the 24-hour water rule.
//   > ✅ Use a foam-type lash shampoo once a day.
//   > 💡 Sleep on a silk pillowcase if you can't switch to back sleeping.
type CalloutVariant = "warn" | "tip" | "ok";
const CALLOUT_MARKERS: Array<{ marker: string; variant: CalloutVariant; Icon: LucideIcon }> = [
  { marker: "⚠️", variant: "warn", Icon: AlertTriangle },
  { marker: "💡", variant: "tip", Icon: Lightbulb },
  { marker: "✅", variant: "ok", Icon: ShieldCheck },
];

const CALLOUT_STYLES: Record<CalloutVariant, string> = {
  warn: "border-l-4 border-amber-500 bg-amber-50 text-amber-900",
  tip: "border-l-4 border-plum bg-plum/5 text-charcoal",
  ok: "border-l-4 border-emerald-500 bg-emerald-50 text-emerald-900",
};

const CALLOUT_ICON_STYLES: Record<CalloutVariant, string> = {
  warn: "text-amber-600",
  tip: "text-plum",
  ok: "text-emerald-600",
};

// Strip the leading callout marker (e.g. "⚠️ ") from the first text node so
// it doesn't render visually inside the styled callout (the icon already covers it).
function StripMarker({ marker, children }: { marker: string; children: React.ReactNode }) {
  function strip(node: React.ReactNode): React.ReactNode {
    if (typeof node === "string") {
      return node.replace(new RegExp(`^${marker}\\s*`), "");
    }
    if (Array.isArray(node)) {
      let stripped = false;
      return node.map((child, i) => {
        if (stripped) return child;
        const out = strip(child);
        if (out !== child) stripped = true;
        return out;
      });
    }
    if (node && typeof node === "object" && "props" in node) {
      const el = node as React.ReactElement<{ children?: React.ReactNode }>;
      const childContent = el.props?.children;
      if (childContent != null) {
        const newChildren = strip(childContent);
        if (newChildren !== childContent) {
          return { ...el, props: { ...el.props, children: newChildren } };
        }
      }
    }
    return node;
  }
  return <>{strip(children)}</>;
}

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
      {post.extraSchemas?.[lang]?.map((schema, i) => (
        <script
          key={`extra-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Navbar lang={lang} otherLangHref={otherLangHref} />

      <main className="bg-cream pt-24 sm:pt-28">
        <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-charcoal-light" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-plum transition-colors">
              {L.home}
            </Link>
            <span className="mx-2">›</span>
            <Link href={blogIndexHref} className="hover:text-plum transition-colors">
              {L.blog}
            </Link>
          </nav>

          {/* H1 title - rendered above hero so the headline + answer-first
              intro sit in the first 30% of the page (LLM citation real estate).
              The matching # heading in the markdown is suppressed below via
              the h1 component override so we don't double-render the title. */}
          <h1 className="font-heading text-3xl font-bold leading-tight text-charcoal sm:text-4xl lg:text-5xl">
            {post.title[lang]}
          </h1>

          {/* Meta */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs uppercase tracking-widest text-rose-dark">
            <span>{L.by} {post.author}</span>
            <span className="text-charcoal-light/50">·</span>
            <span>{formattedDate}</span>
            <span className="text-charcoal-light/50">·</span>
            <span>{post.readingMinutes} {L.readingTime}</span>
          </div>

          {/* Hero banner - constrained height with object-cover crop so square
              service photos don't dominate the viewport. Focal point stays
              centered; alt copy reads as figure caption beneath. */}
          <figure className="mt-8 mb-12">
            <div className="overflow-hidden rounded-2xl bg-cream-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.heroImage}
                alt={post.heroImageAlt[lang]}
                className="h-56 w-full object-cover sm:h-72 md:h-80 lg:h-[420px]"
                loading="eager"
              />
            </div>
          </figure>

          {/* Markdown content */}
          <div className="prose prose-lg max-w-none break-words prose-headings:font-heading prose-headings:text-charcoal prose-h1:text-3xl prose-h1:sm:text-4xl prose-h1:lg:text-5xl prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h3:text-lg prose-h3:sm:text-xl prose-h3:lg:text-2xl prose-a:text-plum prose-a:break-words hover:prose-a:text-rose-dark prose-strong:text-charcoal prose-table:text-sm prose-th:bg-cream-dark prose-th:font-semibold prose-blockquote:not-italic prose-li:my-1 prose-img:rounded-xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Title is rendered above the hero via post.title; suppress the
                // markdown H1 so it doesn't render twice. The H1 stays in the
                // canonical .md source for plain-text export, llms.txt, etc.
                h1: () => null,

                // Hero is rendered above the markdown; skip any markdown image
                // whose filename matches the post's hero image so it doesn't render twice.
                // Inline images use a banner-style crop (max ~420px tall, object-cover)
                // so square service photos don't dominate the viewport on mobile.
                img: ({ src, alt }) => {
                  const heroBase = post.heroImage.split("/").pop()?.replace(/\.[^.]+$/, "");
                  if (src && typeof src === "string" && heroBase && src.includes(heroBase)) {
                    return null;
                  }
                  return (
                    <figure className="not-prose my-10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src as string}
                        alt={alt ?? ""}
                        loading="lazy"
                        className="h-64 w-full rounded-2xl object-cover sm:h-80 lg:h-96"
                      />
                      {alt && (
                        <figcaption className="mt-2 text-center text-xs italic text-charcoal-light">
                          {alt}
                        </figcaption>
                      )}
                    </figure>
                  );
                },

                // H2 with auto-detected lucide icon based on heading text keywords.
                // Gives every major section a visual anchor without forcing the
                // markdown writer to embed icon shortcodes.
                h2: ({ children }) => {
                  const text = extractText(children);
                  const Icon = iconForHeading(text);
                  return (
                    <h2 className="mt-12 flex items-baseline gap-3 scroll-mt-20">
                      {Icon && (
                        <span className="inline-flex h-9 w-9 shrink-0 translate-y-1 items-center justify-center rounded-full bg-rose/15 text-rose-dark">
                          <Icon className="h-5 w-5" />
                        </span>
                      )}
                      <span>{children}</span>
                    </h2>
                  );
                },

                // H3 stays clean, just adds scroll-mt for deep-linking
                h3: ({ children }) => (
                  <h3 className="scroll-mt-20">{children}</h3>
                ),

                // Blockquote with prefix detection. If the quote starts with one of
                // the callout markers (⚠️ / 💡 / ✅), render as a styled callout box
                // with the matching icon. Otherwise render as a standard quote.
                blockquote: ({ children }) => {
                  const text = extractText(children).trim();
                  const match = CALLOUT_MARKERS.find((m) => text.startsWith(m.marker));
                  if (match) {
                    const { variant, Icon } = match;
                    return (
                      <aside
                        className={`not-prose my-8 flex items-start gap-4 rounded-2xl p-5 ${CALLOUT_STYLES[variant]}`}
                      >
                        <Icon className={`mt-1 h-5 w-5 shrink-0 ${CALLOUT_ICON_STYLES[variant]}`} />
                        <div className="prose prose-sm max-w-none [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
                          {/* The marker character is stripped client-side from the
                              first paragraph so writers can keep clean markdown. */}
                          <StripMarker marker={match.marker}>{children}</StripMarker>
                        </div>
                      </aside>
                    );
                  }
                  return (
                    <blockquote className="border-l-4 border-rose pl-6 italic text-charcoal-light">
                      {children}
                    </blockquote>
                  );
                },

                // Wrap every markdown table in a horizontal-scroll container so wide
                // tables (e.g. the listicle's 8-column at-a-glance) don't blow out
                // mobile viewports.
                table: ({ children }) => (
                  <div className="not-prose -mx-4 my-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                    <table className="min-w-full text-sm">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="whitespace-nowrap border-b border-cream-dark bg-cream-dark px-3 py-2 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-cream-dark/50 px-3 py-2 align-top">
                    {children}
                  </td>
                ),
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
          <div className="mt-16 mb-12 border-t border-cream-dark pt-8 text-center">
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
