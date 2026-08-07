import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePageView from "@/components/ServicePageView";
import { SERVICE_PAGES, getServicePage } from "@/lib/servicePages";

export async function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};
  const url = `https://mylashhouse.com/services/${page.slug}`;
  const thUrl = `https://mylashhouse.com/th/services/${page.slug}`;
  return {
    title: page.en.metaTitle,
    description: page.en.metaDescription,
    alternates: {
      canonical: url,
      languages: { en: url, th: thUrl, "x-default": url },
    },
    openGraph: {
      title: page.en.metaTitle,
      description: page.en.metaDescription,
      url,
      type: "website",
      locale: "en_TH",
    },
  };
}

export default async function ServiceRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();
  return <ServicePageView page={page} lang="en" />;
}
