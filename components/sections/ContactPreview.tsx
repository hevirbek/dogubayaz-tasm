import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

import { InfoCard } from "@/components/cards/InfoCard";
import { MapSection } from "@/components/sections/MapSection";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { WorkingHoursCard } from "@/components/sections/WorkingHoursCard";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

export function ContactPreview() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="İletişim"
          title="Merkezimize ulaşın"
          description="Adres, telefon ve genel iletişim formu üzerinden bize ulaşabilirsiniz."
          action={
            <Button asChild>
              <Link href="/iletisim">İletişim Formu</Link>
            </Button>
          }
        />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-5">
            <InfoCard icon={Phone} title="Telefon">
              <a href={`tel:${siteConfig.phone}`} className="font-medium text-foreground">
                {siteConfig.phone}
              </a>
            </InfoCard>
            <InfoCard icon={Mail} title="E-posta">
              <a href={`mailto:${siteConfig.email}`} className="break-all font-medium text-foreground">
                {siteConfig.email}
              </a>
            </InfoCard>
            <InfoCard icon={MapPin} title="Adres">
              {siteConfig.address}
            </InfoCard>
            <WorkingHoursCard />
          </div>
          <MapSection />
        </div>
      </div>
    </section>
  );
}
