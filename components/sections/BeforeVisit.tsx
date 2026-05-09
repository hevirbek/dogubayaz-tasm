import { beforeVisitItems } from "@/lib/data/visitor-info";
import { SectionHeading } from "./SectionHeading";

export function BeforeVisit() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Merkeze Gelmeden Önce"
          title="Başvurunuzu kolaylaştıracak kısa bilgiler"
          description="Merkezimize gelmeden önce dikkat edebileceğiniz birkaç nokta işlemlerin daha düzenli ilerlemesine yardımcı olur."
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {beforeVisitItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border bg-background p-5 shadow-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
                <item.icon aria-hidden className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
