"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { SectionHeading } from "@/components/sections/SectionHeading";
import { Button } from "@/components/ui/button";
import type { News } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

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

export function NewsSlider({ news }: { news: News[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const touch = useRef<{ x: number; y: number } | null>(null);
  const count = news.length;
  const item = news[index] ?? news[0];

  useEffect(() => {
    if (index >= count) {
      setIndex(0);
    }
  }, [count, index]);

  useEffect(() => {
    if (paused || reducedMotion || count < 2) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % count);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [count, paused, reducedMotion]);

  if (!item) {
    return null;
  }

  function go(next: number) {
    setIndex((next + count) % count);
  }

  return (
    <section
      className="section-padding"
      aria-roledescription="carousel"
      aria-label="Son haberler"
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
        if (count < 2) return;
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
      <div className="container">
        <SectionHeading
          eyebrow="Haberler"
          title="Merkezimizden haberler"
          description="Etkinlik ve bilgilendirme haberlerinin son beşini buradan takip edebilirsiniz."
          action={
            <Button asChild variant="outline">
              <Link href="/haberler">Tüm Haberler</Link>
            </Button>
          }
        />

        <div
          className="relative overflow-hidden rounded-xl border border-border shadow-soft"
          onTouchStart={(event) => {
            const point = event.changedTouches[0];
            touch.current = { x: point.clientX, y: point.clientY };
          }}
          onTouchEnd={(event) => {
            if (!touch.current || count < 2) return;
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
          <div key={item.id} className="animate-in fade-in duration-500">
            <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[2.35/1]">
              <Image
                src={item.cover_image_url}
                alt=""
                fill
                priority={index === 0}
                sizes="(min-width: 1180px) 1148px, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/10" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">
                <p className="text-sm font-medium text-cyan-100">
                  <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                  {count > 1 ? (
                    <span className="ml-3 text-white/70">
                      {index + 1} / {count}
                    </span>
                  ) : null}
                </p>
                <h3 className="mt-2 max-w-3xl text-2xl font-bold tracking-tight text-white sm:text-4xl">
                  <Link
                    href={`/haberler/${item.slug || item.id}`}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-100 sm:text-base sm:leading-7 line-clamp-2">
                  {item.excerpt}
                </p>
                <Link
                  href={`/haberler/${item.slug || item.id}`}
                  className="mt-4 inline-flex text-sm font-semibold text-white underline-offset-4 hover:underline"
                >
                  Haberi oku
                </Link>
              </div>
            </div>
          </div>

          {count > 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 sm:left-4"
                aria-label="Önceki haber"
                onClick={() => go(index - 1)}
              >
                <ChevronLeft aria-hidden className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 sm:right-4"
                aria-label="Sonraki haber"
                onClick={() => go(index + 1)}
              >
                <ChevronRight aria-hidden className="h-5 w-5" />
              </Button>
            </>
          ) : null}
        </div>

        {count > 1 ? (
          <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Haber slaytları">
            {news.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`${slideIndex + 1}. haber: ${slide.title}`}
                aria-current={slideIndex === index ? "true" : undefined}
                className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  slideIndex === index ? "w-8 bg-primary" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                onClick={() => setIndex(slideIndex)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
