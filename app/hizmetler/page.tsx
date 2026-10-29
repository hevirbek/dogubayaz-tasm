import type { Metadata } from "next";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { siteConfig } from "@/config/site";
import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: `${siteConfig.asmName} tarafından sunulan aile hekimliği, aşı takibi, gebe izlem ve temel sağlık danışmanlığı hizmetleri.`,
  alternates: { canonical: "/hizmetler" }
};

export default function ServicesPage() {
  return (
    <section className="section-padding">
      <div className="container">
        <h1 className="max-w-3xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
          Aile Sağlığı Merkezimizde sunulan hizmetler.
        </h1>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard
              key={service.slug}
              title={service.title}
              slug={service.slug}
              description={service.description}
              icon={service.icon}
              image={service.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
