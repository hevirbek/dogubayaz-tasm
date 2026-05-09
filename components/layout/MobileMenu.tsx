"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
      </button>

      {open ? (
        <div className="absolute left-4 right-4 top-16 z-50 rounded-lg border border-border bg-background p-3 shadow-soft">
          <nav aria-label="Mobil menü" className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  pathname === item.href && "bg-muted text-foreground"
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
