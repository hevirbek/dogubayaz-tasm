import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";

import { InfoCard } from "@/components/cards/InfoCard";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactGuidance } from "@/components/sections/ContactGuidance";
import { DirectionsGuide } from "@/components/sections/DirectionsGuide";
import { EmergencyNoticeCard } from "@/components/sections/EmergencyNoticeCard";
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
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            İletişim
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            Bize ulaşın
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Genel iletişim talepleriniz için formu kullanabilir veya telefonla
            merkezimize ulaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <OpeningStatusCard />
            <EmergencyNoticeCard />
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
            <ContactGuidance />
            <WorkingHoursCard />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Genel iletişim formu</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </section>

      <DirectionsGuide />
    </>
  );
}
