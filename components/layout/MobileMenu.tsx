"use client";

import Link from "next/link";
import { ChevronDown, ExternalLink, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navItems } from "@/config/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toolsActive = pathname.startsWith("/araclar");
  const [toolsOpen, setToolsOpen] = useState(toolsActive);

  useEffect(() => {
    if (toolsActive) setToolsOpen(true);
  }, [toolsActive]);

  return (
    <div className="lg:hidden">
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
        <div className="absolute left-4 right-4 top-16 z-50 max-h-[calc(100dvh-4rem-76px)] overflow-y-auto rounded-lg border border-border bg-background p-3 shadow-soft">
          <nav aria-label="Mobil menü" className="grid gap-1">
            {navItems.map((item) =>
              item.groups ? (
                <div key={item.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    aria-expanded={toolsOpen}
                    onClick={() => setToolsOpen((value) => !value)}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className={cn("h-4 w-4 transition", toolsOpen && "rotate-180")} />
                  </button>
                  {toolsOpen ? (
                    <div className="mt-1 grid gap-2 pl-2">
                      {item.groups.map((group) => (
                        <div key={group.label}>
                          <p className="px-3 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {group.label}
                          </p>
                          {group.items.map((child) =>
                            child.external ? (
                              <a
                                key={child.label}
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                onClick={() => setOpen(false)}
                              >
                                <span>{child.label}</span>
                                <ExternalLink aria-hidden className="h-3.5 w-3.5 shrink-0" />
                              </a>
                            ) : (
                              <Link
                                key={child.label}
                                href={child.href}
                                className={cn(
                                  "block rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                  pathname === child.href && "bg-muted text-foreground"
                                )}
                                onClick={() => setOpen(false)}
                              >
                                {child.label}
                              </Link>
                            )
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href ?? "/"}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    pathname === item.href && "bg-muted text-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
