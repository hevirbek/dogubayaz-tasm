import { AnnouncementCard } from "@/components/cards/AnnouncementCard";
import type { Announcement } from "@/lib/data/announcements";

export function AnnouncementsPreview({
  announcements,
  showAll = false
}: {
  announcements: Announcement[];
  showAll?: boolean;
}) {
  const visibleAnnouncements = showAll
    ? announcements
    : announcements.slice(0, 3);

  return (
    <section className="section-padding">
      <div className="container">
        <h1 className="mb-8 max-w-3xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
          Çalışma düzeni, izlem süreçleri ve genel iletişim konularındaki kısa
          duyuruları buradan takip edebilirsiniz.
        </h1>
        {visibleAnnouncements.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {visibleAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
          </div>
        ) : (
          <p className="rounded-lg border border-dashed border-border p-6 text-muted-foreground">
            Şu anda yayınlanmış duyuru bulunmuyor.
          </p>
        )}
      </div>
    </section>
  );
}
