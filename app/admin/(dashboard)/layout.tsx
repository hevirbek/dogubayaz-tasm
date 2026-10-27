import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, LayoutDashboard, Stethoscope, Megaphone, Newspaper, Clock, Mail } from "lucide-react";

import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Admin Paneli",
  robots: {
    index: false,
    follow: false
  }
};

const navItems = [
  { href: "/admin", label: "Özet / Dashboard", icon: LayoutDashboard },
  { href: "/admin/hekimler", label: "Hekimler & İzinler", icon: Stethoscope },
  { href: "/admin/duyurular", label: "Duyuru Yönetimi", icon: Megaphone },
  { href: "/admin/haberler", label: "Haber Yönetimi", icon: Newspaper },
  { href: "/admin/saatler", label: "Saatler & Tatiller", icon: Clock },
  { href: "/admin/mesajlar", label: "Gelen Mesajlar", icon: Mail },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row bg-slate-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0 bg-white border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Yönetim</p>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 mt-1">Admin Paneli</h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="grid gap-1 px-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 hover:text-slate-900"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-slate-500" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-border mt-auto">
          <form action={logoutAction}>
            <Button type="submit" variant="outline" className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700">
              <LogOut aria-hidden className="mr-2 h-4 w-4" />
              Çıkış Yap
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 min-w-0">
        <div className="mx-auto max-w-5xl">
          {children}
        </div>
      </main>
    </div>
  );
}
