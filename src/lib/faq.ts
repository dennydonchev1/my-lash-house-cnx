// Shared FAQ data — used by FAQ component AND FAQPage JSON-LD on home pages.
// Each home page (EN, TH) renders its own FAQPage schema using this data.
// Blog posts render their own FAQPage from BLOG_POSTS[].faq instead.

export const HOME_FAQS = {
  en: [
    {
      q: "Do you offer a guarantee on the lashes?",
      a: "Yes — every set comes with a 3-day retouch guarantee. If your extensions show abnormal shedding within 3 days due to glue failure, we'll retouch them free. The guarantee doesn't cover loss caused by avoidable factors: rubbing the lashes, getting them wet within the first 2 hours, or using oil-based cleansers (always use water-based). Just message us on Instagram within 3 days with a clear photo and we'll set up your retouch.",
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
      a: "We're a private home studio in San Klang, near Payap University in Chiang Mai — about 10 minutes from the city center, just one ring road out from the superhighway. The official address is 89/117 Pruksa Ville. When you book we'll send you the exact map pin so it's easy to find.",
    },
    {
      q: "Do you offer lash training courses?",
      a: "Yes! We offer professional certification courses for aspiring lash artists. You'll learn handmade fan techniques from a certified instructor with 7+ years of experience. Contact us for course details and scheduling.",
    },
  ],
  th: [
    {
      q: "มีรับประกันขนตาไหม?",
      a: "มีค่ะ — ทุกเซ็ตรับประกันรีทัช 3 วัน หากขนตาหลุดผิดปกติภายใน 3 วันหลังต่อ เนื่องจากปัญหากาว เราจะรีทัชให้ฟรี การรับประกันไม่ครอบคลุมการหลุดที่เกิดจาก: การขยี้ตา โดนน้ำภายใน 2 ชั่วโมงแรก หรือใช้คลีนเซอร์/เมคอัพรีมูฟเวอร์ที่มีน้ำมัน (ให้ใช้สูตรน้ำเท่านั้น) ทักมาทาง Instagram ภายใน 3 วันพร้อมรูปขนตาที่ชัด แล้วเราจะนัดรีทัชให้ค่ะ",
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
      q: "ร้านอยู่ที่ไหน หาง่ายไหม?",
      a: "ร้านอยู่ใน ต.สันกลาง ใกล้ ม.พายัพ ห่างจากตัวเมืองเชียงใหม่ประมาณ 10 นาที — เลยซูเปอร์ไฮเวย์ออกมาแค่วงในเดียว ที่อยู่ทางการคือ 89/117 หมู่บ้านพฤกษาวิลล์ ต.สันกลาง อ.สันกำแพง จ.เชียงใหม่ เป็นโฮมสตูดิโอส่วนตัว เมื่อจองคิวแล้วจะส่งพิกัดบน Google Maps ให้ค่ะ",
    },
    {
      q: "มีคอร์สสอนต่อขนตาไหม?",
      a: "มีค่ะ คอร์สสอนต่อขนตามืออาชีพ มีใบประกาศรับรอง สอนเทคนิคทำพัดด้วยมือจากครูที่มีประสบการณ์ 7+ ปี ติดต่อสอบถามรายละเอียดและตารางเรียนได้",
    },
  ],
} as const;

export function buildFaqJsonLd(lang: "en" | "th") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS[lang].map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
