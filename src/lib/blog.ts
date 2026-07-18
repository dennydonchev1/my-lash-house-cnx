import fs from "node:fs";
import path from "node:path";
import type { Lang } from "./i18n";

export type BlogPostMeta = {
  slug: string;
  slugTh?: string;
  title: { en: string; th: string };
  /** Optional shorter title used in <title> / OG / Twitter when the H1 title exceeds ~60 chars. Falls back to `title`. */
  metaTitle?: { en: string; th: string };
  /** Optional editorial eyebrow rendered above the H1 (e.g. "Aftercare Guide", "Style Guide"). */
  category?: { en: string; th: string };
  description: { en: string; th: string };
  /** Optional evocative subtitle rendered under the H1, separate from the SEO meta description. Falls back to `description`. */
  dek?: { en: string; th: string };
  /** When true, BlogPost.tsx auto-generates a HowTo JSON-LD schema from the post's H2 sections (procedural posts only). */
  howTo?: boolean;
  publishedAt: string;
  updatedAt: string;
  author: string;
  heroImage: string;
  heroImageAlt: { en: string; th: string };
  readingMinutes: number;
  tags: string[];
  faq: { en: Array<{ q: string; a: string }>; th: Array<{ q: string; a: string }> };
  /** Optional extra JSON-LD schema blocks rendered alongside the auto-generated Article/FAQ/Breadcrumb (e.g. ItemList, LocalBusiness for listicles). */
  extraSchemas?: { en?: Array<Record<string, unknown>>; th?: Array<Record<string, unknown>> };
};

// Shared entity-graph schemas. Referenced by every blog post via stable @id so
// Google + LLMs can connect Article → Person (Ying) → BeautySalon (My Lash House)
// as a coherent local-business entity. Keeping a single source of truth means
// updating Ying's bio or the studio's hours only needs to happen in one place.
export const PERSON_YING_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mylashhouse.com/#ying",
  name: "Ying",
  alternateName: "ครูหญิง",
  jobTitle: "Certified Lash Artist & Founder",
  description:
    "Certified eyelash artist with 7+ years of experience and the founder of My Lash House, a private one-on-one lash studio in San Klang, Chiang Mai. Trained in classic, hybrid, volume, and mega-volume techniques; works exclusively with 100% handmade fans.",
  worksFor: { "@id": "https://mylashhouse.com/#business" },
  knowsLanguage: ["en", "th"],
  url: "https://mylashhouse.com/",
  sameAs: ["https://instagram.com/my_lash_house.cnx"],
};

export const BEAUTY_SALON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": "https://mylashhouse.com/#business",
  name: "My Lash House Chiang Mai",
  url: "https://mylashhouse.com/",
  telephone: "+66854747314",
  priceRange: "฿590–฿1,590",
  address: {
    "@type": "PostalAddress",
    streetAddress: "89/117 Pruksa Ville, San Klang",
    addressLocality: "San Kamphaeng",
    addressRegion: "Chiang Mai",
    postalCode: "50130",
    addressCountry: "TH",
  },
  geo: { "@type": "GeoCoordinates", latitude: 18.7877843, longitude: 99.0435952 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "32",
    bestRating: 5,
  },
  sameAs: ["https://instagram.com/my_lash_house.cnx", "https://line.me/ti/p/~604ymska"],
};

