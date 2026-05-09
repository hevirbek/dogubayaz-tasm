import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { navItems, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-slate-950 text-slate-100">
      <div className="container grid gap-8 py-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <h2 className="text-lg font-semibold">{siteConfig.asmName}</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
            Koruyucu sağlık hizmetleri, aile hekimliği izlemleri ve genel
            bilgilendirme süreçleri için güvenilir iletişim noktası.
          </p>
          <p className="mt-4 rounded-md border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-50">
            Acil durumlarda 112 Acil Çağrı Merkezi’ni arayınız.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            Sayfalar
          </h3>
          <nav className="mt-4 grid gap-2" aria-label="Alt menü">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/gizlilik"
              className="text-sm text-slate-300 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Gizlilik ve KVKK Bilgilendirmesi
            </Link>
          </nav>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
            İletişim
          </h3>
          <ul className="mt-4 grid gap-3 text-sm text-slate-300">
            <li className="flex gap-2">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              {siteConfig.address}
            </li>
            <li className="flex gap-2">
              <Phone aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <a href={`tel:${siteConfig.phone}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex gap-2">
              <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
                {siteConfig.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              Hafta içi 08:00 - 17:00
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5">
        <div className="container text-sm text-slate-400">
          © {new Date().getFullYear()} {siteConfig.asmName}. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
