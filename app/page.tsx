import { BeforeVisit } from "@/components/sections/BeforeVisit";
import { CommonLinks } from "@/components/sections/CommonLinks";
import { DoctorsPreview } from "@/components/sections/DoctorsPreview";
import { FAQ } from "@/components/sections/FAQ";
import { FeaturedAnnouncementBanner } from "@/components/sections/FeaturedAnnouncementBanner";
import { Hero } from "@/components/sections/Hero";
import { NewsSlider } from "@/components/sections/NewsSlider";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { getAnnouncements, getDoctors, getActiveDoctorLeaves, getNews } from "@/lib/data/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [doctors, announcements, leaves, news] = await Promise.all([
    getDoctors(),
    getAnnouncements(),
    getActiveDoctorLeaves(),
    getNews()
  ]);

  return (
    <>
      <Hero />
      <FeaturedAnnouncementBanner announcement={announcements[0]} />
      {news.length > 0 ? <NewsSlider news={news.slice(0, 5)} /> : null}

      <ServicesPreview />
      <BeforeVisit />
      <DoctorsPreview doctors={doctors} leaves={leaves} />
      <CommonLinks />
      <FAQ limit={3} />
    </>
  );
}
