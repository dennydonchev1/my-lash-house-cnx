"use client";

import { useState, useEffect } from "react";
import { BUSINESS } from "@/lib/constants";
import InstagramIcon from "@/components/icons/InstagramIcon";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import type { Lang } from "@/lib/i18n";

// Template v2 sticky booking bar. Ying books on Instagram and WhatsApp only
// (no LINE, Nov 2026), so the bar carries both. The price anchor answers the
// "how much" hesitation before it forms.
const LABEL = {
  en: { lead: "Book your set · From ฿590", ig: "Instagram", wa: "WhatsApp" },
  th: { lead: "จองคิว · เริ่มต้น ฿590", ig: "Instagram", wa: "WhatsApp" },
};

const COURSE_LEAD = {
  en: "Ask about the course",
  th: "สอบถามคอร์ส",
};

export default function MobileBookingBar({
  lang = "en",
  variant = "booking",
}: {
  lang?: Lang;
  /** "course" drops the ฿590 price anchor, which refers to extension sets, not the course fee. */
  variant?: "booking" | "course";
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = LABEL[lang];
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 border-t border-rose/20 bg-cream/95 px-4 pb-3 pt-2 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <p className="mb-2 text-center text-xs font-semibold text-charcoal-light">
        {variant === "course" ? COURSE_LEAD[lang] : t.lead}
      </p>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={BUSINESS.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-plum py-3 text-sm font-semibold text-white shadow-lg"
        >
          <InstagramIcon className="h-4 w-4" />
          <span>{t.ig}</span>
        </a>
        <a
          href={BUSINESS.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 text-sm font-semibold text-white shadow-lg"
        >
          <WhatsAppIcon className="h-4 w-4" />
          <span>{t.wa}</span>
        </a>
      </div>
    </div>
  );
}
