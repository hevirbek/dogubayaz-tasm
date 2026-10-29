import { beforeVisitItems } from "@/lib/data/visitor-info";
import { SectionHeading } from "./SectionHeading";

const excludedKeywords = [
  "formdan paylaşmayın",
  "112"
];

export function BeforeVisit() {
  const filteredItems = beforeVisitItems.filter(
    (item) => !excludedKeywords.some((kw) => item.title.includes(kw))
  );

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <SectionHeading eyebrow="Muayeneye Gelmeden Önce" />
        <div className="divide-y divide-border rounded-lg border border-border bg-background shadow-card">
          {filteredItems.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 px-5 py-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <item.icon aria-hidden className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
