import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminNews } from "@/lib/admin/data";
import { deleteNewsAction, saveNewsAction } from "@/app/admin/actions";
import { EmptyState, toDateTimeLocal } from "@/components/admin/Shared";
import { ActionForm } from "@/components/admin/ActionForm";
import type { News } from "@/lib/data/news";

export const dynamic = "force-dynamic";

export default async function HaberlerPage() {
  await requireAdmin();
  const news = await getAdminNews();

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Haber Yönetimi</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Aktif haberlerin son 5 tanesi ana sayfadaki slider’da, tamamı haberler
          sayfasında yayınlanır.
        </p>
      </div>

      <NewsForm />

      <div className="grid gap-5">
        {news.length > 0 ? (
          news.map((item) => <NewsForm key={item.id} news={item} />)
        ) : (
          <EmptyState text="Henüz haber kaydı bulunmuyor." />
        )}
      </div>
    </div>
  );
}

function NewsForm({ news }: { news?: News }) {
  const isEditing = Boolean(news);
  const formId = news?.id || "new";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? news?.title : "Yeni haber ekle"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {isEditing && news && !news.is_active ? (
          <p className="text-sm text-amber-700">Bu haber pasif, sitede görünmez.</p>
        ) : null}
        <ActionForm action={saveNewsAction} resetOnSuccess={!isEditing} className="grid gap-4">
          <input type="hidden" name="id" value={news?.id || ""} />
          <div className="grid gap-2">
            <Label htmlFor={`news-title-${formId}`}>Haber başlığı</Label>
            <Input
              id={`news-title-${formId}`}
              name="title"
              defaultValue={news?.title || ""}
              required
              maxLength={180}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`news-excerpt-${formId}`}>Kısa özet</Label>
            <Textarea
              id={`news-excerpt-${formId}`}
              name="excerpt"
              defaultValue={news?.excerpt || ""}
              required
              maxLength={280}
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`news-content-${formId}`}>Haber içeriği</Label>
            <Textarea
              id={`news-content-${formId}`}
              name="content"
              defaultValue={news?.content || ""}
              required
              maxLength={8000}
              rows={8}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`news-date-${formId}`}>Yayın tarihi</Label>
            <Input
              id={`news-date-${formId}`}
              name="published_at"
              type="datetime-local"
              defaultValue={toDateTimeLocal(news?.published_at)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`news-cover-${formId}`}>Kapak görseli</Label>
            {news?.cover_image_url ? (
              <Image
                src={news.cover_image_url}
                alt=""
                width={320}
                height={180}
                className="h-36 w-full max-w-xs rounded-md object-cover"
              />
            ) : null}
            <Input
              id={`news-cover-${formId}`}
              name="cover"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              required={!isEditing}
            />
            <p className="text-xs text-muted-foreground">
              JPEG, PNG veya WebP. En fazla 2 MB.
              {isEditing ? " Yeni dosya seçmezseniz mevcut kapak korunur." : ""}
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={news?.is_active ?? true}
              className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />
            Aktif olarak yayınla
          </label>
          <Button type="submit" className="w-full sm:w-fit">
            {isEditing ? "Haberi Güncelle" : "Haber Ekle"}
          </Button>
        </ActionForm>
        {isEditing ? (
          <ActionForm action={deleteNewsAction}>
            <input type="hidden" name="id" value={news!.id} />
            <Button
              type="submit"
              variant="outline"
              className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 sm:w-fit"
            >
              Haberi Sil
            </Button>
          </ActionForm>
        ) : null}
      </CardContent>
    </Card>
  );
}
