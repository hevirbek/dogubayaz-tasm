import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { News } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export function NewsCard({ news }: { news: News }) {
  const href = `/haberler/${news.slug || news.id}`;

  return (
    <article>
      <Card className="h-full overflow-hidden">
        <Link href={href} tabIndex={-1} aria-hidden className="block">
          <Image
            src={news.cover_image_url}
            alt=""
            width={1200}
            height={750}
            sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
        </Link>
        <CardHeader>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays aria-hidden className="h-4 w-4 text-primary" />
            <time dateTime={news.published_at}>{formatDate(news.published_at)}</time>
          </p>
          <CardTitle className="leading-7">
            <Link
              href={href}
              className="transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {news.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-4 line-clamp-3">{news.excerpt}</CardDescription>
          <Link
            href={href}
            className="inline-flex items-center text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Devamını Oku →
          </Link>
        </CardContent>
      </Card>
    </article>
  );
}
