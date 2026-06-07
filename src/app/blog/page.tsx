import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import { getAllPosts, getPostUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Lash Extension Guides & Aftercare · My Lash House Chiang Mai",
  description:
    "Honest lash extension guides from a certified artist in Chiang Mai — eye-shape style matching, aftercare tips, longevity advice, and what to expect at your first appointment.",
  alternates: {
    canonical: "https://mylashhouse.com/blog",
    languages: {
      en: "https://mylashhouse.com/blog",
      th: "https://mylashhouse.com/th/blog",
      "x-default": "https://mylashhouse.com/blog",
    },
  },
  openGraph: {
    title: "Lash Extension Guides & Aftercare · My Lash House Chiang Mai",
    description:
      "Honest lash extension guides from a certified artist in Chiang Mai — eye-shape style matching, aftercare tips, longevity advice, and what to expect at your first appointment.",
    url: "https://mylashhouse.com/blog",
    type: "website",
    locale: "en_TH",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar lang="en" />
      <main className="bg-cream pt-24 sm:pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
          <header className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">Blog</p>
            <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
              Lash Extension <span className="italic text-plum">Guides</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
              Educational guides from a certified lash artist with 7+ years of experience in Chiang Mai.
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={getPostUrl(post, "en")}
                className="group block overflow-hidden rounded-2xl border border-cream-dark bg-white transition-all hover:border-rose/30 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-cream-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.heroImage}
                    alt={post.heroImageAlt.en}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-rose-dark mb-2">
                    {post.readingMinutes} min read
                  </p>
                  <h2 className="font-heading text-xl font-bold leading-tight group-hover:text-plum transition-colors">
                    {post.title.en}
                  </h2>
                  <p className="mt-3 text-sm text-charcoal-light leading-relaxed">
                    {post.description.en}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer lang="en" />
      <MobileBookingBar lang="en" />
    </>
  );
}
