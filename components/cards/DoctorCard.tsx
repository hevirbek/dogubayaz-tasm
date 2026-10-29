import Image from "next/image";
import { DoorOpen, Info, Stethoscope, CalendarX2 } from "lucide-react";

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
    <Card className="h-full overflow-hidden border-slate-300 bg-white shadow-sm">
      <div className="h-1 bg-primary" aria-hidden />
      <CardHeader className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          {doctor.photo_url ? (
            <Image
              src={doctor.photo_url}
              alt={`${doctor.title} ${doctor.full_name}`}
              width={96}
              height={96}
              sizes="96px"
              className="h-24 w-24 shrink-0 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/15 bg-primary/10 text-primary">
              <Stethoscope aria-hidden className="h-4 w-4" />
            </div>
          )}
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
            {doctor.duty_type || "Aile Sağlığı Ekibi"}
          </span>
        </div>
        <CardTitle className="text-base leading-snug">{doctor.title} {doctor.full_name}</CardTitle>
        <CardDescription>
          {doctor.nurse_name ? (
            <span className="mt-1 block font-medium text-primary">ASÇ: {doctor.nurse_name}</span>
          ) : (
            <span className="mt-1 block">Aile sağlığı merkezi ekibi</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 p-4 pt-0 text-sm">
        <dl>
          <div className="flex items-center gap-3 border-t border-slate-200 pt-3">
            <DoorOpen aria-hidden className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">Çalışma Odası</dt>
              <dd className="mt-0.5 font-medium text-foreground">
                {doctor.room || "Bilgi eklenecek"}
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
