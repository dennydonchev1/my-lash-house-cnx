"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "How much do lash extensions cost?",
    a: "Prices range from ฿490 for Classic (1D) to ฿1,390 for Mega Volume. The final price depends on the lash length and style you choose. A personal consultation is included with every booking.",
  },
  {
    q: "How long do lash extensions last?",
    a: "A full set typically lasts 3–4 weeks with proper care. We recommend refill appointments every 2–3 weeks to maintain a full, fresh look.",
  },
  {
    q: "What makes handmade fans different from premade?",
    a: "Handmade fans are crafted in real-time during your appointment, allowing precise customization for your eye shape and desired look. They're lighter, more comfortable, and create a more natural appearance compared to premade fans.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book through LINE (@604ymska), Instagram DM (@my_lash_house.cnx), or call 085-474-7314. We're open daily from 10 AM to 7 PM.",
  },
  {
    q: "Is the studio easy to find?",
    a: "We're located at 89/117 Pruksa Ville in San Klang, San Kamphaeng District, Chiang Mai. It's a private home studio — we'll send you a pin on LINE when you book so you can find us easily.",
  },
  {
    q: "Do you offer lash training courses?",
    a: "Yes! We offer professional certification courses for aspiring lash artists. You'll learn handmade fan techniques from a certified instructor with 7+ years of experience. Contact us for course details and scheduling.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            Common <span className="italic text-plum">Questions</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq, i) => (
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
    </section>
  );
}
