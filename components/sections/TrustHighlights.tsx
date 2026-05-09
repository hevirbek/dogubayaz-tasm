import { ClipboardCheck, MessageCircle, ShieldCheck } from "lucide-react";

const highlights = [
  {
    title: "Hafta içi hizmet",
    description:
      "Merkezimiz hafta içi mesai saatleri içinde aile hekimliği hizmetleri için başvuru kabul eder.",
    icon: ShieldCheck
  },
  {
    title: "Koruyucu sağlık izlemleri",
    description:
      "Aşı, gebe izlem, bebek/çocuk izlem ve kronik hastalık takipleri düzenli süreçlerle yürütülür.",
    icon: ClipboardCheck
  },
  {
    title: "Genel iletişim desteği",
    description:
      "Adres, çalışma düzeni ve genel bilgilendirme talepleri için güvenli iletişim kanalları sunulur.",
    icon: MessageCircle
  }
];

export function TrustHighlights() {
  return (
    <section className="border-b border-border bg-background py-8">
      <div className="container grid gap-5 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="rounded-lg border border-border bg-white p-5 shadow-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
              <item.icon aria-hidden className="h-5 w-5" />
            </span>
            <h2 className="mt-4 text-base font-semibold text-foreground">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
