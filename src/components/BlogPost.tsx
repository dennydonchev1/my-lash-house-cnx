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
  Quote,
  ListTree,
  type LucideIcon,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import FAQAccordion from "@/components/FAQAccordion";
import type { BlogPostMeta } from "@/lib/blog";
import {
  getAllPosts,
  getPostUrl,
  PERSON_YING_SCHEMA,
  BEAUTY_SALON_SCHEMA,
} from "@/lib/blog";
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

// Lowercase, hyphenate, drop non-word chars (but keep Thai script) so heading
// IDs match what GitHub-flavored markdown / rehype-slug would produce. The same
// slugify runs on the TOC anchor href and on the rendered H2 id so deep-links
// land on the correct section.
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s฀-๿-]+/g, "")
    .trim()
    .replace(/\s+/g, "-");
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
//   > ❝ Big editorial pull-quote for the line worth remembering.
type CalloutVariant = "warn" | "tip" | "ok" | "quote";
const CALLOUT_MARKERS: Array<{ marker: string; variant: CalloutVariant; Icon: LucideIcon }> = [
  { marker: "⚠️", variant: "warn", Icon: AlertTriangle },
  { marker: "💡", variant: "tip", Icon: Lightbulb },
  { marker: "✅", variant: "ok", Icon: ShieldCheck },
  { marker: "❝", variant: "quote", Icon: Quote },
];

// Editorial callout palettes. On-brand tints only (warm rose for warn, deep
// plum for note, dusty sage-emerald for pro tip) — no functional amber/red
// alert chrome. Each callout gets a soft background tint, a hairline border
// matching the accent, and a gradient accent rule in the header bar that
// fades from variant color into transparent.
type CalloutPalette = {
  bg: string;
  border: string;
  accent: string;
  label: string;
  mark: string;
};
const CALLOUT_PALETTES: Record<CalloutVariant, CalloutPalette> = {
  warn: {
    bg: "bg-rose-dark/[0.04]",
    border: "border-rose-dark/15",
    accent: "from-rose-dark/50",
    label: "text-rose-dark",
    mark: "text-rose-dark",
  },
  tip: {
    bg: "bg-plum/[0.04]",
    border: "border-plum/15",
    accent: "from-plum/50",
    label: "text-plum",
    mark: "text-plum",
  },
  ok: {
    bg: "bg-emerald-800/[0.04]",
    border: "border-emerald-800/15",
    accent: "from-emerald-700/50",
    label: "text-emerald-700",
    mark: "text-emerald-700",
  },
  quote: {
    bg: "",
    border: "",
    accent: "from-rose-dark/40",
    label: "text-rose-dark",
    mark: "text-rose-dark",
  },
};

