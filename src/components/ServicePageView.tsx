import Link from "next/link";
import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import FAQAccordion from "@/components/FAQAccordion";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { BUSINESS } from "@/lib/constants";
import { BEAUTY_SALON_SCHEMA, PERSON_YING_SCHEMA } from "@/lib/blog";
import { getServiceUrl, type ServicePage } from "@/lib/servicePages";
import { dict, type Lang } from "@/lib/i18n";

const L = {
  en: { home: "Home", trust1: "5.0 across 19 Google reviews", trust2: "3-day retouch guarantee", trust3: "100% handmade fans", line: "Book on LINE", ig: "DM on Instagram" },
  th: { home: "หน้าหลัก", trust1: "5.0 จาก 19 รีวิว Google", trust2: "รับประกันรีทัช 3 วัน", trust3: "แฟนทำมือ 100%", line: "จองผ่าน LINE", ig: "ทัก IG" },
};

export default function ServicePageView({ page, lang }: { page: ServicePage; lang: Lang }) {
  const c = page[lang];
  const t = L[lang];
  const homeHref = lang === "th" ? "/th" : "/";
  const canonicalUrl = `https://mylashhouse.com${getServiceUrl(page, lang)}`;
  const otherLangHref = getServiceUrl(page, lang === "en" ? "th" : "en");

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.serviceType,
    serviceType: page.serviceType,
    provider: { "@id": "https://mylashhouse.com/#business" },
    areaServed: { "@type": "City", name: "Chiang Mai" },
    description: c.metaDescription,
    url: canonicalUrl,
    inLanguage: lang === "th" ? "th-TH" : "en-TH",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "th" ? "th-TH" : "en-TH",
    mainEntity: c.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.home, item: `https://mylashhouse.com${homeHref}` },
      { "@type": "ListItem", position: 2, name: c.h1, item: canonicalUrl },
    ],
  };

  return (
    <>
      {[serviceSchema, faqSchema, breadcrumbSchema, PERSON_YING_SCHEMA, BEAUTY_SALON_SCHEMA].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <Navbar lang={lang} otherLangHref={otherLangHref} solid />

      <main className="bg-cream pt-24 sm:pt-28">
        <article className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-10 text-sm text-charcoal-light" aria-label="Breadcrumb">
            <Link href={homeHref} className="transition-colors hover:text-plum">{t.home}</Link>
            <span className="mx-2">›</span>
            <span>{c.h1}</span>
          </nav>

          {/* Header */}
          <header className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3 text-rose-dark">
              <span aria-hidden className="h-px w-8 bg-rose/40" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em]">{c.eyebrow}</p>
              <span aria-hidden className="h-px w-8 bg-rose/40" />
            </div>
            <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-charcoal sm:text-4xl md:text-5xl">
              {c.h1}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal-light sm:text-lg">
              {c.quickAnswer}
            </p>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-widest text-charcoal-light">
              <span className="flex items-center gap-1.5"><span className="text-gold">★★★★★</span> {t.trust1}</span>
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-rose-dark" /> {t.trust2}</span>
              <span>{t.trust3}</span>
            </div>

            {/* Primary CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={BUSINESS.lineUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> {t.line}
              </a>
              <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-plum-light">
                <InstagramIcon className="h-4 w-4" /> {t.ig}
              </a>
            </div>
          </header>

          {/* Hero image (optional; nails page ships without one until Ying's photos land) */}
          {c.heroImage && (
            <figure className="mt-12">
              <div className="overflow-hidden rounded-2xl bg-cream-dark shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.heroImage} alt={c.heroImageAlt} className="h-64 w-full object-cover sm:h-80 md:h-[400px]" loading="eager" />
              </div>
            </figure>
          )}

          {/* Options */}
          <section className="mt-14">
            <h2 className="text-center font-heading text-2xl font-bold sm:text-3xl">{c.optionsHeading}</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {c.options.map((o) => (
                <div key={o.name} className="rounded-2xl border border-cream-dark bg-white p-6 text-center">
                  <p className="font-heading text-lg font-bold">{o.name}</p>
                  <p className="mt-2 text-sm text-charcoal-light">{o.note}</p>
                </div>
              ))}
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm leading-relaxed text-charcoal-light">
              {c.pricingNote}
            </p>
          </section>

          {/* Sections */}
          {c.sections.map((s) => (
            <section key={s.heading} className="mt-14">
              <span aria-hidden className="block h-px w-16 bg-rose-dark/50" />
              <h2 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">{s.heading}</h2>
              {s.paragraphs.map((para, i) => (
                <p key={i} className="mt-4 leading-relaxed text-charcoal-light">{para}</p>
              ))}
              {s.bullets && (
                <ul className="mt-5 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-charcoal-light">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-rose-dark" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* FAQ */}
          <section className="mt-16 border-t border-cream-dark pt-12">
            <FAQAccordion
              items={c.faq}
              eyebrow={dict[lang].faq.eyebrow}
              heading={c.faqHeading}
              headingHighlight=""
            />
          </section>

          {/* Closing CTA */}
          <section className="mt-16 rounded-3xl bg-pink-soft p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{c.ctaHeading}</h2>
            <p className="mx-auto mt-3 max-w-xl text-charcoal-light">{c.ctaText}</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a href={BUSINESS.lineUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> {t.line}
              </a>
              <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-plum-light">
                <InstagramIcon className="h-4 w-4" /> {t.ig}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {c.relatedLinks.map((r) => (
                <Link key={r.href} href={r.href} className="inline-flex items-center gap-1 text-sm font-medium text-plum transition-colors hover:text-rose-dark">
                  {r.label} <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer lang={lang} />
      <MobileBookingBar lang={lang} />
    </>
  );
}
