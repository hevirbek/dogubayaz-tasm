import type { Metadata } from "next";
import Image from "next/image";

import { AboutGallery } from "@/components/sections/AboutGallery";
import { siteConfig } from "@/config/site";
import {
  aboutGallery,
  aboutIntroImage,
  aboutIntroParagraph,
  aboutMission,
  aboutVision
} from "@/lib/data/about";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: `${siteConfig.asmName} hakkında bilgi, vizyon ve misyon.`,
  alternates: { canonical: "/hakkimizda" }
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            {siteConfig.asmName}
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            Hakkımızda
          </h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
            <div className="overflow-hidden rounded-lg border border-border bg-white shadow-soft">
              <Image
                src={aboutIntroImage.src}
                alt={aboutIntroImage.alt}
                width={1600}
                height={1200}
                priority
                className="aspect-[4/3] w-full object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <p className="text-lg leading-8 text-slate-700">
              {aboutIntroParagraph(siteConfig.asmName)}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
            <article className="rounded-lg border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                {aboutVision.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-700">{aboutVision.body}</p>
            </article>
            <article className="rounded-lg border border-border bg-card p-6 shadow-card sm:p-8">
              <h2 className="text-2xl font-bold tracking-normal text-slate-950">
                {aboutMission.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-700">{aboutMission.body}</p>
            </article>
          </div>

          <div className="mt-14 lg:mt-20">
            <h2 className="text-3xl font-bold tracking-normal text-slate-950">Galeri</h2>
            <div className="mt-8">
              <AboutGallery images={aboutGallery} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
