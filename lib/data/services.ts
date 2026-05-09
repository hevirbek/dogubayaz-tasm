import {
  Baby,
  ClipboardCheck,
  FileText,
  HeartPulse,
  type LucideIcon,
  ShieldCheck,
  Stethoscope
} from "lucide-react";

export type Service = {
  title: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  detailIntro: string;
  detailSections: {
    title: string;
    content: string;
  }[];
  contactNote: string;
};

export const services: Service[] = [
  {
    title: "Aşı Takibi",
    slug: "asi-takibi",
    description:
      "Ulusal aşı takvimi kapsamında bebek, çocuk ve yetişkin aşı süreçlerinin izlenmesine destek olunur.",
    icon: ShieldCheck,
    detailIntro:
      "Aşı takibi, koruyucu sağlık hizmetlerinin önemli bir parçasıdır. Merkezimizde aşı süreçleri ulusal takvim ve ilgili mevzuat çerçevesinde takip edilir.",
    detailSections: [
      {
        title: "Bu hizmet hakkında genel bilgi",
        content:
          "Bebek, çocuk ve gerekli durumlarda yetişkin aşıları için kayıt, izlem ve bilgilendirme süreçleri yürütülür. Aşı uygunluğu ve zamanlaması kişisel duruma göre sağlık personeli tarafından değerlendirilir."
      },
      {
        title: "Merkeze gelmeden önce",
        content:
          "Kimlik belgenizi ve varsa önceki aşı/izlem bilgilerinizi yanınızda bulundurmanız işlemleri kolaylaştırır. Uygun zaman bilgisi için gelmeden önce telefonla iletişime geçebilirsiniz."
      }
    ],
    contactNote:
      "Aşı takibi hakkında genel bilgi almak için merkezimizi arayabilir veya iletişim formunu kullanabilirsiniz."
  },
  {
    title: "Gebe İzlem",
    slug: "gebe-izlem",
    description:
      "Gebelik döneminde rutin izlem, bilgilendirme ve gerekli yönlendirme süreçleri yürütülür.",
    icon: HeartPulse,
    detailIntro:
      "Gebe izlem hizmetleri, gebelik sürecinde koruyucu sağlık yaklaşımıyla düzenli takip ve bilgilendirme sağlamayı amaçlar.",
    detailSections: [
      {
        title: "Bu hizmet hakkında genel bilgi",
        content:
          "Gebelik döneminde rutin izlem, temel ölçümler, bilgilendirme ve gerekli durumlarda ilgili sağlık birimlerine yönlendirme süreçleri yürütülür."
      },
      {
        title: "Merkeze gelmeden önce",
        content:
          "Kimlik belgenizi ve varsa gebelik takibinizle ilgili önceki kayıtları yanınızda getirmeniz yararlı olur. İzlem zamanı için aile hekiminiz veya aile sağlığı çalışanınızla iletişime geçebilirsiniz."
      }
    ],
    contactNote:
      "Gebe izlem süreciyle ilgili genel sorularınız için telefonla merkezimize ulaşmanız önerilir."
  },
  {
    title: "Bebek ve Çocuk İzlem",
    slug: "bebek-cocuk-izlem",
    description:
      "Büyüme, gelişme ve koruyucu sağlık hizmetleri kapsamında düzenli takip sağlanır.",
    icon: Baby,
    detailIntro:
      "Bebek ve çocuk izlemleri, büyüme-gelişme süreçlerinin düzenli takip edilmesine ve koruyucu sağlık hizmetlerinin planlanmasına destek olur.",
    detailSections: [
      {
        title: "Bu hizmet hakkında genel bilgi",
        content:
          "Bebek ve çocuklarda rutin izlem, gelişim takibi, aşı takvimi kontrolü ve aileye yönelik genel bilgilendirme süreçleri yürütülür."
      },
      {
        title: "Merkeze gelmeden önce",
        content:
          "Çocuğun kimlik bilgileri, varsa aşı kartı ve önceki izlem bilgileriyle başvurmanız işlemleri hızlandırır. Uygun zaman için merkezimizle iletişime geçebilirsiniz."
      }
    ],
    contactNote:
      "Bebek ve çocuk izlem zamanları için telefonla bilgi alabilirsiniz."
  },
  {
    title: "Kronik Hastalık Takibi",
    slug: "kronik-hastalik-takibi",
    description:
      "Hipertansiyon, diyabet ve benzeri kronik durumlarda düzenli izlem ve danışmanlık sunulur.",
    icon: ClipboardCheck,
    detailIntro:
      "Kronik hastalık takibi, düzenli izlem ve temel sağlık danışmanlığıyla mevcut sağlık durumunun takip edilmesine yardımcı olur.",
    detailSections: [
      {
        title: "Bu hizmet hakkında genel bilgi",
        content:
          "Hipertansiyon, diyabet ve benzeri kronik durumlarda aile hekimliği kapsamında düzenli takip, kayıt ve gerektiğinde yönlendirme süreçleri yürütülür."
      },
      {
        title: "Merkeze gelmeden önce",
        content:
          "Kullandığınız ilaçların listesini, varsa son ölçüm ve tetkik bilgilerinizi yanınızda getirmeniz değerlendirme sürecine katkı sağlar."
      }
    ],
    contactNote:
      "Kronik hastalık takibiyle ilgili genel bilgi için merkezimizle iletişime geçebilirsiniz."
  },
  {
    title: "Muayene ve Danışmanlık",
    slug: "muayene-danismanlik",
    description:
      "Aile hekimliği kapsamında temel muayene, değerlendirme ve sağlık danışmanlığı yapılır.",
    icon: Stethoscope,
    detailIntro:
      "Muayene ve danışmanlık hizmetleri, aile hekimliği kapsamındaki temel başvuru ve değerlendirme süreçlerini içerir.",
    detailSections: [
      {
        title: "Bu hizmet hakkında genel bilgi",
        content:
          "Genel sağlık şikayetleri, koruyucu sağlık danışmanlığı ve gerekli durumlarda ilgili sağlık kurumlarına yönlendirme aile hekimliği kapsamında değerlendirilir."
      },
      {
        title: "Merkeze gelmeden önce",
        content:
          "Kimlik belgenizi ve varsa mevcut ilaç/tetkik bilgilerinizi yanınızda getirmeniz önerilir. Acil durumlarda aile sağlığı merkezi yerine 112 aranmalıdır."
      }
    ],
    contactNote:
      "Genel muayene ve danışmanlık süreçleri için çalışma saatleri içinde telefonla bilgi alabilirsiniz."
  },
  {
    title: "Rapor İşlemleri",
    slug: "rapor-islemleri",
    description:
      "Mevzuat kapsamında uygun görülen rapor ve belge işlemleri için başvuru alınır.",
    icon: FileText,
    detailIntro:
      "Rapor işlemleri, ilgili mevzuat ve aile hekimliği yetki alanı kapsamında değerlendirilir.",
    detailSections: [
      {
        title: "Bu hizmet hakkında genel bilgi",
        content:
          "Talep edilen rapor veya belge türüne göre başvurunun aile hekimliği kapsamında değerlendirilip değerlendirilemeyeceği kontrol edilir."
      },
      {
        title: "Merkeze gelmeden önce",
        content:
          "Hangi rapor türü için başvurduğunuzu netleştirmeniz ve gerekli olabilecek belgeleri yanınızda bulundurmanız işlemleri kolaylaştırır."
      }
    ],
    contactNote:
      "Rapor işlemleriyle ilgili genel bilgi almak için başvuru öncesinde merkezimizi arayabilirsiniz."
  }
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
