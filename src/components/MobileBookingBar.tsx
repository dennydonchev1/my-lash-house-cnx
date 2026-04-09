"use client";

import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

export default function MobileBookingBar() {
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
        className="flex w-full items-center justify-center gap-2 rounded-full bg-plum py-3.5 text-base font-semibold text-white shadow-lg"
      >
        <MessageCircle className="h-5 w-5" />
        Book Now on LINE
      </a>
    </div>
  );
}
