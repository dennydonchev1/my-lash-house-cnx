import { Camera } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

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

        {/* Instagram Grid Images */}
        <div className="mt-14 space-y-4">
          <div className="animate-on-scroll overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/images/ig-grid-1.png"
              alt="My Lash House portfolio — lash extensions, nail art, and beauty work"
              className="w-full"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="animate-on-scroll overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/ig-grid-2.png"
                alt="My Lash House lash extension styles and nail designs"
                className="w-full"
              />
            </div>
            <div className="animate-on-scroll overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/ig-grid-3.png"
                alt="My Lash House close-up lash work and beauty services"
                className="w-full"
              />
            </div>
          </div>
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
