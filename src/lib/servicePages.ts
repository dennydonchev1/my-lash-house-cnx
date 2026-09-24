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
  en: {
    h1: "Lash Lifting in Chiang Mai",
    metaTitle: "Lash Lifting Chiang Mai | Process, Results, Booking - My Lash House",
    metaDescription:
      "Lash lifting in Chiang Mai at My Lash House, San Kamphaeng near Payap University. Naturally curled lashes for 6 to 8 weeks, no extensions. 3-day retouch guarantee, book on LINE or Instagram.",
    eyebrow: "Service",
    quickAnswer:
      "Lash lifting curls your natural lashes upward from the base, lasting 6 to 8 weeks with zero daily maintenance. No synthetic fans, no refill cycle, about 45 minutes in the chair. At My Lash House in San Klang, every lift comes with the same 3-day retouch guarantee as our extension sets.",
    heroImage: "/images/service-wet-look.jpg",
    heroImageAlt: "Naturally curled lashes after a lash lifting treatment at My Lash House Chiang Mai",
    sections: [
      {
        heading: "What happens at your appointment",
        paragraphs: [
          "Seven steps, about 45 minutes, eyes closed the whole time. Many clients fall asleep. That's allowed.",
        ],
        bullets: [
          "Consultation: Ying checks your lash length, condition, and growth angle",
          "Cleanse: oil-free prep so the solution takes evenly",
          "Shield placement: silicone pad sized to your lashes",
          "Combing: lashes set into the shape they'll hold",
          "Lifting solution: 8 to 12 minutes at the base, never the tips",
          "Setting solution: locks in the curl",
          "Optional tint + conditioning treatment",
        ],
      },
      {
        heading: "Who lash lifting suits best",
        paragraphs: [
          "Naturally long but straight lashes get the most dramatic result. Also the right pick for pregnant women avoiding extension adhesive, anyone who wants zero daily maintenance, travelers who want 6 to 8 worry-free weeks, and clients whose eyes have reacted to extension glue before.",
          "Very short or brittle lashes may not lift dramatically. Ying will tell you honestly at consultation, before anything is applied.",
        ],
      },
      {
        heading: "The 3-day retouch guarantee applies here too",
        paragraphs: [
          "If the curl takes unevenly or one eye lifts less than the other in the first three days, message us with photos and we re-lift the affected area free. Same policy as our extension sets, because the standard shouldn't change by service.",
        ],
      },
    ],
    optionsHeading: "Your options",
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
        q: "Where can I get a lash lift near Payap University?",
        a: "My Lash House is in San Klang, San Kamphaeng, walking distance from Payap University and about 10 minutes from the Chiang Mai city centre. Open daily 9:00 to 19:00, walk-ins welcome subject to availability.",
      },
    ],
    ctaHeading: "Book your lash lift",
    ctaText: "Message us on LINE or Instagram with the option you want and your preferred day. Ying confirms the price and slot personally.",
    relatedLinks: [
      { label: "The complete lash lifting guide", href: "/blog/lash-lifting-chiang-mai" },
      { label: "Lash lifting vs extensions, compared honestly", href: "/blog/natural-lash-extensions-chiang-mai" },
    ],
  },
  th: {
    h1: "ลิฟติ้งขนตา เชียงใหม่",
    metaTitle: "ลิฟติ้งขนตา เชียงใหม่ | ขั้นตอน ผลลัพธ์ จองคิว - My Lash House",
    metaDescription:
      "ลิฟติ้งขนตา เชียงใหม่ ที่ My Lash House สันกำแพง ใกล้ ม.พายัพ ขนตางอนธรรมชาติ 6 ถึง 8 สัปดาห์ ไม่ต้องต่อ รับประกันรีทัช 3 วัน จองผ่าน LINE หรือ Instagram",
    eyebrow: "บริการ",
    quickAnswer:
      "ลิฟติ้งขนตาดัดขนตาจริงให้งอนขึ้นจากโคน อยู่ได้ 6 ถึง 8 สัปดาห์โดยไม่ต้องดูแลรายวัน ไม่มีแฟนสังเคราะห์ ไม่มีรอบเติม ใช้เวลาประมาณ 45 นาที ที่ My Lash House สันกลาง ทุกลิฟติ้งมีรับประกันรีทัช 3 วันเหมือนเซตต่อขนตา",
    heroImage: "/images/service-wet-look.jpg",
    heroImageAlt: "ขนตางอนธรรมชาติหลังทำลิฟติ้งขนตาที่ My Lash House เชียงใหม่",
    sections: [
      {
        heading: "วันนัดเป็นยังไง",
        paragraphs: ["7 ขั้นตอน ประมาณ 45 นาที หลับตาตลอด ลูกค้าหลายคนหลับไปเลย อนุญาตค่ะ"],
        bullets: [
          "ปรึกษา: ครูหญิงเช็กความยาว สภาพ และมุมการขึ้นของขนตา",
          "ทำความสะอาด: เตรียมผิวแบบไร้น้ำมันให้น้ำยาจับสม่ำเสมอ",
          "วางแผ่นซิลิโคน: ขนาดพอดีกับขนตาของคุณ",
          "หวีจัดทรง: ขนตาถูกจัดเข้ารูปที่จะคงอยู่",
          "น้ำยาลิฟติ้ง: 8 ถึง 12 นาทีที่โคน ไม่แตะปลาย",
          "น้ำยาเซต: ล็อกความโค้ง",
          "ย้อมสี + บำรุง (ถ้าเลือก)",
        ],
      },
      {
        heading: "ลิฟติ้งเหมาะกับใครที่สุด",
        paragraphs: [
          "ขนตายาวธรรมชาติแต่ตรงได้ผลเด่นที่สุด และเป็นตัวเลือกที่ใช่สำหรับคุณแม่ตั้งครรภ์ที่เลี่ยงกาวต่อขนตา คนที่ไม่อยากดูแลรายวัน นักเดินทางที่อยากสบาย 6 ถึง 8 สัปดาห์ และลูกค้าที่ตาเคยแพ้กาวต่อขนตา",
          "ขนตาสั้นมากหรือเปราะอาจลิฟติ้งไม่เด่น ครูหญิงบอกตรง ๆ ตอนปรึกษา ก่อนเริ่มทำอะไรทั้งนั้น",
        ],
      },
      {
        heading: "รับประกันรีทัช 3 วัน ใช้กับลิฟติ้งด้วย",
        paragraphs: [
          "ถ้าความโค้งขึ้นไม่สม่ำเสมอ หรือตาข้างหนึ่งลิฟติ้งน้อยกว่าอีกข้างใน 3 วันแรก ส่งรูปทักมา เราลิฟติ้งซ้ำบริเวณนั้นให้ฟรี นโยบายเดียวกับเซตต่อขนตา เพราะมาตรฐานไม่ควรเปลี่ยนตามบริการ",
        ],
      },
    ],
    optionsHeading: "ตัวเลือกของคุณ",
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
        q: "ลิฟติ้งขนตา ใกล้ฉัน ที่ไหนดีแถว ม.พายัพ",
        a: "My Lash House อยู่สันกลาง สันกำแพง เดินจาก ม.พายัพได้ ห่างตัวเมืองเชียงใหม่ประมาณ 10 นาที เปิดทุกวัน 9:00 ถึง 19:00 รับ walk-in ตามคิวว่าง",
      },
    ],
    ctaHeading: "จองลิฟติ้งขนตา",
    ctaText: "ทักไลน์หรือไอจีพร้อมตัวเลือกที่ต้องการและวันที่สะดวก ครูหญิงยืนยันราคาและคิวให้เอง",
    relatedLinks: [
      { label: "คู่มือลิฟติ้งขนตาฉบับเต็ม", href: "/th/blog/lifting-khon-ta-chiang-mai" },
      { label: "ลิฟติ้ง vs ต่อขนตา เทียบกันตรง ๆ", href: "/th/blog/tor-khon-ta-baeb-thammachat" },
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

export const SERVICE_PAGES: ServicePage[] = [LASH_LIFTING_PAGE, NAILS_PAGE];

export function getServicePage(slug: string): ServicePage | null {
  return SERVICE_PAGES.find((s) => s.slug === slug) ?? null;
}

export function getServiceUrl(page: ServicePage, lang: Lang): string {
  return lang === "th" ? `/th/services/${page.slug}` : `/services/${page.slug}`;
}
