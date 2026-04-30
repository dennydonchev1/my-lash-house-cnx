import { ShieldCheck, Check, X, MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";
import InstagramIcon from "@/components/icons/InstagramIcon";

export default function Guarantee({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].guarantee;
  return (
    <section className="bg-rose/5 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            {t.eyebrow}
          </p>
          <div className="mt-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-rose/15">
            <ShieldCheck className="h-8 w-8 text-rose-dark" />
          </div>
          <h2 className="mt-4 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-charcoal-light sm:text-lg">
            {t.subhead}
          </p>
        </div>

        {/* 3-column grid */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Covered */}
          <div className="animate-on-scroll rounded-2xl border border-rose/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                <Check className="h-5 w-5 text-emerald-700" />
              </div>
              <h3 className="font-heading text-lg font-bold">
                {t.coveredLabel}
              </h3>
            </div>
            <ul className="mt-4 space-y-2">
              {t.coveredItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-light"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not covered */}
          <div className="animate-on-scroll rounded-2xl border border-rose/20 bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-charcoal/10">
                <X className="h-5 w-5 text-charcoal-light" />
              </div>
              <h3 className="font-heading text-lg font-bold">
                {t.notCoveredLabel}
              </h3>
            </div>
            <ul className="mt-4 space-y-2">
              {t.notCoveredItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm leading-relaxed text-charcoal-light"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-charcoal-light" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* How to claim */}
          <div className="animate-on-scroll rounded-2xl border border-plum/20 bg-plum/5 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-plum/15">
                <MessageCircle className="h-5 w-5 text-plum" />
              </div>
              <h3 className="font-heading text-lg font-bold">
                {t.howToClaimLabel}
              </h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
              {t.howToClaimText}
            </p>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-plum px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-plum-light hover:shadow-md"
            >
              <InstagramIcon className="h-4 w-4" />
              {t.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
