import type { Metadata } from "next";
import AboutPageView from "@/components/AboutPageView";
import { ABOUT_PAGE } from "@/lib/aboutPage";

const c = ABOUT_PAGE.en;

export const metadata: Metadata = {
  title: c.metaTitle,
  description: c.metaDescription,
  alternates: {
    canonical: "https://mylashhouse.com/about",
    languages: {
      en: "https://mylashhouse.com/about",
      th: "https://mylashhouse.com/th/about",
      "x-default": "https://mylashhouse.com/about",
    },
  },
  openGraph: {
    title: c.metaTitle,
    description: c.metaDescription,
    url: "https://mylashhouse.com/about",
    type: "profile",
    locale: "en_TH",
    images: [{ url: "/images/ying-lash-artist-hab-contest-2022.webp", alt: c.portrait.alt }],
  },
};

export default function AboutPage() {
  return <AboutPageView lang="en" />;
}
