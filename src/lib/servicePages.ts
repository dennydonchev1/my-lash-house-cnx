import type { Lang } from "./i18n";

// Content for the /services/* conversion pages. These are LOCAL-intent pages
// (city terms stay in titles per the title doctrine - they compete in SERPs
// with local packs, unlike the national informational blog posts).
//
// PRICING RULE: never invent numbers. Options are listed without prices until
// Ying confirms the real figures; the CTA hands off to LINE where price is
// always confirmed before booking.

export type ServiceFaq = { q: string; a: string };
export type ServiceSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type ServicePageContent = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  quickAnswer: string;
  /** Optional page-specific trust items replacing the two lash-extension ones (handmade fans, shower after 2 hours) that are wrong for lifts and nails. */
  trustItems?: [string, string];
  heroImage: string | null;
  heroImageAlt: string;
  sections: ServiceSection[];
  optionsHeading: string;
  options: { name: string; note: string }[];
  pricingNote: string;
  faqHeading: string;
  faq: ServiceFaq[];
  ctaHeading: string;
  ctaText: string;
  relatedLinks: { label: string; href: string }[];
};

export type ServicePage = {
  slug: string;
  serviceType: string;
  en: ServicePageContent;
  th: ServicePageContent;
};

export const LASH_LIFTING_PAGE: ServicePage = {
  slug: "lash-lifting",
  serviceType: "Lash lifting",
  // 2026-10-11: this page is the single home for the lash lifting cluster.
  // The former guide posts (/blog/lash-lifting-chiang-mai and
  // /th/blog/lifting-khon-ta-chiang-mai) were merged in here and now permanently redirect to
  // this URL (next.config.ts). Search Console showed this page with 72
  // impressions vs 6 for the posts, so the service URL kept the cluster.
  en: {
    h1: "Lash Lifting in Chiang Mai",
    metaTitle: "Lash Lift Chiang Mai: Process, Results, Price | My Lash House",
    metaDescription:
      "Lash lift in Chiang Mai: what it is, the 7-step process, how long it lasts, honest pros and cons, and pricing. Certified artist, 3-day retouch guarantee. San Kamphaeng, near Payap University.",
    eyebrow: "Service",
    trustItems: ["No refills needed", "Lasts 6 to 8 weeks"],
    quickAnswer:
      "A lash lift curls your natural lashes upward from the base and lasts 6 to 8 weeks with zero daily maintenance. No synthetic fans, no refill cycle, about 45 minutes in the chair. At My Lash House in San Klang, Chiang Mai, every lift comes with the same 3-day retouch guarantee as our extension sets.",
    heroImage: "/images/service-wet-look.jpg",
    heroImageAlt: "Naturally curled lashes after a lash lifting treatment at My Lash House Chiang Mai",
    sections: [
      {
        heading: "What is a lash lift?",
        paragraphs: [
          "A lash lift is the modern version of a lash perm. A silicone shield sits on your eyelid, your natural lashes are combed up over it, and a gentle keratin-based lifting lotion goes on at the base for 8 to 12 minutes. A setting solution locks the curl in place.",
          "You leave with your own lashes curled up, looking longer and more open, with nothing synthetic added. An optional tint deepens the color for a mascara-like finish.",
        ],
      },
      {
        heading: "Lash lift vs lash extensions: what's the difference?",
        paragraphs: [
          "They solve different problems. Neither is better; one of them is better for you.",
        ],
        bullets: [
          "What's added: a lift adds nothing and curls your own lashes; extensions add handmade fans to each natural lash",
          "How long it lasts: a lift lasts 6 to 8 weeks; an extension set lasts 3 to 4 weeks with refills every 2 to 3 weeks",
          "Daily care: none for a lift after the first 24 hours; extensions need daily cleaning and brushing",
          "The look: a lift reads as your lashes on their best day; extensions read fuller, darker and more defined",
          "Time in the chair: about 45 minutes for a lift; about 1.5 to 2.5 hours for a proper premium extension set",
        ],
      },
      {
        heading: "What happens at your lash lift appointment?",
        paragraphs: [
          "Seven steps, about 45 minutes, eyes closed the whole time. Many clients fall asleep. That's allowed.",
          "A patch test is available if you have a history of sensitivity to eye products. Message ahead and Ying will schedule one 48 hours before your appointment.",
        ],
        bullets: [
          "Consultation: Ying checks your lash length, condition and growth angle, and tells you honestly if a lift will suit you",
          "Cleanse: an oil-free prep so the solution takes evenly",
          "Shield placement: a silicone pad sized to your lash length",
          "Combing: lashes set into the shape they'll hold",
          "Lifting solution: 8 to 12 minutes at the base, never the tips",
          "Setting solution: locks in the curl",
          "Optional tint and conditioning treatment",
        ],
      },
      {
        heading: "How long does a lash lift last?",
        paragraphs: [
          "6 to 8 weeks. The curl doesn't drop; it fades as your natural lashes shed. Everyone loses a few lashes a day, lift or no lift, and each new lash grows in straight because it was never in the solution.",
          "By week 4 the curl is softer but still visible. By week 6 to 8 about half your lash line is new growth, and it's time to book again. There's no refill for a lift; the next visit is a fresh treatment.",
        ],
      },
      {
        heading: "What are the benefits of a lash lift?",
        paragraphs: ["The reasons clients come back every two months:"],
        bullets: [
          "No commitment: one appointment, 6 to 8 weeks of results",
          "Zero daily maintenance after the first 24 hours",
          "A natural look that reads as your own lashes",
          "No adhesive on your lash line for weeks, which many sensitive eyes prefer",
          "Easy travel prep: one visit and nothing to maintain on the road",
        ],
      },
      {
        heading: "What are the downsides of a lash lift?",
        paragraphs: [
          "The honest list, because you should hear it before you book, not after.",
        ],
        bullets: [
          "It needs healthy, reasonably long natural lashes; very short or brittle lashes may not lift dramatically",
          "It curls what you have but adds no length; if you want visible extra length, extensions are the better pick",
          "It follows the shape your lashes already grow in, so it can't correct asymmetry the way custom-mapped extensions can",
          "Waterproof mascara is harder to remove from lifted lashes",
          "Harsh solutions or over-processing can dry lashes out, which is why the artist matters as much as the treatment",
        ],
      },
      {
        heading: "Who is a lash lift right for?",
        paragraphs: [
          "Naturally long but straight lashes get the most dramatic result. A lift also suits anyone who wants zero daily maintenance, travelers who want 6 to 8 worry-free weeks, first-timers testing the waters before extensions, and clients whose eyes have reacted to extension glue before. Many pregnant clients choose a lift to avoid extension adhesive; check with your doctor first.",
          "Very short or brittle lashes may not lift dramatically. Ying will tell you honestly at consultation, before anything is applied.",
        ],
      },
      {
        heading: "Lash lift, lash perm, keratin lift: are they the same?",
        paragraphs: [
          "Yes, mostly. Lash perm is the older name for the same idea. A keratin lift is a lash lift that uses keratin-based solutions and usually ends with a conditioning step, which is how we do every lift at the studio.",
        ],
      },
      {
        heading: "How do I care for lifted lashes?",
        paragraphs: [
          "First 24 hours: no water, steam or makeup on the lashes, and no sleeping face-down. The solution needs a full day to set.",
          "First week: keep oil-based skincare off the lash line; it won't dissolve a lift but it can soften the curl. After that, gentle cleansing with a water-based cleanser is all they need.",
        ],
      },
      {
        heading: "The 3-day retouch guarantee applies here too",
        paragraphs: [
          "If the curl takes unevenly or one eye lifts less than the other in the first three days, message us with photos and we re-lift the affected area free. Same policy as our extension sets, because the standard shouldn't change by service. It doesn't cover issues caused by water in the first 24 hours, oil on the lash line, or sleeping face-down.",
        ],
      },
    ],
    optionsHeading: "Lash lift options and price",
    options: [
      { name: "Lash lift", note: "The curl, nothing else" },
      { name: "Lash lift + tint", note: "Curl plus a mascara-depth tint" },
      { name: "Lash lift + tint + conditioning", note: "The full treatment with a strengthening finish" },
    ],
    pricingNote:
      "Lifting sits in the lower-mid tier of our menu, below most extension sets. Message us on LINE or Instagram for the current price of each option. Price is always confirmed before booking, never after.",
    faqHeading: "Lash lifting questions",
    faq: [
      {
        q: "How long does a lash lift last?",
        a: "6 to 8 weeks. The curl fades as your natural lashes shed and new growth comes in straight. There's no refill for a lift; the next appointment is a fresh treatment.",
      },
      {
        q: "Does lash lifting damage natural lashes?",
        a: "Not when done properly with premium keratin-based solutions and correct processing time. Damage comes from harsh solutions or over-processing at careless shops.",
      },
      {
        q: "Can I wear mascara after a lash lift?",
        a: "Yes, after 24 to 48 hours. Water-based mascara only. Waterproof formulas need oil-based remover, which softens the curl.",
      },
      {
        q: "Lash lift or extensions, which should I pick?",
        a: "Lift if you want low maintenance and your natural lashes are already decent length. Extensions if you want added volume, length, or drama your natural lashes don't have. Ask at consultation and you'll get an honest answer, not an upsell.",
      },
      {
        q: "Where can I get a lash lift in Chiang Mai?",
        a: "My Lash House is in San Klang, San Kamphaeng, near Payap University and about 10 minutes from the Chiang Mai city centre. Open daily 9:00 to 19:00, walk-ins welcome subject to availability.",
      },
    ],
    ctaHeading: "Book your lash lift",
    ctaText: "Message us on LINE or Instagram with the option you want and your preferred day. Ying confirms the price and slot personally.",
    relatedLinks: [
      { label: "Eyelash extensions in Chiang Mai", href: "/" },
      { label: "Natural lash extensions, if you want more than a lift", href: "/blog/natural-lash-extensions-chiang-mai" },
      { label: "Lash aftercare: the 24-hour rule explained", href: "/blog/lash-extension-aftercare-chiang-mai" },
    ],
  },
  th: {
    h1: "ลิฟติ้งขนตา คืออะไร อยู่ได้นานไหม เหมาะกับใคร",
    metaTitle: "ลิฟติ้งขนตา คืออะไร ข้อเสีย อยู่ได้นานไหม ราคา | My Lash House",
    metaDescription:
      "ลิฟติ้งขนตา คือการดัดขนตาจริงให้งอนนาน 6 ถึง 8 สัปดาห์ ไม่ต้องต่อ อ่านขั้นตอน ข้อดี ข้อเสีย วิธีดูแล และราคา จากช่างที่มีใบรับรอง รับประกันรีทัช 3 วัน ที่ My Lash House สันกำแพง เชียงใหม่",
    eyebrow: "บริการ",
    trustItems: ["ไม่ต้องเติม", "อยู่ได้ 6 ถึง 8 สัปดาห์"],
    quickAnswer:
      "ลิฟติ้งขนตา คือการดัดขนตาจริงให้งอนขึ้นจากโคน อยู่ได้ 6 ถึง 8 สัปดาห์โดยไม่ต้องดูแลรายวัน ไม่มีแฟนสังเคราะห์ ไม่มีรอบเติม ใช้เวลาประมาณ 45 นาที ที่ My Lash House สันกลาง เชียงใหม่ ทุกลิฟติ้งมีรับประกันรีทัช 3 วันเหมือนเซตต่อขนตา",
    heroImage: "/images/service-wet-look.jpg",
    heroImageAlt: "ขนตางอนธรรมชาติหลังทำลิฟติ้งขนตาที่ My Lash House เชียงใหม่",
    sections: [
      {
        heading: "ลิฟติ้งขนตา คืออะไร",
        paragraphs: [
          "ลิฟติ้งขนตาคือการดัดขนตาแบบสมัยใหม่ วางแผ่นซิลิโคนบนเปลือกตา หวีขนตาจริงขึ้นไปพาดแผ่น แล้วทาน้ำยาเคราตินอ่อน ๆ ที่โคนขน 8 ถึง 12 นาที ตามด้วยน้ำยาเซตเพื่อล็อกความโค้ง",
          "ออกจากร้านด้วยขนตาของตัวเองที่งอนขึ้น ดูยาวและเปิดตากว่าเดิม โดยไม่มีอะไรสังเคราะห์เพิ่มเลย ถ้าอยากให้เข้มขึ้นเหมือนทามาสคาร่า เลือกย้อมสีเพิ่มได้",
        ],
      },
      {
        heading: "ลิฟติ้งขนตา ต่างจากต่อขนตายังไง",
        paragraphs: ["สองบริการนี้แก้ปัญหาคนละแบบ ไม่มีอันไหนดีกว่า มีแค่อันที่ใช่กับคุณมากกว่า"],
        bullets: [
          "เพิ่มอะไร: ลิฟติ้งไม่เพิ่มอะไรเลย ดัดขนตาจริงอย่างเดียว ส่วนต่อขนตาคือติดแฟนทำมือที่ขนตาจริงทีละเส้น",
          "อยู่ได้นานแค่ไหน: ลิฟติ้ง 6 ถึง 8 สัปดาห์ ต่อขนตา 3 ถึง 4 สัปดาห์ และควรเติมทุก 2 ถึง 3 สัปดาห์",
          "การดูแล: ลิฟติ้งแทบไม่ต้องดูแลหลัง 24 ชั่วโมงแรก ต่อขนตาต้องล้างและหวีทุกวัน",
          "ลุค: ลิฟติ้งคือขนตาตัวเองในวันที่สวยที่สุด ต่อขนตาคือเต็มขึ้น เข้มขึ้น ชัดขึ้น",
          "เวลาบนเตียง: ลิฟติ้งประมาณ 45 นาที เซตต่อขนตาพรีเมียมประมาณ 1.5 ถึง 2.5 ชั่วโมง",
        ],
      },
      {
        heading: "ขั้นตอนลิฟติ้งขนตา ใช้เวลานานไหม",
        paragraphs: [
          "7 ขั้นตอน ประมาณ 45 นาที หลับตาตลอด ลูกค้าหลายคนหลับไปเลย อนุญาตค่ะ",
          "ใครเคยแพ้ผลิตภัณฑ์รอบดวงตา ทักมาก่อนวันนัดได้เลย ครูหญิงนัด patch test ให้ล่วงหน้า 48 ชั่วโมง",
        ],
        bullets: [
          "ปรึกษา: ครูหญิงเช็กความยาว สภาพ และมุมการขึ้นของขนตา แล้วบอกตรง ๆ ว่าลิฟติ้งเหมาะกับคุณไหม",
          "ทำความสะอาด: เตรียมผิวแบบไร้น้ำมันให้น้ำยาจับสม่ำเสมอ",
          "วางแผ่นซิลิโคน: เลือกขนาดให้พอดีกับความยาวขนตา",
          "หวีจัดทรง: ขนตาถูกจัดเข้ารูปที่จะคงอยู่",
          "น้ำยาลิฟติ้ง: 8 ถึง 12 นาทีที่โคน ไม่แตะปลาย",
          "น้ำยาเซต: ล็อกความโค้ง",
          "ย้อมสีและบำรุง (ถ้าเลือก)",
        ],
      },
      {
        heading: "ลิฟติ้งขนตา อยู่ได้นานไหม",
        paragraphs: [
          "6 ถึง 8 สัปดาห์ ความโค้งไม่ได้ค่อย ๆ ตก แต่จางไปตามขนตาที่ผลัดตามธรรมชาติ ทุกคนขนตาหลุดวันละไม่กี่เส้นอยู่แล้ว ทำลิฟติ้งหรือไม่ก็เท่ากัน และเส้นใหม่ที่งอกขึ้นมาจะตรงเพราะไม่เคยโดนน้ำยา",
          "สัปดาห์ที่ 4 ยังงอนแต่นุ่มลง สัปดาห์ที่ 6 ถึง 8 ประมาณครึ่งหนึ่งเป็นเส้นใหม่ ถึงเวลานัดรอบถัดไป ลิฟติ้งไม่มีการเติม นัดถัดไปคือทำใหม่ทั้งหมด",
        ],
      },
      {
        heading: "ลิฟติ้งขนตา ดีไหม",
        paragraphs: ["เหตุผลที่ลูกค้ากลับมาทำทุกสองเดือน"],
        bullets: [
          "ไม่ผูกมัด นัดเดียวสวยได้ 6 ถึง 8 สัปดาห์",
          "หลัง 24 ชั่วโมงแรกแทบไม่ต้องดูแลอะไรเลย",
          "ลุคธรรมชาติ ดูเป็นขนตาของคุณเอง",
          "ไม่มีกาวอยู่ที่ขอบขนตาเป็นสัปดาห์ ตาไวหลายคนชอบตรงนี้",
          "เหมาะก่อนเดินทาง ทำครั้งเดียว ไม่ต้องห่วงระหว่างเที่ยว",
        ],
      },
      {
        heading: "ลิฟติ้งขนตา ข้อเสีย ที่ควรรู้ก่อนทำ",
        paragraphs: ["รายการตรง ๆ เพราะควรรู้ก่อนจอง ไม่ใช่หลังจอง"],
        bullets: [
          "ต้องมีขนตาจริงที่แข็งแรงและยาวพอสมควร ขนตาสั้นมากหรือเปราะอาจลิฟติ้งได้ไม่เด่น",
          "ลิฟติ้งดัดสิ่งที่มีอยู่ แต่ไม่ได้เพิ่มความยาว ถ้าอยากได้ความยาวที่เห็นชัด ต่อขนตาตอบโจทย์กว่า",
          "ความโค้งตามทรงที่ขนตาขึ้นอยู่แล้ว จึงแก้ความไม่สมมาตรไม่ได้เท่าการต่อขนตาแบบ mapping เฉพาะตัว",
          "มาสคาร่ากันน้ำล้างออกจากขนตาที่ลิฟติ้งยากกว่า",
          "น้ำยาแรงหรือปล่อยนานเกินทำให้ขนตาแห้งได้ ช่างที่ทำจึงสำคัญพอ ๆ กับตัวบริการ",
        ],
      },
      {
        heading: "ลิฟติ้งขนตา เหมาะกับใคร",
        paragraphs: [
          "ขนตายาวธรรมชาติแต่ตรงได้ผลเด่นที่สุด และเหมาะกับคนที่ไม่อยากดูแลรายวัน สายเที่ยวที่อยากสบาย 6 ถึง 8 สัปดาห์ มือใหม่ที่อยากลองก่อนต่อขนตา และคนที่ตาเคยแพ้กาวต่อขนตา คุณแม่ตั้งครรภ์หลายคนเลือกลิฟติ้งเพื่อเลี่ยงกาว แต่ควรปรึกษาแพทย์ก่อน",
          "ขนตาสั้นมากหรือเปราะอาจลิฟติ้งไม่เด่น ครูหญิงบอกตรง ๆ ตอนปรึกษา ก่อนเริ่มทำอะไรทั้งนั้น",
        ],
      },
      {
        heading: "ดัดขนตาถาวร ลิฟขนตา ลิปติ้งขนตา คืออันเดียวกันไหม",
        paragraphs: [
          "ใช่ค่ะ คืออันเดียวกัน ลิฟขนตาและลิปติ้งขนตาเป็นคำที่คนพิมพ์ค้นหากันบ่อย ส่วนดัดขนตาถาวรเป็นชื่อเรียกแบบเดิม ถึงจะเรียกว่าถาวร แต่ความโค้งอยู่ได้ 6 ถึง 8 สัปดาห์ตามรอบการผลัดของขนตา ไม่ได้อยู่ตลอดไป ที่ร้านใช้น้ำยาเคราตินและจบด้วยขั้นตอนบำรุงทุกครั้ง",
        ],
      },
      {
        heading: "ดูแลขนตาหลังลิฟติ้งยังไง",
        paragraphs: [
          "24 ชั่วโมงแรก: ห้ามโดนน้ำ ห้ามไอน้ำ ห้ามแต่งตา และห้ามนอนคว่ำ น้ำยาต้องใช้เวลาเต็มวันในการเซตตัว",
          "สัปดาห์แรก: เลี่ยงสกินแคร์ที่มีน้ำมันตรงขอบขนตา น้ำมันไม่ทำให้ลิฟติ้งหลุด แต่ทำให้ความโค้งนุ่มลงได้ หลังจากนั้นล้างเบา ๆ ด้วยคลีนเซอร์สูตรน้ำก็พอ",
        ],
      },
      {
        heading: "รับประกันรีทัช 3 วัน ใช้กับลิฟติ้งด้วย",
        paragraphs: [
          "ถ้าความโค้งขึ้นไม่สม่ำเสมอ หรือตาข้างหนึ่งงอนน้อยกว่าอีกข้างใน 3 วันแรก ส่งรูปทักมา เราลิฟติ้งซ้ำบริเวณนั้นให้ฟรี นโยบายเดียวกับเซตต่อขนตา เพราะมาตรฐานไม่ควรเปลี่ยนตามบริการ ไม่ครอบคลุมกรณีโดนน้ำใน 24 ชั่วโมงแรก ทาน้ำมันที่ขอบขนตา หรือนอนคว่ำ",
        ],
      },
    ],
    optionsHeading: "ลิฟติ้งขนตา ราคาและตัวเลือก",
    options: [
      { name: "ลิฟติ้งขนตา", note: "ดัดความโค้งอย่างเดียว" },
      { name: "ลิฟติ้ง + ย้อมสี", note: "ความโค้งพร้อมสีเข้มระดับมาสคาร่า" },
      { name: "ลิฟติ้ง + ย้อมสี + บำรุง", note: "ครบทุกขั้นตอนพร้อมทรีตเมนต์เสริมแรง" },
    ],
    pricingNote:
      "ลิฟติ้งอยู่ในระดับราคาต่ำถึงกลางของเมนู ต่ำกว่าเซตต่อขนตาส่วนใหญ่ ทักไลน์หรือไอจีเพื่อขอราคาปัจจุบันของแต่ละแบบ เรายืนยันราคาก่อนจองเสมอ",
    faqHeading: "คำถามเรื่องลิฟติ้งขนตา",
    faq: [
      {
        q: "ลิฟติ้งขนตา อยู่ได้นานไหม",
        a: "6 ถึง 8 สัปดาห์ ความโค้งจางไปตามการหลุดของขนตาจริงและเส้นใหม่ที่ขึ้นมาตรง ไม่มีการเติมสำหรับลิฟติ้ง นัดถัดไปคือทำใหม่",
      },
      {
        q: "ลิฟติ้งขนตา ทำลายขนตาจริงไหม",
        a: "ไม่ ถ้าทำถูกต้องด้วยน้ำยาเคราตินคุณภาพและเวลาที่เหมาะสม ความเสียหายมาจากน้ำยาแรงหรือการปล่อยนานเกินที่ร้านที่ไม่ระวัง",
      },
      {
        q: "ลิฟติ้งแล้วใส่มาสคาร่าได้ไหม",
        a: "ได้ หลัง 24 ถึง 48 ชั่วโมง ใช้สูตรน้ำเท่านั้น สูตรกันน้ำต้องใช้รีมูฟเวอร์น้ำมันซึ่งทำให้ความโค้งนุ่มลง",
      },
      {
        q: "ลิฟติ้งหรือต่อขนตา เลือกอะไรดี",
        a: "ลิฟติ้งถ้าอยากดูแลน้อยและขนตาจริงยาวพอสมควรอยู่แล้ว ต่อถ้าอยากได้วอลุ่ม ความยาว หรือดราม่าที่ขนตาจริงไม่มี ถามตอนปรึกษาแล้วจะได้คำตอบตรง ๆ ไม่ใช่การขายของ",
      },
      {
        q: "ลิฟติ้งขนตา เชียงใหม่ ทำที่ไหนดี",
        a: "My Lash House อยู่สันกลาง สันกำแพง ใกล้ ม.พายัพ ห่างตัวเมืองเชียงใหม่ประมาณ 10 นาที เปิดทุกวัน 9:00 ถึง 19:00 รับ walk-in ตามคิวว่าง",
      },
    ],
    ctaHeading: "จองลิฟติ้งขนตา",
    ctaText: "ทักไลน์หรือไอจีพร้อมตัวเลือกที่ต้องการและวันที่สะดวก ครูหญิงยืนยันราคาและคิวให้เอง",
    relatedLinks: [
      { label: "ต่อขนตา เชียงใหม่ ที่ไหนดี เทียบ 4 ร้าน", href: "/th/blog/tor-khon-ta-chiang-mai-tee-nai-dee" },
      { label: "ต่อขนตาแบบธรรมชาติ ถ้าอยากได้มากกว่าลิฟติ้ง", href: "/th/blog/tor-khon-ta-baeb-thammachat" },
      { label: "วิธีดูแลขนตาหลังต่อ กฎ 24 ชั่วโมง", href: "/th/blog/withi-doolae-khonta-lang-tor" },
    ],
  },
};

