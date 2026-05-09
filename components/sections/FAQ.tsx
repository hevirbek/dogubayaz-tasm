import { faqItems } from "@/lib/data/faq";
import { SectionHeading } from "./SectionHeading";

export function FAQ({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqItems.slice(0, limit) : faqItems;

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Sık Sorulanlar"
          title="Kısa ve net yanıtlar"
          description="Genel başvuru ve iletişim süreçleri hakkında sık sorulan sorular."
        />
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <details
              key={item.question}
              className="group rounded-lg border border-border bg-background p-5 shadow-card"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {item.question}
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
