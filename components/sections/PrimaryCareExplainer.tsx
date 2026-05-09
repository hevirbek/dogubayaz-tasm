import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const items = [
  "Aşı ve koruyucu sağlık izlemleri",
  "Gebe, bebek ve çocuk izlemleri",
  "Temel muayene, danışmanlık ve yönlendirme",
  "Kronik hastalık takip süreçleri"
];

export function PrimaryCareExplainer() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            Aile Sağlığı Merkezi
          </p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
            Aile sağlığı merkezinde hangi işlemler yapılır?
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Aile sağlığı merkezleri, koruyucu sağlık hizmetleri ve aile
            hekimliği kapsamındaki temel başvurular için ilk temas noktasıdır.
            İşlemler kişinin kayıt durumu, başvuru nedeni ve ilgili mevzuata
            göre değerlendirilir.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/hizmetler">
                Hizmetleri İncele
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/iletisim">Merkezle İletişime Geç</Link>
            </Button>
          </div>
        </div>

        <div className="grid gap-3">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 rounded-lg border border-border bg-background p-4 shadow-card"
            >
              <CheckCircle2
                aria-hidden
                className="h-5 w-5 shrink-0 text-primary"
              />
              <p className="font-medium text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
