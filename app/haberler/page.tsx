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
      <section className="section-padding">
        <div className="container">
          <h1 className="mb-8 max-w-3xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
            Etkinlik ve bilgilendirme haberlerini buradan takip edebilirsiniz.
          </h1>
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
