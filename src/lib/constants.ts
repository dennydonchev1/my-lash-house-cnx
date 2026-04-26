export const BUSINESS = {
  name: "My Lash House",
  fullName: "My Lash House Chiang Mai",
  tagline: "Private Lash Studio · Chiang Mai",
  description:
    "Premium eyelash extensions by a certified artist with 7+ years experience. 100% handmade fans, private studio in San Kamphaeng, Chiang Mai.",
  phone: "085-474-7314",
  phoneTel: "+66854747314",
  email: "",
  line: "@604ymska",
  lineUrl: "https://page.line.me/604ymska",
  instagram: "@my_lash_house.cnx",
  instagramUrl: "https://www.instagram.com/my_lash_house.cnx/",
  facebook: "Mylashhouse29",
  facebookUrl: "https://www.facebook.com/Mylashhouse29/",
  tiktok: "@my_lash_house",
  tiktokUrl: "https://www.tiktok.com/@my_lash_house",
  address: {
    full: "89/117 Pruksa Ville, San Klang, San Kamphaeng, Chiang Mai 50130, Thailand",
    short: "San Kamphaeng, Chiang Mai",
    thai: "89/117 หมู่บ้านพฤกษาวิลล์ ต.สันกลาง อ.สันกำแพง จ.เชียงใหม่ 50130",
  },
  hours: {
    days: "Open Daily",
    time: "10:00 AM – 7:00 PM",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3777.5!2d99.12!3d18.78!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDQ2JzQ4LjAiTiA5OcKwMDcnMTIuMCJF!5e0!3m2!1sen!2sth!4v1",
  googleMapsUrl:
    "https://www.google.com/maps/place/My+Lash+House+Chiang+Mai/@18.7902072,99.1200000",
  rating: 5.0,
  reviewCount: 18,
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "Pricing", href: "#pricing" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const LASH_SERVICES = [
  {
    name: "Classic 1:1",
    thai: "คลาสสิค",
    description:
      "One extension per natural lash for a subtle, natural enhancement. Perfect for first-timers.",
    price: "590",
    image: "/images/service-classic.jpg",
  },
  {
    name: "Natural Look",
    thai: "เนเชอรัล",
    description:
      "Soft, lightweight extensions that mimic your natural lashes — only better.",
    price: "790",
    image: "/images/service-natural.jpg",
  },
  {
    name: "Hybrid",
    thai: "ไฮบริด",
    description:
      "A mix of classic and volume techniques for a textured, dimensional look.",
    price: "990",
    image: "/images/service-hybrid.jpg",
  },
  {
    name: "Classic Volume",
    thai: "คลาสสิควอลลุ่ม",
    description:
      "Hand-crafted fans for noticeable fullness while staying refined.",
    price: "990",
    image: "/images/service-classic-volume.jpg",
  },
  {
    name: "Light Volume",
    thai: "ไลท์วอลลุ่ม",
    description:
      "Soft volume fans for a fluffy, polished look with breathable density.",
    price: "1,090",
    image: "/images/service-light-volume.jpg",
  },
  {
    name: "Mega Volume",
    thai: "เมก้าวอลลุ่ม",
    description:
      "Ultra-fine fans layered for maximum density. Bold, fluffy, head-turning.",
    price: "1,190",
    image: "/images/service-mega.jpg",
  },
  {
    name: "Wet Look",
    thai: "เว็ทลุค",
    description:
      "Spiked, glossy lash clusters for an editorial, just-came-out-of-the-water finish.",
    price: "1,290",
    image: "/images/service-wet-look.jpg",
  },
  {
    name: "Russian Volume",
    thai: "รัสเซียนวอลลุ่ม",
    description:
      "Dense, hand-made Russian-style fans delivering luxurious, fluffy volume.",
    price: "1,390",
    image: "/images/service-russian.jpg",
  },
  {
    name: "Wispy Volume",
    thai: "วิสปี้วอลลุ่ม",
    description:
      "Mixed lengths and spikes for a textured, fluttery, doll-like effect.",
    price: "1,490",
    image: "/images/service-wispy.jpg",
  },
  {
    name: "Strip Lash",
    thai: "สตริปแลช",
    description:
      "Pre-made segments applied for instant drama. The most extra look in the menu.",
    price: "1,590",
    image: "/images/service-strip.jpg",
  },
] as const;

export const LASH_ADDON = {
  name: "Color Lashes",
  thai: "ขนตาสี",
  description:
    "Add a pop of colored lashes to any set — choose from a range of accent shades.",
  price: "150–300",
  image: "/images/service-color.jpg",
} as const;

export const OTHER_SERVICES = [
  {
    name: "Lash Refill",
    thai: "รีฟิลขนตา",
    description: "Maintain your perfect lashes with regular refill appointments.",
    icon: "RefreshCw",
  },
  {
    name: "Lash Lift & Tint",
    thai: "ลิฟติ้งขนตา",
    description:
      "Curl and tint your natural lashes for a low-maintenance, wide-eyed look.",
    icon: "Sparkles",
  },
  {
    name: "Lash Removal",
    thai: "ถอดขนตา",
    description:
      "Safe, gentle removal of extensions without damage to your natural lashes.",
    icon: "Shield",
  },
  {
    name: "Waxing",
    thai: "แว็กซ์",
    description: "Professional waxing services for smooth, clean results.",
    icon: "Flower2",
  },
  {
    name: "Nail Art & Extensions",
    thai: "ต่อเล็บ",
    description:
      "PVC soft gel, French nails, chrome, overlay, and custom nail art designs.",
    icon: "Palette",
  },
  {
    name: "Lash Training",
    thai: "สอนต่อขนตา",
    description:
      "Professional certification courses for aspiring lash artists. Learn handmade fan techniques.",
    icon: "GraduationCap",
  },
] as const;

export const REVIEWS = [
  {
    name: "Risa N.",
    rating: 5,
    text: "My lashes are always beautiful, she listens to clients request and they are durable!",
    date: "2025",
  },
  {
    name: "Orapin S.",
    rating: 5,
    text: "I highly recommend this shop. The eyelash extensions last a long time. The female technician is meticulous. I'm impressed.",
    date: "2025",
  },
  {
    name: "Alexei S.",
    rating: 5,
    text: "Best beautician ever! 10/10! Got me looking fabulous for Songkran!",
    date: "2025",
  },
  {
    name: "Customer",
    rating: 5,
    text: "She accommodates your requests. I really appreciate her care and absolutely love my lashes!",
    date: "2025",
  },
] as const;

export const GALLERY_IMAGES = [
  { src: "/images/service-classic.jpg", alt: "Classic 1:1 lash extensions" },
  { src: "/images/service-natural.jpg", alt: "Natural look lash extensions" },
  { src: "/images/service-hybrid.jpg", alt: "Hybrid lash extensions" },
  { src: "/images/service-classic-volume.jpg", alt: "Classic volume lash extensions" },
  { src: "/images/service-light-volume.jpg", alt: "Light volume lash extensions" },
  { src: "/images/service-mega.jpg", alt: "Mega volume lash extensions" },
  { src: "/images/service-wet-look.jpg", alt: "Wet look lash extensions" },
  { src: "/images/service-russian.jpg", alt: "Russian volume lash extensions" },
  { src: "/images/service-wispy.jpg", alt: "Wispy volume lash extensions" },
  { src: "/images/service-strip.jpg", alt: "Strip lash extensions" },
  { src: "/images/service-color.jpg", alt: "Color lash extensions accent" },
] as const;
