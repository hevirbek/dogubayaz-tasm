export type AboutImage = {
  src: string;
  alt: string;
};

export const aboutIntroImage: AboutImage = {
  src: "/images/hakkimizda/intro.jpg",
  alt: "Hekim odası ile muayene masasının göründüğü aydınlık bir klinik iç mekanı"
};

export function aboutIntroParagraph(asmName: string) {
  return `${asmName}, Ağrı İl Sağlık Müdürlüğü bünyesinde kayıtlı nüfusuna aile hekimliği hizmeti sunar. Merkezimizde koruyucu sağlık hizmetleri kapsamında aşı takibi, gebe izlem, bebek ve çocuk izlemi ile temel sağlık danışmanlığı yürütülür. Amacımız, bireylerin ve ailelerin birinci basamak sağlık hizmetine düzenli, anlaşılır ve güvenilir biçimde ulaşmasını sağlamaktır.`;
}

export const aboutVision = {
  title: "Vizyonumuz",
  body: "Bölgemizde koruyucu hekimliği önceleyen, kişiye ve aileye bütüncül yaklaşan ve güven duyulan bir birinci basamak sağlık kurumu olmak."
};

export const aboutMission = {
  title: "Misyonumuz",
  body: "Kayıtlı nüfusumuza nitelikli aile hekimliği hizmeti sunmak; aşı, izlem ve danışmanlık süreçlerini zamanında ve anlaşılır biçimde yürütmek; bireylerin kendi sağlıklarını koruma konusundaki bilgisini desteklemek."
};

export const aboutGallery: AboutImage[] = [
  {
    src: "/images/hakkimizda/waiting.jpg",
    alt: "Pencere kenarında sandalyelerin sıralandığı bir bekleme alanı"
  },
  {
    src: "/images/hakkimizda/exam.jpg",
    alt: "Lavabo, dolap ve malzeme rafının bulunduğu klinik odası"
  },
  {
    src: "/images/hakkimizda/corridor.jpg",
    alt: "Kapılar ve oturma sıraları bulunan aydınlık bir sağlık koridoru"
  },
  {
    src: "/images/hakkimizda/reception.jpg",
    alt: "Boş bir danışma bankosu"
  },
  {
    src: "/images/hakkimizda/follow-up.jpg",
    alt: "Masasında kayıt tutan bir hekim"
  },
  {
    src: "/images/hakkimizda/team.jpg",
    alt: "İki sağlık çalışanı bir röntgen görüntüsünü birlikte inceliyor"
  }
];
