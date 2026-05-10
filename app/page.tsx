import { Clock, MapPin, Phone } from "lucide-react";

import { InfoCard } from "@/components/cards/InfoCard";
import { AnnouncementsPreview } from "@/components/sections/AnnouncementsPreview";
import { BeforeVisit } from "@/components/sections/BeforeVisit";
import { CommonLinks } from "@/components/sections/CommonLinks";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { DoctorsPreview } from "@/components/sections/DoctorsPreview";
import { FAQ } from "@/components/sections/FAQ";
import { FeaturedAnnouncementBanner } from "@/components/sections/FeaturedAnnouncementBanner";
import { Hero } from "@/components/sections/Hero";
import { HomeCTA } from "@/components/sections/HomeCTA";
import { OpeningStatusCard } from "@/components/sections/OpeningStatusCard";
import { PrimaryCareExplainer } from "@/components/sections/PrimaryCareExplainer";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { TrustHighlights } from "@/components/sections/TrustHighlights";
import { siteConfig } from "@/config/site";
import { getAnnouncements, getDoctors, getActiveDoctorLeaves } from "@/lib/data/queries";
import { getAdminAsmWorkingHours } from "@/lib/admin/data";

export const revalidate = 300;

export default async function HomePage() {
  const [doctors, announcements, workingHours, leaves] = await Promise.all([
    getDoctors(),
    getAnnouncements(),
    getAdminAsmWorkingHours(),
    getActiveDoctorLeaves()
  ]);

  return (
    <>
      <Hero />
      <TrustHighlights />
      <FeaturedAnnouncementBanner announcement={announcements[0]} />
      <section className="border-y border-border bg-background py-8">
        <div className="container grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <OpeningStatusCard />
          <InfoCard icon={Clock} title="Çalışma Saatleri">
            {workingHours ? (
              <>
                Hafta içi {workingHours.weekdays_start} - {workingHours.weekdays_end}
                <br />
                {workingHours.weekend_closed && "Hafta sonu kapalı"}
              </>
            ) : (
              "Hafta içi 08:00 - 17:00"
            )}
          </InfoCard>
          <InfoCard icon={Phone} title="Telefon">
            <a href={`tel:${siteConfig.phone}`} className="font-medium text-foreground">
              {siteConfig.phone}
            </a>
          </InfoCard>
          <InfoCard icon={MapPin} title="Adres">
            {siteConfig.address}
          </InfoCard>
        </div>
      </section>
      <PrimaryCareExplainer />
      <ServicesPreview />
      <BeforeVisit />
      <DoctorsPreview doctors={doctors} leaves={leaves} />
      <AnnouncementsPreview announcements={announcements} />
      <HomeCTA />
      <CommonLinks />
      <ContactPreview />
      <FAQ limit={3} />
    </>
  );
}
