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
  title: `${BUSINESS.fullName} | Premium Eyelash Extensions`,
  description: BUSINESS.description,
  keywords: [
    "lash extensions chiang mai",
    "eyelash extensions san kamphaeng",
    "my lash house cnx",
    "volume lashes chiang mai",
    "eyelash salon chiang mai",
    "ต่อขนตา เชียงใหม่",
    "ต่อขนตา สันกำแพง",
    "lash lift chiang mai",
    "mega volume lashes thailand",
    "best lash extensions chiang mai",
    "private lash studio chiang mai",
    "handmade fan lashes",
  ],
  openGraph: {
    title: `${BUSINESS.fullName} | Premium Eyelash Extensions`,
    description: BUSINESS.description,
    url: "https://mylashhouse.com",
    siteName: BUSINESS.fullName,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS.fullName} | Premium Eyelash Extensions`,
    description: BUSINESS.description,
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
    name: BUSINESS.fullName,
    description: BUSINESS.description,
    url: "https://mylashhouse.com",
    telephone: BUSINESS.phoneTel,
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
      lang="en"
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
