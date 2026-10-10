import Link from "next/link";
import { ArrowRight, Check, GraduationCap, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";

/** Homepage band for the lash training course. Content lives in dict[lang].training;
    the full course page is /services/lash-training (and /th/...). */
export default function Training({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].training;
  return (
    <section id="training" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 md:grid-cols-5">
          <div className="animate-on-scroll md:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
              {t.eyebrow}
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
              {t.heading}
              <span className="italic text-plum">{t.headingHighlight}</span>
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal-light sm:text-lg">
              {t.subhead}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={t.ctaHref}
                className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-plum-light hover:shadow-lg"
              >
                {t.cta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={BUSINESS.lineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-plum/30 px-6 py-3 text-sm font-semibold text-plum transition-all hover:bg-plum/5"
              >
                <MessageCircle className="h-4 w-4" />
                {t.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="animate-on-scroll md:col-span-2">
            <div className="rounded-2xl border border-plum/20 bg-plum/5 p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-plum/15">
                <GraduationCap className="h-6 w-6 text-plum" />
              </div>
              <ul className="mt-5 space-y-3">
                {t.bullets.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-charcoal">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
