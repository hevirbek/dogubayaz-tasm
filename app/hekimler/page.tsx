import type { Metadata } from "next";

import { DoctorsPreview } from "@/components/sections/DoctorsPreview";
import { siteConfig } from "@/config/site";
import { getDoctors, getActiveDoctorLeaves } from "@/lib/data/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Hekimler",
  description: `${siteConfig.asmName} aile hekimleri ve aile sağlığı çalışanları hakkında bilgi alın.`,
  alternates: { canonical: "/hekimler" }
};

export default async function DoctorsPage() {
  const [doctors, leaves] = await Promise.all([
    getDoctors(),
    getActiveDoctorLeaves()
  ]);

  return <DoctorsPreview doctors={doctors} leaves={leaves} />;
}