// Single source of truth for all blog posts. Add new entries here.
export const BLOG_POSTS: BlogPostMeta[] = [
  {
    slug: "lash-lifting-chiang-mai",
    slugTh: "lifting-khon-ta-chiang-mai",
    title: {
      en: "Lash Lifting in Chiang Mai: The Complete Guide (2026)",
      th: "ลิฟติ้งขนตา เชียงใหม่ คู่มือฉบับสมบูรณ์ (2026)",
    },
    metaTitle: {
      en: "Lash Lifting in Chiang Mai (2026 Guide) | My Lash House",
      th: "ลิฟติ้งขนตา เชียงใหม่ | ราคา ขั้นตอน รีวิว — My Lash House",
    },
    category: { en: "Lash Lifting", th: "ลิฟติ้งขนตา" },
    dek: {
      en: "Naturally curled lashes for 6 to 8 weeks, no extensions required. Here's the honest breakdown from a certified Chiang Mai artist.",
      th: "ขนตางอนธรรมชาติ 6 ถึง 8 สัปดาห์ ไม่ต้องต่อขนตา นี่คือคำอธิบายซื่อสัตย์จากช่างเชียงใหม่ที่มีใบรับรอง",
    },
    description: {
      en: "Lash lifting in Chiang Mai from a certified artist with 7+ years. What it is, how it differs from extensions, the 7-step process, pricing, aftercare, and the 3-day retouch guarantee.",
      th: "ลิฟติ้งขนตาเชียงใหม่ จากช่างที่มีใบรับรอง 7+ ปี คืออะไร ต่างจากต่อขนตายังไง ขั้นตอน 7 ขั้น ราคา วิธีดูแล และรับประกันรีทัช 3 วัน",
    },
    publishedAt: "2026-06-27",
    updatedAt: "2026-06-27",
    author: "Ying",
    heroImage: "/images/service-wet-look.jpg",
    heroImageAlt: {
      en: "Close-up of naturally curled lashes at My Lash House Chiang Mai, illustrating the lifted-and-open result of a lash lifting treatment",
      th: "ภาพระยะใกล้ของขนตางอนธรรมชาติที่ My Lash House เชียงใหม่ แสดงผลลัพธ์การลิฟติ้งขนตาที่ยกและเปิดตา",
    },
    readingMinutes: 8,
    tags: ["lash lifting", "ลิฟติ้งขนตา", "chiang mai", "natural lashes", "lash treatment"],
    howTo: true,
    faq: {
      en: [
        {
          q: "What is lash lifting?",
          a: "Lash lifting is a semi-permanent treatment that curls your natural lashes upward from the base using a gentle keratin-based lifting solution. It lasts 6 to 8 weeks, adds no synthetic material, and takes about 45 minutes in the chair.",
        },
        {
          q: "How much does lash lifting cost at My Lash House?",
          a: "Lash lift only is ฿990. Lash lift plus tint is ฿1,190. Lash lift plus tint plus lash conditioning add-on is ฿1,390. Payment on the day of the appointment.",
        },
        {
          q: "How long does a lash lift last?",
          a: "6 to 8 weeks. The curl doesn't drop gradually — it fades as your natural lashes shed and new (uncurled) growth comes in. By week 6 to 8, about half your lash line is new growth and it's time to book again.",
        },
        {
          q: "Does lash lifting damage natural lashes?",
          a: "Not when done properly with premium keratin-based lifting solutions by a careful artist. Damage happens when shops use harsh solutions or over-process (leaving the lifting solution on too long). Ask about the specific solution and processing time before booking.",
        },
        {
          q: "What's the difference between lash lifting and lash extensions?",
          a: "Lash lifting curls your natural lashes for 6 to 8 weeks with zero daily maintenance and no synthetic material added. Lash extensions add handmade fans that last 3 to 4 weeks per set and need refills every 2 to 3 weeks. Lifts are lower-commitment; extensions add more visible drama.",
        },
        {
          q: "Can I wear mascara after lash lifting?",
          a: "Yes, after 24 to 48 hours. Use only water-based mascara — waterproof formulas require oil-based remover, which can over-condition and soften the curl.",
        },
        {
          q: "Where can I get lash lifting near me in Chiang Mai?",
          a: "My Lash House is in San Klang, San Kamphaeng, near Payap University — about 10 minutes from the city centre. Open 7 days a week, 10:00 to 19:00. Walk-ins and same-day appointments welcome subject to availability.",
        },
      ],
      th: [
        {
          q: "ลิฟติ้งขนตา คืออะไร",
          a: "ลิฟติ้งขนตาคือการดัดขนตาธรรมชาติให้งอนขึ้นจากโคน ด้วยน้ำยาเคราตินอ่อน ๆ ผลลัพธ์อยู่ได้ 6 ถึง 8 สัปดาห์ ไม่เพิ่มวัสดุสังเคราะห์ ใช้เวลาบนเก้าอี้ประมาณ 45 นาที",
        },
        {
          q: "ลิฟติ้งขนตา ราคาเท่าไหร่ที่ My Lash House",
          a: "ลิฟติ้งอย่างเดียว ฿990 ลิฟติ้ง+ย้อมสี ฿1,190 ลิฟติ้ง+ย้อมสี+คอนดิชันเนอร์บำรุง ฿1,390 ชำระเงินในวันนัด",
        },
        {
          q: "ลิฟติ้งขนตา อยู่ได้นานไหม",
          a: "6 ถึง 8 สัปดาห์ ความโค้งไม่ตกทีละน้อย แต่จางไปตามการหลุดของขนตาจริงและการงอกขึ้นของเส้นใหม่ที่ไม่ได้ผ่านน้ำยา สัปดาห์ที่ 6 ถึง 8 ประมาณครึ่งของขอบขนตาเป็นเส้นใหม่ ถึงเวลาจองอีก",
        },
        {
          q: "ลิฟติ้งขนตา ทำลายขนตาจริงไหม",
          a: "ไม่ ถ้าทำถูกต้องด้วยน้ำยาเคราตินคุณภาพสูงโดยช่างที่ระมัดระวัง ความเสียหายเกิดขึ้นเมื่อร้านใช้น้ำยาแรงหรือปล่อยไว้นานเกิน ถามเรื่องน้ำยาที่ใช้และเวลาในการทำก่อนจอง",
        },
        {
          q: "ลิฟติ้งขนตา ต่างจากต่อขนตายังไง",
          a: "ลิฟติ้งดัดขนตาจริง 6 ถึง 8 สัปดาห์ ไม่ต้องดูแลประจำวัน ไม่เพิ่มวัสดุสังเคราะห์ ต่อขนตาเพิ่มแฟนทำมือที่อยู่ 3 ถึง 4 สัปดาห์ต่อเซตและต้องเติมทุก 2 ถึง 3 สัปดาห์ ลิฟต์ผูกมัดน้อยกว่า ต่อขนตาเพิ่มดราม่าที่เห็นได้มากกว่า",
        },
        {
          q: "ลิฟติ้งขนตาแล้วใส่มาสคาร่าได้ไหม",
          a: "ได้ หลัง 24 ถึง 48 ชั่วโมง ใช้เฉพาะมาสคาร่าสูตรน้ำ สูตรกันน้ำต้องใช้รีมูฟเวอร์น้ำมันในการล้าง ซึ่งอาจบำรุงเกินและทำให้ความโค้งนุ่มลง",
        },
        {
          q: "ทำลิฟติ้งขนตา ใกล้ฉัน ที่ไหนในเชียงใหม่",
          a: "My Lash House อยู่ที่สันกลาง อำเภอสันกำแพง ใกล้มหาวิทยาลัยพายัพ ห่างจากตัวเมืองประมาณ 10 นาที เปิด 7 วันต่อสัปดาห์ 10:00 ถึง 19:00 รับ walk-in และนัดวันเดียวกันตามคิวว่าง",
        },
      ],
    },
  },
  {
    slug: "barbie-lash-extensions-chiang-mai",
    slugTh: "tor-khon-ta-barbie-chiang-mai",
    title: {
      en: "Barbie-Style Lash Extensions in Chiang Mai: The Complete Guide (2026)",
      th: "ต่อขนตาทรงบาร์บี้ เชียงใหม่ คู่มือฉบับสมบูรณ์ (2026)",
    },
    metaTitle: {
      en: "Barbie-Style Lash Extensions in Chiang Mai (2026) | My Lash House",
      th: "ต่อขนตาทรงบาร์บี้ เชียงใหม่ | ทรงปังเทรนด์ 2026 — My Lash House",
    },
    category: { en: "Style Guide", th: "คู่มือเลือกทรง" },
    dek: {
      en: "Densely-set, glossy, cat-eye mapped — the Margot Robbie Barbie-era lash look, mapped to your actual face.",
      th: "อัดแฟนแน่น ฟินิชเงา mapping แบบ cat-eye ลุคขนตายุค Barbie ของ Margot Robbie map เข้ากับหน้าคุณจริง ๆ",
    },
    description: {
      en: "Barbie-style lash extensions in Chiang Mai — what makes a set 'Barbie', which eye shapes suit it, Wet vs Classic Barbie, pricing, and how My Lash House does it differently.",
      th: "ต่อขนตาทรงบาร์บี้ เชียงใหม่ อะไรทำให้เซตเป็น 'บาร์บี้' รูปตาแบบไหนเหมาะ Wet vs Classic Barbie ราคา และ My Lash House ทำต่างจากที่อื่นยังไง",
    },
    publishedAt: "2026-06-27",
    updatedAt: "2026-06-27",
    author: "Ying",
    heroImage: "/images/service-mega.jpg",
    heroImageAlt: {
      en: "Barbie-style lash extensions at My Lash House Chiang Mai — dense Mega Volume fans with cat-eye mapping and wispy spike pieces for the wet-look Barbie aesthetic",
      th: "ต่อขนตาทรงบาร์บี้ที่ My Lash House เชียงใหม่ แฟน Mega Volume อัดแน่น mapping แบบ cat-eye พร้อมเส้น spike แบบ wispy สำหรับเอสเธติกบาร์บี้ wet-look",
    },
    readingMinutes: 7,
    tags: ["barbie lash", "ต่อขนตาทรงบาร์บี้", "mega volume", "cat eye", "chiang mai", "lash extensions"],
    faq: {
      en: [
        {
          q: "What is a Barbie-style lash set?",
          a: "A specific combination of four things: Mega Volume base (10–16 fans per natural lash), wispy spike pieces scattered through for a feathered edge, wet-look glossy density, and cat-eye mapping that lifts the outer corner. Materials: 0.07mm fans, D or DD curl, 11–14mm length range.",
        },
        {
          q: "How much do Barbie-style lash extensions cost?",
          a: "Barbie sits in the Mega Volume price tier at My Lash House. Classic Barbie (Mega Volume) is ฿1,190. Wet Barbie (Mega Volume with Wet Look add-on) is ฿1,290. Color lashes can be added for ฿150 to ฿300.",
        },
        {
          q: "What's the difference between Wet Barbie and Classic Barbie?",
          a: "Wet Barbie has more concentrated fan density at the base and a glossy wet-strand appearance — best for events and photoshoots. Classic Barbie has a slightly drier finish with more visible individual pieces — works for daily wear.",
        },
        {
          q: "Can I wear Barbie lashes to work?",
          a: "Classic Barbie in a shorter length (11–12mm) reads as full but not overtly styled and works in most office contexts. Wet Barbie is more of a special-occasion set. Conservative workplaces might find either version too much — Wispy Volume with soft cat-eye framing is the safer daily choice.",
        },
        {
          q: "How long do Barbie lashes last?",
          a: "A well-applied Barbie set looks full for 1.5 to 2 weeks and needs a refill by 2 to 3 weeks. Mega Volume sheds faster than lighter styles because each natural lash carries more weight, so refill cadence matters more for this style.",
        },
        {
          q: "Which eye shape suits Barbie style?",
          a: "Round and almond eyes carry the classic Barbie best. Hooded eyes work with a modified curl and careful spike placement. Very small eyes and very downturned eyes usually read better with a modified Wispy Volume + soft cat-eye instead of full Barbie.",
        },
      ],
      th: [
        {
          q: "ต่อขนตาทรงบาร์บี้ คืออะไร",
          a: "การรวม 4 อย่างเข้าด้วยกัน ฐาน Mega Volume (แฟน 10–16 เส้นต่อขนตาจริง) เส้น spike แบบ wispy กระจายเป็นขอบที่มีขน ความหนาแบบ wet-look เงา และ mapping แบบ cat-eye ยกหางตา วัสดุ แฟน 0.07 มม. เคิร์ล D หรือ DD ช่วงความยาว 11–14 มม.",
        },
        {
          q: "ต่อขนตาทรงบาร์บี้ ราคาเท่าไหร่",
          a: "บาร์บี้อยู่ในระดับราคา Mega Volume ที่ My Lash House Classic Barbie (Mega Volume) ฿1,190 Wet Barbie (Mega Volume + Wet Look add-on) ฿1,290 เพิ่มขนตาสี ฿150 ถึง ฿300",
        },
        {
          q: "Wet Barbie กับ Classic Barbie ต่างกันยังไง",
          a: "Wet Barbie แฟนเข้มข้นที่โคนกว่าและมีลุคเส้นเปียกเงา เหมาะที่สุดสำหรับงานอีเวนต์และงานถ่ายแบบ Classic Barbie ฟินิชแห้งกว่าเล็กน้อย เห็นเส้นเดี่ยวมากกว่า ใช้ได้กับการใส่ประจำวัน",
        },
        {
          q: "ทรงบาร์บี้ ใส่ทำงานได้ไหม",
          a: "Classic Barbie ในความยาวสั้นกว่า (11–12 มม.) อ่านเป็นเต็มแต่ไม่ผ่านการสไตล์ชัด และใช้ได้กับบริบทออฟฟิศส่วนใหญ่ Wet Barbie เป็นเซตโอกาสพิเศษมากกว่า ที่ทำงานอนุรักษ์นิยมอาจพบว่าทั้งสองเวอร์ชันเยอะเกิน Wispy Volume + cat-eye นุ่ม ๆ เป็นทางเลือกประจำวันที่ปลอดภัยกว่า",
        },
        {
          q: "ขนตาทรงบาร์บี้ อยู่ได้นานเท่าไหร่",
          a: "เซตบาร์บี้ที่ต่อดีดูเต็ม 1.5 ถึง 2 สัปดาห์ และต้องเติมภายใน 2 ถึง 3 สัปดาห์ Mega Volume หลุดเร็วกว่าสไตล์เบา เพราะขนตาจริงแต่ละเส้นแบกน้ำหนักมากกว่า รอบการเติมสำคัญกว่าสำหรับสไตล์นี้",
        },
        {
          q: "รูปตาไหนเหมาะกับทรงบาร์บี้",
          a: "ตากลมและตาอัลมอนด์เข้ากับ Classic Barbie ที่สุด หนังตาปิดใช้ได้ด้วยการปรับเคิร์ลและวางเส้น spike อย่างระมัดระวัง ตาเล็กและตาตกมากมักอ่านดีกว่ากับ Wispy Volume + cat-eye นุ่ม ๆ แทนบาร์บี้เต็ม",
        },
      ],
    },
  },
  {
    slug: "lash-extension-downsides-honest-guide",
    slugTh: "tor-khon-ta-khor-sia",
    title: {
      en: "The Real Downsides of Lash Extensions: An Honest Guide from a Chiang Mai Lash Artist",
      th: "ข้อเสียของต่อขนตา ที่ช่างมืออาชีพไม่ปกปิด และวิธีที่เรารับมือ",
    },
    metaTitle: {
      en: "The Real Downsides of Lash Extensions (Honest Guide) | My Lash House",
      th: "ต่อขนตา ข้อเสีย และวิธีแก้ | คู่มือจริงจากช่างเชียงใหม่",
    },
    category: { en: "Honest Guide", th: "คู่มือซื่อสัตย์" },
    dek: {
      en: "Five real trade-offs, three common myths, and how a careful artist mitigates every one of them.",
      th: "5 การแลกจริง 3 ความเข้าใจผิดที่พบบ่อย และวิธีที่ช่างระมัดระวังรับมือทุกข้อ",
    },
    description: {
      en: "The real downsides of lash extensions (and the three common myths that aren't actually downsides), from a certified Chiang Mai artist with 7+ years. Honest, not oversold.",
      th: "ข้อเสียจริงของต่อขนตา (และ 3 ความเข้าใจผิดที่ไม่ใช่ข้อเสียจริง) จากช่างเชียงใหม่ที่มีใบรับรอง 7+ ปี ซื่อสัตย์ ไม่ขายเกินจริง",
    },
    publishedAt: "2026-06-27",
    updatedAt: "2026-06-27",
    author: "Ying",
    heroImage: "/images/service-classic.jpg",
    heroImageAlt: {
      en: "Close-up of a well-mapped Classic lash set at My Lash House Chiang Mai, illustrating properly applied extensions that don't damage natural lashes",
      th: "ภาพระยะใกล้ของเซตขนตาคลาสสิกที่ mapping ดีที่ My Lash House เชียงใหม่ แสดงการต่อขนตาถูกต้องที่ไม่ทำลายขนตาจริง",
    },
    readingMinutes: 9,
    tags: ["lash extensions", "downsides", "ต่อขนตา ข้อเสีย", "chiang mai", "honest guide", "safety"],
    faq: {
      en: [
        {
          q: "Do lash extensions damage natural lashes?",
          a: "Properly applied extensions don't damage natural lashes. Damage comes from three specific things: oversized fans on weak natural lashes, poor isolation that lets two natural lashes glue together, or rough at-home removal. All three are preventable with a careful, certified artist.",
        },
        {
          q: "Can I be allergic to lash extension glue?",
          a: "About 2% of clients have some level of reaction to the cyanoacrylate adhesive. Patch testing 48 hours before your first appointment catches most sensitivities. Alternative low-fume glues are available for mild sensitivities. For severe reactions, a lash lift (no cyanoacrylate exposure) is usually the better option.",
        },
        {
          q: "Can I wash my face normally with lash extensions?",
          a: "After the first 24 hours (the adhesive cure window), yes. Use water-based cleansers only — no oil cleansers, cleansing balms, or micellar water, which dissolve the adhesive bond. Pat dry with a lint-free cloth; never rub.",
        },
        {
          q: "How much do lash extensions cost per month?",
          a: "At refill cadence (every 2 to 3 weeks) plus a full set every 6 to 12 months, expect roughly ฿15,000 to ฿30,000 per year at Chiang Mai pricing. Style choice affects the number significantly — lighter styles like Classic 1:1 need less frequent refills than Mega Volume.",
        },
        {
          q: "Why did my lash extensions fall out so fast?",
          a: "Three most common causes: oil-based products near the eyes (biggest single factor), sleeping face-down or on the side that shed faster, and cheap glue that broke down in Chiang Mai humidity. Application issues show up in the first 3 days; aftercare issues show across the whole set lifespan.",
        },
        {
          q: "How do I choose a good lash extension salon?",
          a: "Ask three questions: are the fans handmade or premade, is isolation done one natural lash at a time, and what's the retouch or damage policy. If a salon can't or won't answer clearly, that itself is information.",
        },
      ],
      th: [
        {
          q: "ต่อขนตา ทำลายขนตาจริงไหม",
          a: "ขนตาที่ต่อถูกต้องไม่ทำลายขนตาจริง ความเสียหายมาจาก 3 อย่างเฉพาะ คือ แฟนใหญ่เกินไปบนขนตาจริงที่บอบบาง การแยกขนไม่ดีจนติดสองเส้นเข้าด้วยกัน หรือการถอดเองที่บ้านแบบรุนแรง ทั้งสามป้องกันได้ด้วยการเลือกช่างที่ระมัดระวังและมีใบรับรอง",
        },
        {
          q: "ต่อขนตา แพ้กาวได้ไหม",
          a: "ประมาณ 2% ของลูกค้ามีปฏิกิริยาต่อกาว cyanoacrylate ในระดับใดระดับหนึ่ง Patch test 48 ชั่วโมงก่อนนัดแรกจับได้ส่วนใหญ่ของความไว มีกาวสูตรกลิ่นเบาสำรองสำหรับความไวเล็กน้อย สำหรับปฏิกิริยารุนแรง ลิฟติ้งขนตา (ไม่มีการสัมผัส cyanoacrylate) มักเป็นตัวเลือกที่ดีกว่า",
        },
        {
          q: "ต่อขนตา ล้างหน้าได้ปกติไหม",
          a: "หลัง 24 ชั่วโมงแรก (ช่วง cure ของกาว) ได้ ใช้เฉพาะคลีนเซอร์สูตรน้ำ ไม่ใช่ออยล์คลีนเซอร์ คลีนซิ่งบาล์ม หรือน้ำ micellar ที่ละลายบอนด์กาว ซับด้วยผ้าไม่มีขุย ไม่ถู",
        },
        {
          q: "ต่อขนตา ค่าใช้จ่ายต่อเดือนเท่าไหร่",
          a: "รอบการเติม (ทุก 2 ถึง 3 สัปดาห์) บวกเซตเต็มทุก 6 ถึง 12 เดือน ประมาณ ฿15,000 ถึง ฿30,000 ต่อปีในราคาเชียงใหม่ การเลือกทรงมีผลต่อตัวเลขมาก ทรงเบาอย่าง Classic 1:1 ต้องการเติมน้อยกว่า Mega Volume",
        },
        {
          q: "ต่อขนตา หลุดเร็ว ทำไม",
          a: "3 สาเหตุที่พบบ่อยที่สุด ผลิตภัณฑ์น้ำมันรอบตา (ปัจจัยเดี่ยวใหญ่ที่สุด) นอนคว่ำหรือนอนทับด้านที่หลุดเร็ว และกาวถูกที่พังในความชื้นเชียงใหม่ ปัญหาการต่อแสดงใน 3 วันแรก ปัญหาการดูแลแสดงตลอดอายุเซต",
        },
        {
          q: "เลือกร้านต่อขนตาที่ดียังไง",
          a: "ถาม 3 คำถาม แฟนทำมือหรือสำเร็จรูป การแยกขนทำทีละเส้นไหม และนโยบายรีทัชหรือความเสียหายเป็นอย่างไร ถ้าร้านตอบไม่ได้หรือไม่ยอมตอบชัดเจน นั่นเองก็คือข้อมูล",
        },
      ],
    },
  },
  {
    slug: "lash-extension-aftercare-chiang-mai",
    slugTh: "withi-doolae-khonta-lang-tor",
    title: {
      en: "How to Care for Lash Extensions: The Day-by-Day Aftercare Guide (Chiang Mai 2026)",
      th: "วิธีดูแลขนตาหลังต่อ ให้อยู่ได้นาน 4–5 สัปดาห์ — คู่มือวันต่อวัน จากช่างมืออาชีพเชียงใหม่",
    },
    metaTitle: {
      en: "Lash Extension Aftercare: Day-by-Day Guide (Chiang Mai)",
      th: "วิธีดูแลขนตาหลังต่อ ให้อยู่ได้นาน | My Lash House เชียงใหม่",
    },
    category: { en: "Aftercare Guide", th: "คู่มือดูแลหลังต่อ" },
    description: {
      en: "Day-by-day lash extension aftercare from a certified Chiang Mai artist with 7+ years. First 24 hours, weekly habits, what to avoid, sleep position, and what the 3-day retouch guarantee actually covers.",
      th: "คู่มือดูแลขนตาต่อแบบวันต่อวันจากช่างเชียงใหม่ 7+ ปี — 24 ชั่วโมงแรก กฎประจำวัน สิ่งที่ต้องเลี่ยง ท่านอน และรับประกันรีทัช 3 วันครอบคลุมอะไร",
    },
    dek: {
      en: "Master the three rules that decide whether your set lasts 4 days or 4 weeks.",
      th: "ทำตาม 3 กฎที่จะตัดสินว่าเซตของคุณจะอยู่ 4 วัน หรือ 4 สัปดาห์",
    },
    howTo: true,
    publishedAt: "2026-06-26",
    updatedAt: "2026-06-26",
    author: "Ying",
    heroImage: "/images/service-light-volume.jpg",
    heroImageAlt: {
      en: "Close-up of a well-maintained Light Volume lash set by My Lash House Chiang Mai, illustrating the day-by-day aftercare routine that gets a full 3 to 4 weeks of retention",
      th: "ภาพระยะใกล้ของเซต Light Volume ที่ดูแลถูกวิธี โดย My Lash House เชียงใหม่ แสดงการดูแลแบบวันต่อวันที่ทำให้เซตอยู่ครบ 3 ถึง 4 สัปดาห์",
    },
    readingMinutes: 7,
    tags: ["lash extensions", "aftercare", "retention", "lash care", "chiang mai", "วิธีดูแลขนตาหลังต่อ"],
    faq: {
      en: [
        {
          q: "How many days do I have to keep my lash extensions dry after the appointment?",
          a: "24 hours minimum — that's how long the cyanoacrylate adhesive takes to fully cure. For full bond strength, the safer rule is 48 hours. No showers with water on the face, no swimming, no steam, no heavy exercise during the cure window.",
        },
        {
          q: "Which cleansers are safe to use with lash extensions?",
          a: "Water-based foaming cleansers and gel cleansers labeled 'oil-free'. The dedicated lash shampoo sent home from the appointment is the safest option for daily lash-line cleaning. Avoid oil cleansers, cleansing balms, micellar water, and makeup remover wipes — all of them shorten retention.",
        },
        {
          q: "Why are my lash extensions falling out fast?",
          a: "Three common causes, in order: oil-based products near the eye area (the biggest single factor), sleeping face-down or on the side that's shedding faster, and rubbing the eyes when sleepy or itchy. Application issues show up in the first three days; aftercare issues show up across the full set lifespan.",
        },
        {
          q: "Can I use an eyelash curler with lash extensions?",
          a: "No. Eyelash curlers bend the extensions out of shape and crack the adhesive bond at the base. The extensions themselves are pre-curled to the curl level chosen at your appointment (J, B, C, D, or L) — that curl holds for the life of the set without any additional shaping.",
        },
        {
          q: "Can I sleep on my side with lash extensions?",
          a: "Yes, but the side you sleep on will shed faster than the opposite side, and the asymmetry becomes visible by week 3. Back sleeping retains best. If side sleeping is unavoidable, a silk pillowcase reduces friction and extends retention by an estimated 20–30%.",
        },
        {
          q: "How often should I get my lash extensions refilled?",
          a: "Every 2–3 weeks for fuller styles, 3–4 weeks for lighter styles (Classic 1:1, Light Volume). The sweet spot is when about 40–60% of the original set remains — enough for the artist to map cleanly into the existing shape. If it's been 4+ weeks, a fresh full set is usually the better call.",
        },
        {
          q: "Can I wear mascara with lash extensions?",
          a: "Mascara isn't necessary — the extensions already provide the mascara effect. If you absolutely need mascara for a specific event, use only water-based, lash-extension-safe formulas and apply to the tips, never the roots. Waterproof mascara is off-limits entirely because it requires oil-based remover.",
        },
      ],
      th: [
        {
          q: "ต่อขนตามาห้ามโดนน้ำกี่วัน?",
          a: "24 ชั่วโมงขั้นต่ำ — เป็นเวลาที่กาว cyanoacrylate ใช้ในการ cure เต็มที่ สำหรับบอนด์เต็มกำลัง กฎที่ปลอดภัยกว่าคือ 48 ชั่วโมง ห้ามอาบน้ำให้น้ำโดนหน้า ห้ามว่ายน้ำ ห้ามไอน้ำ ห้ามออกกำลังกายหนักในช่วง cure",
        },
        {
          q: "ใช้คลีนเซอร์ตัวไหนได้บ้าง?",
          a: "คลีนเซอร์โฟมสูตรน้ำและเจลคลีนเซอร์ที่ระบุ 'oil-free' แชมพูล้างขนตาที่ทางร้านให้ติดมือไปคือตัวเลือกที่ปลอดภัยที่สุดสำหรับทำความสะอาดขอบขนตาประจำวัน หลีกเลี่ยงออยล์คลีนเซอร์ คลีนซิ่งบาล์ม น้ำ micellar และทิชชูเช็ดเครื่องสำอาง — ทุกตัวลดอายุการคงทน",
        },
        {
          q: "ทำไมขนตาที่ต่อหลุดเร็ว?",
          a: "3 สาเหตุที่พบบ่อยที่สุด เรียงตามลำดับ: ผลิตภัณฑ์น้ำมันรอบดวงตา (ปัจจัยเดี่ยวใหญ่ที่สุด) นอนคว่ำหรือนอนทับด้านที่หลุดเร็วกว่า และขยี้ตาเวลาง่วงหรือคัน ปัญหาการต่อแสดงในช่วง 3 วันแรก ปัญหาการดูแลแสดงตลอดอายุเซต",
        },
        {
          q: "ใช้ที่ดัดขนตาได้ไหม?",
          a: "ไม่ได้ ที่ดัดขนตาดัดเอ็กซ์เทนชันให้เสียทรงและทำให้บอนด์กาวที่โคนแตก เอ็กซ์เทนชันเองมีเคิร์ลตามระดับที่เลือกในวันนัด (J, B, C, D หรือ L) — เคิร์ลนั้นคงอยู่ตลอดอายุเซตโดยไม่ต้องการการดัดเพิ่ม",
        },
        {
          q: "นอนตะแคงได้ไหม?",
          a: "ได้ แต่ด้านที่นอนทับจะหลุดเร็วกว่าอีกด้าน และความไม่สมมาตรเห็นได้พอเข้าสัปดาห์ที่ 3 นอนหงายคงทนดีที่สุด ถ้าหลีกเลี่ยงการนอนตะแคงไม่ได้ ปลอกหมอนผ้าไหมลดแรงเสียดทานและยืดการคงทนประมาณ 20–30%",
        },
        {
          q: "ต้องเติมขนตาบ่อยแค่ไหน?",
          a: "ทุก 2–3 สัปดาห์สำหรับทรงหนา 3–4 สัปดาห์สำหรับทรงเบา (Classic 1:1, Light Volume) ช่วงที่เหมาะที่สุดคือเมื่อเซตเดิมเหลือประมาณ 40–60% — พอให้ช่างแมพทับลงในรูปเดิม ถ้าทิ้งนาน 4+ สัปดาห์ ต่อเซตใหม่มักเป็นทางเลือกที่ดีกว่า",
        },
        {
          q: "ใส่มาสคาร่าได้ไหม?",
          a: "มาสคาร่าไม่จำเป็น — เอ็กซ์เทนชันให้เอฟเฟกต์มาสคาร่าอยู่แล้ว ถ้าจำเป็นต้องใช้มาสคาร่าในงานเฉพาะ ใช้เฉพาะสูตรน้ำที่ใช้กับขนตาต่อได้ ทาเฉพาะปลาย ห้ามแตะโคน มาสคาร่ากันน้ำห้ามใช้เด็ดขาดเพราะต้องใช้รีมูฟเวอร์สูตรน้ำมัน",
        },
      ],
    },
  },
  {
    slug: "natural-lash-extensions-chiang-mai",
    slugTh: "tor-khon-ta-baeb-thammachat",
    title: {
      en: "Natural Lash Extensions in Chiang Mai — A Guide for Office Wear, Brides, and Anyone Who Wants \"Better Natural\"",
      th: "ต่อขนตาแบบธรรมชาติ — สวยเหมือนไม่ได้ต่อ คู่มือสำหรับคนทำงานและงานแต่ง",
    },
    metaTitle: {
      en: "Natural Lash Extensions in Chiang Mai (2026 Guide)",
      th: "ต่อขนตาแบบธรรมชาติ ที่เหมาะกับคนทำงาน | My Lash House เชียงใหม่",
    },
    category: { en: "Style Guide", th: "คู่มือเลือกทรง" },
    dek: {
      en: "Sometimes you want lashes that read as 'just better natural.' Here's how Ying maps the four lightest styles on the menu.",
      th: "บางครั้งคุณอยากได้ขนตาที่ดูเหมือน 'ธรรมชาติแบบดีขึ้น' นี่คือวิธีที่ครูหญิงจัดทรงเบาที่สุด 4 ทรงในเมนู",
    },
    description: {
      en: "Natural lash extensions in Chiang Mai — what 'natural' means, the four lighter styles (Classic 1:1, Natural Look, Light Volume, Hybrid), pricing, and who picks them. From a certified artist with 7+ years.",
      th: "อยากต่อขนตาแบบธรรมชาติ ดูเหมือนไม่ได้ต่อ? เลือกทรงและความหนาที่เหมาะกับชีวิตประจำวัน คู่มือจากช่างเชียงใหม่ 7+ ปี รับประกันรีทัช 3 วัน",
    },
    publishedAt: "2026-06-26",
    updatedAt: "2026-06-26",
    author: "Ying",
    heroImage: "/images/service-natural.jpg",
    heroImageAlt: {
      en: "Close-up of a natural-style lash extension set by My Lash House Chiang Mai — light, daily-wear lashes designed to look like better natural lashes",
      th: "ภาพระยะใกล้ของขนตาต่อทรงธรรมชาติ โดย My Lash House เชียงใหม่ — เซตเบาใส่ทุกวัน ออกแบบให้ดูเหมือนขนตาธรรมชาติที่ดีขึ้น",
    },
    readingMinutes: 8,
    tags: ["lash extensions", "natural lashes", "classic 1:1", "office", "brides", "chiang mai", "ต่อขนตาแบบธรรมชาติ"],
    faq: {
      en: [
        {
          q: "Do natural lash extensions actually look like 'just my own lashes'?",
          a: "Yes, when the curl, length, and density are calibrated to your own lashes. Classic 1:1 is the most natural style on the menu and looks indistinguishable from good genetic lashes. Natural Look and Light Volume are slightly fuller but still read as 'better natural' rather than styled.",
        },
        {
          q: "How long do natural lash extensions last?",
          a: "3–4 weeks before you'll want a refill, the same as other extension styles. Retention depends on aftercare more than style choice — water exposure in the first 24 hours and oil-based products near the eyes are the two biggest shorteners.",
        },
        {
          q: "How much do natural lash extensions cost at My Lash House?",
          a: "Classic 1:1 is ฿590, Natural Look is ฿790, Hybrid is ฿990, and Light Volume is ฿1,090. The full menu and add-ons (color lashes, lash lift, tint) are on the pricing page.",
        },
        {
          q: "Which natural style looks the most natural?",
          a: "Classic 1:1 is the most natural — one extension per natural lash, no density change, just length and definition. Natural Look is slightly fuller for clients who want a bit more presence in photos. Light Volume is the lightest of the volume family and adds fluffy softness without going dramatic.",
        },
        {
          q: "Can I wear natural lash extensions to work?",
          a: "Yes — natural-family styles are specifically designed for daily and professional wear. Classic 1:1 and Natural Look are the most-booked styles by office workers, teachers, healthcare professionals, and women in client-facing roles.",
        },
        {
          q: "Do I need a lash lift or tint before getting natural extensions?",
          a: "No, but for clients with very straight natural lashes, a lash lift before extensions can give the set a cleaner base. Ying checks lash angle and condition at consultation and recommends a lift only if it would meaningfully improve the result.",
        },
      ],
      th: [
        {
          q: "ต่อขนตาแบบธรรมชาติ ดูเหมือนไม่ได้ต่อจริงไหม?",
          a: "ใช่ เมื่อเคิร์ล ความยาว และความหนาปรับให้พอดีกับขนตาตัวเอง Classic 1:1 เป็นทรงที่ธรรมชาติที่สุดในเมนูและดูแยกไม่ออกจากขนตาพันธุกรรมดี Natural Look และ Light Volume ฟูขึ้นนิดหน่อยแต่ยังดู 'ธรรมชาติแบบดีขึ้น' ไม่ใช่ผ่านการสไตล์",
        },
        {
          q: "ต่อขนตาแบบธรรมชาติ อยู่ได้นานไหม?",
          a: "3–4 สัปดาห์ก่อนต้องเติม เหมือนทรงต่อขนตาแบบอื่น การคงทนขึ้นกับการดูแลมากกว่าการเลือกทรง — การโดนน้ำใน 24 ชั่วโมงแรกและผลิตภัณฑ์น้ำมันรอบดวงตาเป็น 2 ตัวที่ตัดอายุเซตมากที่สุด",
        },
        {
          q: "ต่อขนตาแบบธรรมชาติ ราคาเท่าไหร่ที่ My Lash House?",
          a: "Classic 1:1 ฿590, Natural Look ฿790, Hybrid ฿990 และ Light Volume ฿1,090 เมนูเต็มและ add-on (ขนตาสี ดัด ย้อมขนตา) อยู่ที่หน้าราคา",
        },
        {
          q: "ทรงไหนคือธรรมชาติที่สุด?",
          a: "Classic 1:1 ธรรมชาติที่สุด — ติดเอ็กซ์เทนชัน 1 เส้นต่อขนตาจริง 1 เส้น ไม่เพิ่มความหนา แค่เพิ่มความยาวและความชัด Natural Look ฟูขึ้นเล็กน้อยสำหรับลูกค้าที่อยากได้ความเด่นในรูปมากขึ้น Light Volume เบาที่สุดในกลุ่ม volume เพิ่มความนุ่มฟูโดยไม่ดราม่า",
        },
        {
          q: "ต่อขนตาแบบธรรมชาติ ใส่ทำงานได้ไหม?",
          a: "ได้ — ทรงในกลุ่มธรรมชาติออกแบบมาเฉพาะสำหรับการใส่ทุกวันและในบริบทมืออาชีพ Classic 1:1 และ Natural Look เป็นทรงที่จองเยอะที่สุดโดยคนทำงานออฟฟิศ คุณครู บุคลากรทางการแพทย์ และผู้หญิงที่ทำงานเจอลูกค้า",
        },
        {
          q: "ต้องดัดและย้อมขนตาก่อนต่อแบบธรรมชาติไหม?",
          a: "ไม่ต้อง แต่สำหรับลูกค้าที่ขนตาธรรมชาติตรงมาก ลิฟติ้งขนตาก่อนต่อช่วยให้เซตมีฐานที่สะอาดขึ้น ครูหญิงเช็กมุมและสภาพขนตาในวันคุยและแนะนำลิฟติ้งเฉพาะถ้าจะช่วยให้ผลลัพธ์ดีขึ้นจริง",
        },
      ],
    },
  },
  {
    slug: "best-lash-extensions-chiang-mai",
    slugTh: "tor-khon-ta-chiang-mai-tee-nai-dee",
    title: {
      en: "Best Lash Extensions in Chiang Mai (2026): 4 Top-Rated Salons Ranked",
      th: "ต่อขนตา เชียงใหม่ ที่ไหนดี ปี 2026: 4 ร้านยอดนิยม จัดอันดับ",
    },
    metaTitle: {
      en: "Best Lash Extensions in Chiang Mai (2026): 4 Top-Rated Salons Ranked | My Lash House",
      th: "ต่อขนตา เชียงใหม่ ที่ไหนดี ปี 2026: 4 ร้านยอดนิยม จัดอันดับ | My Lash House",
    },
    category: { en: "Ranked Guide", th: "คู่มือจัดอันดับร้าน" },
    dek: {
      en: "Four salons everyone talks about, ranked the honest way. Reviews, warranty, technique, accessibility — what actually matters when you're booking.",
      th: "4 ร้านที่ทุกคนพูดถึง จัดอันดับแบบซื่อสัตย์ รีวิว รับประกัน เทคนิค และความเข้าถึง — สิ่งที่สำคัญจริง ๆ ตอนจอง",
    },
    description: {
      en: "Top lash salons Chiang Mai 2026: 1. My Lash House (San Klang, ฿590–฿1,590, 5.0★, 3-day retouch). 2. Somsasi Studio (Nimman, 7-day warranty). 3. Eye to Eye Nimman. 4. Lash Berries. Ranked by reviews, social proof, and warranty.",
      th: "ต่อขนตา เชียงใหม่ ที่ไหนดี 2026: 1. My Lash House (สันกลาง, ฿590–฿1,590, 5.0★, รีทัช 3 วัน) 2. Somsasi Studio (นิมมาน, รับประกัน 7 วัน) 3. Eye to Eye Nimman 4. Lash Berries จัดอันดับโดยรีวิว โซเชียล และการรับประกัน",
    },
    publishedAt: "2026-05-14",
    updatedAt: "2026-05-14",
    author: "Ying",
    heroImage: "/images/service-wispy.jpg",
    heroImageAlt: {
      en: "Wispy Volume lash extensions by My Lash House Chiang Mai, featured in the 2026 ranked guide to the best lash salons in Chiang Mai",
      th: "วิสปี้วอลุ่มโดย My Lash House เชียงใหม่ ในคู่มือจัดอันดับร้านต่อขนตาเชียงใหม่ ปี 2026",
    },
    readingMinutes: 12,
    tags: ["lash extensions", "best lash extensions chiang mai", "lash salons", "comparison", "chiang mai", "ต่อขนตา เชียงใหม่"],
    faq: {
      en: [
        {
          q: "What's the best lash salon in Chiang Mai?",
          a: "For a private one-on-one studio with handmade fans, certified artist, fully bilingual booking, walk-ins welcome, and a published 3-day retouch guarantee, My Lash House is the top pick in this guide. For the largest Google Maps review history in Nimman with a 7-day extension warranty, Somsasi. For English-fluent technicians in Nimman, Eye to Eye Nimman. For an Instagram-driven studio in the Old City, Lash Berries.",
        },
        {
          q: "Where can I get lash extensions in Chiang Mai with English-speaking booking?",
          a: "My Lash House and Eye to Eye Nimman both handle bookings comfortably in English. My Lash House is fully bilingual across all booking channels. Somsasi and Lash Berries handle English via DM but lead with Thai content.",
        },
        {
          q: "What's the difference between handmade and premade lash fans?",
          a: "Handmade fans are built by the lash artist during the appointment, sized to each individual natural lash. Premade fans come pre-clustered from suppliers and are heavier, less customizable, and shed faster on weak or thin natural lashes. The trade-off is price: premade fans are cheaper to apply, but retention and natural-lash health both suffer.",
        },
        {
          q: "Will lash extensions damage my natural lashes?",
          a: "Properly applied extensions don't damage natural lashes. Damage usually comes from oversized fans on weak lashes, poor isolation that lets two natural lashes glue together, or rough at-home removal. The 0.05mm handmade fans used at My Lash House are isolated one natural lash at a time and shed naturally with the lash they're attached to.",
        },
        {
          q: "Can I wear mascara with lash extensions?",
          a: "Generally no. Mascara shortens retention significantly and is hard to remove without damaging the bond. The extensions themselves provide the mascara effect, so mascara is unnecessary.",
        },
        {
          q: "Is My Lash House English-friendly?",
          a: "Yes. Booking and consultation are fully bilingual (English + Thai), with the same care in either language. The studio is in San Klang, near Payap University, about 10 minutes from the centre of Chiang Mai.",
        },
        {
          q: "Is this list ranked by quality or popularity?",
          a: "It's ranked by the editorial team's read of which studios are most-talked-about and doing the strongest specialist lash work in Chiang Mai today, weighted across Google Maps reviews, Instagram presence, craft signals (handmade vs premade fans, isolation technique, retouch policy), and accessibility (English support, booking ease, walk-in availability, location).",
        },
        {
          q: "Are there any salons missing from this list that should be added?",
          a: "Possibly. The Chiang Mai lash market is fragmented across Facebook pages, Instagram-only studios, and home-based artists who don't advertise broadly.",
        },
      ],
      th: [
        {
          q: "ร้านต่อขนตาที่ดีที่สุดในเชียงใหม่คือร้านไหน?",
          a: "สำหรับสตูดิโอส่วนตัว 1 ต่อ 1 พร้อมแฟนทำมือ ช่างมีใบรับรอง จองสองภาษาเต็มรูปแบบ รับ walk-in และรับประกันรีทัช 3 วันที่เผยแพร่ไว้ My Lash House คือคำแนะนำอันดับแรกของคู่มือ สำหรับประวัติรีวิว Google ยาวนานที่สุดในนิมมานพร้อมรับประกันรีทัช 7 วัน Somsasi สำหรับช่างพูดภาษาอังกฤษคล่องในนิมมาน Eye to Eye Nimman สำหรับสตูดิโอที่ขับเคลื่อนด้วย Instagram ในเมืองเก่า Lash Berries",
        },
        {
          q: "ต่อขนตาในเชียงใหม่ที่จองภาษาอังกฤษได้ ที่ไหนดี?",
          a: "My Lash House และ Eye to Eye Nimman ทั้งคู่จัดการการจองภาษาอังกฤษได้สบาย My Lash House รองรับสองภาษาเต็มรูปแบบในทุกช่องทางจอง Somsasi และ Lash Berries จัดการภาษาอังกฤษได้ผ่าน DM แต่เน้นคอนเทนต์ภาษาไทย",
        },
        {
          q: "แฟนทำมือกับแฟนสำเร็จรูป ต่างกันยังไง?",
          a: "แฟนทำมือปั้นโดยช่างต่อขนตาในระหว่างนัด ขนาดพอดีกับขนตาจริงแต่ละเส้น แฟนสำเร็จรูปมาจากซัพพลายเออร์เป็นกลุ่มสำเร็จ หนักกว่า ปรับแต่งน้อยกว่า และหลุดเร็วกว่าบนขนตาบอบบาง การแลกคือราคา แฟนสำเร็จรูปต่อถูกกว่า แต่การคงทนและสุขภาพขนตาจริงเสียทั้งสองอย่าง",
        },
        {
          q: "ต่อขนตาจะทำลายขนตาธรรมชาติไหม?",
          a: "ขนตาที่ต่อถูกต้องไม่ทำลายขนตาธรรมชาติ ความเสียหายเกิดจากแฟนใหญ่เกินไปบนขนตาบอบบาง การแยกขนไม่ดีจนติดสองเส้นเข้าด้วยกัน หรือการดึงออกเองที่บ้าน แฟน 0.05 มม. ที่ใช้ที่ My Lash House ติดทีละเส้น และหลุดไปพร้อมขนตาที่ติดตามวงจรธรรมชาติ",
        },
        {
          q: "ใช้มาสคาร่ากับขนตาต่อได้ไหม?",
          a: "โดยทั่วไปไม่ มาสคาร่าลดการคงทนอย่างมากและถอดออกได้ยากโดยไม่ทำลายบอนด์ เอ็กซ์เทนชันเองให้เอฟเฟกต์มาสคาร่าอยู่แล้ว",
        },
        {
          q: "My Lash House คุยภาษาอังกฤษได้ไหม?",
          a: "ได้ การจองและการคุยรองรับสองภาษาเต็มรูปแบบ (อังกฤษ + ไทย) สตูดิโอดูแลเหมือนกันในทั้งสองภาษา อยู่ที่สันกลาง ใกล้มหาวิทยาลัยพายัพ ห่างจากใจกลางเมืองเชียงใหม่ประมาณ 10 นาที",
        },
        {
          q: "ลำดับนี้เรียงตามคุณภาพหรือความนิยม?",
          a: "เรียงตามการอ่านของทีมเรียบเรียงว่าใครถูกพูดถึงมากที่สุดและทำงานเฉพาะทางขนตาแข็งแรงที่สุดในเชียงใหม่วันนี้ โดยพิจารณาจากรีวิว Google Maps การปรากฏตัวบน Instagram สัญญาณงานฝีมือ (แฟนทำมือ vs สำเร็จรูป การแยกขน นโยบายรีทัช) และความเข้าถึง (รองรับภาษาอังกฤษ ความง่ายในการจอง รับ walk-in ทำเล)",
        },
        {
          q: "มีร้านที่ควรเพิ่มในลิสต์นี้ที่หายไปไหม?",
          a: "อาจมี ตลาดต่อขนตาเชียงใหม่กระจายตัวบนเพจเฟซบุ๊ก สตูดิโอที่มีแต่ไอจี และช่างที่ทำงานที่บ้านที่ไม่โฆษณาในวงกว้าง",
        },
      ],
    },
    extraSchemas: {
      en: [
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Best Lash Extensions in Chiang Mai (2026): 4 Top-Rated Salons",
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: 4,
          itemListElement: [
            // Only My Lash House gets a URL; competitors are named but unlinked
            // (no outbound competitor links anywhere — brand-voice guardrail).
            { "@type": "ListItem", position: 1, name: "My Lash House", url: "https://mylashhouse.com/" },
            { "@type": "ListItem", position: 2, name: "Somsasi Lashes & Beauty Salon" },
            { "@type": "ListItem", position: 3, name: "Eye to Eye Nimman" },
            { "@type": "ListItem", position: 4, name: "Lash Berries" },
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          name: "My Lash House",
          image: "https://mylashhouse.com/images/service-mega.jpg",
          url: "https://mylashhouse.com/",
          telephone: "+66854747314",
          priceRange: "฿590–฿1,590",
          address: {
            "@type": "PostalAddress",
            streetAddress: "89/117 Pruksa Ville, San Klang",
            addressLocality: "San Kamphaeng",
            addressRegion: "Chiang Mai",
            postalCode: "50130",
            addressCountry: "TH",
          },
          // Pulled directly from the Google Business Profile URL (Plus code Q2QW+4F San Klang).
          geo: { "@type": "GeoCoordinates", latitude: 18.7877843, longitude: 99.0435952 },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              opens: "10:00",
              closes: "19:00",
            },
          ],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: "32",
            bestRating: 5,
          },
          sameAs: [
            "https://instagram.com/my_lash_house.cnx",
            "https://line.me/ti/p/~604ymska",
          ],
        },
      ],
    },
  },
  {
    slug: "how-long-do-lash-extensions-last-chiang-mai",
    // Thai-script slugs trigger 404 in Next.js standalone server; using transliteration.
    slugTh: "tor-khon-ta-yoo-dai-nan-mai",
    title: {
      en: "How Long Do Lash Extensions Last? (Chiang Mai 2026 Guide + 3-Day Retouch Guarantee Explained)",
      th: "ต่อขนตาอยู่ได้นานไหม? คู่มือเชียงใหม่ 2026 + อธิบายการรับประกันรีทัช 3 วัน",
    },
    metaTitle: {
      en: "How Long Do Lash Extensions Last? (Chiang Mai 2026 Guide)",
      th: "ต่อขนตาอยู่ได้นานไหม? คู่มือเชียงใหม่ 2026",
    },
    category: { en: "Longevity Guide", th: "คู่มือการคงทน" },
    dek: {
      en: "How long lashes actually last comes down to three things: the style, the artist, and the aftercare. Here's the honest breakdown by week.",
      th: "ขนตาอยู่ได้นานแค่ไหนขึ้นกับ 3 อย่าง คือ ทรง ช่าง และวิธีดูแลหลังต่อ นี่คือการแบ่งระยะเวลาแบบซื่อสัตย์ทีละสัปดาห์",
    },
    description: {
      en: "How long do lash extensions actually last, what affects shedding, and the aftercare rules that get you the full 3–4 weeks. Includes our 3-day retouch guarantee.",
      th: "ต่อขนตาอยู่ได้นานแค่ไหนจริง ๆ อะไรทำให้หลุดเร็ว และวิธีดูแลที่ทำให้เซตอยู่ครบ 3–4 สัปดาห์ พร้อมรายละเอียดรับประกันรีทัช 3 วันของเรา",
    },
    publishedAt: "2026-06-07",
    updatedAt: "2026-06-07",
    author: "Ying",
    heroImage: "/images/service-classic-volume.jpg",
    heroImageAlt: {
      en: "Close-up of a Classic Volume lash set by My Lash House Chiang Mai, illustrating typical lash extension longevity across the retention timeline",
      th: "ภาพระยะใกล้ของเซต Classic Volume โดย My Lash House เชียงใหม่ แสดงอายุการใช้งานทั่วไปของขนตาต่อตลอดไทม์ไลน์การคงทน",
    },
    readingMinutes: 7,
    tags: ["lash extensions", "longevity", "aftercare", "retouch guarantee", "chiang mai", "ต่อขนตา"],
    faq: {
      en: [
        {
          q: "How long do lash extensions last?",
          a: "With proper aftercare, a professionally applied set lasts 3–4 weeks before you'll want a refill. Individual extensions shed with the natural lash they're glued to, on your normal 60–90 day lash cycle.",
        },
        {
          q: "Why did my last lash extensions fall out in a week?",
          a: "Almost always one of three things: cheap or expired glue that breaks down in Chiang Mai's humidity, premade fans that are too heavy for the natural lash, or rushed isolation that glues two natural lashes together so they pull each other out. Aftercare (water, oil-based products, rubbing) can also halve the lifespan of any set.",
        },
        {
          q: "What does My Lash House's 3-day retouch guarantee cover?",
          a: "Abnormal shedding within the first three days caused by a glue or application issue on our side — message us on Instagram with photos within 3 days and we book you in for a free retouch. It does not cover loss from rubbing, getting the lashes wet within the first 2 hours, or using oil-based cleansers and removers.",
        },
        {
          q: "Can I get lash extensions wet?",
          a: "Not for the first 24 hours — that's when the glue is curing. After day one, normal showering and gentle washing is fine. Avoid steam rooms, saunas, and submerging your face for long periods. Always pat dry with a lint-free cloth; never rub.",
        },
        {
          q: "How often should I get a refill?",
          a: "Every 2–3 weeks is the sweet spot. The set still looks dense, and the artist has enough remaining lashes to map cleanly into. If you wait longer than 4 weeks, a refill often costs the same as a fresh full set and looks worse — better to start over.",
        },
        {
          q: "Will lash extensions damage my natural lashes?",
          a: "Properly applied extensions don't damage natural lashes. Damage comes from oversized fans on weak lashes, poor isolation, or pulling at them yourself. The 0.05mm handmade fans we use sit lightly and shed with the natural lash on its normal cycle.",
        },
        {
          q: "How do I clean lash extensions?",
          a: "Use a dedicated lash shampoo (foam-type works best), once a day. Apply with the soft brush, rinse with cool water, pat dry with a lint-free cloth, then brush through with the spoolie we send you home with. Avoid cotton pads and any oil-based cleansers near the eye area.",
        },
      ],
      th: [
        {
          q: "ต่อขนตาอยู่ได้นานแค่ไหน",
          a: "ถ้าดูแลถูกวิธี เซตที่ต่อโดยช่างมืออาชีพจะอยู่ได้ 3–4 สัปดาห์ก่อนต้องเข้ามาเติม เส้นที่ต่อจะหลุดไปพร้อมกับขนตาธรรมชาติเส้นที่มันติด ตามวงจรขนตาปกติ 60–90 วัน",
        },
        {
          q: "ทำไมขนตาที่ต่อรอบที่แล้วหลุดภายในสัปดาห์เดียว",
          a: "ส่วนใหญ่เกิดจาก 3 สาเหตุ: กาวคุณภาพต่ำหรือหมดอายุที่ทนความชื้นเชียงใหม่ไม่ไหว แฟนสำเร็จรูปที่หนักเกินไปสำหรับขนตาธรรมชาติ หรือการแยกขนแบบรีบที่ติดขนตาธรรมชาติสองเส้นเข้าด้วยกันจนดึงกันออก การดูแลผิดวิธี (โดนน้ำ ใช้ของที่มีน้ำมัน ขยี้ตา) ก็ตัดอายุเซตลงครึ่งหนึ่งได้",
        },
        {
          q: "การรับประกันรีทัช 3 วันของ My Lash House ครอบคลุมอะไรบ้าง",
          a: "ครอบคลุมการหลุดผิดปกติภายใน 3 วันแรกจากปัญหากาวหรือเทคนิคของฝั่งเรา — แชทเรา Instagram พร้อมรูปภายใน 3 วัน เราจะนัดเข้ามารีทัชฟรี ไม่ครอบคลุมเส้นที่หลุดจากการขยี้ตา โดนน้ำใน 2 ชั่วโมงแรก หรือใช้คลีนเซอร์/ที่เช็ดเครื่องสำอางสูตรน้ำมัน",
        },
        {
          q: "ต่อขนตาแล้วโดนน้ำได้ไหม",
          a: "24 ชั่วโมงแรกห้ามโดน เป็นช่วงที่กาวยังเซตตัวอยู่ หลังจากวันแรกอาบน้ำและล้างหน้าเบา ๆ ได้ตามปกติ หลีกเลี่ยงห้องอบไอน้ำ ซาวน่า และการแช่น้ำนาน ๆ ซับให้แห้งด้วยผ้าไม่มีขุยเสมอ ห้ามถู",
        },
        {
          q: "ควรเข้ามาเติมขนตาบ่อยแค่ไหน",
          a: "ช่วง 2–3 สัปดาห์คือช่วงที่เหมาะที่สุด เซตยังดูแน่นพอ และช่างยังมีเส้นเหลือมากพอจะ map ทับได้สะอาด ถ้าทิ้งนานเกิน 4 สัปดาห์ การเติมมักราคาเท่ากับต่อเซตใหม่และผลออกมาแย่กว่า — ต่อใหม่จะดีกว่า",
        },
        {
          q: "ต่อขนตาทำให้ขนตาธรรมชาติเสียไหม",
          a: "ขนตาที่ต่อถูกต้องไม่ทำให้ขนตาธรรมชาติเสีย ความเสียหายเกิดจากแฟนใหญ่เกินไปบนขนตาบอบบาง การแยกขนไม่ดี หรือการดึงเองที่บ้าน แฟนแฮนด์เมด 0.05 มม. ที่เราใช้นั่งเบาและหลุดตามขนตาธรรมชาติในวงจรปกติ",
        },
        {
          q: "ทำความสะอาดขนตาที่ต่อยังไง",
          a: "ใช้แชมพูล้างขนตาโดยเฉพาะ (ชนิดโฟมใช้ดีที่สุด) วันละครั้ง ทาด้วยแปรงนิ่ม ๆ ล้างออกด้วยน้ำเย็น ซับด้วยผ้าไม่มีขุย แล้วหวีด้วยสปูลีย์ที่ทางร้านให้ติดมือไป หลีกเลี่ยงสำลีและคลีนเซอร์สูตรน้ำมันบริเวณรอบดวงตา",
        },
      ],
    },
  },
  {
    slug: "lash-extensions-by-eye-shape-chiang-mai",
    // NOTE: Thai-script slugs trigger 404 in Next.js standalone server (known issue).
    // Using transliteration as fallback. Schema/title still uses Thai script for SEO signals.
    slugTh: "tor-khon-ta-baeb-nai-dee",
    title: {
      en: "Which Lash Extension Style is Right for Your Eye Shape? (Chiang Mai 2026 Guide)",
      th: "ต่อขนตาแบบไหนดี? เทียบรูปตา กับ ทรงขนตาที่เหมาะ (คู่มือเชียงใหม่ 2026)",
    },
    metaTitle: {
      en: "Lash Extensions by Eye Shape: A Chiang Mai 2026 Guide",
      th: "ต่อขนตาแบบไหนดี? คู่มือเชียงใหม่ 2026",
    },
    category: { en: "Style Guide", th: "คู่มือเลือกทรง" },
    dek: {
      en: "The right lash style is the one that matches your eye shape, not the latest TikTok trend. Here's how Ying maps every set in her studio.",
      th: "ทรงต่อขนตาที่ใช่คือทรงที่เข้ากับรูปตา ไม่ใช่เทรนด์ TikTok ล่าสุด นี่คือวิธีที่ครูหญิงจัดทรงให้ลูกค้าทุกคน",
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
          a: "Anywhere from 1 hour to 2.5 hours, depending on the style you pick and the mapping. Lighter styles like Classic 1:1 or Light Volume sit at the shorter end; Mega Volume and detailed cat-eye or doll-eye mapping sit at the longer end. Ying confirms the timing at the start of every appointment, after the quick consultation, so you know exactly how long to plan for before any extensions are applied.",
        },
        {
          q: "How often do I need to come back for a refill?",
          a: "Refills are recommended every two to three weeks to keep the set looking full as natural lashes shed. They're shorter and less expensive than a full set.",
        },
        {
          q: "What if my chosen lash style doesn't suit my eye shape once it's applied?",
          a: "Most fine-tuning happens at your next refill — Ying adjusts the mapping, length distribution, or curl to bring the set closer to what's working for you. If you want a full stylistic change before your refill, it can be redone for a partial fee. Right after every appointment, every client gets a quick aftercare consultation — what to do and not do in the first 24 to 48 hours — so the set holds the way it was designed.",
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
          a: "ใช้เวลาประมาณ 1 ถึง 2.5 ชั่วโมง ขึ้นอยู่กับทรงที่เลือกและรูปแบบการ mapping ทรงเบา ๆ อย่าง Classic 1:1 หรือ Light Volume จะอยู่ฝั่งสั้น ส่วน Mega Volume หรือการ mapping แบบ cat-eye/doll-eye ละเอียดจะอยู่ฝั่งยาว ครูหญิงจะยืนยันเวลาที่ต้องใช้ตอนเริ่มนัดทุกครั้ง หลังคุยสั้น ๆ ลูกค้าจะรู้ก่อนเลยว่าใช้เวลาประมาณไหน ก่อนที่จะเริ่มต่อเส้นแรก",
        },
        {
          q: "ต้องกลับมาเติมขนตาบ่อยแค่ไหน",
          a: "แนะนำเติมทุก 2-3 สัปดาห์เพื่อรักษาความเต็มของเซตในขณะที่ขนตาธรรมชาติหลุดตามวงจร การเติมใช้เวลาน้อยกว่าและถูกกว่าการต่อเซตใหม่",
        },
        {
          q: "ถ้าทรงที่เลือกไม่เข้ากับรูปตาเราตอนใส่จริงล่ะ",
          a: "การปรับเล็ก ๆ ส่วนใหญ่ทำในรอบเติมถัดไป — ครูหญิงปรับ mapping การกระจายความยาว หรือเคิร์ล ให้เข้ากับลุคที่ลงตัวกับคุณมากขึ้น ถ้าอยากเปลี่ยนทรงทั้งเซตก่อนถึงรอบเติม สามารถทำใหม่ได้ในราคาบางส่วน หลังเซตเสร็จทุกครั้ง ลูกค้าจะได้คุยสั้น ๆ เรื่องวิธีดูแล — สิ่งที่ทำได้และทำไม่ได้ใน 24-48 ชั่วโมงแรก — เพื่อให้เซตอยู่ทรงตามที่ออกแบบไว้",
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
