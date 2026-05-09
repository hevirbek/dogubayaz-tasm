export type Announcement = {
  id: string;
  title: string;
  content: string;
  published_at: string;
  is_active: boolean;
  created_at: string;
};

export const fallbackAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Mesai Saatleri Hakkında Bilgilendirme",
    content:
      "Merkezimiz hafta içi 08:00 - 17:00 saatleri arasında hizmet vermektedir. Resmi tatil ve idari izin günlerinde güncel duyuruları takip ediniz.",
    published_at: "2026-01-15T09:00:00.000Z",
    is_active: true,
    created_at: "2026-01-15T09:00:00.000Z"
  },
  {
    id: "2",
    title: "Aşı Takibi İçin Randevu Hatırlatması",
    content:
      "Bebek ve çocuk aşı izlemleri için aile hekiminiz veya aile sağlığı çalışanınızla iletişime geçerek uygun zaman bilgisi alabilirsiniz.",
    published_at: "2026-02-05T09:00:00.000Z",
    is_active: true,
    created_at: "2026-02-05T09:00:00.000Z"
  },
  {
    id: "3",
    title: "Genel İletişim Formu Kullanımı",
    content:
      "İletişim formu yalnızca genel bilgilendirme talepleri içindir. Özel sağlık verilerinizi form üzerinden paylaşmayınız.",
    published_at: "2026-03-10T09:00:00.000Z",
    is_active: true,
    created_at: "2026-03-10T09:00:00.000Z"
  }
];
