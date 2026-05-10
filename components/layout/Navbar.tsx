import Link from "next/link";
import { Phone } from "lucide-react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Ana sayfaya git"
        >
          <img
            src="https://dosyaism.saglik.gov.tr/Resim/174398/0/arma-logo-turkcejpg.png"
            alt="T.C. Sağlık Bakanlığı Logosu"
            className="h-10 w-auto shrink-0 object-contain drop-shadow-sm"
          />
          <span className="min-w-0">
            <span className="block truncate text-sm font-bold text-foreground sm:text-base">
              {siteConfig.asmName}
            </span>
            <span className="block text-xs text-muted-foreground">
              Aile Sağlığı Merkezi
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Ana menü">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <SiteSearch />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={`tel:${siteConfig.phone}`} aria-label="Telefon et">
              <Phone aria-hidden className="h-4 w-4" />
              Telefon Et
            </a>
          </Button>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
