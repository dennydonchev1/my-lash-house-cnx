import { MessageCircle, Check } from "lucide-react";
import { LASH_SERVICES, LASH_ADDON, BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";

export default function Pricing({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].pricing;
  return (
    <section id="pricing" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
            {t.intro}
          </p>
        </div>

        {/* Pricing Table */}
        <div className="animate-on-scroll mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-cream-dark bg-cream shadow-lg">
          {/* Header row */}
          <div className="grid grid-cols-2 bg-plum px-6 py-4 text-sm font-semibold text-white">
            <span>{t.tableStyle}</span>
            <span className="text-right">{t.tablePrice}</span>
          </div>

          {/* Rows */}
          {LASH_SERVICES.map((service, i) => {
            const primary = lang === "th" ? service.thai : service.name;
            const secondary = lang === "th" ? service.name : service.thai;
            return (
              <div
                key={service.name}
                className={`grid grid-cols-2 items-center px-6 py-4 ${
                  i % 2 === 0 ? "bg-cream" : "bg-white"
                } border-b border-cream-dark`}
              >
                <div>
                  <span className="font-semibold">{primary}</span>
                  <span className="ml-2 text-xs text-charcoal-light">
                    {secondary}
                  </span>
                </div>
                <p className="text-right text-lg font-bold text-plum">
                  ฿{service.price}
                </p>
              </div>
            );
          })}

          {/* Add-on row */}
          <div className="grid grid-cols-2 items-center bg-rose/10 px-6 py-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-rose-dark">
                {t.addonLabel}
              </span>
              <div>
                <span className="font-semibold">
                  {lang === "th" ? LASH_ADDON.thai : LASH_ADDON.name}
                </span>
                <span className="ml-2 text-xs text-charcoal-light">
                  {lang === "th" ? LASH_ADDON.name : LASH_ADDON.thai}
                </span>
              </div>
            </div>
            <p className="text-right text-lg font-bold text-plum">
              ฿{LASH_ADDON.price}
            </p>
          </div>
        </div>

        {/* Included with every set */}
        <div className="animate-on-scroll mx-auto mt-8 max-w-3xl">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-charcoal-light">
            {t.includedHeading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-charcoal-light">
            {t.included.map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-plum" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="animate-on-scroll mt-10 text-center">
          <a
            href={BUSINESS.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-plum px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-plum-light hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            {t.ctaButton}
          </a>
        </div>
      </div>
    </section>
  );
}
