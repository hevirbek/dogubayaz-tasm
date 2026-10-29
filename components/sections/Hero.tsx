"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const slides = [
  {
    src: "/images/hero/birinci-basamak.jpg",
    alt: "Aile hekimliği birimleri sağlığınızın korunmasında ve tedavinizin başlangıcında birinci basamaktır. İleri merkeze başvurmadan önce aile hekiminize başvurunuz."
  },
  {
    src: "/images/hero/randevu.jpg",
    alt: "Aile hekimliğinde muayene olmadan önce mutlaka MHRS veya 182 üzerinden randevu alınız."
  },
  {
    src: "/images/hero/kimlik.jpg",
    alt: "Muayene olmaya gelirken yanınızda mutlaka geçerli kimlik kartı bulundurunuz ve randevu saatinize özen gösteriniz."
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
      <div className="container py-8 md:py-10">
        <h1 className="sr-only">Koruyucu ve Temel Sağlık Hizmetleri</h1>
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
              <div className="relative aspect-video w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1180px) 1148px, 100vw"
                  className="object-cover"
                />
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

          <div className="mt-4 flex justify-center gap-2" role="group" aria-label="Bilgilendirme slaytları">
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
