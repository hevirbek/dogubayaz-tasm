import { CommonLinks } from "@/components/sections/CommonLinks";
import { FeaturedAnnouncementBanner } from "@/components/sections/FeaturedAnnouncementBanner";
import { Hero } from "@/components/sections/Hero";
import { NewsSlider } from "@/components/sections/NewsSlider";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { getAnnouncements, getNews } from "@/lib/data/queries";

export const revalidate = 300;

export default async function HomePage() {
  const [announcements, news] = await Promise.all([
    getAnnouncements(),
    getNews()
  ]);

  return (
    <>
      <Hero />
      <FeaturedAnnouncementBanner announcement={announcements[0]} />
      {news.length > 0 ? <NewsSlider news={news.slice(0, 5)} /> : null}

      <ServicesPreview />
      <CommonLinks />
    </>
  );
}
