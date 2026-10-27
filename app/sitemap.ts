import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getNews } from "@/lib/data/queries";
import { services } from "@/lib/data/services";
import { calculatorTools } from "@/lib/tools/catalog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    "",
    "/hekimler",
    "/hizmetler",
    "/haberler",
    "/duyurular",
    "/hakkimizda",
    "/iletisim",
    "/gizlilik",
    ...calculatorTools.map((tool) => tool.href)
  ];
  const serviceRoutes = services.map((service) => `/hizmetler/${service.slug}`);
  const news = await getNews();
  const now = new Date();

  const staticEntries = [...routes, ...serviceRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const newsEntries = news.map((item) => ({
    url: new URL(`/haberler/${item.slug || item.id}`, siteConfig.url).toString(),
    lastModified: new Date(item.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.6
  }));

  return [...staticEntries, ...newsEntries];
}
