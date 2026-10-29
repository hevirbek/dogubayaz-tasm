export type Doctor = {
  id: string;
  full_name: string;
  title: string;
  room: string;
  working_hours: string;
  duty_type?: string | null;
  nurse_name?: string | null;
  note?: string | null;
  photo_url: string | null;
  photo_path: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
};

export const fallbackDoctors: Doctor[] = [
  {
    id: "1",
    full_name: "Dr. Ayşe Demir",
    title: "Aile Hekimi",
    room: "Oda 1",
    working_hours: "Hafta içi 08:00 - 17:00",
    duty_type: "Aile Hekimliği Birimi",
    note: "Koruyucu sağlık hizmetleri ve kronik hastalık izlemleri hakkında genel danışmanlık sunar.",
    photo_url: null,
    photo_path: null,
    sort_order: 1,
    is_active: true,
    created_at: "2026-01-01T09:00:00.000Z"
  },
  {
    id: "2",
    full_name: "Dr. Mehmet Kaya",
    title: "Aile Hekimi",
    room: "Oda 2",
    working_hours: "Hafta içi 08:00 - 17:00",
    duty_type: "Aile Hekimliği Birimi",
    note: "Muayene, izlem ve gerekli yönlendirme süreçlerinde aile hekimliği hizmeti verir.",
    photo_url: null,
    photo_path: null,
    sort_order: 2,
    is_active: true,
    created_at: "2026-01-01T09:00:00.000Z"
  },
  {
    id: "3",
    full_name: "Hem. Zeynep Şahin",
    title: "Aile Sağlığı Çalışanı",
    room: "İzlem Odası",
    working_hours: "Hafta içi 08:00 - 17:00",
    duty_type: "İzlem ve Koruyucu Sağlık Hizmetleri",
    note: "Aşı, gebe izlem, bebek ve çocuk izlem süreçlerinde bilgilendirme ve takip desteği sağlar.",
    photo_url: null,
    photo_path: null,
    sort_order: 3,
    is_active: true,
    created_at: "2026-01-01T09:00:00.000Z"
  }
];
