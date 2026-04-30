import fs from "node:fs";
import path from "node:path";
import type { Lang } from "./i18n";

export type BlogPostMeta = {
  slug: string;
  slugTh?: string;
  title: { en: string; th: string };
  description: { en: string; th: string };
  publishedAt: string;
  updatedAt: string;
  author: string;
  heroImage: string;
  heroImageAlt: { en: string; th: string };
  readingMinutes: number;
  tags: string[];
  faq: { en: Array<{ q: string; a: string }>; th: Array<{ q: string; a: string }> };
};

// Single source of truth for all blog posts. Add new entries here.
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "lash-extension-style-by-eye-shape-chiang-mai",
    slugTh: "tor-khon-ta-baeb-nai-dee",
    title: {
      en: "Which Lash Extension Style Is Right for You? An Eye-Shape Guide for First-Timers in Chiang Mai",
      th: "ต่อขนตาแบบไหนดี? เทียบรูปตา → ทรงที่ใช่ (เชียงใหม่)",
    },
    description: {
      en: "A first-timer's eye-shape guide to lash extensions in Chiang Mai. Match monolid, hooded, round, and downturned eyes to the right style at My Lash House.",
      th: "คู่มือมือใหม่: ดูรูปตาตัวเอง แล้วเลือกทรงต่อขนตาที่เหมาะ ตาชั้นเดียว หนังตาปิด หางตาตก ตากลม ตาห่าง ที่ My Lash House เชียงใหม่",
    },
    publishedAt: "2026-04-30",
    updatedAt: "2026-04-30",
    author: "Ying",
    heroImage: "/images/blog/eye-shape-lash-style-guide-chiang-mai.webp",
    heroImageAlt: {
      en: "Editorial illustration of six eye shapes — single eyelid, double eyelid, downturned, round, hooded, and wide-set — labelled in English and Thai, for the My Lash House lash style guide",
      th: "ภาพประกอบรูปตา 6 แบบ — ตาชั้นเดียว ตาสองชั้น หางตาตก ตากลม หนังตาปิด ตาห่าง — สำหรับคู่มือเลือกทรงต่อขนตาที่ My Lash House",
    },
    readingMinutes: 8,
    tags: ["lash extensions", "eye shape", "first-timers", "chiang mai", "ต่อขนตา"],
    faq: {
      en: [
        {
          q: "How do I know which lash style suits my eye shape?",
          a: "Match your eye shape to the quick-reference table at the top of this guide as a starting point, then confirm in consultation. At My Lash House, every set begins with mapping on your closed eye, so the final design accounts for how your natural lashes actually grow, not just the broad shape of your eye.",
        },
        {
          q: "Can I mix lash styles in one set?",
          a: "Yes. Most styles on the menu can be customized through the placement of curls, lengths, and fan sizes. Hybrid is built around mixing classic single extensions with handmade fans, and any of the volume sets can be mapped with extra weight or length in specific zones.",
        },
        {
          q: "Will dramatic lash extensions damage my natural lashes?",
          a: "Properly applied extensions don't damage natural lashes. Damage usually comes from oversized fans on weak lashes, poor isolation that lets two natural lashes glue together, or rough removal at home. The 0.05mm handmade fans we use, isolated one natural lash at a time, sit comfortably and shed naturally with the lash they're attached to.",
        },
        {
          q: "How long does a first lash extension appointment take?",
          a: "Around two hours for a full set, including consultation and mapping.",
        },
        {
          q: "How often do I need to come back for a refill?",
          a: "Refills are recommended every two to three weeks to keep the set looking full as natural lashes shed. They're shorter and less expensive than a full set.",
        },
        {
          q: "What is the 3-day retouch guarantee at My Lash House?",
          a: "If lashes shed unusually fast in the first three days because of a glue or application issue on our side, we'll fix it for free. Message us on Instagram within three days with clear photos and we'll schedule a retouch appointment.",
        },
        {
          q: "Is My Lash House English-friendly?",
          a: "Yes. Booking and consultation are comfortable in English. The studio is in San Klang, near Payap University, about 10 minutes from the centre of Chiang Mai.",
        },
      ],
      th: [
        {
          q: "รู้ได้ยังไงว่าต่อขนตาทรงไหนเหมาะกับรูปตาเรา",
          a: "เริ่มจากตารางเทียบรูปตาด้านบนของคู่มือนี้ก่อน แล้วยืนยันอีกทีในวันคุย ที่ My Lash House ทุกเซตเริ่มจากการ mapping บนเปลือกตาที่ปิดอยู่ การออกแบบสุดท้ายจึงคำนึงถึงทิศทางที่ขนตาขึ้นจริง ไม่ใช่แค่รูปตาแบบกว้าง ๆ",
        },
        {
          q: "ผสมทรงต่อขนตาในเซตเดียวได้ไหม",
          a: "ได้ ทรงส่วนใหญ่ในเมนูปรับได้ผ่านการวางเคิร์ล ความยาว และขนาดแฟน Hybrid ออกแบบมาเพื่อผสมอยู่แล้ว และ Volume เซตอื่น ๆ map เน้นน้ำหนักหรือความยาวเฉพาะโซนได้",
        },
        {
          q: "ต่อขนตาทรงดราม่าทำลายขนตาธรรมชาติไหม",
          a: "ขนตาที่ต่อถูกต้องไม่ทำลายขนตาธรรมชาติ ความเสียหายเกิดจากแฟนใหญ่เกินไปบนขนตาบอบบาง การแยกขนไม่ดีจนติดสองเส้นเข้าด้วยกัน หรือการดึงออกเองที่บ้าน แฟน 0.05 มม. ที่เราใช้ติดทีละเส้น นั่งสบายและหลุดไปพร้อมขนตาที่ติดตามวงจรธรรมชาติ",
        },
        {
          q: "นัดต่อขนตาครั้งแรกใช้เวลานานแค่ไหน",
          a: "ประมาณสองชั่วโมงสำหรับเซตเต็ม รวมการคุยและ mapping",
        },
        {
          q: "ต้องกลับมาเติมขนตาบ่อยแค่ไหน",
          a: "แนะนำเติมทุก 2-3 สัปดาห์เพื่อรักษาความเต็มของเซตในขณะที่ขนตาธรรมชาติหลุดตามวงจร การเติมใช้เวลาน้อยกว่าและถูกกว่าการต่อเซตใหม่",
        },
        {
          q: "รับประกันรีทัช 3 วัน ของ My Lash House คืออะไร",
          a: "ถ้าขนตาหลุดเร็วผิดปกติใน 3 วันแรกจากปัญหากาวหรือการต่อทางเรา จะแก้ให้ฟรี ทักไอจีพร้อมรูปชัด ๆ ภายใน 3 วัน เราจะนัดเวลารีทัช",
        },
        {
          q: "ถ้าต่อขนตาครั้งแรก ควรเริ่มจากทรงไหน",
          a: "สำหรับครั้งแรก เลือกฝั่งที่เบากว่าของทรงที่เหมาะกับรูปตา เช่น Light Volume หรือ Classic Volume แทน Mega Volume เริ่มเบาแล้วค่อยขยับขึ้นในเซตถัดไปดีกว่า เพราะรู้แล้วว่าขนตาธรรมชาติของเรารับน้ำหนักได้แค่ไหนและความหนาระดับไหนใส่สบายในชีวิตจริง",
        },
      ],
    },
  },
];

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "blog");

export function getAllPosts(): BlogPostMeta[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string, lang: Lang): BlogPostMeta | null {
  return (
    BLOG_POSTS.find((p) =>
      lang === "th" ? p.slugTh === slug || p.slug === slug : p.slug === slug
    ) ?? null
  );
}

export function getPostContent(post: BlogPostMeta, lang: Lang): string {
  const filename = `${post.slug}.${lang}.md`;
  const filepath = path.join(CONTENT_DIR, filename);
  return fs.readFileSync(filepath, "utf8");
}

export function getPostUrl(post: BlogPostMeta, lang: Lang): string {
  if (lang === "th") {
    return `/th/blog/${post.slugTh ?? post.slug}`;
  }
  return `/blog/${post.slug}`;
}
