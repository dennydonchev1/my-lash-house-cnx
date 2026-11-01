import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { dict, type Lang } from "@/lib/i18n";

/** "Inside the studio" band on both homepages: the front door (so a first-timer
    recognizes the place), the room, and Ying at work. Photos supplied by Dennis,
    Nov 2026. Copy lives in dict[lang].studio. */
export default function Studio({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].studio;
  const [door, room, work] = t.photos;
  return (
    <section id="studio" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">{t.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">{t.intro}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[door, room].map((p) => (
            <figure key={p.src} className="animate-on-scroll md:col-span-1 md:first:col-span-1">
              <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-cream-dark shadow-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </div>
              <figcaption className="mt-2 text-sm text-charcoal-light">{p.caption}</figcaption>
            </figure>
          ))}
          <figure className="animate-on-scroll">
            <div className="aspect-[3/2] overflow-hidden rounded-2xl bg-cream-dark shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={work.src} alt={work.alt} loading="lazy" className="h-full w-full object-cover object-top" />
            </div>
            <figcaption className="mt-2 text-sm text-charcoal-light">{work.caption}</figcaption>
          </figure>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={t.moreHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-plum transition-colors hover:text-rose-dark"
          >
            {t.moreLink}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
