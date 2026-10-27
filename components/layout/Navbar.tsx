import Link from "next/link";
import { Phone } from "lucide-react";

import { MobileMenu } from "@/components/layout/MobileMenu";
import { NavDropdown } from "@/components/layout/NavDropdown";
import { SiteSearch } from "@/components/layout/SiteSearch";
import { Button } from "@/components/ui/button";
import { navItems, siteConfig } from "@/config/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex min-h-16 items-center justify-between gap-4 py-2">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Ağrı İl Sağlık Müdürlüğü, Doğubayazıt 2 Nolu Aile Sağlık Merkezi — ana sayfa"
        >
          <img
            src="https://dosyaism.saglik.gov.tr/Resim/174398/0/arma-logo-turkcejpg.png"
            alt="T.C. Sağlık Bakanlığı Logosu"
            className="h-10 w-auto shrink-0 object-contain drop-shadow-sm"
          />
          <span className="min-w-0">
            <span className="block truncate whitespace-nowrap text-[11px] font-bold leading-tight tracking-wide text-foreground sm:text-xs md:text-sm">
              AĞRI İL SAĞLIK MÜDÜRLÜĞÜ
            </span>
            <span className="block truncate whitespace-nowrap text-[10px] font-semibold leading-tight text-muted-foreground sm:text-[11px] md:text-xs">
              DOĞUBAYAZIT 2 NOLU AİLE SAĞLIK MERKEZİ
            </span>
          </span>
        </Link>

        <nav className="hidden shrink-0 items-center gap-0.5 lg:flex" aria-label="Ana menü">
          {navItems.map((item) =>
            item.groups ? (
              <NavDropdown key={item.label} label={item.label} groups={item.groups} />
            ) : (
              <Link
                key={item.href}
                href={item.href ?? "/"}
                className="whitespace-nowrap rounded-md px-1.5 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring xl:px-3"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
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
