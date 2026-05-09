import { CheckCircle2, Clock3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { getOpeningStatus } from "@/lib/opening-hours";
import { cn } from "@/lib/utils";

export function OpeningStatusCard() {
  const status = getOpeningStatus();
  const Icon = status.isOpen ? CheckCircle2 : Clock3;

  return (
    <Card
      className={cn(
        "h-full border-2",
        status.isOpen
          ? "border-emerald-200 bg-emerald-50"
          : "border-slate-200 bg-slate-50"
      )}
    >
      <CardContent className="flex h-full gap-4 p-5">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-md",
            status.isOpen
              ? "bg-emerald-600 text-white"
              : "bg-slate-800 text-white"
          )}
        >
          <Icon aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-foreground">{status.label}</h3>
          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            {status.detail}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
