import { Clock3, DoorOpen, Info, Stethoscope, CalendarX2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import type { Doctor } from "@/lib/data/doctors";

export function DoctorCard({ doctor, leave }: { doctor: Doctor; leave?: any }) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader>
        <div className="mb-3 flex items-start justify-between gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Stethoscope aria-hidden className="h-6 w-6" />
          </div>
          <span className="rounded-md bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            {doctor.duty_type || "Aile Sağlığı Ekibi"}
          </span>
        </div>
        <CardTitle>{doctor.title} {doctor.full_name}</CardTitle>
        <CardDescription>
          {doctor.nurse_name ? (
            <span className="block mt-1 font-medium text-primary">ASÇ: {doctor.nurse_name}</span>
          ) : (
            <span className="block mt-1">Aile sağlığı merkezi ekibi</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 text-sm">
        <dl className="grid gap-3">
          <div className="flex gap-3 rounded-md bg-slate-50 p-3">
            <DoorOpen aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <dt className="font-medium text-foreground">Çalışma odası</dt>
              <dd className="mt-0.5 text-muted-foreground">
                {doctor.room || "Bilgi eklenecek"}
              </dd>
            </div>
          </div>
          <div className="flex gap-3 rounded-md bg-slate-50 p-3">
            <Clock3 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div>
              <dt className="font-medium text-foreground">Poliklinik saatleri</dt>
              <dd className="mt-0.5 text-muted-foreground">
                {doctor.working_hours || "Bilgi eklenecek"}
              </dd>
            </div>
          </div>
        </dl>

        {doctor.note ? (
          <p className="flex gap-3 rounded-md border border-sky-100 bg-sky-50 p-3 leading-6 text-sky-950">
            <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" />
            {doctor.note}
          </p>
        ) : null}

        {leave ? (
          <p className="flex gap-3 rounded-md border border-red-200 bg-red-50 p-3 leading-6 text-red-950 text-xs">
            <CalendarX2 aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <span>
              <strong>İzinli:</strong> {new Date(leave.start_date).toLocaleDateString("tr-TR")} - {new Date(leave.end_date).toLocaleDateString("tr-TR")}
              {leave.reason ? <><br/>Neden: {leave.reason}</> : null}
            </span>
          </p>
        ) : null}
      </CardContent>
    </Card>
  );
}
