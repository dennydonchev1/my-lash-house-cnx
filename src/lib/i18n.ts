// Translation dictionaries for English (default) and Thai
// Keep keys identical between locales — components pull `t` from here.

export type Lang = "en" | "th";

export const dict = {
  en: {
    nav: {
      services: "Services",
      gallery: "Gallery",
      pricing: "Pricing",
      reviews: "Reviews",
      contact: "Contact",
      bookNow: "Book Now",
      bookOnInstagram: "Book on Instagram",
    },
    hero: {
      ratedBadge: "★★★★★ 5.0 Rated",
      guaranteeBadge: "3-Day Retouch Guarantee",
      seoSubhead: "Lash Extensions in Chiang Mai · ต่อขนตา เชียงใหม่",
      tagline: "Private Studio · Near Payap University",
      usp1: "100% Handmade Fans",
      usp2: "Certified Artist",
      usp3: "7+ Years Experience",
      ctaPrimary: "Book on Instagram",
      ctaSecondary: "View Services",
    },
    about: {
      eyebrow: "About the Artist",
      heading: "Meet ",
      headingHighlight: "Ying",
      p1: "Hi, I'm Ying — a certified lash artist with over 7 years of experience creating custom eyelash extensions in Chiang Mai. I run My Lash House as a private studio just minutes from the city center, near Payap University. Every appointment is one-on-one and every fan is handmade during your session.",
      p2: "I'm certified in advanced techniques and constantly refining my craft through workshops and training. Quality, comfort, and lash health come first — never premade fans, never rushed work.",
      p3: "Whether you want a subtle natural enhancement or dramatic mega volume, my studio is your space to relax, recharge, and leave feeling your absolute best.",
      badges: ["Certified Artist", "100% Handmade", "Private Studio", "7+ Years"],
    },
    services: {
      eyebrow: "Our Services",
      heading: "Lash Extensions",
      headingHighlight: "ต่อขนตา",
      intro:
        "Choose your perfect volume — from subtle classics to dramatic mega sets. Every fan is handmade during your appointment for a truly custom fit.",
      bookCta: "Book",
      addonLabel: "Add-on",
      moreServicesHeading: "More Services",
    },
    gallery: {
      eyebrow: "Our Work",
      heading: "Lash ",
      headingHighlight: "Gallery",
      intro: "Every set is unique — designed for your eye shape and personal style.",
      instagramCta: "See More on Instagram",
    },
    pricing: {
      eyebrow: "Pricing",
      heading: "Transparent ",
      headingHighlight: "Pricing",
      intro:
        "Prices vary by lash length and style. All sets include a consultation and aftercare guidance.",
      tableStyle: "Style",
      tablePrice: "Price (THB)",
      addonLabel: "Add-on",
      includedHeading: "Included with Every Set",
      included: [
        "Personal consultation",
        "Custom style design",
        "100% handmade fans",
        "Aftercare guidance",
      ],
      ctaButton: "Book Your Appointment",
    },
    guarantee: {
      eyebrow: "Our Promise",
      heading: "3-Day Retouch ",
      headingHighlight: "Guarantee",
      subhead:
        "We stand behind every set we craft. Notice unusual shedding within 3 days of your appointment? We'll retouch you free — no hassle, no questions about who's at fault if it's a glue issue.",
      coveredLabel: "What's covered",
      coveredItems: [
        "Premature glue failure",
        "Abnormal shedding within 3 days",
        "Workmanship issues",
      ],
      notCoveredLabel: "Not covered",
      notCoveredItems: [
        "Rubbing or pulling at lashes",
        "Water exposure within 2 hours",
        "Oil-based cleansers (use water-based only)",
      ],
      howToClaimLabel: "How to claim",
      howToClaimText:
        "DM us on Instagram within 3 days of your appointment with a clear photo. We'll book your free retouch.",
      ctaLabel: "Message us on Instagram",
    },
    reviews: {
      eyebrow: "Reviews",
      heading: "What clients ",
      headingHighlight: "say",
      googleCta: "Read reviews on Google",
    },
    faq: {
      eyebrow: "FAQ",
      heading: "Frequently Asked ",
      headingHighlight: "Questions",
    },
    location: {
      eyebrow: "Visit Us",
      heading: "Find ",
      headingHighlight: "My Lash House",
      studioLabel: "Studio Location",
      hoursLabel: "Hours",
      bookHeading: "Book Your Appointment",
      directionsLink: "Get Directions on Google Maps",
    },
    footer: {
      tagline: "Premium handmade eyelash extensions · Near Payap University, Chiang Mai.",
      navHeading: "Navigate",
      connectHeading: "Connect",
      copyright: "All rights reserved.",
    },
    mobileBar: {
      cta: "Book on Instagram",
    },
  },
  th: {
    nav: {
      services: "บริการ",
      gallery: "ผลงาน",
      pricing: "ราคา",
      reviews: "รีวิว",
      contact: "ติดต่อ",
      bookNow: "จองคิว",
      bookOnInstagram: "ทักทาง Instagram",
    },
    hero: {
      ratedBadge: "★★★★★ คะแนน 5.0",
      guaranteeBadge: "รับประกันรีทัช 3 วัน",
      seoSubhead: "ต่อขนตา เชียงใหม่ · ใกล้ ม.พายัพ",
      tagline: "สตูดิโอส่วนตัว · ใกล้ ม.พายัพ",
      usp1: "ขนตาแฮนด์เมด 100%",
      usp2: "ช่างที่ได้รับการรับรอง",
      usp3: "ประสบการณ์ 7+ ปี",
      ctaPrimary: "ทักทาง Instagram",
      ctaSecondary: "ดูบริการ",
    },
    about: {
      eyebrow: "เกี่ยวกับช่าง",
      heading: "ทำความรู้จักกับ ",
      headingHighlight: "ครูหญิง",
      p1: "สวัสดีค่ะ ครูหญิงเองค่ะ — ช่างต่อขนตาที่ได้รับการรับรอง ประสบการณ์มากกว่า 7 ปี ในเชียงใหม่ ที่ My Lash House เป็นสตูดิโอส่วนตัว ใกล้ ม.พายัพ ห่างจากตัวเมืองเชียงใหม่เพียงไม่กี่นาที รับลูกค้าครั้งละหนึ่งท่าน ทุกพัด (fan) ทำสดด้วยมือระหว่างการต่อ ไม่ใช้ pre-made",
      p2: "ครูหญิงได้รับการรับรองในเทคนิคขั้นสูง และพัฒนาฝีมืออย่างต่อเนื่องผ่านเวิร์กช็อปและคอร์สเทรนนิ่ง คุณภาพ ความสบาย และสุขภาพขนตามาเป็นอันดับแรกเสมอ — ไม่เร่ง ไม่ใช้ขนตาสำเร็จรูป",
      p3: "ไม่ว่าคุณจะอยากได้ลุคธรรมชาติแบบเบา ๆ หรือเมก้าวอลลุ่มแบบจัดเต็ม สตูดิโอของเราคือที่ที่คุณจะได้พักผ่อนและกลับไปอย่างสวยมั่นใจ",
      badges: ["ช่างได้รับการรับรอง", "ขนตาแฮนด์เมด 100%", "สตูดิโอส่วนตัว", "ประสบการณ์ 7+ ปี"],
    },
    services: {
      eyebrow: "บริการของเรา",
      heading: "ต่อขนตา ",
      headingHighlight: "เชียงใหม่",
      intro:
        "เลือกสไตล์ที่ใช่สำหรับคุณ — ตั้งแต่คลาสสิกแบบธรรมชาติ ไปจนถึงเมก้าวอลลุ่มจัดเต็ม ทุกพัดทำสดด้วยมือในวันที่คุณมาต่อ ปรับให้เข้ากับรูปดวงตาของคุณโดยเฉพาะ",
      bookCta: "จอง",
      addonLabel: "ออปชั่นเสริม",
      moreServicesHeading: "บริการอื่น ๆ",
    },
    gallery: {
      eyebrow: "ผลงานของเรา",
      heading: "แกลเลอรี่",
      headingHighlight: "ขนตา",
      intro: "ทุกเซ็ตต่อขึ้นมาเฉพาะคุณ — ออกแบบให้เข้ากับรูปดวงตาและสไตล์ของคุณ",
      instagramCta: "ดูเพิ่มเติมบน Instagram",
    },
    pricing: {
      eyebrow: "ราคา",
      heading: "ราคา",
      headingHighlight: "ชัดเจน",
      intro:
        "ราคาขึ้นอยู่กับความยาวและสไตล์ขนตา ทุกเซ็ตรวมการให้คำปรึกษาและคำแนะนำการดูแลหลังต่อ",
      tableStyle: "สไตล์",
      tablePrice: "ราคา (บาท)",
      addonLabel: "ออปชั่นเสริม",
      includedHeading: "ทุกเซ็ตรวม",
      included: [
        "ปรึกษาส่วนตัว",
        "ออกแบบสไตล์เฉพาะคุณ",
        "ขนตาแฮนด์เมด 100%",
        "คำแนะนำการดูแลรักษา",
      ],
      ctaButton: "จองคิวต่อขนตา",
    },
    guarantee: {
      eyebrow: "คำสัญญาของเรา",
      heading: "รับประกัน",
      headingHighlight: "รีทัช 3 วัน",
      subhead:
        "เรามั่นใจในทุกเซ็ตที่เราต่อ หากขนตาหลุดผิดปกติภายใน 3 วันหลังต่อจากปัญหากาว เราจะรีทัชให้ฟรี ไม่ต้องลังเล",
      coveredLabel: "สิ่งที่ครอบคลุม",
      coveredItems: [
        "กาวเสื่อมสภาพก่อนเวลา",
        "ขนตาหลุดผิดปกติภายใน 3 วัน",
        "ปัญหาที่เกิดจากฝีมือช่าง",
      ],
      notCoveredLabel: "สิ่งที่ไม่ครอบคลุม",
      notCoveredItems: [
        "การขยี้หรือดึงขนตา",
        "โดนน้ำภายใน 2 ชั่วโมง",
        "คลีนเซอร์ที่มีน้ำมัน (ให้ใช้สูตรน้ำเท่านั้น)",
      ],
      howToClaimLabel: "วิธีรับการรับประกัน",
      howToClaimText:
        "ทักมาทาง Instagram ภายใน 3 วันหลังต่อ พร้อมรูปขนตาที่ชัด เราจะนัดรีทัชให้ฟรี",
      ctaLabel: "ทักมาทาง Instagram",
    },
    reviews: {
      eyebrow: "รีวิว",
      heading: "ลูกค้าของเรา",
      headingHighlight: "พูดว่า",
      googleCta: "อ่านรีวิวบน Google",
    },
    faq: {
      eyebrow: "คำถามที่พบบ่อย",
      heading: "คำถามที่",
      headingHighlight: "พบบ่อย",
    },
    location: {
      eyebrow: "ที่ตั้งร้าน",
      heading: "ค้นหา ",
      headingHighlight: "My Lash House",
      studioLabel: "ที่ตั้งสตูดิโอ",
      hoursLabel: "เวลาทำการ",
      bookHeading: "จองคิวต่อขนตา",
      directionsLink: "ดูเส้นทางบน Google Maps",
    },
    footer: {
      tagline: "ต่อขนตาแฮนด์เมดพรีเมียม · ใกล้ ม.พายัพ เชียงใหม่",
      navHeading: "เมนู",
      connectHeading: "ช่องทางติดต่อ",
      copyright: "สงวนลิขสิทธิ์",
    },
    mobileBar: {
      cta: "ทักทาง Instagram",
    },
  },
} as const;

export type Dict = typeof dict.en;

export const NAV_LINKS_BY_LANG = {
  en: [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "Pricing", href: "#pricing" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ],
  th: [
    { label: "บริการ", href: "#services" },
    { label: "ผลงาน", href: "#gallery" },
    { label: "ราคา", href: "#pricing" },
    { label: "รีวิว", href: "#reviews" },
    { label: "ติดต่อ", href: "#contact" },
  ],
} as const;
