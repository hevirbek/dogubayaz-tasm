import { LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function InfoCard({
  icon: Icon,
  title,
  children
}: {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full">
      <CardContent className="flex h-full gap-3 p-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon aria-hidden className="h-5 w-5" />
        </span>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <div className="mt-1 text-sm leading-6 text-muted-foreground">{children}</div>
        </div>
      </CardContent>
    </Card>
  );
}
