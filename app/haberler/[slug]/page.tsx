import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getNewsBySlug } from "@/lib/data/queries";
import { absoluteUrl, formatDate } from "@/lib/utils";

export const revalidate = 300;

function coverUrl(src: string) {
  return src.startsWith("http") ? src : absoluteUrl(src);
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    return {
      title: "Haber Bulunamadı",
      description: "Aradığınız haber yayından kaldırılmış olabilir."
    };
  }

  return {
    title: news.title,
    description: news.excerpt,
    alternates: { canonical: `/haberler/${news.slug || news.id}` },
    openGraph: {
      title: news.title,
      description: news.excerpt,
      type: "article",
      publishedTime: news.published_at,
      images: [coverUrl(news.cover_image_url)]
    }
  };
}

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  return (
    <article className="min-h-[70vh]">
      <div className="bg-cyan-50 py-12 md:py-16">
        <div className="container max-w-4xl">
          <Link
            href="/haberler"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm Haberlere Dön
          </Link>

          <p className="mb-4 flex items-center gap-2 text-sm text-slate-600">
            <CalendarDays aria-hidden className="h-4 w-4 text-primary" />
            <time dateTime={news.published_at}>{formatDate(news.published_at)}</time>
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-950 md:text-5xl">
            {news.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{news.excerpt}</p>
        </div>
      </div>

      <div className="container max-w-4xl py-12">
        <div className="overflow-hidden rounded-lg border border-border bg-slate-100">
          <Image
            src={news.cover_image_url}
            alt={news.title}
            width={1600}
            height={900}
            priority
            className="aspect-[16/9] w-full object-cover"
          />
        </div>
        <div className="mt-8 whitespace-pre-wrap text-base leading-relaxed text-slate-700">
          {news.content}
        </div>
        <p className="mt-10 text-sm text-muted-foreground">{siteConfig.asmName}</p>
      </div>
    </article>
  );
}
