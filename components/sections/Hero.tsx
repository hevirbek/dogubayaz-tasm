import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle, Phone } from "lucide-react";

import { EmergencyNoticeCard } from "@/components/sections/EmergencyNoticeCard";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function Hero() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16 lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-md bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
            T.C. Sağlık Bakanlığı
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Koruyucu ve Temel <br /> Sağlık Hizmetleri
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            {siteConfig.description}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href={mapsHref} target="_blank" rel="noreferrer">
                <MapPin aria-hidden className="h-5 w-5" />
                Yol Tarifi Al
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href={`tel:${siteConfig.phone}`}>
                <Phone aria-hidden className="h-5 w-5" />
                Telefon Et
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/iletisim">
                <MessageCircle aria-hidden className="h-5 w-5" />
                İletişime Geç
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="mt-8 max-w-2xl">
            <EmergencyNoticeCard />
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg border border-white shadow-soft">
            <Image
              src="/images/asm-hero.png"
              alt="Modern ve temiz bir aile sağlığı merkezi iç mekanı"
              width={1400}
              height={900}
              priority
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-5 left-5 right-5 rounded-lg border border-border bg-background p-4 shadow-card sm:left-auto sm:w-72">
            <p className="text-sm font-semibold text-foreground">Genel iletişim</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sağlık verisi paylaşmadan genel bilgi ve yönlendirme talebi
              oluşturabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
