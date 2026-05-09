import Link from "next/link";

import { ServiceCard } from "@/components/cards/ServiceCard";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";

export function ServicesPreview({ showAll = false }: { showAll?: boolean }) {
  const visibleServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="Hizmetler"
          title="Koruyucu ve temel sağlık hizmetleri"
          description="Aile hekimliği kapsamında sunulan hizmetler, bilgilendirme ve düzenli izlem süreçlerine destek olacak şekilde planlanır."
          action={
            showAll ? null : (
              <Button asChild variant="outline">
                <Link href="/hizmetler">Tüm Hizmetler</Link>
              </Button>
            )
          }
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleServices.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
