import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Gizlilik ve KVKK Bilgilendirmesi",
  description: `${siteConfig.asmName} web sitesi gizlilik ve kişisel verilerin korunması bilgilendirmesi.`,
  alternates: { canonical: "/gizlilik" }
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-cyan-50 py-12">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Gizlilik
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
            Gizlilik ve KVKK bilgilendirmesi
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Web sitesi ve genel iletişim formu kullanımı hakkında kısa
            bilgilendirme.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <article className="grid gap-8 text-slate-700">
            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                Kişisel verilerin işlenmesi
              </h2>
              <p className="mt-3 leading-7">
              Bu web sitesindeki iletişim formu, yalnızca genel iletişim
              taleplerinin alınması ve değerlendirilmesi amacıyla kullanılmak
              üzere tasarlanmıştır. Form üzerinden paylaşılan ad soyad, iletişim
              bilgisi, konu ve mesaj içeriği talebinize yanıt verebilmek için
              işlenebilir.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                Özel nitelikli kişisel veri paylaşmayınız
              </h2>
              <p className="mt-3 leading-7">
              Lütfen form üzerinden TC kimlik numarası, tanı, reçete, tıbbi
              rapor, test sonucu veya özel sağlık bilginizi paylaşmayınız. Bu
              site acil sağlık başvuruları ya da kişisel tıbbi değerlendirme
              için kullanılmamalıdır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-950">
                Saklama ve güvenlik
              </h2>
              <p className="mt-3 leading-7">
              İletişim kayıtları, yalnızca gerekli süre boyunca ve yetkili
              kişiler tarafından erişilebilecek şekilde saklanmalıdır. Üretim
              ortamında Supabase tablo izinleri ve RLS politikaları ayrıca
              yapılandırılmalıdır.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-950">İletişim</h2>
              <p className="mt-3 leading-7">
              Gizlilik ve kişisel verilerle ilgili genel sorularınız için{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              adresinden iletişime geçebilirsiniz.
              </p>
            </section>
          </article>
        </div>
      </section>
    </>
  );
}
