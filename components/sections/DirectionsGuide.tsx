import { Car, MapPinned, Navigation, Route } from "lucide-react";

import { MapSection } from "@/components/sections/MapSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

const directionItems = [
  {
    title: "Açık adres",
    icon: MapPinned,
    getContent: () => siteConfig.address
  },
  {
    title: "Yakın konum tarifi",
    icon: Navigation,
    getContent: () => siteConfig.nearbyDirections
  },
  {
    title: "Toplu taşıma",
    icon: Route,
    getContent: () => siteConfig.transitNote
  },
  {
    title: "Otopark notu",
    icon: Car,
    getContent: () => siteConfig.parkingNote
  }
];

export function DirectionsGuide() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;

  return (
    <section className="pb-10 lg:pb-12">
      <div className="container">
        <div className="mb-5 max-w-2xl">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            Nasıl Ulaşırım?
          </p>
          <h2 className="text-2xl font-bold tracking-normal text-foreground">
            Adres ve ulaşım bilgileri
          </h2>
          <p className="mt-2 text-base leading-6 text-muted-foreground">
            Haritaya ek olarak açık adres, yakın konum tarifi ve ulaşım notlarını
            buradan kontrol edebilirsiniz.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle>Ulaşım notları</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 p-5 pt-0">
              {directionItems.map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-md border border-border bg-slate-50 p-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <item.icon aria-hidden className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.getContent()}
                    </p>
                  </div>
                </div>
              ))}

              <Button asChild className="mt-1">
                <a href={mapsHref} target="_blank" rel="noreferrer">
                  <MapPinned aria-hidden className="h-4 w-4" />
                  Haritada Aç
                </a>
              </Button>
            </CardContent>
          </Card>

          <MapSection />
        </div>
      </div>
    </section>
  );
}
