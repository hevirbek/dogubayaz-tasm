import { AlertTriangle, FileText, MessageCircle, PhoneCall } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const guidanceItems = [
  {
    title: "Genel soru",
    method: "İletişim formu",
    description:
      "Adres, çalışma düzeni ve genel bilgilendirme talepleri için formu kullanabilirsiniz.",
    icon: MessageCircle
  },
  {
    title: "Randevu veya izlem bilgisi",
    method: "Telefon",
    description:
      "Aşı, gebe izlem, bebek/çocuk izlem ve uygun zaman bilgisi için telefonla ulaşmanız daha uygundur.",
    icon: PhoneCall
  },
  {
    title: "Acil durum",
    method: "112 Acil Çağrı Merkezi",
    description:
      "Acil sağlık durumlarında web sitesi veya iletişim formu yerine 112’yi arayınız.",
    icon: AlertTriangle
  },
  {
    title: "Özel sağlık bilgisi",
    method: "Formdan gönderilmez",
    description:
      "TC kimlik numarası, tanı, reçete, rapor, test sonucu veya özel sağlık bilginizi form üzerinden paylaşmayınız.",
    icon: FileText
  }
];

export function ContactGuidance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hangi konuda nasıl iletişim kurmalıyım?</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3">
        {guidanceItems.map((item) => (
          <div
            key={item.title}
            className="flex gap-3 rounded-md border border-border bg-slate-50 p-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
              <item.icon aria-hidden className="h-5 w-5" />
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <span className="rounded-md bg-background px-2 py-1 text-xs font-semibold text-primary">
                  {item.method}
                </span>
              </div>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
