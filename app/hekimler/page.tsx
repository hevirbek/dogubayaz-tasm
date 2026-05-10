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

  return (
    <>
      <PageHeader
        title="Hekimler"
        description="Merkezimizde görev yapan aile hekimleri ve aile sağlığı çalışanları."
      />
      <DoctorsPreview doctors={doctors} leaves={leaves} showAll />
    </>
  );
}

function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="bg-cyan-50 py-12">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          {siteConfig.asmName}
        </p>
        <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
          {description}
        </p>
      </div>
    </section>
  );
}
