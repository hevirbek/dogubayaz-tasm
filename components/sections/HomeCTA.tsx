import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function HomeCTA() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;

  return (
    <section className="bg-slate-950 py-12 text-white">
      <div className="container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-300">
            Genel iletişim
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-normal sm:text-3xl">
            Merkezimize ulaşmanız gereken konuyu birlikte netleştirelim
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            Genel sorular için iletişim formunu kullanabilir, izlem ve uygun
            zaman bilgisi için telefonla merkezimize ulaşabilirsiniz.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
          <Button asChild variant="secondary">
            <a href={`tel:${siteConfig.phone}`}>
              <Phone aria-hidden className="h-4 w-4" />
              Telefon Et
            </a>
          </Button>
          <Button asChild className="bg-white text-slate-950 hover:bg-slate-100">
            <Link href="/iletisim">
              <MessageCircle aria-hidden className="h-4 w-4" />
              İletişim Formu
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            <a href={mapsHref} target="_blank" rel="noreferrer">
              <MapPin aria-hidden className="h-4 w-4" />
              Yol Tarifi
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
