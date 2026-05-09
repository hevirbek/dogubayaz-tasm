import type { Metadata, Viewport } from "next";

import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.asmName} | Aile Sağlığı Merkezi`,
    template: `%s | ${siteConfig.asmName}`
  },
  description: `${siteConfig.asmName}, ${siteConfig.district}/${siteConfig.city} bölgesinde aile hekimliği, aşı takibi, gebe izlem, bebek/çocuk izlem ve temel sağlık danışmanlığı hizmetleri sunar.`,
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    title: `${siteConfig.asmName} | Aile Sağlığı Merkezi`,
    description: siteConfig.description,
    images: [
      {
        url: "/images/asm-hero.png",
        width: 1400,
        height: 900,
        alt: `${siteConfig.asmName} web sitesi görseli`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.asmName} | Aile Sağlığı Merkezi`,
    description: siteConfig.description,
    images: ["/images/asm-hero.png"]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f9488"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <JsonLd />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileActionBar />
      </body>
    </html>
  );
}
