import {
  BadgeCheck,
  Building2,
  FileWarning,
  HeartPulse,
  IdCard,
  PhoneCall
} from "lucide-react";

export const beforeVisitItems = [
  {
    title: "Kimlik belgenizi yanınızda bulundurun",
    description:
      "Başvuru ve kayıt işlemlerinde kimlik doğrulaması gerekebilir.",
    icon: IdCard
  },
  {
    title: "İzlem ve aşı için önce bilgi alın",
    description:
      "Bebek, çocuk, gebe izlem ve aşı süreçleri için uygun zaman bilgisini telefonla öğrenebilirsiniz.",
    icon: PhoneCall
  },
  {
    title: "Özel sağlık bilginizi formdan paylaşmayın",
    description:
      "TC kimlik numarası, tanı, reçete, rapor veya test sonucu gibi bilgileri iletişim formuna yazmayınız.",
    icon: FileWarning
  },
  {
    title: "Acil durumlarda 112’yi arayın",
    description:
      "Bu web sitesi ve iletişim formu acil sağlık başvuruları için kullanılmamalıdır.",
    icon: HeartPulse
  }
];

export const commonLinks = [
  {
    title: "e-Nabız",
    description: "Kişisel sağlık kayıtları ve sonuçlar için resmi sistem.",
    href: "https://enabiz.gov.tr",
    icon: BadgeCheck
  },
  {
    title: "MHRS",
    description: "Hastane ve hekim randevuları için merkezi randevu sistemi.",
    href: "https://www.mhrs.gov.tr",
    icon: Building2
  },
  {
    title: "Sağlık Bakanlığı",
    description: "Resmi sağlık duyuruları ve kamusal bilgilendirmeler.",
    href: "https://www.saglik.gov.tr",
    icon: BadgeCheck
  },
  {
    title: "ALO 184 SABİM",
    description: "Sağlık Bakanlığı iletişim merkezi bilgilendirme kanalı.",
    href: "https://sabim.gov.tr",
    icon: PhoneCall
  }
];
