"use client";

import { useState, useEffect } from "react";
import Instagram from "@/components/icons/InstagramIcon";
import { BUSINESS } from "@/lib/constants";
import { dict, type Lang } from "@/lib/i18n";

export default function MobileBookingBar({ lang = "en" }: { lang?: Lang }) {
  const [visible, setVisible] = useState(false);
  const t = dict[lang].mobileBar;

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-rose/20 bg-cream/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={BUSINESS.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex w-full items-center justify-center gap-2 rounded-full bg-plum py-3.5 text-base font-semibold text-white shadow-lg"
      >
        <Instagram className="h-5 w-5" />
        {t.cta}
      </a>
    </div>
  );
}
