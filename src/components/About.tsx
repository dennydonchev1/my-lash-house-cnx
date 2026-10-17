import { Award, Heart, Shield, Sparkles } from "lucide-react";
import { dict, type Lang } from "@/lib/i18n";

const ICONS = [Award, Sparkles, Heart, Shield];

export default function About({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].about;
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[2fr_3fr] lg:gap-16">
          {/* Portrait of Ying: the person clients book, so it leads the section. */}
          <figure className="animate-on-scroll mx-auto w-full max-w-sm lg:max-w-none">
            <div className="overflow-hidden rounded-3xl bg-cream-dark shadow-lg ring-1 ring-rose/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/ying-lash-artist-hab-contest-2022.webp"
                alt={t.photoAlt}
                width={800}
                height={1000}
                loading="lazy"
                className="aspect-[4/5] h-auto w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm italic text-charcoal-light">
              {t.photoCaption}
            </figcaption>
          </figure>

          <div className="animate-on-scroll text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
              {t.heading}
              <span className="italic text-plum">{t.headingHighlight}</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-charcoal-light sm:text-lg">
              <p>{t.p1}</p>
              <p>{t.p2}</p>
              <p>{t.p3}</p>
            </div>

            {/* Highlight badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
              {t.badges.map((label, i) => {
                const Icon = ICONS[i] ?? Sparkles;
                return (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl bg-cream-dark/50 px-4 py-3"
                  >
                    <Icon className="h-5 w-5 shrink-0 text-plum" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
