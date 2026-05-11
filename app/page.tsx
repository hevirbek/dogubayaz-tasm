import { BeforeVisit } from "@/components/sections/BeforeVisit";
import { CommonLinks } from "@/components/sections/CommonLinks";
import { ContactPreview } from "@/components/sections/ContactPreview";
import { DoctorsPreview } from "@/components/sections/DoctorsPreview";
import { FAQ } from "@/components/sections/FAQ";
import { FeaturedAnnouncementBanner } from "@/components/sections/FeaturedAnnouncementBanner";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { getAnnouncements, getDoctors, getActiveDoctorLeaves } from "@/lib/data/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [doctors, announcements, leaves] = await Promise.all([
    getDoctors(),
    getAnnouncements(),
    getActiveDoctorLeaves()
  ]);

  return (
    <>
      <Hero />
      <FeaturedAnnouncementBanner announcement={announcements[0]} />

      <ServicesPreview />
      <BeforeVisit />
      <DoctorsPreview doctors={doctors} leaves={leaves} />
      <CommonLinks />
      <FAQ limit={3} />
      <ContactPreview />
    </>
  );
}
