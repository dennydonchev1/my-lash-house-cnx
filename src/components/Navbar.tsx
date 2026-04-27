"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Menu, X, MessageCircle, Globe } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import { dict, NAV_LINKS_BY_LANG, type Lang } from "@/lib/i18n";

export default function Navbar({ lang = "en" }: { lang?: Lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = dict[lang].nav;
  const navLinks = NAV_LINKS_BY_LANG[lang];
  const otherLang: Lang = lang === "en" ? "th" : "en";
  const otherLangPath = otherLang === "th" ? "/th" : "/";
  const otherLangLabel = otherLang === "th" ? "ไทย" : "EN";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-20">
          {/* Logo — swap between white (over hero) and black (scrolled) */}
          <a href={lang === "th" ? "/th" : "/"} className="flex items-center">
            <Image
              src={scrolled ? "/images/logo-black.png" : "/images/logo-white.png"}
              alt="My Lash House"
              width={160}
              height={60}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </a>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  scrolled
                    ? "text-charcoal-light hover:text-plum"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
            {/* Language toggle */}
            <a
              href={otherLangPath}
              className={`flex items-center gap-1 text-sm font-medium tracking-wide transition-colors ${
                scrolled
                  ? "text-charcoal-light hover:text-plum"
                  : "text-white/90 hover:text-white"
              }`}
              hrefLang={otherLang}
            >
              <Globe className="h-3.5 w-3.5" />
              {otherLangLabel}
            </a>
            <a
              href={BUSINESS.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:shadow-lg ${
                scrolled
                  ? "bg-plum text-white hover:bg-plum-light"
                  : "bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
              }`}
            >
              <MessageCircle className="h-4 w-4" />
              {t.bookNow}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`rounded-lg p-2 transition-colors md:hidden ${
              scrolled
                ? "text-charcoal hover:bg-cream-dark"
                : "text-white hover:bg-white/10"
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 bg-cream/95 px-4 pb-6 pt-2 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block rounded-lg px-4 py-3 text-base font-medium text-charcoal-light transition-colors hover:bg-cream-dark hover:text-plum"
            >
              {link.label}
            </a>
          ))}
          <a
            href={otherLangPath}
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-charcoal-light transition-colors hover:bg-cream-dark hover:text-plum"
            hrefLang={otherLang}
          >
            <Globe className="h-4 w-4" />
            {otherLangLabel}
          </a>
          <a
            href={BUSINESS.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex items-center justify-center gap-2 rounded-full bg-plum px-5 py-3 text-base font-semibold text-white"
          >
            <MessageCircle className="h-5 w-5" />
            {t.bookOnLine}
          </a>
        </div>
      </div>
    </nav>
  );
}
