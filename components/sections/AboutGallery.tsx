"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { AboutImage } from "@/lib/data/about";

export function AboutGallery({ images }: { images: AboutImage[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const current = active === null ? null : images[active];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active !== null && !dialog.open) dialog.showModal();
    if (active === null && dialog.open) dialog.close();
  }, [active]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setActive(null);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (active === null) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive((index) => (index === null ? index : (index + 1) % images.length));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive((index) =>
          index === null ? index : (index - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, images.length]);

  const step = (delta: number) => {
    setActive((index) => {
      if (index === null) return index;
      return (index + delta + images.length) % images.length;
    });
  };

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              className="group block w-full overflow-hidden rounded-lg border border-border bg-white text-left shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              onClick={() => setActive(index)}
              aria-label={`${image.alt}. Büyük görüntüle`}
            >
              <Image
                src={image.src}
                alt=""
                width={1600}
                height={1200}
                className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Fotoğraf galerisi"
        className="w-[min(100%-2rem,64rem)] max-w-5xl border-0 bg-transparent p-0 backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
        onClick={(event) => {
          if (event.target === dialogRef.current) setActive(null);
        }}
      >
        {current ? (
          <div className="overflow-hidden rounded-xl bg-slate-950 text-white shadow-card">
            <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
              <p className="text-sm text-slate-300">
                {(active ?? 0) + 1} / {images.length}
              </p>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white"
                onClick={() => setActive(null)}
                aria-label="Galeriyi kapat"
              >
                <X aria-hidden className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative bg-black">
              <Image
                src={current.src}
                alt={current.alt}
                width={1600}
                height={1200}
                className="max-h-[70vh] w-full object-contain"
                sizes="90vw"
              />
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90"
                onClick={() => step(-1)}
                aria-label="Önceki fotoğraf"
              >
                <ChevronLeft aria-hidden className="h-5 w-5" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90"
                onClick={() => step(1)}
                aria-label="Sonraki fotoğraf"
              >
                <ChevronRight aria-hidden className="h-5 w-5" />
              </Button>
            </div>
            <p className="px-4 py-3 text-sm leading-6 text-slate-200">{current.alt}</p>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
