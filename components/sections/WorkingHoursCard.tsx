import { Clock } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function WorkingHoursCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Clock aria-hidden className="h-5 w-5" />
          </span>
          <CardTitle>Çalışma Saatleri</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-3 text-sm">
          {siteConfig.workingHours.map((item) => (
            <div key={item.days} className="flex items-center justify-between gap-4">
              <dt className="text-muted-foreground">{item.days}</dt>
              <dd className="font-medium text-foreground">{item.hours}</dd>
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
