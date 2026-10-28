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
          className="h-56 w-full border-0 lg:h-full lg:min-h-0"
        />
      ) : (
        <CardContent className="grid h-56 place-items-center bg-slate-50 p-4 text-center lg:h-full lg:min-h-0">
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
