import { MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export function MapSection({ className }: { className?: string }) {
  return (
    <Card className={`h-full overflow-hidden ${className ?? ""}`}>
      {siteConfig.mapEmbedUrl ? (
        <iframe
          src={siteConfig.mapEmbedUrl}
          title={`${siteConfig.asmName} harita konumu`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full min-h-[320px] w-full border-0"
        />
      ) : (
        <CardContent className="grid h-full min-h-[320px] place-items-center bg-slate-50 p-8 text-center">
          <div>
            <MapPin aria-hidden className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-4 font-semibold text-foreground">Harita bilgisi eklenebilir</p>
            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Google Maps embed bağlantısını `.env` dosyasındaki
              `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL` alanına ekleyerek haritayı
              gösterebilirsiniz.
            </p>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
