import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";

import { siteConfig } from "@/config/site";

export function MobileActionBar() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    siteConfig.address
  )}`;

  const actions = [
    {
      label: "Telefon Et",
      href: `tel:${siteConfig.phone}`,
      icon: Phone,
      external: false
    },
    {
      label: "Yol Tarifi",
      href: mapsHref,
      icon: MapPin,
      external: true
    },
    {
      label: "İletişim",
      href: "/iletisim",
      icon: MessageCircle,
      external: false
    }
  ];

  return (
    <nav
      aria-label="Hızlı işlemler"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-3 py-2 shadow-[0_-10px_30px_rgba(15,23,42,0.12)] backdrop-blur print:hidden md:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
        {actions.map((action) => {
          const Icon = action.icon;
          const className =
            "flex min-h-14 flex-col items-center justify-center gap-1 rounded-md px-2 py-2 text-center text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

          if (action.external) {
            return (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={className}
              >
                <Icon aria-hidden className="h-5 w-5 text-primary" />
                {action.label}
              </a>
            );
          }

          return (
            <Link key={action.label} href={action.href} className={className}>
              <Icon aria-hidden className="h-5 w-5 text-primary" />
              {action.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
