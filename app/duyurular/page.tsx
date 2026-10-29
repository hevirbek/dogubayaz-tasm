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
      <AnnouncementsPreview announcements={announcements} showAll />
    </>
  );
}
