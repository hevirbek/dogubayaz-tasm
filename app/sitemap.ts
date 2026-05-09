import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/hekimler", "/hizmetler", "/duyurular", "/iletisim", "/gizlilik"];
  const serviceRoutes = services.map((service) => `/hizmetler/${service.slug}`);
  const now = new Date();

  return [...routes, ...serviceRoutes].map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7
  }));
}
