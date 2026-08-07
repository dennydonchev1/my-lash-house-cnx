"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import Link from "next/link";
import { BUSINESS, LASH_SERVICES } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";
import InstagramIcon from "@/components/icons/InstagramIcon";

// The 4-tap style finder. Answers map onto the same eye-shape -> style logic
// Ying uses on the chair (documented in the eye-shape guide post). The result
// is a starting-point recommendation, not a diagnosis; the CTA hands off to
// LINE/IG where the real consultation happens.

type EyeShape = "monolid" | "double" | "downturned" | "round" | "hooded" | "wideset" | "unsure";
type Context = "work" | "daily" | "event" | "bridal";
type Drama = "soft" | "medium" | "max";

const T = {
  en: {
    eyebrow: "Style Finder",
    heading: "Find your lash style",
    headingHighlight: " in 4 taps",
    intro: "Answer four quick questions and get the style Ying would start you on. No email, no signup, just the answer.",
    q1: "What's your eye shape?",
    q1Hint: "Not sure? Pick the closest, or let Ying decide.",
    q2: "Where will these lashes live?",
    q3: "How much drama are we talking?",
    q4: "First time getting extensions?",
    eyeShapes: {
      monolid: "Monolid",
      double: "Double eyelid",
      downturned: "Downturned",
      round: "Round",
      hooded: "Hooded",
      wideset: "Wide-set",
      unsure: "Not sure",
    } as Record<EyeShape, string>,
    contexts: {
      work: "The office, mostly",
      daily: "Everyday, everywhere",
      event: "Events and photos",
      bridal: "My wedding",
    } as Record<Context, string>,
    dramas: {
      soft: "Whisper it",
      medium: "Noticeable, tastefully",
      max: "Maximum drama",
    } as Record<Drama, string>,
    firstYes: "Yes, be gentle",
    firstNo: "No, I know the drill",
    resultEyebrow: "Your starting point",
    resultWhy: "Why this one",
    dramaLabel: "Drama level",
    ctaLine: "Book on LINE",
    ctaIg: "DM on Instagram",
    restart: "Start over",
    deepDive: "Read the full eye-shape guide",
    back: "Back",
    step: "of 4",
  },
  th: {
    eyebrow: "ค้นหาทรงของคุณ",
    heading: "หาทรงต่อขนตาที่ใช่",
    headingHighlight: " ใน 4 แตะ",
    intro: "ตอบ 4 คำถามสั้น ๆ แล้วรับทรงที่ครูหญิงจะแนะนำให้เริ่ม ไม่ต้องกรอกอีเมล ไม่ต้องสมัคร ได้คำตอบเลย",
    q1: "รูปตาของคุณเป็นแบบไหน",
    q1Hint: "ไม่แน่ใจ? เลือกที่ใกล้ที่สุด หรือให้ครูหญิงดูให้",
    q2: "ขนตาเซตนี้จะไปอยู่ที่ไหนบ้าง",
    q3: "อยากได้ดราม่าระดับไหน",
    q4: "ต่อขนตาครั้งแรกหรือเปล่า",
    eyeShapes: {
      monolid: "ตาชั้นเดียว",
      double: "ตาสองชั้น",
      downturned: "หางตาตก",
      round: "ตากลม",
      hooded: "หนังตาปิด",
      wideset: "ตาห่าง",
      unsure: "ไม่แน่ใจ",
    } as Record<EyeShape, string>,
    contexts: {
      work: "ออฟฟิศเป็นหลัก",
      daily: "ทุกวัน ทุกที่",
      event: "งานอีเวนต์และถ่ายรูป",
      bridal: "งานแต่งของฉันเอง",
    } as Record<Context, string>,
    dramas: {
      soft: "เบา ๆ เหมือนกระซิบ",
      medium: "เห็นชัด แบบมีรสนิยม",
      max: "จัดเต็มไปเลย",
    } as Record<Drama, string>,
    firstYes: "ครั้งแรกค่ะ ขอเบา ๆ",
    firstNo: "ไม่ใช่ รู้งานอยู่แล้ว",
    resultEyebrow: "จุดเริ่มต้นของคุณ",
    resultWhy: "ทำไมทรงนี้",
    dramaLabel: "ระดับดราม่า",
    ctaLine: "จองผ่าน LINE",
    ctaIg: "ทัก IG",
    restart: "เริ่มใหม่",
    deepDive: "อ่านคู่มือเทียบรูปตาฉบับเต็ม",
    back: "ย้อนกลับ",
    step: "จาก 4",
  },
};

