import { AlertTriangle } from "lucide-react";

export function EmergencyNoticeCard() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
      <div className="flex gap-3">
        <AlertTriangle aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <p>
          <strong>Acil durumlarda</strong> 112 Acil Çağrı Merkezi’ni arayınız.
          Bu web sitesi acil sağlık başvuruları için kullanılmamalıdır.
        </p>
      </div>
    </div>
  );
}
