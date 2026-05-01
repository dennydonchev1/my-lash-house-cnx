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
import { buildFaqJsonLd } from "@/lib/faq";

export default function Home() {
  const faqSchema = buildFaqJsonLd("en");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar lang="en" />
      <main>
        <Hero lang="en" />
        <About lang="en" />
        <Services lang="en" />
        <Gallery lang="en" />
        <Pricing lang="en" />
        <Guarantee lang="en" />
        <Reviews lang="en" />
        <FAQ lang="en" />
        <Location lang="en" />
      </main>
      <Footer lang="en" />
      <MobileBookingBar lang="en" />
    </>
  );
}
