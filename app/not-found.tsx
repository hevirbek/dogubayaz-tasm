import Link from "next/link";
import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container grid min-h-[52vh] place-items-center text-center">
        <div className="max-w-lg">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <SearchX aria-hidden className="h-7 w-7" />
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-normal text-slate-950">
            Sayfa bulunamadı
          </h1>
          <p className="mt-4 leading-7 text-muted-foreground">
            Aradığınız sayfa taşınmış, kaldırılmış veya adres hatalı yazılmış
            olabilir.
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/">Ana Sayfaya Dön</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/hizmetler">Hizmetleri Gör</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