export const NAILS_PAGE: ServicePage = {
  slug: "nails",
  serviceType: "Nail services",
  en: {
    h1: "Nails in Chiang Mai, While Your Lashes Set",
    metaTitle: "Nails Chiang Mai | Gel, Extensions, Nail Art - My Lash House",
    metaDescription:
      "Nail services at My Lash House Chiang Mai, San Kamphaeng near Payap University. Gel, extensions, and nail art in the same private studio as your lash appointment. Book on LINE.",
    eyebrow: "Service",
    trustItems: ["Private one-to-one studio", "Nails and lashes in one visit"],
    quickAnswer:
      "My Lash House offers gel nails, nail extensions, and nail art in the same private San Klang studio as our lash services. Book nails alongside your lash appointment and walk out fully done, or book nails on their own. One artist, one client at a time, same standard.",
    heroImage: null,
    heroImageAlt: "Nail services at My Lash House Chiang Mai",
    sections: [
      {
        heading: "What we do",
        paragraphs: [
          "Gel color, nail extensions, and hand-drawn nail art. The same care that goes into a handmade lash fan goes into a nail set: one client at a time, no rushed rotation, design decided with you before anything starts.",
        ],
      },
      {
        heading: "The combo booking",
        paragraphs: [
          "The most popular way to book nails here is alongside lashes. A lash set takes 1.5 to 2.5 hours; pairing services means one trip to San Klang and walking out completely done. Message us with both services and we'll build the timing for you.",
        ],
      },
    ],
    optionsHeading: "Your options",
    options: [
      { name: "Gel color", note: "Single color or french, hands or feet" },
      { name: "Nail extensions", note: "Length and shape built to your hands" },
      { name: "Nail art", note: "Hand-drawn designs, priced by detail" },
    ],
    pricingNote:
      "Message us on LINE or Instagram with a photo of the look you want and we'll quote the exact price before you book. No surprises at the studio.",
    faqHeading: "Nail questions",
    faq: [
      {
        q: "Can I book nails and lashes in the same visit?",
        a: "Yes, and it's the most popular way to book nails here. Message us with both services and your preferred day; we'll plan the timing so you walk out fully done.",
      },
      {
        q: "Do you do nail art from a reference photo?",
        a: "Yes. Send the photo on LINE or Instagram and you'll get an honest answer on whether it's doable, how long it takes, and the exact price.",
      },
      {
        q: "Where is the studio?",
        a: "San Klang, San Kamphaeng, near Payap University, about 10 minutes from the Chiang Mai city centre. Open daily 9:00 to 19:00.",
      },
      {
        q: "Do walk-ins work for nails?",
        a: "Subject to availability, yes. Same-day messages on LINE usually get a same-day answer.",
      },
    ],
    ctaHeading: "Book your nails",
    ctaText: "Send a reference photo on LINE or Instagram and Ying will quote the price and next available slot.",
    relatedLinks: [
      { label: "See the lash services menu", href: "/#services" },
      { label: "Which lash style suits your eye shape", href: "/blog/lash-extensions-by-eye-shape-chiang-mai" },
    ],
  },
  th: {
    h1: "ทำเล็บ เชียงใหม่ ระหว่างรอขนตาเซ็ตตัว",
    metaTitle: "ทำเล็บ เชียงใหม่ | เจล ต่อเล็บ เพ้นท์เล็บ - My Lash House",
    metaDescription:
      "บริการทำเล็บที่ My Lash House เชียงใหม่ สันกำแพง ใกล้ ม.พายัพ เจล ต่อเล็บ เพ้นท์เล็บ ในสตูดิโอส่วนตัวเดียวกับนัดต่อขนตา จองผ่าน LINE",
    eyebrow: "บริการ",
    trustItems: ["สตูดิโอส่วนตัว 1 ต่อ 1", "ทำเล็บและขนตาได้ในนัดเดียว"],
    quickAnswer:
      "My Lash House ให้บริการเจล ต่อเล็บ และเพ้นท์เล็บ ในสตูดิโอส่วนตัวที่สันกลางเดียวกับบริการขนตา จองเล็บคู่กับนัดต่อขนตาแล้วออกจากร้านแบบครบจบ หรือจองเล็บอย่างเดียวก็ได้ ช่างคนเดียว ลูกค้าทีละคน มาตรฐานเดียวกัน",
    heroImage: null,
    heroImageAlt: "บริการทำเล็บที่ My Lash House เชียงใหม่",
    sections: [
      {
        heading: "เราทำอะไรบ้าง",
        paragraphs: [
          "เจลสี ต่อเล็บ และเพ้นท์เล็บวาดมือ ความใส่ใจแบบเดียวกับที่ใส่ในแฟนขนตาทำมือ ใส่ลงในเซตเล็บ ลูกค้าทีละคน ไม่เร่งรอบ ดีไซน์ตัดสินใจร่วมกันก่อนเริ่ม",
        ],
      },
      {
        heading: "จองคู่ ขนตา + เล็บ",
        paragraphs: [
          "วิธีจองเล็บที่นิยมที่สุดที่นี่คือจองคู่กับขนตา เซตขนตาใช้เวลา 1.5 ถึง 2.5 ชั่วโมง จองคู่กันคือมาสันกลางรอบเดียว ออกจากร้านแบบเสร็จครบ ทักมาพร้อมทั้งสองบริการแล้วเราจัดเวลาให้",
        ],
      },
    ],
    optionsHeading: "ตัวเลือกของคุณ",
    options: [
      { name: "เจลสี", note: "สีเดียวหรือเฟรนช์ มือหรือเท้า" },
      { name: "ต่อเล็บ", note: "ความยาวและทรงตามมือของคุณ" },
      { name: "เพ้นท์เล็บ", note: "ลายวาดมือ ราคาตามรายละเอียด" },
    ],
    pricingNote:
      "ทักไลน์หรือไอจีพร้อมรูปลุคที่อยากได้ เราเสนอราคาชัดเจนก่อนจอง ไม่มีเซอร์ไพรส์ที่ร้าน",
    faqHeading: "คำถามเรื่องเล็บ",
    faq: [
      {
        q: "จองเล็บกับขนตาในนัดเดียวได้ไหม",
        a: "ได้ และเป็นวิธีจองเล็บที่นิยมที่สุดที่นี่ ทักมาพร้อมทั้งสองบริการและวันที่สะดวก เราวางเวลาให้ออกจากร้านแบบเสร็จครบ",
      },
      {
        q: "เพ้นท์ตามรูปตัวอย่างได้ไหม",
        a: "ได้ ส่งรูปมาทางไลน์หรือไอจี แล้วจะได้คำตอบตรง ๆ ว่าทำได้ไหม ใช้เวลาเท่าไหร่ ราคาเท่าไหร่",
      },
      {
        q: "ร้านอยู่ที่ไหน",
        a: "สันกลาง สันกำแพง ใกล้ ม.พายัพ ห่างตัวเมืองเชียงใหม่ประมาณ 10 นาที เปิดทุกวัน 9:00 ถึง 19:00",
      },
      {
        q: "Walk-in ทำเล็บได้ไหม",
        a: "ได้ตามคิวว่าง ทักไลน์วันเดียวกันมักได้คำตอบวันเดียวกัน",
      },
    ],
    ctaHeading: "จองทำเล็บ",
    ctaText: "ส่งรูปตัวอย่างมาทางไลน์หรือไอจี ครูหญิงเสนอราคาและคิวว่างถัดไปให้เอง",
    relatedLinks: [
      { label: "ดูเมนูบริการขนตา", href: "/th#services" },
      { label: "ทรงขนตาแบบไหนเข้ากับรูปตาคุณ", href: "/th/blog/tor-khon-ta-baeb-nai-dee" },
    ],
  },
};

