"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type FAQItem = { q: string; a: string };

export default function FAQAccordion({
  items,
  eyebrow,
  heading,
  headingHighlight,
}: {
  items: readonly FAQItem[] | FAQItem[];
  eyebrow?: string;
  heading?: string;
  headingHighlight?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {(eyebrow || heading) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
              {eyebrow}
            </p>
          )}
          {(heading || headingHighlight) && (
            <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
              {heading}
              {headingHighlight && (
                <span className="italic text-plum">{headingHighlight}</span>
              )}
            </h2>
          )}
        </motion.div>
      )}

      <div className={`${eyebrow || heading ? "mt-12" : ""} space-y-3`}>
        {items.map((faq, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="overflow-hidden rounded-xl border border-cream-dark bg-white"
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-6 py-4 text-left"
            >
              <span className="pr-4 font-semibold">{faq.q}</span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-charcoal-light transition-transform duration-200 ${
                  openIndex === i ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="px-6 pb-5 text-sm leading-relaxed text-charcoal-light">
                    {faq.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
