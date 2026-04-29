"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { dict, type Lang } from "@/lib/i18n";

const faqs = {
  en: [
    {
      q: "Do you offer a guarantee on the lashes?",
      a: "Yes — every set comes with a 5-day retouch guarantee. If your extensions show abnormal shedding within 5 days due to glue failure, we'll retouch them free. The guarantee doesn't cover loss caused by avoidable factors like rubbing, premature water exposure, or oil-based products. Just message us on Instagram within 5 days and we'll set up your retouch.",
    },
    {
      q: "How much do lash extensions cost?",
      a: "Prices range from ฿590 for Classic 1:1 to ฿1,590 for Strip Lash. Color lash add-ons are ฿150–300. The final price depends on the style you choose. A personal consultation is included with every booking.",
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
  ],
  th: [
    {
      q: "มีรับประกันขนตาไหม?",
      a: "มีค่ะ — ทุกเซ็ตรับประกันรีทัช 5 วัน หากขนตาหลุดผิดปกติภายใน 5 วันหลังต่อ เนื่องจากปัญหากาว เราจะรีทัชให้ฟรี การรับประกันไม่ครอบคลุมการหลุดที่เกิดจากการขยี้ตา โดนน้ำเร็วเกินไป หรือใช้ผลิตภัณฑ์ที่มีน้ำมัน ทักมาทาง Instagram ภายใน 5 วันแล้วเราจะนัดรีทัชให้ค่ะ",
    },
    {
      q: "ต่อขนตา ราคาเท่าไหร่?",
      a: "ราคาเริ่มต้นที่ 590 บาท (คลาสสิก 1:1) ถึง 1,590 บาท (สตริปแลช) ออปชั่นขนตาสีเพิ่ม 150–300 บาท ราคาขึ้นอยู่กับสไตล์ที่เลือก ทุกการจองรวมการให้คำปรึกษาส่วนตัว",
    },
    {
      q: "ขนตาที่ต่ออยู่ได้นานแค่ไหน?",
      a: "เซ็ตเต็มอยู่ได้ประมาณ 3–4 สัปดาห์หากดูแลดี แนะนำให้รีฟิลทุก 2–3 สัปดาห์เพื่อให้ขนตาดูฟูสดใสตลอด",
    },
    {
      q: "ขนตาแฮนด์เมดต่างจากขนตาสำเร็จยังไง?",
      a: "พัดแฮนด์เมดทำสดในวันต่อ ปรับให้เข้ากับรูปดวงตาและลุคที่ต้องการได้แม่นยำ น้ำหนักเบากว่า ใส่สบายกว่า และดูเป็นธรรมชาติกว่าพัดสำเร็จ",
    },
    {
      q: "จองคิวยังไง?",
      a: "จองผ่าน LINE (@604ymska), Instagram DM (@my_lash_house.cnx) หรือโทร 085-474-7314 ค่ะ เปิดทุกวัน 10:00–19:00",
    },
    {
      q: "ร้านหาง่ายไหม?",
      a: "ร้านอยู่ที่ 89/117 หมู่บ้านพฤกษาวิลล์ ต.สันกลาง อ.สันกำแพง จ.เชียงใหม่ เป็นโฮมสตูดิโอส่วนตัว เมื่อจองคิวแล้วจะส่งพิกัดบน LINE ให้ค่ะ",
    },
    {
      q: "มีคอร์สสอนต่อขนตาไหม?",
      a: "มีค่ะ คอร์สสอนต่อขนตามืออาชีพ มีใบประกาศรับรอง สอนเทคนิคทำพัดด้วยมือจากครูที่มีประสบการณ์ 7+ ปี ติดต่อสอบถามรายละเอียดและตารางเรียนได้",
    },
  ],
} as const;

export default function FAQ({ lang = "en" }: { lang?: Lang }) {
  const t = dict[lang].faq;
  const items = faqs[lang];
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
            {t.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="mt-12 space-y-3">
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
    </section>
  );
}
