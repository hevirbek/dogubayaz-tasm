"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

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
        <div className="divide-y divide-border rounded-lg border border-border bg-background shadow-card">
          {visibleServices.map((service) => (
            <details
              key={service.slug}
              className="group"
            >
              <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 text-base font-semibold text-foreground transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-details-marker]:hidden list-none">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                  <service.icon aria-hidden className="h-5 w-5" />
                </span>
                <span className="flex-1">{service.title}</span>
                <ChevronDown
                  aria-hidden
                  className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="border-t border-border bg-slate-50/50 px-5 py-4">
                <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  href={`/hizmetler/${service.slug}`}
                  className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                >
                  Detayları gör →
                </Link>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
