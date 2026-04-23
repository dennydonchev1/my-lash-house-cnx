import { Camera } from "lucide-react";
import { BUSINESS, GALLERY_IMAGES } from "@/lib/constants";

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="animate-on-scroll text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            Our Work
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            Lash <span className="italic text-plum">Gallery</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
            Every set is unique — designed for your eye shape and personal style.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="animate-on-scroll group relative aspect-square overflow-hidden rounded-xl bg-cream-dark"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="animate-on-scroll mt-10 text-center">
          <a
            href={BUSINESS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-plum/20 bg-plum/5 px-6 py-3 text-sm font-semibold text-plum transition-all hover:bg-plum/10"
          >
            <Camera className="h-4 w-4" />
            See More on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
