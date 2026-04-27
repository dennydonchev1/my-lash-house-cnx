"use client";

import { ChevronDown, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { BUSINESS } from "@/lib/constants";

export default function Hero() {
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
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm">
            <span className="text-xs font-medium uppercase tracking-widest text-gold-light flex items-center gap-1.5">
              ★★★★★ 5.0 Rated
            </span>
          </div>

          {/* Artist Portrait Badge */}
          <div className="mx-auto mb-6 w-44 sm:w-52 lg:w-60">
            <img
              src="/images/hero-logo.png"
              alt="Ying — Founder & Lash Artist at My Lash House Chiang Mai"
              className="mx-auto h-auto w-full drop-shadow-2xl"
            />
          </div>

          {/* Heading */}
          <h1 className="font-heading text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            My{" "}
            <span className="italic text-rose-light">Lash</span>{" "}
            House
          </h1>

          {/* Tagline */}
          <p className="mx-auto mt-4 max-w-xl text-lg font-light tracking-wide text-white/80 sm:text-xl">
            Private Lash Studio · Chiang Mai
          </p>

          {/* USPs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/90">
            <span>100% Handmade Fans</span>
            <span className="hidden sm:inline">·</span>
            <span>Certified Artist</span>
            <span className="hidden sm:inline">·</span>
            <span>7+ Years Experience</span>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={BUSINESS.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-plum px-8 py-4 text-base font-semibold text-white shadow-xl transition-all hover:bg-plum-light hover:shadow-2xl"
            >
              <MessageCircle className="h-5 w-5" />
              Book on LINE
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-8 py-4 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10"
            >
              View Services
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
