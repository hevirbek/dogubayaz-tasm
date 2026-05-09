import Link from "next/link";
import { CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Announcement } from "@/lib/data/announcements";
import { formatDate } from "@/lib/utils";

export function AnnouncementCard({
  announcement
}: {
  announcement: Announcement;
}) {
  return (
    <article>
      <Card className="h-full">
        <CardHeader>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays aria-hidden className="h-4 w-4 text-primary" />
            <time dateTime={announcement.published_at}>
              {formatDate(announcement.published_at)}
            </time>
          </p>
          <CardTitle className="leading-7">
            <Link
              href="/duyurular"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {announcement.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{announcement.content}</CardDescription>
        </CardContent>
      </Card>
    </article>
  );
}
