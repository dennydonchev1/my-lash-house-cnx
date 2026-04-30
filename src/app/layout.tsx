import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { BUSINESS } from "@/lib/constants";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mylashhouse.com"),
  title: "Lash Extensions Chiang Mai · 100% Handmade Fans · My Lash House",
  description:
    "Premium eyelash extensions in San Kamphaeng, Chiang Mai. 100% handmade fans by a certified artist with 7+ years experience. Open daily 10am–7pm. Book on LINE.",
  keywords: [
    "lash extensions chiang mai",
    "eyelash extensions chiang mai",
    "lashes chiang mai",
    "lash lift chiang mai",
    "eyelash salon chiang mai",
    "san kamphaeng lash",
    "my lash house cnx",
    "ต่อขนตา",
    "ต่อขนตา เชียงใหม่",
    "ร้านต่อขนตา",
    "ลิฟติ้งขนตา",
    "ต่อขนตาแบบธรรมชาติ",
    "ต่อขนตาทรงบาร์บี้",
    "ทรงต่อขนตา",
    "handmade fan lashes",
  ],
  openGraph: {
    title: "Lash Extensions Chiang Mai · My Lash House",
    description:
      "Premium eyelash extensions in San Kamphaeng, Chiang Mai. 100% handmade fans · Certified artist · 7+ years experience.",
    url: "https://mylashhouse.com",
    siteName: BUSINESS.fullName,
    locale: "en_TH",
    type: "website",
    images: [
      {
        url: "/images/service-mega.jpg",
        width: 1200,
        height: 1200,
        alt: "Mega volume lash extensions by My Lash House Chiang Mai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lash Extensions Chiang Mai · My Lash House",
    description:
      "Premium handmade lash extensions in San Kamphaeng, Chiang Mai. Certified artist · 7+ yrs experience.",
    images: ["/images/service-mega.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://mylashhouse.com",
    languages: {
      "en-TH": "https://mylashhouse.com",
      "th-TH": "https://mylashhouse.com/th",
      "x-default": "https://mylashhouse.com",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": "https://mylashhouse.com/#business",
    name: BUSINESS.fullName,
    alternateName: ["My Lash House", "My Lash House CNX", "ต่อขนตา My Lash House"],
    description: BUSINESS.description,
    url: "https://mylashhouse.com",
    telephone: BUSINESS.phoneTel,
    knowsLanguage: ["en", "th"],
    areaServed: {
      "@type": "City",
      name: "Chiang Mai",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "89/117 Pruksa Ville, San Klang",
      addressLocality: "San Kamphaeng",
      addressRegion: "Chiang Mai",
      postalCode: "50130",
      addressCountry: "TH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 18.7870732,
      longitude: 99.0412865,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "10:00",
      closes: "19:00",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS.rating,
      reviewCount: BUSINESS.reviewCount,
      bestRating: 5,
    },
    priceRange: "฿590–฿1,590",
    image: "https://mylashhouse.com/images/hero.jpg",
    sameAs: [
      BUSINESS.instagramUrl,
      BUSINESS.facebookUrl,
      BUSINESS.tiktokUrl,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lash Extension Services",
      itemListElement: [
        { name: "Classic 1:1", price: 590 },
        { name: "Natural Look", price: 790 },
        { name: "Hybrid", price: 990 },
        { name: "Classic Volume", price: 990 },
        { name: "Light Volume", price: 1090 },
        { name: "Mega Volume", price: 1190 },
        { name: "Wet Look", price: 1290 },
        { name: "Russian Volume", price: 1390 },
        { name: "Wispy Volume", price: 1490 },
        { name: "Strip Lash", price: 1590 },
      ].map(({ name, price }) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "THB",
          price,
        },
      })),
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Does My Lash House offer a guarantee on lash extensions?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — every set comes with a 3-day retouch guarantee. If lashes show abnormal shedding within 3 days due to glue failure, retouching is free. The guarantee does not cover loss caused by rubbing, premature water exposure, or oil-based products.",
        },
      },
      {
        "@type": "Question",
        name: "How much do lash extensions cost at My Lash House Chiang Mai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Lash extension prices range from 590 THB for Classic 1:1 to 1,590 THB for Strip Lash. Color lashes add-on available for 150–300 THB. Each set is custom designed during your appointment.",
        },
      },
      {
        "@type": "Question",
        name: "Where is My Lash House located in Chiang Mai?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "My Lash House is a private studio located at 89/117 Pruksa Ville, San Klang, San Kamphaeng District, Chiang Mai 50130, Thailand.",
        },
      },
      {
        "@type": "Question",
        name: "Does My Lash House use premade or handmade fans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "My Lash House exclusively uses 100% handmade fans. Every set is custom-crafted by a certified eyelash artist with 7+ years of experience.",
        },
      },
      {
        "@type": "Question",
        name: "How do I book an appointment at My Lash House?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can book via LINE (@604ymska), Instagram DM (@my_lash_house.cnx), or call 085-474-7314. The studio is open daily from 10 AM to 7 PM.",
        },
      },
      {
        "@type": "Question",
        name: "What lash styles are available?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Available styles include Classic 1:1, Natural Look, Hybrid, Classic Volume, Light Volume, Mega Volume, Wet Look, Russian Volume, Wispy Volume, and Strip Lash. Color lashes can be added to any set as an accent.",
        },
      },
    ],
  };

  return (
    <html
      lang="en-TH"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
