import { Star, ExternalLink } from "lucide-react";
import { REVIEWS, BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";

export default function Reviews({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].reviews;
  return (
    <section id="reviews" className="py-20 sm:py-28">
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
        </div>

        {/* Review Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="animate-on-scroll rounded-xl border border-cream-dark bg-white p-6 shadow-sm"
            >
              <div className="flex gap-0.5">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-charcoal-light">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm font-semibold">{review.name}</p>
                <span className="text-xs text-charcoal-light">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="animate-on-scroll mt-8 text-center">
          <a
            href={BUSINESS.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-plum transition-colors hover:text-rose-dark"
          >
            {t.googleCta}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
