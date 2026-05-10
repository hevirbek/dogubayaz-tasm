"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/lib/data/services";
import { navItems } from "@/config/site";

export function SiteSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
      inputRef.current?.focus();
    } else {
      dialogRef.current?.close();
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const results = [
    ...navItems.filter((item) =>
      item.label.toLowerCase().includes(query.toLowerCase())
    ),
    ...services
      .filter(
        (service) =>
          service.title.toLowerCase().includes(query.toLowerCase()) ||
          service.description.toLowerCase().includes(query.toLowerCase())
      )
      .map((s) => ({ label: `Hizmet: ${s.title}`, href: `/hizmetler/${s.slug}` }))
  ];

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9"
        onClick={() => setIsOpen(true)}
        aria-label="Arama yap"
      >
        <Search className="h-4 w-4" />
      </Button>

      <dialog
        ref={dialogRef}
        className="backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm bg-transparent w-full max-w-lg p-4"
        onClose={() => setIsOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) setIsOpen(false);
        }}
      >
        <div className="bg-background rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="flex items-center px-4 py-3 border-b border-border">
            <Search className="h-5 w-5 text-muted-foreground mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Sayfalarda veya hizmetlerde arayın..."
              className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-2"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto py-2">
            {query.trim() === "" ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                Aramaya başlamak için bir şeyler yazın.
              </p>
            ) : results.length > 0 ? (
              <ul className="grid">
                {results.map((result, i) => (
                  <li key={`${result.href}-${i}`}>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-muted text-sm focus:bg-muted focus:outline-none"
                      onClick={() => handleSelect(result.href)}
                    >
                      {result.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">
                &quot;{query}&quot; için sonuç bulunamadı.
              </p>
            )}
          </div>
          <div className="bg-muted px-4 py-2 text-xs text-muted-foreground border-t border-border flex justify-between">
            <span>Seçmek için tıklayın</span>
            <span>Kapatmak için ESC</span>
          </div>
        </div>
      </dialog>
    </>
  );
}
