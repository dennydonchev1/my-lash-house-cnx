import {
  RefreshCw,
  Sparkles,
  Shield,
  Flower2,
  Palette,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { LASH_SERVICES, LASH_ADDON, OTHER_SERVICES, BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";

const iconMap: Record<string, React.ElementType> = {
  RefreshCw,
  Sparkles,
  Shield,
  Flower2,
  Palette,
  GraduationCap,
};

export default function Services({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].services;
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">
            {t.intro}
          </p>
        </div>

        {/* Lash Extension Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LASH_SERVICES.map((service) => {
            const primaryName = lang === "th" ? service.thai : service.name;
            const secondaryName = lang === "th" ? service.name : service.thai;
            const desc = lang === "th" ? service.descriptionTh : service.description;
            return (
              <div
                key={service.name}
                className="animate-on-scroll group relative overflow-hidden rounded-2xl border border-cream-dark bg-cream transition-all hover:border-rose/30 hover:shadow-xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={primaryName}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-heading text-xl font-bold">
                      {primaryName}
                    </h3>
                    <span className="text-xs text-charcoal-light">
                      {secondaryName}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                    {desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-plum">
                      ฿{service.price}
                    </span>
                    <a
                      href={BUSINESS.lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-medium text-rose-dark transition-colors hover:text-plum"
                    >
                      {t.bookCta} <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add-on */}
        <div className="animate-on-scroll mt-14">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-2xl border border-rose/30 bg-rose/5 p-6 sm:flex-row sm:p-8">
            <div className="aspect-square w-32 shrink-0 overflow-hidden rounded-xl">
              <img
                src={LASH_ADDON.image}
                alt={lang === "th" ? LASH_ADDON.thai : LASH_ADDON.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-dark">
                {t.addonLabel}
              </p>
              <h3 className="mt-1 font-heading text-xl font-bold">
                {lang === "th" ? LASH_ADDON.thai : LASH_ADDON.name}{" "}
                <span className="text-sm font-normal text-charcoal-light">
                  {lang === "th" ? LASH_ADDON.name : LASH_ADDON.thai}
                </span>
              </h3>
              <p className="mt-2 text-sm text-charcoal-light">
                {lang === "th" ? LASH_ADDON.descriptionTh : LASH_ADDON.description}
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-plum">
                ฿{LASH_ADDON.price}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-cream-dark" />

        {/* Other Services */}
        <div className="animate-on-scroll text-center">
          <h3 className="font-heading text-2xl font-bold sm:text-3xl">
            {t.moreServicesHeading}
          </h3>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
            const primaryName = lang === "th" ? service.thai : service.name;
            const secondaryName = lang === "th" ? service.name : service.thai;
            const desc = lang === "th" ? service.descriptionTh : service.description;
            return (
              <div
                key={service.name}
                className="animate-on-scroll flex gap-4 rounded-xl border border-cream-dark bg-cream p-5 transition-all hover:border-rose/30 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-plum/10">
                  <Icon className="h-5 w-5 text-plum" />
                </div>
                <div>
                  <h4 className="font-semibold">
                    {primaryName}{" "}
                    <span className="text-xs font-normal text-charcoal-light">
                      {secondaryName}
                    </span>
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
