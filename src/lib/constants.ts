export const BUSINESS = {
  name: "My Lash House",
  fullName: "My Lash House Chiang Mai",
  tagline: "Private Lash Studio · Chiang Mai",
  description:
    "Premium eyelash extensions by a certified artist with 7+ years experience. 100% handmade fans, private studio in San Kamphaeng, Chiang Mai.",
  phone: "085-474-7314",
  phoneTel: "+66854747314",
  email: "",
  line: "@164sepuk",
  lineUrl: "https://line.me/R/ti/p/@164sepuk",
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
    name: "Classic (1D)",
    thai: "คลาสสิค",
    description:
      "One extension per natural lash for a subtle, natural enhancement. Perfect for first-timers.",
    priceRange: "490–790",
    image: "/images/classic.jpg",
  },
  {
    name: "2D Volume",
    thai: "2D",
    description:
      "Two ultra-fine extensions per natural lash. A soft, slightly fuller look while staying natural.",
    priceRange: "690–890",
    image: "/images/2d.jpg",
  },
  {
    name: "3D Volume",
    thai: "3D",
    description:
      "Three extensions per lash for noticeable fullness. The most popular choice for everyday glam.",
    priceRange: "790–990",
    image: "/images/3d.jpg",
  },
  {
    name: "4D Volume",
    thai: "4D",
    description:
      "Four extensions per lash delivering lush, dramatic volume. Ideal for a bold, striking look.",
    priceRange: "890–1,090",
    image: "/images/4d.jpg",
  },
  {
    name: "5D Volume",
    thai: "5D",
    description:
      "Five extensions per lash for luxurious density. Full, fluffy, and head-turning.",
    priceRange: "990–1,190",
    image: "/images/5d.jpg",
  },
  {
    name: "Mega Volume",
    thai: "เมก้า",
    description:
      "Maximum volume with ultra-fine fans. The ultimate dramatic lash set for special occasions.",
    priceRange: "1,190–1,390",
    image: "/images/mega.jpg",
  },
] as const;

export const LASH_STYLES = [
  "Natural",
  "Cat Eye",
  "Doll Eye",
  "Wispy Volume",
  "Color Lashes",
] as const;

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
  { src: "/images/gallery-1.jpg", alt: "Wispy volume cat eye lash extensions", category: "volume" },
  { src: "/images/gallery-2.jpg", alt: "Classic natural lash extensions close-up", category: "classic" },
  { src: "/images/gallery-3.jpg", alt: "Mega volume dramatic lash set", category: "mega" },
  { src: "/images/gallery-4.jpg", alt: "Doll eye lash extension style", category: "volume" },
  { src: "/images/gallery-5.jpg", alt: "Natural look lash extensions", category: "classic" },
  { src: "/images/gallery-6.jpg", alt: "Wispy volume lash extensions", category: "volume" },
  { src: "/images/gallery-7.jpg", alt: "Custom nail art design", category: "nails" },
  { src: "/images/gallery-8.jpg", alt: "Cat eye lash extension style", category: "volume" },
] as const;
