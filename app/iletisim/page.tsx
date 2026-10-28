import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { InfoCard } from "@/components/cards/InfoCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { DirectionsGuide } from "@/components/sections/DirectionsGuide";
import { OpeningStatusCard } from "@/components/sections/OpeningStatusCard";
import { WorkingHoursCard } from "@/components/sections/WorkingHoursCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${siteConfig.asmName} adres, telefon, harita ve genel iletişim formu.`,
  alternates: { canonical: "/iletisim" }
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-cyan-50 py-6">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            İletişim
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950">
            Bize ulaşın
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-6 text-slate-700">
            Genel iletişim talepleriniz için formu kullanabilir veya telefonla
            merkezimize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="py-6 lg:py-8">
        <div className="container grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="grid gap-3">
            <OpeningStatusCard />
            <InfoCard icon={Phone} title="Telefon">
              <a href={`tel:${siteConfig.phone}`} className="font-medium text-foreground">
                {siteConfig.phone}
              </a>
            </InfoCard>
            <InfoCard icon={Mail} title="E-posta">
              <a href={`mailto:${siteConfig.email}`} className="font-medium text-foreground">
                {siteConfig.email}
              </a>
            </InfoCard>
            <InfoCard icon={MapPin} title="Adres">
              {siteConfig.address}
            </InfoCard>
            <WorkingHoursCard />
          </div>

          <Card>
            <CardHeader className="p-5 pb-3">
              <CardTitle>Genel iletişim formu</CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <DirectionsGuide />
    </>
  );
}
