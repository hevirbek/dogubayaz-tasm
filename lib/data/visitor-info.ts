import {
  BadgeCheck,
  Building2,
  CalendarCheck,
  FileWarning,
  HeartPulse,
  IdCard,
  PhoneCall
} from "lucide-react";

export const beforeVisitItems = [
  {
    title: "Kimlik belgenizi yanınızda bulundurun.",
    description:
      "Başvuru ve kayıt işlemlerinde kimlik doğrulaması mutlaka gerekmektedir.",
    icon: IdCard
  },
  {
    title: "Randevu alın",
    description:
      "Başvurunuz öncesinde mutlaka randevu alınız ve randevu saatinize uymaya özen gösteriniz.",
    icon: CalendarCheck
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
    icon: BadgeCheck,
    logoUrl: "/images/e-nabizLogoMavi.svg"
  },
  {
    title: "MHRS",
    description: "Hastane ve hekim randevuları için merkezi randevu sistemi.",
    href: "https://www.mhrs.gov.tr",
    icon: Building2,
    logoUrl: "/images/mhrsLogo.svg"
  },
  {
    title: "Sağlık Bakanlığı",
    description: "Resmi sağlık duyuruları ve kamusal bilgilendirmeler.",
    href: "https://www.saglik.gov.tr",
    icon: BadgeCheck,
    logoUrl: "https://dosyaism.saglik.gov.tr/Resim/174398/0/arma-logo-turkcejpg.png"
  },
  {
    title: "ALO 184 SABİM",
    description: "Sağlık Bakanlığı iletişim merkezi bilgilendirme kanalı.",
    href: "https://sabim.gov.tr",
    icon: PhoneCall,
    logoUrl: "/images/sabim-logo-2.svg"
  }
];
