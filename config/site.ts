export const siteConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Aile Sağlığı Merkezi",
  asmName: process.env.NEXT_PUBLIC_ASM_NAME || "Örnek Aile Sağlığı Merkezi",
  description:
    "Aile hekimliği, aşı takibi, gebe izlem, bebek ve çocuk izlemi ile temel sağlık danışmanlığı hizmetleri sunan modern aile sağlığı merkezi.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  phone: process.env.NEXT_PUBLIC_ASM_PHONE || "+90 000 000 00 00",
  email: process.env.NEXT_PUBLIC_ASM_EMAIL || "iletisim@example.com",
  address:
    process.env.NEXT_PUBLIC_ASM_ADDRESS ||
    "Mahalle adı, Cadde adı No: 1, İlçe / İl",
  nearbyDirections:
    process.env.NEXT_PUBLIC_ASM_NEARBY_DIRECTIONS ||
    "Yakın konum tarifi buraya eklenebilir. Örneğin: mahalle muhtarlığı, okul, eczane veya bilinen bir caddeye yakınlık bilgisi.",
  transitNote:
    process.env.NEXT_PUBLIC_ASM_TRANSIT_NOTE ||
    "Toplu taşıma bilgisi buraya eklenebilir. En yakın durak, minibüs hattı veya yürüme mesafesi notu paylaşılabilir.",
  parkingNote:
    process.env.NEXT_PUBLIC_ASM_PARKING_NOTE ||
    "Otopark bilgisi buraya eklenebilir. Yakın çevrede kısa süreli park imkanı veya kurum çevresi kullanım notu belirtilebilir.",
  district: "İlçe",
  city: "İl",
  timeZone: "Europe/Istanbul",
  workingHours: [
    { days: "Pazartesi - Cuma", hours: "08:00 - 17:00" },
    { days: "Cumartesi - Pazar", hours: "Kapalı" }
  ],
  socialLinks: [] as { label: string; href: string }[],
  mapEmbedUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL || ""
};

export const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hekimler", label: "Hekimler" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/duyurular", label: "Duyurular" },
  { href: "/iletisim", label: "İletişim" }
];
