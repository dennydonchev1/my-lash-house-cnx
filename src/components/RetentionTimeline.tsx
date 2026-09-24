import type { Lang } from "@/lib/i18n";

// Template v2 "timeline strip" module: lash retention from day 0 to fully shed
// as six visual stage cards (period + fullness dots + what to do). Rendered
// inside blog posts wherever the markdown contains a paragraph that is exactly
// [[RETENTION_TIMELINE]] (see the p override in BlogPost.tsx). Searchers asking
// "how long do lash extensions last" want to SEE the decay curve, not parse it
// out of a prose table.
const LABELS = {
  en: { fullness: "Fullness" },
  th: { fullness: "ความเต็ม" },
};

const STAGES: {
  fullness: number;
  period: { en: string; th: string };
  title: { en: string; th: string };
  note: { en: string; th: string };
}[] = [
  {
    fullness: 5,
    period: { en: "Days 0–3", th: "วันที่ 0–3" },
    title: { en: "Glue fully cures", th: "กาวเซตตัวเต็มกำลัง" },
    note: {
      en: "No water, no oils, no rubbing",
      th: "งดน้ำ งดผลิตภัณฑ์น้ำมัน งดขยี้ตา",
    },
  },
  {
    fullness: 5,
    period: { en: "Day 3", th: "วันที่ 3" },
    title: { en: "Retouch window closes", th: "จุดสิ้นสุดหน้าต่างรีทัชฟรี" },
    note: {
      en: "Abnormal shedding? Send photos now",
      th: "หลุดเยอะผิดปกติ ส่งรูปมาเคลมได้",
    },
  },
  {
    fullness: 4,
    period: { en: "Weeks 1–2", th: "สัปดาห์ 1–2" },
    title: { en: "Still looks full", th: "ยังเต็มสวย" },
    note: {
      en: "Clean daily with lash shampoo",
      th: "ล้างด้วยแชมพูขนตาทุกวัน",
    },
  },
  {
    fullness: 3,
    period: { en: "Weeks 2–4", th: "สัปดาห์ 2–4" },
    title: { en: "Natural thinning starts", th: "เริ่มบางจากการหลุดธรรมชาติ" },
    note: {
      en: "Best window to book a refill",
      th: "ช่วงนัดเติมที่ดีที่สุด",
    },
  },
  {
    fullness: 2,
    period: { en: "Weeks 4–6", th: "สัปดาห์ 4–6" },
    title: { en: "Visibly sparse", th: "บางชัดเจน" },
    note: {
      en: "Refill or remove and restart",
      th: "เติม หรือถอดออกเริ่มใหม่",
    },
  },
  {
    fullness: 1,
    period: { en: "Weeks 6–8", th: "สัปดาห์ 6–8" },
    title: { en: "Mostly shed", th: "หลุดเกือบหมด" },
    note: {
      en: "Removal recommended, fresh set next",
      th: "แนะนำถอดออก แล้วต่อเซตใหม่",
    },
  },
];

export default function RetentionTimeline({ lang = "en" }: { lang?: Lang }) {
  const t = LABELS[lang];
  return (
    <div className="not-prose my-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
      {STAGES.map((stage) => (
        <div
          key={stage.period.en}
          className="rounded-2xl border border-cream-dark bg-white p-3 transition-all hover:border-rose/40 hover:shadow-md sm:p-4"
        >
          <span className="inline-block rounded-full bg-plum px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            {stage.period[lang]}
          </span>
          <div className="mt-2.5 flex items-center gap-1.5">
            <span className="text-[9px] font-semibold uppercase tracking-widest text-charcoal-light">
              {t.fullness}
            </span>
            <span className="inline-flex items-center gap-0.5" aria-label={`${stage.fullness} / 5`}>
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full ${i <= stage.fullness ? "bg-rose-dark" : "bg-cream-dark"}`}
                />
              ))}
            </span>
          </div>
          <p className="mt-2 font-heading text-sm font-bold leading-tight">{stage.title[lang]}</p>
          <p className="mt-1 text-[11px] leading-snug text-charcoal-light">{stage.note[lang]}</p>
        </div>
      ))}
    </div>
  );
}
