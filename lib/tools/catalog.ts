export type ScheduleKind = "vaccine" | "baby" | "pregnancy" | "postpartum";
export type MetricKind = "military" | "bmi" | "waist" | "energy";

export type CalculatorTool = {
  slug: string;
  label: string;
  href: string;
  description: string;
  footnote: string;
  kind: "schedule" | "metric";
  schedule?: ScheduleKind;
  metric?: MetricKind;
  dateLabel?: string;
};

export type ToolMenuItem = {
  label: string;
  href: string;
  external?: boolean;
};

export type ToolMenuGroup = {
  label: string;
  items: ToolMenuItem[];
};

export const externalTools: ToolMenuItem[] = [
  {
    label: "Nöbetçi Eczaneler",
    href: "https://www.agrieo.org.tr/nobetci-eczaneler",
    external: true
  },
  {
    label: "Rapor Ödeme Sistemi",
    href: "https://sbos.saglik.gov.tr/",
    external: true
  },
  {
    label: "E-Nabız Laboratuvar Sonucu",
    href: "https://www.enabiz.gov.tr/",
    external: true
  },
  {
    label: "Mamografi Sonucu",
    href: "https://www.enabiz.gov.tr/",
    external: true
  },
  {
    label: "Rahim Ağzı Kanseri Tarama (Smear) Sonucu",
    href: "https://www.enabiz.gov.tr/",
    external: true
  }
];

export const calculatorTools: CalculatorTool[] = [
  {
    slug: "bebek-asi-takvimi",
    label: "Bebek Aşı Takvimi Hesaplama",
    href: "/araclar/bebek-asi-takvimi",
    description: "Doğum tarihine göre ulusal çocukluk dönemi aşı aralıklarını görün.",
    footnote: "",
    kind: "schedule",
    schedule: "vaccine",
    dateLabel: "Doğum tarihi"
  },
  {
    slug: "bebek-izlem-takvimi",
    label: "Bebek İzlem Takvimi Hesaplama",
    href: "/araclar/bebek-izlem-takvimi",
    description: "Doğum tarihine göre ilk 9 aydaki bebek izlem günlerini görün.",
    footnote:
      "Bilgilendirme amaçlıdır, randevu değildir. Aralıklar bebek izlem protokolüne göredir.",
    kind: "schedule",
    schedule: "baby",
    dateLabel: "Doğum tarihi"
  },
  {
    slug: "gebe-izlem-takvimi",
    label: "Gebe İzlem Takvimi Hesaplama",
    href: "/araclar/gebe-izlem-takvimi",
    description: "Son adet tarihine göre gebe izlem aralıklarını ve tahmini doğum tarihini görün.",
    footnote:
      "Bilgilendirme amaçlıdır. Aralıklar Doğum Öncesi Bakım Yönetim Rehberi’ne göredir.",
    kind: "schedule",
    schedule: "pregnancy",
    dateLabel: "Son adet tarihi"
  },
  {
    slug: "lohusa-izlem-takvimi",
    label: "Lohusa İzlem Takvimi Hesaplama",
    href: "/araclar/lohusa-izlem-takvimi",
    description: "Doğum tarihine göre lohusa izlem günlerini görün.",
    footnote:
      "İlk üç izlem hastanede, sonraki üç izlem aile sağlığı merkezinde yapılır. Bilgilendirme amaçlıdır.",
    kind: "schedule",
    schedule: "postpartum",
    dateLabel: "Doğum tarihi"
  },
  {
    slug: "askerlik-boy-kilo",
    label: "Askerlik Boy Kilo Oranı Kontrolü",
    href: "/araclar/askerlik-boy-kilo",
    description: "Boy ve kiloyu askerlik boy-kilo cetveliyle karşılaştırın.",
    footnote:
      "Bilgilendirme amaçlıdır. Kesin karar sağlık kuruluna aittir.",
    kind: "metric",
    metric: "military"
  },
  {
    slug: "beden-kitle-indeksi",
    label: "Beden Kitle İndeksi",
    href: "/araclar/beden-kitle-indeksi",
    description: "Boy ve kilodan beden kitle indeksini hesaplayın.",
    footnote: "Yetişkinler içindir. Bu sonuç tanı yerine geçmez.",
    kind: "metric",
    metric: "bmi"
  },
  {
    slug: "bel-cevresi-risk",
    label: "Bel Çevresi Risk Saptama",
    href: "/araclar/bel-cevresi-risk",
    description: "Bel çevresine göre risk grubunu görün.",
    footnote: "Yetişkinler içindir. Bu sonuç tanı yerine geçmez.",
    kind: "metric",
    metric: "waist"
  },
  {
    slug: "aktivite-enerji",
    label: "Aktiviteye Göre Harcanan Enerji",
    href: "/araclar/aktivite-enerji",
    description: "Aktivite, süre ve kiloya göre harcanan enerjiyi hesaplayın.",
    footnote: "Yaklaşık değerdir. Kişisel duruma göre değişir.",
    kind: "metric",
    metric: "energy"
  }
];

export const toolMenuGroups: ToolMenuGroup[] = [
  {
    label: "Bağlantılar",
    items: externalTools
  },
  {
    label: "Hesaplamalar",
    items: calculatorTools.map(({ label, href }) => ({ label, href }))
  }
];

export function getCalculatorTool(slug: string) {
  return calculatorTools.find((tool) => tool.slug === slug);
}
