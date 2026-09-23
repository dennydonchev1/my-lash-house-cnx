import { LASH_SERVICES } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";

// Template v2 "style cards" module: image + name + price + drama dots + badge.
// Rendered inside blog posts wherever the markdown contains a paragraph that
// is exactly [[STYLE_CARDS]] (see the p override in BlogPost.tsx). The product
// is visual; searchers asking "what lash styles are there" want to SEE the
// menu, not read it as prose.
const LABELS = {
  en: { drama: "Drama", from: "" },
  th: { drama: "ดราม่า", from: "" },
};

export default function StyleCardsGrid({ lang = "en" }: { lang?: Lang }) {
  const t = LABELS[lang];
  return (
    <div className="not-prose my-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
      {LASH_SERVICES.map((service) => {
        const primaryName = lang === "th" ? service.thai : service.name;
        const secondaryName = lang === "th" ? service.name : service.thai;
        return (
          <div
            key={service.name}
            className="group overflow-hidden rounded-2xl border border-cream-dark bg-white transition-all hover:border-rose/40 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={service.image}
                alt={primaryName}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {service.badge && (
                <span className="absolute left-2 top-2 rounded-full bg-plum px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                  {lang === "th" ? service.badge.th : service.badge.en}
                </span>
              )}
            </div>
            <div className="p-3 sm:p-4">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-heading text-sm font-bold leading-tight sm:text-base">
                  {primaryName}
                </h3>
                <span className="shrink-0 text-sm font-bold text-plum">฿{service.price}</span>
              </div>
              <p className="mt-0.5 text-[11px] text-charcoal-light">{secondaryName}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="text-[9px] font-semibold uppercase tracking-widest text-charcoal-light">
                  {t.drama}
                </span>
                <span className="inline-flex items-center gap-0.5" aria-label={`${service.drama} / 5`}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-1.5 rounded-full ${i <= service.drama ? "bg-rose-dark" : "bg-cream-dark"}`}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
