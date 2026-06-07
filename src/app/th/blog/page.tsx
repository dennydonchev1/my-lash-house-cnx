import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBookingBar from "@/components/MobileBookingBar";
import { getAllPosts, getPostUrl } from "@/lib/blog";

export const metadata: Metadata = {
  title: "คู่มือต่อขนตาและวิธีดูแล · My Lash House เชียงใหม่",
  description:
    "คู่มือต่อขนตาตรงไปตรงมา จากช่างที่ได้รับการรับรองในเชียงใหม่ — เทียบรูปตากับทรงที่ใช่ วิธีดูแลหลังต่อ ขนตาอยู่ได้นานแค่ไหน และสิ่งที่ควรรู้ก่อนนัดครั้งแรก",
  alternates: {
    canonical: "https://mylashhouse.com/th/blog",
    languages: {
      en: "https://mylashhouse.com/blog",
      th: "https://mylashhouse.com/th/blog",
      "x-default": "https://mylashhouse.com/blog",
    },
  },
  openGraph: {
    title: "คู่มือต่อขนตาและวิธีดูแล · My Lash House เชียงใหม่",
    description:
      "คู่มือต่อขนตาตรงไปตรงมา จากช่างที่ได้รับการรับรองในเชียงใหม่ — เทียบรูปตากับทรงที่ใช่ วิธีดูแลหลังต่อ ขนตาอยู่ได้นานแค่ไหน และสิ่งที่ควรรู้ก่อนนัดครั้งแรก",
    url: "https://mylashhouse.com/th/blog",
    type: "website",
    locale: "th_TH",
  },
};

export default function BlogIndexTh() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar lang="th" />
      <main className="bg-cream pt-24 sm:pt-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pb-20">
          <header className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-rose-dark">บทความ</p>
            <h1 className="mt-3 font-heading text-4xl font-bold sm:text-5xl">
              คู่มือ <span className="italic text-plum">ต่อขนตา</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-charcoal-light">
              คู่มือและคำแนะนำจากช่างต่อขนตาที่ได้รับการรับรอง ประสบการณ์ 7+ ปี ในเชียงใหม่
            </p>
          </header>

          <div className="grid gap-8 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={getPostUrl(post, "th")}
                className="group block overflow-hidden rounded-2xl border border-cream-dark bg-white transition-all hover:border-rose/30 hover:shadow-lg"
              >
                <div className="aspect-[4/3] overflow-hidden bg-cream-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.heroImage}
                    alt={post.heroImageAlt.th}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-rose-dark mb-2">
                    {post.readingMinutes} นาทีในการอ่าน
                  </p>
                  <h2 className="font-heading text-xl font-bold leading-tight group-hover:text-plum transition-colors">
                    {post.title.th}
                  </h2>
                  <p className="mt-3 text-sm text-charcoal-light leading-relaxed">
                    {post.description.th}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer lang="th" />
      <MobileBookingBar lang="th" />
    </>
  );
}
