import Link from "next/link";
import { Megaphone } from "lucide-react";

import type { Announcement } from "@/lib/data/announcements";
import { formatDate } from "@/lib/utils";

export function FeaturedAnnouncementBanner({
  announcement
}: {
  announcement?: Announcement;
}) {
  return (
    <section className="border-y border-cyan-100 bg-cyan-50/70">
      <div className="container py-4">
        <div className="flex flex-col gap-3 rounded-lg border border-cyan-200 bg-white p-4 shadow-card sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Megaphone aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {announcement
                  ? announcement.title
                  : "Güncel çalışma saatleri ve duyurular için bu alanı takip ediniz."}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {announcement ? (
                  <>
                    <time dateTime={announcement.published_at}>
                      {formatDate(announcement.published_at)}
                    </time>{" "}
                    tarihinde yayınlandı. Güncel bilgilendirmeler için duyurular
                    sayfasını takip edebilirsiniz.
                  </>
                ) : (
                  "Çalışma düzeni ve genel bilgilendirmeler duyurular sayfasında paylaşılır."
                )}
              </p>
            </div>
          </div>
          <Link
            href="/duyurular"
            className="inline-flex shrink-0 items-center justify-center rounded-md border border-cyan-200 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-cyan-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Duyurulara Git
          </Link>
        </div>
      </div>
    </section>
  );
}
