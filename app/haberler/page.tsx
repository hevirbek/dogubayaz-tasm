import type { Metadata } from "next";

import { NewsCard } from "@/components/cards/NewsCard";
import { siteConfig } from "@/config/site";
import { getNews } from "@/lib/data/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Haberler",
  description: `${siteConfig.asmName} etkinlik ve bilgilendirme haberleri.`,
  alternates: { canonical: "/haberler" }
};

export default async function NewsPage() {
  const news = await getNews();

  return (
    <>
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Haberler
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            Güncel haberler
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Merkezimizin etkinlik ve genel bilgilendirme haberleri.
          </p>
        </div>
      </section>
      <section className="section-padding">
        <div className="container">
          {news.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-dashed border-border p-6 text-muted-foreground">
              Şu anda yayınlanmış haber bulunmuyor.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