const WHY = {
  en: {
    "Classic 1:1": "One extension per natural lash. The gentlest start on the menu, and the easiest set to live with while you learn what you like.",
    "Natural Look": "Soft, light, and camera-friendly. Reads as your lashes on their best behaviour, which is exactly what close-up photos love.",
    "Hybrid": "Texture without drama. The polished step up from mascara that still looks like you.",
    "Classic Volume": "Full enough to feel finished, light enough to forget you're wearing it. A dependable daily set.",
    "Light Volume": "Fluffy softness that lifts the eye without weight. The daily-wear favourite for a reason.",
    "Mega Volume": "Dense handmade fans with real presence. When the brief says make an entrance, this is the set.",
    "Wet Look": "Glossy, editorial, unapologetic. Built for lights and lenses.",
    "Russian Volume": "Luxurious fluff that elongates beautifully. Round eyes especially love this one.",
    "Wispy Volume": "Spikes and texture that show past lids and hoods. The most-booked set in the studio.",
    "Strip Lash": "Instant full glam for one big night. On, stunning, off.",
  } as Record<string, string>,
  th: {
    "Classic 1:1": "ต่อ 1 เส้นต่อขนตาจริง 1 เส้น จุดเริ่มที่นุ่มนวลที่สุดในเมนู และใช้ชีวิตด้วยง่ายที่สุดระหว่างเรียนรู้ว่าชอบแบบไหน",
    "Natural Look": "นุ่ม เบา ขึ้นกล้อง ดูเหมือนขนตาตัวเองในวันที่ดีที่สุด ซึ่งคือสิ่งที่รูปโคลสอัพรัก",
    "Hybrid": "มีมิติโดยไม่ดราม่า ก้าวที่เรียบหรูขึ้นจากมาสคาร่า แต่ยังดูเป็นตัวเอง",
    "Classic Volume": "แน่นพอให้รู้สึกครบ เบาพอให้ลืมว่าใส่อยู่ เซตประจำวันที่พึ่งได้",
    "Light Volume": "ฟูนุ่มที่ยกตาโดยไม่หนัก ขวัญใจสายใส่ทุกวันด้วยเหตุผล",
    "Mega Volume": "แฟนทำมือแน่น ๆ ที่มีพลังจริง เมื่อโจทย์คือเปิดตัวให้จำ นี่คือเซตนั้น",
    "Wet Look": "เงา จัดจ้าน ไม่ขอโทษใคร เกิดมาเพื่อไฟและเลนส์",
    "Russian Volume": "ความฟูหรูหราที่ยืดตาได้สวย ตากลมรักทรงนี้เป็นพิเศษ",
    "Wispy Volume": "สไปก์และมิติที่โผล่พ้นเปลือกและชั้นตา เซตที่ถูกจองเยอะที่สุดในสตูดิโอ",
    "Strip Lash": "กลามเต็มระบบสำหรับคืนสำคัญคืนเดียว ใส่ ปัง ถอด",
  } as Record<string, string>,
};

function recommend(eye: EyeShape, ctx: Context, drama: Drama, first: boolean): string {
  // First-timers get stepped down from max drama; easier to go up next set.
  const d: Drama = first && drama === "max" ? "medium" : drama;

  if (ctx === "bridal" && d === "soft") return "Natural Look";
  if (ctx === "event" && drama === "max" && !first) return eye === "round" ? "Russian Volume" : "Mega Volume";

  switch (eye) {
    case "monolid":
      return d === "soft" ? "Light Volume" : "Wispy Volume";
    case "double":
      return d === "soft" ? "Classic Volume" : d === "medium" ? "Hybrid" : "Mega Volume";
    case "downturned":
      return d === "max" ? "Mega Volume" : "Wispy Volume";
    case "round":
      return d === "soft" ? "Natural Look" : "Russian Volume";
    case "hooded":
      return d === "soft" ? "Light Volume" : "Wispy Volume";
    case "wideset":
      return d === "soft" ? "Classic Volume" : "Hybrid";
    default:
      return d === "soft" ? "Classic 1:1" : d === "medium" ? "Hybrid" : "Wispy Volume";
  }
}

function DramaDots({ level, className = "" }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`${level} / 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i <= level ? "bg-rose-dark" : "bg-cream-dark"}`}
        />
      ))}
    </span>
  );
}

const stepAnim = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -24 },
  transition: { duration: 0.25 },
};

