import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Phone, ShieldAlert } from "lucide-react";

import { EmergencyNoticeCard } from "@/components/sections/EmergencyNoticeCard";
import { Button } from "@/components/ui/button";
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
    description: `${siteConfig.asmName} ${service.title.toLocaleLowerCase("tr-TR")} hizmeti hakkında genel bilgi ve iletişim seçenekleri.`,
    alternates: {
      canonical: `/hizmetler/${service.slug}`
    },
    openGraph: {
      title: `${service.title} | ${siteConfig.asmName}`,
      description: service.description,
      url: `/hizmetler/${service.slug}`
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

  const Icon = service.icon;

  return (
    <>
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <Link
            href="/hizmetler"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Hizmetlere dön
          </Link>
          <div className="mt-6 flex max-w-3xl flex-col gap-5 sm:flex-row sm:items-start">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Icon aria-hidden className="h-7 w-7" />
            </span>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                Hizmet Detayı
              </p>
              <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
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
        <div className="container grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-5">
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

          <aside className="grid gap-5 self-start lg:sticky lg:top-24">
            <Card>
              <CardHeader>
                <CardTitle>Merkezle iletişime geçin</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <p className="text-sm leading-6 text-muted-foreground">
                  {service.contactNote}
                </p>
                <Button asChild>
                  <a href={`tel:${siteConfig.phone}`}>
                    <Phone aria-hidden className="h-4 w-4" />
                    Telefon Et
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/iletisim">
                    <MessageCircle aria-hidden className="h-4 w-4" />
                    İletişim Formu
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <EmergencyNoticeCard />
          </aside>
        </div>
      </section>
    </>
  );
}
