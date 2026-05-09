import type { Metadata } from "next";

import { BeforeVisit } from "@/components/sections/BeforeVisit";
import { CommonLinks } from "@/components/sections/CommonLinks";
import { EmergencyNoticeCard } from "@/components/sections/EmergencyNoticeCard";
import { FAQ } from "@/components/sections/FAQ";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: `${siteConfig.asmName} tarafından sunulan aile hekimliği, aşı takibi, gebe izlem ve temel sağlık danışmanlığı hizmetleri.`,
  alternates: { canonical: "/hizmetler" }
};

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Hizmetler
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            Aile sağlığı hizmetleri
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Koruyucu sağlık hizmetleri ve aile hekimliği kapsamındaki işlemler
            için merkezimizle iletişime geçebilirsiniz.
          </p>
          <div className="mt-6 max-w-2xl">
            <EmergencyNoticeCard />
          </div>
        </div>
      </section>
      <ServicesPreview showAll />
      <BeforeVisit />
      <CommonLinks />
      <FAQ />
    </>
  );
}