const CALLOUT_LABEL_EN: Record<CalloutVariant, string> = {
  warn: "Heads up",
  tip: "Note",
  ok: "Pro tip",
  quote: "",
};
const CALLOUT_LABEL_TH: Record<CalloutVariant, string> = {
  warn: "ระวัง",
  tip: "เคล็ดลับ",
  ok: "ทำเลย",
  quote: "",
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
      return node.map((child) => {
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
    onThisPage: "On this page",
    readNext: "Read next",
    relatedGuides: "Related guides",
  },
  th: {
    backToBlog: "ดูบทความทั้งหมด",
    publishedOn: "เผยแพร่",
    readingTime: "นาทีในการอ่าน",
    by: "โดย",
    home: "หน้าหลัก",
    blog: "บทความ",
    onThisPage: "ในบทความนี้",
    readNext: "อ่านต่อ",
    relatedGuides: "บทความที่เกี่ยวข้อง",
  },
};

// Headings that are part of the article body but not procedural steps —
// excluded from HowTo schema generation and from the visible TOC.
const NON_SECTION_HEADING_RE =
  /how was|how this guide|about the author|^faq$|send a message|send us|have .* questions|เกี่ยวกับผู้เขียน|คู่มือนี้เขียน|ส่งข้อความมา|มีคำถาม/i;

function extractH2s(markdown: string): string[] {
  const matches = [...markdown.matchAll(/^##\s+(.+)$/gm)];
  return matches.map((m) => m[1].trim());
}

// Top-of-article table of contents. Only renders for posts with 4+ procedural
// H2s — short posts don't need one and look awkward with it.
function TableOfContents({ headings, lang }: { headings: string[]; lang: Lang }) {
  if (headings.length < 4) return null;
  return (
    <nav
      aria-label="Table of contents"
      className="not-prose mb-12 rounded-2xl border border-cream-dark bg-white/70 p-6 sm:p-7"
    >
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-rose-dark">
        <ListTree className="h-4 w-4" />
        {LABELS[lang].onThisPage}
      </p>
      <ol className="mt-4 space-y-2.5 text-sm sm:columns-2 sm:gap-x-8">
        {headings.map((h, i) => (
          <li key={i} className="break-inside-avoid">
            <a
              href={`#${slugify(h)}`}
              className="text-charcoal-light transition-colors hover:text-plum"
            >
              <span className="mr-2 font-semibold text-rose-dark/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              {h}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Related-reads card grid at the bottom of every blog post. Picks up to 3 other
// posts ranked by shared-tag overlap with the current post (ties broken by
// recency). Drives engagement + builds internal link equity for SEO.
function RelatedReads({ current, lang }: { current: BlogPostMeta; lang: Lang }) {
  const others = getAllPosts().filter((p) => p.slug !== current.slug);
  if (others.length === 0) return null;

  const scored = others
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => current.tags.includes(t)).length,
    }))
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime();
    });
  const picks = scored.slice(0, 3).map((s) => s.post);

  return (
    <section className="mt-20 border-t border-cream-dark pt-12">
      <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-rose-dark">
        {LABELS[lang].readNext}
      </p>
      <h2 className="mt-2 text-center font-heading text-2xl font-bold text-charcoal sm:text-3xl">
        {LABELS[lang].relatedGuides}
      </h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {picks.map((p) => (
          <Link
            key={p.slug}
            href={getPostUrl(p, lang)}
            className="group block overflow-hidden rounded-2xl border border-cream-dark bg-white transition-all hover:-translate-y-0.5 hover:border-rose/40 hover:shadow-md"
          >
            <div className="aspect-[16/10] overflow-hidden bg-cream-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.heroImage}
                alt={p.heroImageAlt[lang]}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              {p.category && (
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-rose-dark">
                  {p.category[lang]}
                </p>
              )}
              <p className="mt-2 font-heading text-base font-semibold leading-snug text-charcoal transition-colors group-hover:text-plum sm:text-lg">
                {p.metaTitle?.[lang] ?? p.title[lang]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

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

  // TOC + HowTo schema source — H2s from the markdown, minus the non-section
  // headings (FAQ, About the author, contact CTA, etc.).
  const allH2s = extractH2s(content);
  const sectionH2s = allH2s.filter((h) => !NON_SECTION_HEADING_RE.test(h));

  // Article schema — now references the shared Person + BeautySalon entities
  // via stable @id so Google can connect Article → Author → Local Business as
  // a single entity graph.
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title[lang],
    description: post.description[lang],
    image: `https://mylashhouse.com${post.heroImage}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@id": "https://mylashhouse.com/#ying" },
    publisher: { "@id": "https://mylashhouse.com/#business" },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    inLanguage: lang === "th" ? "th-TH" : "en-TH",
  };

  // FAQPage schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "th" ? "th-TH" : "en-TH",
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

  // HowTo schema — only generated for procedural posts (post.howTo === true).
  // Steps are auto-built from the section H2s. Each step gets a deep-link
  // anchor so AI assistants citing the page can point readers at the specific
  // section, not just the page URL.
  const howToSchema = post.howTo
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: post.title[lang],
        description: post.description[lang],
        image: `https://mylashhouse.com${post.heroImage}`,
        inLanguage: lang === "th" ? "th-TH" : "en-TH",
        step: sectionH2s.map((heading, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: heading.replace(/\?$/, ""),
          url: `${canonicalUrl}#${slugify(heading)}`,
        })),
      }
    : null;

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
      {/* Shared entity-graph schemas — Person (Ying) and BeautySalon (the studio)
          appear on every blog post via stable @id so Google can link Article →
          Author → Local Business as one coherent entity graph. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_YING_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BEAUTY_SALON_SCHEMA) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
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
          <nav className="mb-10 text-sm text-charcoal-light" aria-label="Breadcrumb">
            <Link href={homeHref} className="hover:text-plum transition-colors">
              {L.home}
            </Link>
            <span className="mx-2">›</span>
            <Link href={blogIndexHref} className="hover:text-plum transition-colors">
              {L.blog}
            </Link>
          </nav>

          {/* Editorial header — kicker / title / dek / meta, all centered.
              Title is pulled from post.title and rendered here above the hero
              so the headline + intro sit in the first-30% AI-citation zone.
              The matching # heading in the markdown is suppressed below via
              the h1 component override so we don't double-render the title. */}
          <header className="mx-auto max-w-3xl text-center">
            {post.category && (
              <div className="flex items-center justify-center gap-3 text-rose-dark">
                <span aria-hidden className="h-px w-8 bg-rose/40" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em]">
                  {post.category[lang]}
                </p>
                <span aria-hidden className="h-px w-8 bg-rose/40" />
              </div>
            )}

            <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-charcoal sm:text-4xl md:text-5xl lg:text-6xl">
              {post.title[lang]}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl font-heading text-lg italic leading-relaxed text-charcoal-light sm:text-xl">
              {(post.dek ?? post.description)[lang]}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs uppercase tracking-widest text-charcoal-light">
              <span className="text-charcoal">
                {L.by}{" "}
                <span className="font-semibold text-plum">{post.author}</span>
                {lang === "en" ? ", Certified Lash Artist" : " ช่างต่อขนตามีใบรับรอง"}
              </span>
              <span className="text-rose/40">•</span>
              <span>{formattedDate}</span>
              <span className="text-rose/40">•</span>
              <span>{post.readingMinutes} {L.readingTime}</span>
            </div>
          </header>

          {/* Hero banner — wider, more dramatic crop with italic caption below.
              Square service photos centre-crop to focal-eye region; alt text
              doubles as the figure caption. */}
          <figure className="mt-12 mb-14">
            <div className="overflow-hidden rounded-2xl bg-cream-dark shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.heroImage}
                alt={post.heroImageAlt[lang]}
                className="h-64 w-full object-cover sm:h-80 md:h-[420px] lg:h-[480px]"
                loading="eager"
              />
            </div>
            <figcaption className="mx-auto mt-4 max-w-2xl text-center text-xs italic leading-relaxed text-charcoal-light">
              {post.heroImageAlt[lang]}
            </figcaption>
          </figure>

          {/* Table of contents — renders only when there are 4+ section H2s.
              Numbered, two-column on desktop, each item a deep-link to the
              matching slugified H2 id. */}
          <TableOfContents headings={sectionH2s} lang={lang} />

          {/* Markdown content */}
          <div className="prose prose-lg max-w-none break-words prose-headings:font-heading prose-headings:text-charcoal prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:lg:text-3xl prose-h2:mt-12 prose-h3:text-lg prose-h3:sm:text-xl prose-h3:lg:text-2xl prose-a:text-plum prose-a:break-words hover:prose-a:text-rose-dark prose-strong:text-charcoal prose-table:text-sm prose-th:bg-cream-dark prose-th:font-semibold prose-blockquote:not-italic prose-li:my-1 prose-img:rounded-xl">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Title is rendered above the hero via post.title; suppress the
                // markdown H1 so it doesn't render twice. The H1 stays in the
                // canonical .md source for plain-text export, llms.txt, etc.
                h1: () => null,

                // Hero is rendered above the markdown; skip any markdown image
                // whose filename matches the post's hero image so it doesn't render twice.
                // Inline images render as figure + italic caption.
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

                // H2 with section-break editorial treatment: short hairline
                // accent rule above + tiny plum icon hung at the left baseline
                // (no chip, no fill, no rounded background). Reads like a
                // magazine chapter mark rather than a Notion-template header.
                h2: ({ children }) => {
                  const text = extractText(children);
                  const id = slugify(text);
                  const Icon = iconForHeading(text);
                  return (
                    <div className="mt-16 scroll-mt-24" id={id}>
                      <span aria-hidden className="block h-px w-16 bg-rose-dark/50" />
                      <h2 className="mt-6 flex items-baseline gap-4 font-heading text-2xl font-bold leading-tight text-charcoal sm:text-3xl lg:text-4xl">
                        {Icon && (
                          <Icon
                            aria-hidden
                            className="h-6 w-6 shrink-0 translate-y-1 text-plum sm:h-7 sm:w-7"
                          />
                        )}
                        <span>{children}</span>
                      </h2>
                    </div>
                  );
                },

                // H3 gets a slugified id for deeper linking, otherwise default styling.
                h3: ({ children }) => {
                  const text = extractText(children);
                  const id = slugify(text);
                  return (
                    <h3 id={id} className="scroll-mt-24">
                      {children}
                    </h3>
                  );
                },

                // Blockquote with prefix detection. Four variants, each with
                // its own deliberately un-AI-template treatment:
                //
                //   > ❝ ...  -> editorial hero quote, massive italic Playfair,
                //              giant decorative quote glyph hanging in the
                //              corner at low opacity, hairlines above/below,
                //              no box, no fill.
                //
                //   > 💡 ...  -> "Note" sidebar — top hairline accent rule in
                //              variant color, tiny small-caps tracked label,
                //              body in italic Playfair at body+1 scale. No
                //              card chrome, no fill, no rounded corners.
                //              Same shape for ⚠️ ("Heads up") and ✅
                //              ("Pro tip"), only the accent colour changes.
                //
                //   Plain blockquote -> minimal left rule + body italic.
                blockquote: ({ children }) => {
                  const text = extractText(children).trim();
                  const match = CALLOUT_MARKERS.find((m) => text.startsWith(m.marker));

                  if (match && match.variant === "quote") {
                    return (
                      <aside className="not-prose relative my-16 px-4 sm:px-10">
                        {/* Oversized decorative quote glyph hangs behind the
                            text in the brand rose at 12% opacity. Pure
                            typographic ornament — no box, no fill. */}
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -top-6 left-0 select-none font-heading text-[10rem] leading-none text-rose-dark/15 sm:text-[14rem]"
                        >
                          “
                        </span>
                        <div className="relative font-heading text-2xl italic leading-snug text-charcoal sm:text-3xl lg:text-4xl">
                          <StripMarker marker={match.marker}>{children}</StripMarker>
                        </div>
                        <div aria-hidden className="mt-8 ml-auto h-px w-24 bg-rose-dark/40" />
                      </aside>
                    );
                  }

                  if (match) {
                    const { variant, Icon } = match;
                    const palette = CALLOUT_PALETTES[variant];
                    const label =
                      lang === "th" ? CALLOUT_LABEL_TH[variant] : CALLOUT_LABEL_EN[variant];
                    return (
                      <aside
                        className={`not-prose my-12 rounded-2xl border p-7 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-9 ${palette.bg} ${palette.border}`}
                      >
                        {/* Integrated header bar: small icon + small-caps label
                            + gradient accent rule that fades into transparent.
                            No floating icon chip, no functional-alert color
                            language — same shape across variants, accent
                            color carries the meaning. */}
                        <div className="mb-5 flex items-center gap-3">
                          <Icon
                            aria-hidden
                            className={`h-4 w-4 shrink-0 ${palette.mark}`}
                          />
                          <p
                            className={`text-[0.7rem] font-semibold uppercase tracking-[0.3em] ${palette.label}`}
                          >
                            {label}
                          </p>
                          <span
                            aria-hidden
                            className={`h-px flex-1 bg-gradient-to-r to-transparent ${palette.accent}`}
                          />
                        </div>
                        <div className="font-heading text-lg italic leading-relaxed text-charcoal sm:text-xl [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
                          <StripMarker marker={match.marker}>{children}</StripMarker>
                        </div>
                      </aside>
                    );
                  }

                  return (
                    <blockquote className="my-8 border-l border-rose/50 pl-6 font-heading italic text-charcoal-light">
                      {children}
                    </blockquote>
                  );
                },

                // Tables: horizontal-scroll wrapper + standardized cell styling.
                table: ({ children }) => (
                  <div className="not-prose -mx-4 my-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                    <table className="min-w-full text-sm">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="whitespace-nowrap border-b border-cream-dark bg-cream-dark px-3 py-2 text-left font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border-b border-cream-dark/50 px-3 py-2 align-top">{children}</td>
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

          {/* Related reads — auto-picked from other posts by shared-tag overlap. */}
          <RelatedReads current={post} lang={lang} />

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
