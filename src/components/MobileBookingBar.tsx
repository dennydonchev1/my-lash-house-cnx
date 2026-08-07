"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";

// Template v2 sticky booking bar: LINE green, price-anchored label.
// LINE is the primary Thai booking channel; the price anchor answers the
// "how much" hesitation before it forms.
const LABEL = {
  en: "Book on LINE \u00b7 From \u0e3f590",
  th: "\u0e08\u0e2d\u0e07\u0e1c\u0e48\u0e32\u0e19 LINE \u00b7 \u0e40\u0e23\u0e34\u0e48\u0e21\u0e15\u0e49\u0e19 \u0e3f590",
};

export default function MobileBookingBar({ lang = "en" }: { lang?: Lang }) {
  const [visible, setVisible] = useState(false);

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
        href={BUSINESS.lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex w-full items-center justify-center rounded-full bg-[#06C755] py-3.5 text-base font-semibold text-white shadow-lg"
      >
        <MessageCircle className="absolute left-5 h-5 w-5" />
        <span>{LABEL[lang]}</span>
      </a>
    </div>
  );
}
