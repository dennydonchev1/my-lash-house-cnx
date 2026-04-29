"use client";

import { ChevronDown, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";
import InstagramIcon from "@/components/icons/InstagramIcon";

const Instagram = InstagramIcon;

export default function Hero({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].hero;
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background — placeholder gradient until real photo */}
      <div className="absolute inset-0 placeholder-img-dark" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/60" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badges */}
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
              <span className="text-xs font-medium uppercase tracking-widest text-gold-light flex items-center gap-1.5">
                {t.ratedBadge}
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-rose/40 bg-rose/15 px-5 py-2 backdrop-blur-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-rose-light" />
              <span className="text-xs font-medium uppercase tracking-widest text-rose-light">
                {t.guaranteeBadge}
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            My{" "}
            <span className="italic text-rose-light">Lash</span>{" "}
            House
          </h1>

          {/* Subhead — keyword-rich H2 for SEO */}
          <p className="mx-auto mt-4 max-w-2xl text-base font-medium tracking-wide text-white/90 sm:text-lg">
            {t.seoSubhead}
          </p>

          {/* Tagline */}
          <p className="mx-auto mt-2 max-w-xl text-base font-light tracking-wide text-white/70 sm:text-lg">
            {t.tagline}
          </p>

          {/* USPs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90">
            <span>{t.usp1}</span>
            <span className="hidden sm:inline">·</span>
            <span>{t.usp2}</span>
            <span className="hidden sm:inline">·</span>
            <span>{t.usp3}</span>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-plum px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:bg-plum-light hover:shadow-2xl"
            >
              <Instagram className="h-5 w-5" />
              {t.ctaPrimary}
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
            >
              {t.ctaSecondary}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6 text-white/50" />
      </motion.div>
    </section>
  );
}
