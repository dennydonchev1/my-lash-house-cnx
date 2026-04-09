import {
  RefreshCw,
  Sparkles,
  Shield,
  Flower2,
  Palette,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import { LASH_SERVICES, LASH_STYLES, OTHER_SERVICES, BUSINESS } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  RefreshCw,
  Sparkles,
  Shield,
  Flower2,
  Palette,
  GraduationCap,
};

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            Our Services
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Lash Extensions{" "}
            <span className="italic text-plum">ต่อขนตา</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">
            Choose your perfect volume — from subtle classics to dramatic mega
            sets. Every fan is handmade during your appointment for a truly
            custom fit.
          </p>
        </div>

        {/* Lash Extension Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LASH_SERVICES.map((service) => (
            <div
              key={service.name}
              className="animate-on-scroll group relative overflow-hidden rounded-2xl border border-cream-dark bg-cream transition-all hover:border-rose/30 hover:shadow-xl"
            >
              <div className="placeholder-img aspect-[4/3]" />
              <div className="p-6">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-heading text-xl font-bold">
                    {service.name}
                  </h3>
                  <span className="text-xs text-charcoal-light">
                    {service.thai}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-light">
                  {service.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold text-plum">
                    ฿{service.priceRange}
                  </span>
                  <a
                    href={BUSINESS.lineUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-rose-dark transition-colors hover:text-plum"
                  >
                    Book <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Available Styles */}
        <div className="animate-on-scroll mt-12 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-charcoal-light">
            Available Styles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {LASH_STYLES.map((style) => (
              <span
                key={style}
                className="rounded-full border border-rose/30 bg-cream px-5 py-2 text-sm font-medium text-plum"
              >
                {style}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 border-t border-cream-dark" />

        {/* Other Services */}
        <div className="animate-on-scroll text-center">
          <h3 className="font-heading text-2xl font-bold sm:text-3xl">
            More Services
          </h3>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OTHER_SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Sparkles;
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
                    {service.name}{" "}
                    <span className="text-xs font-normal text-charcoal-light">
                      {service.thai}
                    </span>
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-charcoal-light">
                    {service.description}
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
