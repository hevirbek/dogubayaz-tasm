import Link from "next/link";

import { DoctorCard } from "@/components/cards/DoctorCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import type { Doctor } from "@/lib/data/doctors";

export function DoctorsPreview({
  doctors,
  showAll = false
}: {
  doctors: Doctor[];
  showAll?: boolean;
}) {
  const visibleDoctors = showAll ? doctors : doctors.slice(0, 3);

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Hekimler"
          title="Merkez ekibimiz"
          description="Aile hekimleri ve aile sağlığı çalışanları, koruyucu sağlık hizmetlerinde düzenli ve erişilebilir destek sunar."
          action={
            showAll ? null : (
              <Button asChild variant="outline">
                <Link href="/hekimler">Hekimleri Gör</Link>
              </Button>
            )
          }
        />
        {visibleDoctors.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-muted-foreground">
            Şu anda görüntülenecek aktif hekim bilgisi bulunmuyor.
          </p>
        )}
      </div>
    </section>
  );
}
