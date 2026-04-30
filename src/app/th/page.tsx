import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import Guarantee from "@/components/Guarantee";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";

export const metadata: Metadata = {
  title: "ต่อขนตา เชียงใหม่ · My Lash House (สันกำแพง) · ราคาเริ่ม 590 บาท",
  description:
    "ร้านต่อขนตา เชียงใหม่ สันกำแพง · ลิฟติ้งขนตา, ขนตาแบบธรรมชาติ, คลาสสิก, วอลลุ่ม, วิสปี้, เมก้า · ราคาเริ่ม 590 บาท · เปิดทุกวัน 10:00-19:00 จองผ่าน LINE",
  keywords: [
    "ต่อขนตา",
    "ต่อขนตา เชียงใหม่",
    "ร้านต่อขนตา",
    "ลิฟติ้งขนตา",
    "ต่อขนตาแบบธรรมชาติ",
    "ต่อขนตาทรงบาร์บี้",
    "ทรงต่อขนตา",
    "ต่อขนตาแบบไหนดี",
    "ขนตา เชียงใหม่",
    "ต่อขนตา สันกำแพง",
    "เมก้าวอลลุ่ม",
    "วิสปี้วอลลุ่ม",
    "รัสเซียนวอลลุ่ม",
  ],
  openGraph: {
    title: "ต่อขนตา เชียงใหม่ · My Lash House",
    description:
      "ร้านต่อขนตาแฮนด์เมด เชียงใหม่ · พัดทำมือ 100% โดยช่างที่ได้รับการรับรอง · ประสบการณ์ 7+ ปี · ราคาเริ่ม 590 บาท",
    url: "https://mylashhouse.com/th",
    siteName: "My Lash House Chiang Mai",
    locale: "th_TH",
    type: "website",
    images: [
      {
        url: "/images/service-mega.jpg",
        width: 1200,
        height: 1200,
        alt: "เมก้าวอลลุ่ม โดย My Lash House เชียงใหม่",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ต่อขนตา เชียงใหม่ · My Lash House",
    description:
      "ร้านต่อขนตาแฮนด์เมด เชียงใหม่ สันกำแพง · ราคาเริ่ม 590 บาท",
    images: ["/images/service-mega.jpg"],
  },
  alternates: {
    canonical: "https://mylashhouse.com/th",
    languages: {
      "en-TH": "https://mylashhouse.com",
      "th-TH": "https://mylashhouse.com/th",
      "x-default": "https://mylashhouse.com",
    },
  },
};

export default function HomeTh() {
  return (
    <>
      <Navbar lang="th" />
      <main>
        <Hero lang="th" />
        <About lang="th" />
        <Services lang="th" />
        <Gallery lang="th" />
        <Pricing lang="th" />
        <Guarantee lang="th" />
        <Reviews lang="th" />
        <FAQ lang="th" />
        <Location lang="th" />
      </main>
      <Footer lang="th" />
      <MobileBookingBar lang="th" />
    </>
  );
}
