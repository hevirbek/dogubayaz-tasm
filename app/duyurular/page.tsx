import type { Metadata } from "next";

import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";
import { siteConfig } from "@/config/site";
import { getAnnouncements } from "@/lib/data/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Duyurular",
  description: `${siteConfig.asmName} çalışma düzeni ve genel bilgilendirme duyuruları.`,
  alternates: { canonical: "/duyurular" }
};

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <>
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Duyurular
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            Güncel duyurular
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Merkezimizle ilgili genel bilgilendirme ve çalışma düzeni
            duyuruları.
          </p>
        </div>
      </section>
      <AnnouncementsPreview announcements={announcements} showAll />
    </>
  );
}
