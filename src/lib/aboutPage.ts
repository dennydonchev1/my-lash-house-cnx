import type { Lang } from "@/lib/i18n";

/** Content for the About Ying page (/about and /th/about).
    Facts only from Ying's certificates, the contest photos and the studio photos
    Dennis supplied (Nov 2026). Contests: competed only, never award wording. */

export type AboutPhoto = { src: string; alt: string; caption: string };

export type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string[];
  portrait: AboutPhoto;
  cert: {
    heading: string;
    paragraphs: string[];
    competencies: string[];
    photo: AboutPhoto;
    verifyNote: string;
  };
  contests: { heading: string; paragraphs: string[]; photos: AboutPhoto[] };
  teaching: { heading: string; paragraphs: string[]; photos: AboutPhoto[]; cta: string; ctaHref: string };
  studio: { heading: string; paragraphs: string[]; photos: AboutPhoto[] };
  work: { heading: string; paragraphs: string[]; photos: AboutPhoto[] };
  ctaHeading: string;
  ctaText: string;
  homeLabel: string;
};

export const ABOUT_PAGE: Record<Lang, AboutContent> = {
  en: {
    metaTitle: "About Ying: Certified Lash Artist in Chiang Mai | My Lash House",
    metaDescription:
      "Meet Ying (Wanchanok Kaewdanklang), founder of My Lash House Chiang Mai: TPQI Level 3 certified eyelash technician, lash competitor and trainer, 7+ years.",
    eyebrow: "About Ying",
    h1: "Meet Ying, the Lash Artist Behind My Lash House",
    intro: [
      "Ying (Wanchanok Kaewdanklang) is the lash artist and founder of My Lash House, a private one-on-one studio in San Klang, Chiang Mai. She has spent 7+ years at the lash bed, makes every fan by hand, and maps every set to the eyes in front of her.",
      "This page is the proof behind that: her national qualification, the competitions she has entered, the artists she trains, and the studio you will walk into.",
    ],
    portrait: {
      src: "/images/ying-lash-artist-hab-contest-2022.webp",
      alt: "Ying, founder of My Lash House, at the HAB Southern International Contest 2022 in Phuket",
      caption: "Ying at the HAB Southern International Contest 2022, Phuket",
    },
    cert: {
      heading: "Nationally certified: Eyelash Technician, Level 3",
      paragraphs: [
        "In July 2024 Ying passed Thailand's national professional qualification for eyelash technicians at Level 3, awarded by the Thailand Professional Qualification Institute (TPQI), a public organization. The assessment was run by the Beauty Culture and Tailoring School Association and covers four competencies:",
      ],
      competencies: [
        "Analysing the skin around the eyes and the structure of the face to design the lash shape",
        "Preparing clean materials and tools that will not cause allergies, sterilized to international hygiene standards",
        "Applying lash extensions with skill, beauty and safety, to international hygiene standards",
        "Advising clients on how to care for their lashes correctly and hygienically after the appointment",
      ],
      photo: {
        src: "/images/about/ying-tpqi-eyelash-technician-level-3-certificate.webp",
        alt: "TPQI Certificate of Competency and Certificate of Professional Qualification for Wanchanok Kaewdanklang, eyelash technician Level 3",
        caption: "Certificate of Competency and Certificate of Professional Qualification, TPQI, issued 1 August 2024",
      },
      verifyNote: "Both certificates carry a QR code, so anyone can check them with TPQI.",
    },
    contests: {
      heading: "On the competition floor",
      paragraphs: [
        "Competitions are where lash artists put their work in front of judges. Ying has competed at the HAB Southern International Contest 2022 in Phuket and at the Northern Beauty Contest, Championship to Regionals PMU 2023, in Chiang Mai.",
      ],
      photos: [
        {
          src: "/images/about/ying-northern-beauty-contest-2023-chiang-mai.webp",
          alt: "Ying with her certificate at the Northern Beauty Contest, Championship to Regionals PMU 2023 in Chiang Mai",
          caption: "Northern Beauty Contest 2023, Chiang Mai",
        },
      ],
    },
    teaching: {
      heading: "Teaching the next artists",
      paragraphs: [
        "Ying also trains other lash artists. Her Advanced Volume Eyelash Extension Course runs over two days in the studio: technique first, then a mannequin, then a full set on a live model, with a My Lash House Certificate of Completion at the end. Thai and international students have trained with her.",
      ],
      photos: [
        {
          src: "/images/course/lash-course-graduate-certificate-chiang-mai.webp",
          alt: "A lash course graduate holding her My Lash House certificate with Ying",
          caption: "Certificate day for a Thai graduate",
        },
        {
          src: "/images/course/lash-course-mannequin-session-chiang-mai.webp",
          alt: "Ying guiding a student through mannequin practice in the lash training course",
          caption: "Mannequin practice, with Ying beside the student",
        },
      ],
      cta: "See the lash course",
      ctaHref: "/services/lash-training",
    },
    studio: {
      heading: "The studio you'll walk into",
      paragraphs: [
        "My Lash House is a private studio in a house in Pruksa Ville, San Klang, near Payap University. Look for the My Lash House sign by the front door. Shoes come off at the rack, as in most Thai homes and studios, and then it's one calm room with two lash beds and a nail corner.",
        "Open daily, 10:00 to 19:00. Message on LINE to book your time.",
      ],
      photos: [
        {
          src: "/images/studio/my-lash-house-studio-entrance-chiang-mai.webp",
          alt: "Front door of My Lash House lash studio in Pruksa Ville, San Klang, Chiang Mai, with the studio sign and shoe rack",
          caption: "The front door: look for the sign, shoes off at the rack",
        },
        {
          src: "/images/studio/my-lash-house-studio-interior-chiang-mai.webp",
          alt: "Inside My Lash House studio in Chiang Mai: two lash beds, a nail station and a calm, bright room",
          caption: "Inside: two lash beds and the nail corner",
        },
        {
          src: "/images/studio/ying-applying-lash-extensions-my-lash-house.webp",
          alt: "Ying applying lash extensions to a client under a ring light at My Lash House",
          caption: "Ying at work",
        },
      ],
    },
    work: {
      heading: "Her work",
      paragraphs: [
        "A few sets from the studio's Instagram. Every one was mapped to the client's eyes and built with handmade fans.",
      ],
      photos: [
        {
          src: "/images/blog/y-lash-extensions-close-up-my-lash-house.webp",
          alt: "Close-up of a Y lash (YY) extension set by My Lash House Chiang Mai",
          caption: "Y lashes (YY), real work by Ying",
        },
        {
          src: "/images/about/my-lash-house-lash-extension-portfolio.webp",
          alt: "Collage of My Lash House lash extension sets: a client portrait, blue color lashes, volume and wispy sets",
          caption: "From natural sets to color",
        },
        {
          src: "/images/about/lash-extension-application-steps-my-lash-house.webp",
          alt: "Three stages of a lash extension appointment at My Lash House: natural lashes, half applied, finished set",
          caption: "Bare lashes, halfway, finished",
        },
      ],
    },
    ctaHeading: "Book with Ying",
    ctaText: "Send a photo of your eyes and the look you like on LINE or Instagram. Ying answers personally.",
    homeLabel: "Home",
  },
  th: {
    metaTitle: "รู้จักครูหญิง ช่างต่อขนตาคุณวุฒิวิชาชีพ ระดับ 3 | My Lash House",
    metaDescription:
      "รู้จักครูหญิง (วรรณชนก แก้วด่านกลาง) ผู้ก่อตั้ง My Lash House เชียงใหม่ ช่างต่อขนตาคุณวุฒิวิชาชีพระดับ 3 เคยลงแข่งขันต่อขนตา และสอนช่างรุ่นใหม่",
    eyebrow: "เกี่ยวกับครูหญิง",
    h1: "รู้จักครูหญิง ช่างต่อขนตาผู้ก่อตั้ง My Lash House",
    intro: [
      "ครูหญิง (วรรณชนก แก้วด่านกลาง) คือช่างต่อขนตาและผู้ก่อตั้ง My Lash House สตูดิโอต่อขนตาส่วนตัวแบบ 1 ต่อ 1 ที่สันกลาง เชียงใหม่ ประสบการณ์ 7 ปีขึ้นไป ทำแฟนขนตาด้วยมือทุกแฟน และออกแบบทรงให้เข้ากับตาของลูกค้าทุกคน",
      "หน้านี้คือหลักฐานเบื้องหลังทั้งหมด ทั้งคุณวุฒิวิชาชีพ งานแข่งขันที่เคยลง ช่างที่ครูหญิงสอน และสตูดิโอที่คุณจะได้มา",
    ],
    portrait: {
      src: "/images/ying-lash-artist-hab-contest-2022.webp",
      alt: "ครูหญิง ผู้ก่อตั้ง My Lash House ในงาน HAB Southern International Contest 2022 ที่ภูเก็ต",
      caption: "ครูหญิงในงาน HAB Southern International Contest 2022 ภูเก็ต",
    },
    cert: {
      heading: "ช่างต่อขนตาคุณวุฒิวิชาชีพ ระดับ 3",
      paragraphs: [
        "เดือนกรกฎาคม 2567 ครูหญิงผ่านการประเมินและได้รับประกาศนียบัตรคุณวุฒิวิชาชีพ อาชีพช่างต่อขนตา ระดับ 3 จากสถาบันคุณวุฒิวิชาชีพ (องค์การมหาชน) ประเมินโดยสมาคมโรงเรียนเสริมสวยและตัดเย็บเสื้อผ้า ครอบคลุม 4 สมรรถนะ",
      ],
      competencies: [
        "วิเคราะห์สภาพผิวรอบดวงตา และวิเคราะห์โครงหน้าเพื่อออกแบบทรงขนตา",
        "จัดเตรียมวัสดุและอุปกรณ์ที่สะอาด ไม่ก่อให้เกิดอาการแพ้ และทำความสะอาดให้ปราศจากเชื้อตามมาตรฐานสากล",
        "ต่อขนตาด้วยความเชี่ยวชาญ สวยงาม และปลอดภัยตามหลักสุขอนามัยมาตรฐานสากล",
        "ให้คำแนะนำการดูแลเส้นขนตาอย่างถูกวิธีและถูกหลักอนามัยหลังการต่อขนตา",
      ],
      photo: {
        src: "/images/about/ying-tpqi-eyelash-technician-level-3-certificate.webp",
        alt: "หนังสือรับรองสมรรถนะและประกาศนียบัตรคุณวุฒิวิชาชีพ ช่างต่อขนตา ระดับ 3 ของนางสาววรรณชนก แก้วด่านกลาง จากสถาบันคุณวุฒิวิชาชีพ",
        caption: "หนังสือรับรองสมรรถนะและประกาศนียบัตรคุณวุฒิวิชาชีพ ให้ไว้ ณ วันที่ 1 สิงหาคม 2567",
      },
      verifyNote: "ประกาศนียบัตรทั้งสองใบมี QR code ตรวจสอบกับสถาบันคุณวุฒิวิชาชีพได้",
    },
    contests: {
      heading: "บนเวทีแข่งขันต่อขนตา",
      paragraphs: [
        "งานแข่งขันคือที่ที่ช่างต่อขนตานำผลงานขึ้นให้กรรมการตัดสิน ครูหญิงเคยลงแข่งขันในงาน HAB Southern International Contest 2022 ที่ภูเก็ต และ Northern Beauty Contest, Championship to Regionals PMU 2023 ที่เชียงใหม่",
      ],
      photos: [
        {
          src: "/images/about/ying-northern-beauty-contest-2023-chiang-mai.webp",
          alt: "ครูหญิงกับใบประกาศในงาน Northern Beauty Contest, Championship to Regionals PMU 2023 ที่เชียงใหม่",
          caption: "Northern Beauty Contest 2023 เชียงใหม่",
        },
      ],
    },
    teaching: {
      heading: "สอนช่างรุ่นใหม่",
      paragraphs: [
        "ครูหญิงสอนช่างต่อขนตาด้วย คอร์ส Advanced Volume Eyelash Extension เรียน 2 วันที่สตูดิโอ เริ่มจากเทคนิค ฝึกบนหุ่น แล้วต่อเซตเต็มให้นางแบบจริง จบแล้วได้ใบประกาศ Certificate of Completion จาก My Lash House มีทั้งนักเรียนคนไทยและต่างชาติ",
      ],
      photos: [
        {
          src: "/images/course/lash-course-graduate-certificate-chiang-mai.webp",
          alt: "นักเรียนคอร์สต่อขนตาถือใบประกาศนียบัตร My Lash House คู่กับครูหญิง",
          caption: "วันรับใบประกาศของนักเรียนคนไทย",
        },
        {
          src: "/images/course/lash-course-mannequin-session-chiang-mai.webp",
          alt: "ครูหญิงสอนนักเรียนฝึกต่อขนตาบนหุ่นในคอร์สเรียน",
          caption: "ฝึกบนหุ่น มีครูหญิงอยู่ข้าง ๆ",
        },
      ],
      cta: "ดูรายละเอียดคอร์สเรียนต่อขนตา",
      ctaHref: "/th/services/lash-training",
    },
    studio: {
      heading: "สตูดิโอที่คุณจะได้มา",
      paragraphs: [
        "My Lash House เป็นสตูดิโอส่วนตัวในบ้านที่พฤกษาวิลล์ สันกลาง ใกล้มหาวิทยาลัยพายัพ มองหาป้าย My Lash House หน้าประตู ถอดรองเท้าไว้ที่ชั้นวาง แล้วเข้ามาในห้องสงบ ๆ ที่มีเตียงต่อขนตา 2 เตียงและมุมทำเล็บ",
        "เปิดทุกวัน 10:00 ถึง 19:00 ทักไลน์จองเวลาก่อนมานะคะ",
      ],
      photos: [
        {
          src: "/images/studio/my-lash-house-studio-entrance-chiang-mai.webp",
          alt: "หน้าประตูร้านต่อขนตา My Lash House พฤกษาวิลล์ สันกลาง เชียงใหม่ พร้อมป้ายร้านและชั้นวางรองเท้า",
          caption: "หน้าร้าน มองหาป้าย ถอดรองเท้าไว้ที่ชั้นวาง",
        },
        {
          src: "/images/studio/my-lash-house-studio-interior-chiang-mai.webp",
          alt: "ภายในร้านต่อขนตา My Lash House เชียงใหม่ เตียงต่อขนตา 2 เตียงและมุมทำเล็บ",
          caption: "ภายในร้าน เตียงต่อขนตา 2 เตียงและมุมทำเล็บ",
        },
        {
          src: "/images/studio/ying-applying-lash-extensions-my-lash-house.webp",
          alt: "ครูหญิงกำลังต่อขนตาให้ลูกค้าที่ My Lash House",
          caption: "ครูหญิงขณะทำงาน",
        },
      ],
    },
    work: {
      heading: "ผลงานของครูหญิง",
      paragraphs: ["ตัวอย่างงานจากไอจีของร้าน ทุกเซตออกแบบตามตาลูกค้า และใช้แฟนทำมือ"],
      photos: [
        {
          src: "/images/blog/y-lash-extensions-close-up-my-lash-house.webp",
          alt: "ต่อขนตาแกน Y (YY) ภาพใกล้ ผลงาน My Lash House เชียงใหม่",
          caption: "ขนตาแกน Y (YY) ผลงานครูหญิง",
        },
        {
          src: "/images/about/my-lash-house-lash-extension-portfolio.webp",
          alt: "รวมผลงานต่อขนตา My Lash House ทั้งลุคธรรมชาติ ขนตาสีน้ำเงิน วอลลุ่ม และสายฝอ",
          caption: "ตั้งแต่ลุคธรรมชาติจนถึงขนตาสี",
        },
        {
          src: "/images/about/lash-extension-application-steps-my-lash-house.webp",
          alt: "สามขั้นตอนการต่อขนตาที่ My Lash House ขนตาจริง ต่อไปครึ่งหนึ่ง และเซตที่เสร็จแล้ว",
          caption: "ก่อนต่อ ระหว่างต่อ และเสร็จแล้ว",
        },
      ],
    },
    ctaHeading: "จองคิวกับครูหญิง",
    ctaText: "ส่งรูปตาของคุณกับลุคที่ชอบมาทางไลน์หรือไอจี ครูหญิงตอบเองค่ะ",
    homeLabel: "หน้าแรก",
  },
};
