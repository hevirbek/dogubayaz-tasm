import Image from "next/image";
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
  icon: Icon,
  image
}: {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  image: {
    src: string;
    alt: string;
  };
}) {
  return (
    <Card className="h-full overflow-hidden transition hover:-translate-y-0.5 hover:shadow-soft">
      <div className="relative aspect-[3/2]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <CardHeader>
        <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <Icon aria-hidden className="h-5 w-5" />
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
