import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, MessageCircle, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import InstagramIcon from "@/components/icons/InstagramIcon";
import { BUSINESS } from "@/lib/constants";
import { PERSON_YING_SCHEMA } from "@/lib/blog";
import { ABOUT_PAGE, type AboutPhoto } from "@/lib/aboutPage";
import type { Lang } from "@/lib/i18n";

function Photo({ p, className = "aspect-square" }: { p: AboutPhoto; className?: string }) {
  return (
    <figure>
      <div className={`overflow-hidden rounded-2xl bg-cream-dark shadow-sm ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <figcaption className="mt-2 text-xs italic leading-snug text-charcoal-light">{p.caption}</figcaption>
    </figure>
  );
}

function SectionHead({ children }: { children: ReactNode }) {
  return (
    <>
      <span aria-hidden className="block h-px w-16 bg-rose-dark/50" />
      <h2 className="mt-6 font-heading text-2xl font-bold sm:text-3xl">{children}</h2>
    </>
  );
}

export default function AboutPageView({ lang }: { lang: Lang }) {
  const c = ABOUT_PAGE[lang];
  const homeHref = lang === "th" ? "/th" : "/";
  const url = lang === "th" ? "https://mylashhouse.com/th/about" : "https://mylashhouse.com/about";

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#page`,
    url,
    name: c.metaTitle,
    description: c.metaDescription,
    inLanguage: lang === "th" ? "th-TH" : "en-TH",
    mainEntity: { "@id": "https://mylashhouse.com/#ying" },
    about: { "@id": "https://mylashhouse.com/#business" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: c.homeLabel, item: `https://mylashhouse.com${homeHref === "/" ? "" : homeHref}` },
      { "@type": "ListItem", position: 2, name: c.eyebrow, item: url },
    ],
  };

  return (
    <>
      {[aboutSchema, PERSON_YING_SCHEMA, breadcrumbSchema].map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}
      <Navbar lang={lang} otherLangHref={lang === "th" ? "/about" : "/th/about"} solid />

      <main className="bg-cream pt-24 sm:pt-28">
        <article className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
          <nav className="mb-10 text-sm text-charcoal-light" aria-label="Breadcrumb">
            <Link href={homeHref} className="transition-colors hover:text-plum">{c.homeLabel}</Link>
            <span className="mx-2">›</span>
            <span>{c.eyebrow}</span>
          </nav>

          {/* Header + portrait */}
          <header className="grid items-center gap-10 md:grid-cols-[3fr_2fr]">
            <div>
              <div className="flex items-center gap-3 text-rose-dark">
                <span aria-hidden className="h-px w-8 bg-rose/40" />
                <p className="text-xs font-semibold uppercase tracking-[0.25em]">{c.eyebrow}</p>
              </div>
              <h1 className="mt-5 font-heading text-3xl font-bold leading-[1.1] text-charcoal sm:text-4xl md:text-5xl">
                {c.h1}
              </h1>
              {c.intro.map((para, i) => (
                <p key={i} className="mt-5 text-base leading-relaxed text-charcoal-light sm:text-lg">{para}</p>
              ))}
            </div>
            <div className="mx-auto w-full max-w-xs md:max-w-none">
              <Photo p={c.portrait} className="aspect-[4/5]" />
            </div>
          </header>

          {/* National qualification */}
          <section id="certificate" className="mt-16">
            <SectionHead>{c.cert.heading}</SectionHead>
            {c.cert.paragraphs.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-charcoal-light">{para}</p>
            ))}
            <ul className="mt-5 space-y-2.5">
              {c.cert.competencies.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-charcoal-light">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-rose-dark" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <figure className="mt-8">
              <div className="overflow-hidden rounded-2xl bg-cream-dark shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.cert.photo.src} alt={c.cert.photo.alt} loading="lazy" className="h-auto w-full" />
              </div>
              <figcaption className="mt-2 text-xs italic leading-snug text-charcoal-light">{c.cert.photo.caption}</figcaption>
            </figure>
            <p className="mt-4 flex items-center gap-2 text-sm text-charcoal-light">
              <ShieldCheck className="h-4 w-4 shrink-0 text-rose-dark" />
              {c.cert.verifyNote}
            </p>
          </section>

          {/* Competitions */}
          <section id="competitions" className="mt-16">
            <div className="grid items-start gap-8 md:grid-cols-[3fr_2fr]">
              <div>
                <SectionHead>{c.contests.heading}</SectionHead>
                {c.contests.paragraphs.map((para, i) => (
                  <p key={i} className="mt-4 leading-relaxed text-charcoal-light">{para}</p>
                ))}
              </div>
              <div className="mx-auto w-full max-w-xs md:max-w-none">
                {c.contests.photos.map((p) => <Photo key={p.src} p={p} className="aspect-[4/5]" />)}
              </div>
            </div>
          </section>

          {/* Teaching */}
          <section id="training" className="mt-16">
            <SectionHead>{c.teaching.heading}</SectionHead>
            {c.teaching.paragraphs.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-charcoal-light">{para}</p>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {c.teaching.photos.map((p) => <Photo key={p.src} p={p} />)}
            </div>
            <Link
              href={c.teaching.ctaHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-plum transition-colors hover:text-rose-dark"
            >
              {c.teaching.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Studio */}
          <section id="studio" className="mt-16">
            <SectionHead>{c.studio.heading}</SectionHead>
            {c.studio.paragraphs.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-charcoal-light">{para}</p>
            ))}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {c.studio.photos.map((p) => <Photo key={p.src} p={p} className="aspect-[4/3]" />)}
            </div>
          </section>

          {/* Work */}
          <section id="work" className="mt-16">
            <SectionHead>{c.work.heading}</SectionHead>
            {c.work.paragraphs.map((para, i) => (
              <p key={i} className="mt-4 leading-relaxed text-charcoal-light">{para}</p>
            ))}
            <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              {c.work.photos.map((p) => <Photo key={p.src} p={p} />)}
            </div>
          </section>

          {/* CTA */}
          <section className="mt-16 rounded-3xl bg-pink-soft p-8 text-center sm:p-12">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">{c.ctaHeading}</h2>
            <p className="mx-auto mt-3 max-w-xl text-charcoal-light">{c.ctaText}</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href={BUSINESS.lineUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-7 py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> LINE
              </a>
              <a href={BUSINESS.instagramUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 rounded-full bg-plum px-7 py-3.5 text-sm font-semibold text-white transition-all hover:bg-plum-light">
                <InstagramIcon className="h-4 w-4" /> Instagram
              </a>
            </div>
          </section>
        </article>
      </main>

      <Footer lang={lang} />
      <MobileBookingBar lang={lang} />
    </>
  );
}
