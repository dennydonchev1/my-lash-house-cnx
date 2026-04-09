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
    url: "https://mylashhousecnx.com",
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
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://mylashhousecnx.com",
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
    url: "https://mylashhousecnx.com",
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
      latitude: 18.7902,
      longitude: 99.12,
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
    priceRange: "฿490–฿1,390",
    image: "https://mylashhousecnx.com/images/hero.jpg",
    sameAs: [
      BUSINESS.instagramUrl,
      BUSINESS.facebookUrl,
      BUSINESS.tiktokUrl,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Lash Extension Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Classic Lash Extensions (1D)",
            description: "One extension per natural lash for a subtle, natural enhancement",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "THB",
            minPrice: 490,
            maxPrice: 790,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Volume Lash Extensions (2D-5D)",
            description: "Multiple ultra-fine extensions per natural lash for fuller looks",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "THB",
            minPrice: 690,
            maxPrice: 1190,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mega Volume Lash Extensions",
            description: "Maximum volume with ultra-fine handmade fans",
          },
          priceSpecification: {
            "@type": "PriceSpecification",
            priceCurrency: "THB",
            minPrice: 1190,
            maxPrice: 1390,
          },
        },
      ],
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
          text: "Lash extension prices range from 490 THB for Classic (1D) to 1,390 THB for Mega Volume. Price varies by lash length and style chosen.",
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
          text: "Available styles include Natural, Cat Eye, Doll Eye, Wispy Volume, and Color Lashes, offered in Classic (1D), Volume (2D-5D), and Mega Volume densities.",
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