export default function StyleFinder({ lang = "en" }: { lang?: Lang }) {
  const t = T[lang];
  const [step, setStep] = useState(0);
  const [eye, setEye] = useState<EyeShape | null>(null);
  const [ctx, setCtx] = useState<Context | null>(null);
  const [drama, setDrama] = useState<Drama | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const eyeGuideHref = lang === "th" ? "/th/blog/tor-khon-ta-baeb-nai-dee" : "/blog/lash-extensions-by-eye-shape-chiang-mai";
  const service = result ? LASH_SERVICES.find((s) => s.name === result) : null;

  const reset = () => {
    setStep(0);
    setEye(null);
    setCtx(null);
    setDrama(null);
    setResult(null);
  };

  const Option = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="rounded-full border border-rose/30 bg-white px-5 py-3 text-sm font-medium text-charcoal transition-all hover:border-plum hover:bg-plum hover:text-white sm:text-base"
    >
      {label}
    </button>
  );

  return (
    <section id="style-finder" className="bg-pink-soft py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">{t.eyebrow}</p>
          <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
            {t.heading}
            <span className="italic text-plum">{t.headingHighlight}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-charcoal-light">{t.intro}</p>
        </div>

        <div className="relative mt-12 min-h-[280px] rounded-3xl border border-rose/20 bg-white p-8 shadow-sm sm:p-10">
          {/* progress */}
          {result === null && (
            <div className="mb-8 flex items-center justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${i === step ? "w-8 bg-plum" : i < step ? "w-4 bg-rose" : "w-4 bg-cream-dark"}`}
                />
              ))}
              <span className="ml-3 text-xs uppercase tracking-widest text-charcoal-light">
                {step + 1} {t.step}
              </span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {result === null && step === 0 && (
              <motion.div key="q1" {...stepAnim} className="text-center">
                <h3 className="font-heading text-xl font-bold sm:text-2xl">{t.q1}</h3>
                <p className="mt-2 text-sm text-charcoal-light">{t.q1Hint}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {(Object.keys(t.eyeShapes) as EyeShape[]).map((k) => (
                    <Option key={k} label={t.eyeShapes[k]} onClick={() => { setEye(k); setStep(1); }} />
                  ))}
                </div>
              </motion.div>
            )}

            {result === null && step === 1 && (
              <motion.div key="q2" {...stepAnim} className="text-center">
                <h3 className="font-heading text-xl font-bold sm:text-2xl">{t.q2}</h3>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {(Object.keys(t.contexts) as Context[]).map((k) => (
                    <Option key={k} label={t.contexts[k]} onClick={() => { setCtx(k); setStep(2); }} />
                  ))}
                </div>
              </motion.div>
            )}

            {result === null && step === 2 && (
              <motion.div key="q3" {...stepAnim} className="text-center">
                <h3 className="font-heading text-xl font-bold sm:text-2xl">{t.q3}</h3>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  {(Object.keys(t.dramas) as Drama[]).map((k) => (
                    <Option key={k} label={t.dramas[k]} onClick={() => { setDrama(k); setStep(3); }} />
                  ))}
                </div>
              </motion.div>
            )}

            {result === null && step === 3 && (
              <motion.div key="q4" {...stepAnim} className="text-center">
                <h3 className="font-heading text-xl font-bold sm:text-2xl">{t.q4}</h3>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Option label={t.firstYes} onClick={() => setResult(recommend(eye!, ctx!, drama!, true))} />
                  <Option label={t.firstNo} onClick={() => setResult(recommend(eye!, ctx!, drama!, false))} />
                </div>
              </motion.div>
            )}

            {result && service && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                  <div className="aspect-square w-40 shrink-0 overflow-hidden rounded-2xl sm:w-48">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={service.image} alt={lang === "th" ? service.thai : service.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rose-dark">{t.resultEyebrow}</p>
                    <h3 className="mt-2 font-heading text-2xl font-bold sm:text-3xl">
                      {lang === "th" ? service.thai : service.name}{" "}
                      <span className="text-base font-normal text-charcoal-light">
                        {lang === "th" ? service.name : service.thai}
                      </span>
                    </h3>
                    <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
                      <span className="text-xl font-bold text-plum">฿{service.price}</span>
                      <span className="text-xs uppercase tracking-widest text-charcoal-light">{t.dramaLabel}</span>
                      <DramaDots level={service.drama} />
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-charcoal-light">
                      <span className="font-semibold text-charcoal">{t.resultWhy}: </span>
                      {WHY[lang][result]}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                      <a
                        href={BUSINESS.lineUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {t.ctaLine}
                      </a>
                      <a
                        href={BUSINESS.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-plum px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-plum-light"
                      >
                        <InstagramIcon className="h-4 w-4" />
                        {t.ctaIg}
                      </a>
                    </div>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
                      <Link href={eyeGuideHref} className="inline-flex items-center gap-1 text-sm font-medium text-plum hover:text-rose-dark">
                        {t.deepDive} <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      <button onClick={reset} className="inline-flex items-center gap-1 text-sm text-charcoal-light hover:text-plum">
                        <RotateCcw className="h-3.5 w-3.5" /> {t.restart}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
