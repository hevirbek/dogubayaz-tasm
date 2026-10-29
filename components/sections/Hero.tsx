"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const slides = [
  {
    src: "/images/hakkimizda/intro.jpg",
    alt: "Hekim odası ile muayene masasının göründüğü aydınlık bir klinik iç mekanı",
    text: "Aile hekimliği birimleri sağlığınızın korunmasında ve tedavinizin başlangıcında birinci basamaktır. İleri merkeze başvurmadan önce aile hekiminize başvurunuz."
  },
  {
    src: "/images/hakkimizda/exam.jpg",
    alt: "Lavabo, dolap ve malzeme rafının bulunduğu klinik odası",
    text: "Aile hekimliğinde muayene olmadan önce mutlaka MHRS veya 182 üzerinden randevu alınız."
  },
  {
    src: "/images/hakkimizda/reception.jpg",
    alt: "Boş bir danışma bankosu",
    text: "Muayene olmaya gelirken yanınızda mutlaka geçerli kimlik kartı bulundurunuz ve randevu saatinize özen gösteriniz."
  }
];

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = slides.length;
  const item = slides[index] ?? slides[0];

  useEffect(() => {
    if (paused || reducedMotion || count < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [count, paused, reducedMotion]);

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white">
      <div className="container grid gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:py-16 lg:py-20">
        <div>
          <p className="mb-4 inline-flex rounded-md bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
            T.C. Sağlık Bakanlığı
          </p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Koruyucu ve Temel <br /> Sağlık Hizmetleri
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            {siteConfig.description}
          </p>
        </div>

        <div
          className="relative"
          aria-roledescription="carousel"
          aria-label="Merkez bilgilendirmesi"
          tabIndex={0}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setPaused(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              go(index + 1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              go(index - 1);
            }
          }}
        >
          <div className="relative">
          <div
            className="relative overflow-hidden rounded-lg border border-white shadow-soft"
            onTouchStart={(event) => {
              const point = event.changedTouches[0];
              touch.current = { x: point.clientX, y: point.clientY };
            }}
            onTouchEnd={(event) => {
              if (!touch.current) return;
              const point = event.changedTouches[0];
              const deltaX = point.clientX - touch.current.x;
              const deltaY = point.clientY - touch.current.y;
              touch.current = null;
              if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) {
                return;
              }
              go(deltaX < 0 ? index + 1 : index - 1);
            }}
          >
            <div key={item.src} className="animate-in fade-in duration-500">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 768px) 46vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 px-12 pb-24 pt-4 text-sm font-medium leading-6 text-white sm:px-14 sm:pb-28 sm:pt-5 sm:text-base sm:leading-7">
                  {item.text}
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute left-2.5 top-1/2 h-8 w-8 -translate-y-1/2 bg-white/90 sm:left-3"
              aria-label="Önceki bilgilendirme"
              onClick={() => go(index - 1)}
            >
              <ChevronLeft aria-hidden className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute right-2.5 top-1/2 h-8 w-8 -translate-y-1/2 bg-white/90 sm:right-3"
              aria-label="Sonraki bilgilendirme"
              onClick={() => go(index + 1)}
            >
              <ChevronRight aria-hidden className="h-4 w-4" />
            </Button>
          </div>

          <div className="absolute -bottom-5 left-5 right-5 rounded-lg border border-border bg-background p-4 shadow-card sm:left-auto sm:w-72">
            <p className="text-sm font-semibold text-foreground">Genel iletişim</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sağlık verisi paylaşmadan genel bilgi ve yönlendirme talebi oluşturabilirsiniz.
            </p>
          </div>
          </div>

          <div className="mt-8 flex justify-center gap-2" role="group" aria-label="Bilgilendirme slaytları">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.src}
                type="button"
                aria-label={`${slideIndex + 1}. bilgilendirme`}
                aria-current={slideIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  slideIndex === index ? "w-8 bg-primary" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
