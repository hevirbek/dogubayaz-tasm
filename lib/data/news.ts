export type News = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image_url: string;
  cover_image_path: string | null;
  published_at: string;
  is_active: boolean;
  created_at: string;
};

export const fallbackNews: News[] = [
  {
    id: "news-1",
    title: "Aile Hekimliği Bilgilendirme Günü",
    slug: "aile-hekimligi-bilgilendirme-gunu",
    excerpt:
      "Koruyucu sağlık hizmetleri ve izlem randevuları hakkında kısa bir bilgilendirme günü düzenliyoruz.",
    content:
      "Merkezimizde koruyucu sağlık hizmetleri, aşı ve izlem randevuları hakkında genel bir bilgilendirme günü yapılacaktır.\n\nKatılım için aile hekiminiz veya aile sağlığı çalışanınızla iletişime geçebilirsiniz. Bu duyuru kişisel sağlık verisi toplamaz.",
    cover_image_url: "/images/asm-hero.png",
    cover_image_path: null,
    published_at: "2026-03-12T09:00:00.000Z",
    is_active: true,
    created_at: "2026-03-12T09:00:00.000Z"
  },
  {
    id: "news-2",
    title: "Sağlıklı Yaşam Yürüyüşü",
    slug: "saglikli-yasam-yuruyusu",
    excerpt:
      "Mahalle sakinleriyle kısa bir yürüyüş etkinliği planlandı. Ayrıntılar haberin devamında.",
    content:
      "Hareketli yaşamı desteklemek için merkezimiz çevresinde kısa bir yürüyüş etkinliği düzenlenecektir.\n\nEtkinlik genel bilgilendirme amaçlıdır. Katılımınızı hekiminize danışarak planlayabilirsiniz.",
    cover_image_url: "/images/asm-hero.png",
    cover_image_path: null,
    published_at: "2026-02-20T09:00:00.000Z",
    is_active: true,
    created_at: "2026-02-20T09:00:00.000Z"
  },
  {
    id: "news-3",
    title: "Okul Çağı İzlem Hatırlatması",
    slug: "okul-cagi-izlem-hatirlatmasi",
    excerpt:
      "Okul çağı çocuk izlemleri için uygun zamanı aile hekiminizden öğrenebilirsiniz.",
    content:
      "Okul çağı izlemleri, büyüme ve gelişmenin düzenli takip edilmesine yardımcı olur.\n\nUygun gün ve saat için aile hekiminiz veya aile sağlığı çalışanınızla görüşebilirsiniz.",
    cover_image_url: "/images/asm-hero.png",
    cover_image_path: null,
    published_at: "2026-01-28T09:00:00.000Z",
    is_active: true,
    created_at: "2026-01-28T09:00:00.000Z"
  }
];
