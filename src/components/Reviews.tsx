import { Star, ExternalLink } from "lucide-react";
import { REVIEWS, BUSINESS } from "@/lib/constants";

export default function Reviews() {
  return (
    <section id="reviews" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            Testimonials
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            What Clients <span className="italic text-plum">Say</span>
          </h2>
        </div>

        {/* Rating Badge */}
        <div className="animate-on-scroll mx-auto mt-10 flex max-w-sm flex-col items-center rounded-2xl bg-white p-6 shadow-lg">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-7 w-7 fill-gold text-gold" />
            ))}
          </div>
          <p className="mt-2 text-4xl font-bold text-plum">{BUSINESS.rating}</p>
          <p className="mt-1 text-sm text-charcoal-light">
            {BUSINESS.reviewCount} reviews on Google
          </p>
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
            View All Google Reviews
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