export const LASH_TRAINING_PAGE: ServicePage = {
  slug: "lash-training",
  serviceType: "Lash extension training course",
  en: {
    h1: "Lash Training Course in Chiang Mai",
    metaTitle: "Lash Training Course Chiang Mai | 2-Day Certified Course - My Lash House",
    metaDescription:
      "A 2-day hands-on lash extension course at My Lash House, Chiang Mai. Thai and international volume styles and lash design, supplies provided, mannequin practice then a live model, certificate on completion.",
    eyebrow: "Course",
    quickAnswer:
      "My Lash House runs a 2-day hands-on lash extension course in San Klang, Chiang Mai. You learn Thai and international volume styles and lash design from Ying, a certified artist with 7+ years at the lash bed. Supplies are provided, you practice on a mannequin and then on a live model, and you finish with a certificate. Course dates are arranged directly with Ying.",
    heroImage: null,
    heroImageAlt: "",
    sections: [
      {
        heading: "How the two days run",
        paragraphs: [
          "Two full days in the studio, with your supplies laid out before you arrive. Day one is technique and hands-on practice. Day two moves to a mannequin, then a full set on a live model, with Ying at your shoulder correcting as you go.",
        ],
        bullets: [
          "Supplies provided for both days",
          "Thai style and international style sets",
          "Volume technique and lash design, mapped to the eye",
          "Day two: mannequin practice, then a live model",
          "Certificate on completion",
        ],
      },
      {
        heading: "Who this course is for",
        paragraphs: [
          "Two kinds of students sit at this table. Working lash artists who want to add volume and design to what they already do, and visitors to Chiang Mai who would rather fly home with a skill than a souvenir. Tell us where you are starting from when you message.",
        ],
      },
      {
        heading: "Why learn here",
        paragraphs: [
          "You learn in a working studio, not a classroom. Every technique you see is the one Ying uses on paying clients: 100% handmade fans, styles mapped to the eye, and a standard she backs with a 3-day retouch guarantee. The point is that you leave able to do the work.",
        ],
      },
    ],
    optionsHeading: "What you work on",
    options: [
      { name: "Thai style", note: "How Thai-style sets are built and mapped" },
      { name: "International style", note: "The looks international clients ask for, mapped the same way" },
      { name: "Volume", note: "Handmade fans, from the first fan to a full set" },
      { name: "Design", note: "Mapping each style to the eye in front of you" },
    ],
    pricingNote:
      "The course fee depends on the format and what is included, so it is quoted personally. Message us on LINE or Instagram with your experience level and the dates you have in mind. Ying confirms the fee before anything is booked.",
    faqHeading: "Course questions",
    faq: [
      {
        q: "How long is the lash training course?",
        a: "Two full days at the studio in San Klang. Day one is technique and practice, day two is a mannequin and then a live model.",
      },
      {
        q: "Do I need experience to join?",
        a: "No. Beginners and working artists both take the course. Tell us where you are starting from when you message and the two days are shaped around it.",
      },
      {
        q: "Do I practice on a real person?",
        a: "Yes. On day two you work on a mannequin first and then complete a set on a live model.",
      },
      {
        q: "Are supplies included?",
        a: "Yes. Everything you need for both days is provided at the studio.",
      },
      {
        q: "Do I get a certificate?",
        a: "Yes, a My Lash House certificate on completion.",
      },
      {
        q: "How much does the course cost?",
        a: "The fee depends on the format, so it is quoted personally on LINE or Instagram before anything is booked.",
      },
    ],
    ctaHeading: "Ask about the next course",
    ctaText: "Message us on LINE or Instagram with your experience level and the dates you have in mind. Ying answers personally.",
    relatedLinks: [
      { label: "Lash styles by eye shape, the guide", href: "/blog/lash-extensions-by-eye-shape-chiang-mai" },
      { label: "How long lash extensions last, honestly", href: "/blog/how-long-do-lash-extensions-last-chiang-mai" },
    ],
  },
  th: {
    h1: "เรียนต่อขนตา คอร์ส 2 วัน สไตล์ไทยและสากล",
    metaTitle: "เรียนต่อขนตา คอร์ส 2 วัน มีใบประกาศ สไตล์ไทยและสากล - My Lash House",
    metaDescription:
      "เรียนต่อขนตากับครูหญิง My Lash House เชียงใหม่ คอร์ส 2 วันเต็ม สไตล์ไทยและสากล วอลลุ่มและการออกแบบทรง อุปกรณ์มีให้ ฝึกบนหุ่นแล้วลงมือกับนางแบบจริง จบแล้วได้ใบประกาศ",
    eyebrow: "คอร์สเรียน",
    quickAnswer:
      "My Lash House เปิดคอร์สเรียนต่อขนตา 2 วันเต็มที่สตูดิโอสันกลาง เชียงใหม่ เรียนสไตล์ไทยและสไตล์สากล วอลลุ่มและการออกแบบทรง กับครูหญิง ช่างเซอร์ติฟายด์ประสบการณ์ 7 ปีขึ้นไป อุปกรณ์มีให้ครบ ฝึกบนหุ่นก่อนแล้วลงมือกับนางแบบจริง จบแล้วได้ใบประกาศ นัดวันเรียนกับครูหญิงโดยตรง",
    heroImage: null,
    heroImageAlt: "",
    sections: [
      {
        heading: "2 วันเรียนอะไรบ้าง",
        paragraphs: [
          "สองวันเต็มที่สตูดิโอ อุปกรณ์จัดเตรียมไว้ให้ก่อนคุณมาถึง วันแรกคือเทคนิคและการฝึกมือ วันที่สองฝึกบนหุ่น แล้วปิดท้ายด้วยการต่อเซตจริงให้นางแบบ โดยมีครูหญิงอยู่ข้าง ๆ คอยแก้ให้ทันที",
        ],
        bullets: [
          "อุปกรณ์มีให้ครบทั้งสองวัน",
          "เซตสไตล์ไทยและสไตล์สากล",
          "เทคนิควอลลุ่มและการออกแบบทรงให้เข้ากับรูปตา",
          "วันที่สอง: ฝึกบนหุ่น แล้วลงมือกับนางแบบจริง",
          "จบแล้วได้ใบประกาศ",
        ],
      },
      {
        heading: "คอร์สนี้เหมาะกับใคร",
        paragraphs: [
          "นักเรียนที่โต๊ะนี้มีสองแบบ ช่างต่อขนตาที่อยากเพิ่มวอลลุ่มและการออกแบบทรงเข้าไปในฝีมือที่มีอยู่แล้ว กับคนที่มาเชียงใหม่แล้วอยากกลับบ้านพร้อมทักษะ ไม่ใช่แค่ของฝาก บอกมาตอนทักว่าคุณเริ่มจากตรงไหน",
        ],
      },
      {
        heading: "ทำไมต้องเรียนที่นี่",
        paragraphs: [
          "คุณเรียนในสตูดิโอที่ทำงานจริง ไม่ใช่ห้องเรียน ทุกเทคนิคที่เห็นคือเทคนิคเดียวกับที่ครูหญิงใช้กับลูกค้าทุกวัน แฟนขนตาทำมือ 100% ทรงที่ออกแบบตามรูปตา และมาตรฐานที่กล้ารับประกันรีทัช 3 วัน เป้าหมายคือคุณกลับไปทำได้จริง",
        ],
      },
    ],
    optionsHeading: "สิ่งที่ได้ฝึก",
    options: [
      { name: "สไตล์ไทย", note: "โครงสร้างและการวางทรงของเซตแบบไทย" },
      { name: "สไตล์สากล", note: "ลุคที่ลูกค้าต่างชาตินิยม วางทรงด้วยหลักเดียวกัน" },
      { name: "วอลลุ่ม", note: "แฟนทำมือ ตั้งแต่พัดแรกจนครบเซต" },
      { name: "การออกแบบทรง", note: "แมปทรงให้เข้ากับรูปตาตรงหน้า" },
    ],
    pricingNote:
      "ค่าคอร์สขึ้นอยู่กับรูปแบบและสิ่งที่รวมอยู่ในคอร์ส จึงแจ้งเป็นรายบุคคล ทักไลน์หรือไอจีพร้อมบอกพื้นฐานที่มีและช่วงวันที่สะดวก ครูหญิงยืนยันราคาก่อนจองเสมอ",
    faqHeading: "คำถามเรื่องคอร์สเรียนต่อขนตา",
    faq: [
      {
        q: "เรียนต่อขนตา ใช้เวลากี่วัน",
        a: "2 วันเต็มที่สตูดิโอสันกลาง วันแรกเทคนิคและฝึกมือ วันที่สองฝึกบนหุ่นแล้วลงมือกับนางแบบจริง",
      },
      {
        q: "ไม่มีพื้นฐาน เรียนได้ไหม",
        a: "ได้ค่ะ ทั้งผู้เริ่มต้นและช่างที่ทำงานอยู่แล้วเรียนคอร์สนี้ บอกมาตอนทักว่าเริ่มจากตรงไหน แล้วสองวันจะถูกวางให้เข้ากับคุณ",
      },
      {
        q: "ได้ฝึกกับคนจริงไหม",
        a: "ได้ค่ะ วันที่สองฝึกบนหุ่นก่อน แล้วต่อเซตจริงให้นางแบบจนครบ",
      },
      {
        q: "ต้องเตรียมอุปกรณ์เองไหม",
        a: "ไม่ต้องค่ะ อุปกรณ์สำหรับทั้งสองวันมีให้ที่สตูดิโอ",
      },
      {
        q: "เรียนจบได้ใบประกาศไหม",
        a: "ได้ค่ะ ใบประกาศจาก My Lash House เมื่อเรียนจบ",
      },
      {
        q: "เรียนต่อขนตา ราคาเท่าไหร่",
        a: "ค่าคอร์สขึ้นอยู่กับรูปแบบคอร์ส จึงแจ้งเป็นรายบุคคลทางไลน์หรือไอจีก่อนจอง",
      },
    ],
    ctaHeading: "สอบถามคอร์สรอบถัดไป",
    ctaText: "ทักไลน์หรือไอจี บอกพื้นฐานที่มีและช่วงวันที่สะดวก ครูหญิงตอบเองค่ะ",
    relatedLinks: [
      { label: "ทรงต่อขนตาแบบไหนเข้ากับรูปตา", href: "/th/blog/tor-khon-ta-baeb-nai-dee" },
      { label: "ต่อขนตาอยู่ได้นานไหม คู่มือฉบับตรง ๆ", href: "/th/blog/tor-khon-ta-yoo-dai-nan-mai" },
    ],
  },
};

export const SERVICE_PAGES: ServicePage[] = [LASH_LIFTING_PAGE, NAILS_PAGE, LASH_TRAINING_PAGE];

export function getServicePage(slug: string): ServicePage | null {
  return SERVICE_PAGES.find((s) => s.slug === slug) ?? null;
}

export function getServiceUrl(page: ServicePage, lang: Lang): string {
  return lang === "th" ? `/th/services/${page.slug}` : `/services/${page.slug}`;
}
