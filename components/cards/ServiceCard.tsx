import Link from "next/link";
import { LucideIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

export function ServiceCard({
  title,
  slug,
  description,
  icon: Icon
}: {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-soft">
      <CardHeader>
        <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Icon aria-hidden className="h-6 w-6" />
        </span>
        <CardTitle>
          <Link
            href={`/hizmetler/${slug}`}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
        <Link
          href={`/hizmetler/${slug}`}
          className="mt-4 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
        >
          Detayları gör
        </Link>
      </CardContent>
    </Card>
  );
}
