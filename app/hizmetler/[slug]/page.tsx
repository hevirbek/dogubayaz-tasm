import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldAlert } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { getServiceBySlug, services } from "@/lib/data/services";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({
  params
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Hizmet Bulunamadı"
    };
  }

  return {
    title: service.title,
    description: `${siteConfig.asmName} ${service.title.toLocaleLowerCase("tr-TR")} hizmeti hakkında genel bilgi.`,
    alternates: {
      canonical: `/hizmetler/${service.slug}`
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.asmName}`,
      description: service.description,
      url: `/hizmetler/${service.slug}`,
      images: [service.image.src]
    }
  };
}

export default async function ServiceDetailPage({
  params
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <section className="bg-cyan-50 py-10">
        <div className="container">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Hizmetlere dön
          </Link>
          <div className="mt-6 grid items-center gap-6 md:grid-cols-[minmax(0,280px)_1fr] md:gap-8 lg:grid-cols-[minmax(0,360px)_1fr]">
            <div className="relative aspect-[3/2] overflow-hidden rounded-lg border border-white shadow-soft">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                priority
                sizes="(min-width: 1024px) 360px, (min-width: 768px) 280px, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Hizmet Detayı
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-slate-700">
                {service.detailIntro}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container grid gap-5">
          {service.detailSections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-7 text-muted-foreground">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          ))}

          <Card className="border-sky-200 bg-sky-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-600 text-white">
                  <ShieldAlert aria-hidden className="h-5 w-5" />
                </span>
                <CardTitle>Özel sağlık bilgisi paylaşmayın</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-sky-950">
                Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır. İletişim
                formu üzerinden TC kimlik numarası, tanı, reçete, rapor, test
                sonucu veya özel sağlık bilginizi paylaşmayınız.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
