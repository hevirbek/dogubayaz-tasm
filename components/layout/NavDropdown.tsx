"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import type { ToolMenuGroup } from "@/lib/tools/catalog";
import { cn } from "@/lib/utils";

const itemClass =
  "flex items-start justify-between gap-3 rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function NavDropdown({ label, groups }: { label: string; groups: ToolMenuGroup[] }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onPointer = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        className={cn(
          "inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-3",
          open && "bg-muted text-foreground"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown aria-hidden className={cn("h-4 w-4 transition", open && "rotate-180")} />
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-background p-3 shadow-soft lg:w-[46rem]"
        >
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {groups.map((group) => (
              <div key={group.label}>
                <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.label}
                </p>
                <ul className="grid">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          role="menuitem"
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={itemClass}
                          onClick={() => setOpen(false)}
                        >
                          <span>{item.label}</span>
                          <ExternalLink aria-hidden className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                        </a>
                      ) : (
                        <Link
                          role="menuitem"
                          href={item.href}
                          className={cn(itemClass, pathname === item.href && "bg-muted text-foreground")}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
