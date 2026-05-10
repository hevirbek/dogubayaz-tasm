import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { siteConfig } from "@/config/site";
import { getAnnouncementBySlug } from "@/lib/data/queries";
import { formatDate } from "@/lib/utils";

export const revalidate = 300;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const announcement = await getAnnouncementBySlug(resolvedParams.slug);

  if (!announcement) {
    return {
      title: "Duyuru Bulunamadı",
      description: "Aradığınız duyuru yayından kaldırılmış olabilir."
    };
  }

  return {
    title: announcement.title,
    description: announcement.content.substring(0, 160) + "...",
    openGraph: {
      title: announcement.title,
      description: announcement.content.substring(0, 160) + "...",
      type: "article",
      publishedTime: announcement.published_at,
    }
  };
}

export default async function AnnouncementDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const announcement = await getAnnouncementBySlug(resolvedParams.slug);

  if (!announcement) {
    notFound();
  }

  return (
    <article className="min-h-[70vh]">
      <div className="bg-cyan-50 py-12 md:py-16">
        <div className="container max-w-4xl">
          <Link
            href="/duyurular"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Tüm Duyurulara Dön
          </Link>
          
          <p className="flex items-center gap-2 text-sm text-slate-600 mb-4">
            <CalendarDays aria-hidden className="h-4 w-4 text-primary" />
            <time dateTime={announcement.published_at}>
              {formatDate(announcement.published_at)}
            </time>
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-950">
            {announcement.title}
          </h1>
        </div>
      </div>

      <div className="container max-w-4xl py-12">
        <div className="prose prose-slate md:prose-lg max-w-none text-slate-700 whitespace-pre-wrap leading-relaxed">
          {announcement.content}
        </div>
      </div>
    </article>
  );
}
