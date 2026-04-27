import { Award, Heart, Shield, Sparkles } from "lucide-react";
import { dict, type Lang } from "@/lib/i18n";

const ICONS = [Award, Sparkles, Heart, Shield];

export default function About({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].about;
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="animate-on-scroll text-center">
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
            <div className="mt-8 flex flex-wrap justify-center gap-4">
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
