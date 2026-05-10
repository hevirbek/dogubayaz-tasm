import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminAnnouncements } from "@/lib/admin/data";
import { saveAnnouncementAction, deleteAnnouncementAction } from "@/app/admin/actions";
import { Field, EmptyState, toDateTimeLocal } from "@/components/admin/Shared";
import { ActionForm } from "@/components/admin/ActionForm";
import type { Announcement } from "@/lib/data/announcements";

export const dynamic = "force-dynamic";

export default async function DuyurularPage() {
  await requireAdmin();
  const announcements = await getAdminAnnouncements();

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Duyuru Yönetimi</h1>
        <p className="mt-1 text-sm text-muted-foreground">Aktif duyurular ana sayfada ve duyurular sayfasında yayınlanır.</p>
      </div>

      <AnnouncementForm />
      
      <div className="grid gap-5">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <AnnouncementForm key={announcement.id} announcement={announcement} />
          ))
        ) : (
          <EmptyState text="Henüz duyuru kaydı bulunmuyor." />
        )}
      </div>
    </div>
  );
}

function AnnouncementForm({ announcement }: { announcement?: Announcement }) {
  const isEditing = Boolean(announcement);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? announcement?.title : "Yeni duyuru ekle"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ActionForm action={saveAnnouncementAction} resetOnSuccess={!isEditing} className="grid gap-4">
          <input type="hidden" name="id" value={announcement?.id || ""} />
          <Field label="Duyuru başlığı" name="title" defaultValue={announcement?.title} required />
          <div className="grid gap-2">
            <Label htmlFor={`announcement-content-${announcement?.id || "new"}`}>Duyuru içeriği</Label>
            <Textarea
              id={`announcement-content-${announcement?.id || "new"}`}
              name="content"
              defaultValue={announcement?.content || ""}
              required
              maxLength={3000}
            />
          </div>
          <Field
            label="Yayın tarihi"
            name="published_at"
            type="datetime-local"
            defaultValue={toDateTimeLocal(announcement?.published_at)}
            required
          />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={announcement?.is_active ?? true}
              className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />
            Aktif olarak yayınla
          </label>
          <Button type="submit" className="w-full sm:w-fit">
            {isEditing ? "Duyuruyu Güncelle" : "Duyuru Ekle"}
          </Button>
        </ActionForm>
        {isEditing ? (
          <ActionForm action={deleteAnnouncementAction}>
            <input type="hidden" name="id" value={announcement!.id} />
            <Button type="submit" variant="outline" className="w-full sm:w-fit border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              Duyuruyu Sil
            </Button>
          </ActionForm>
        ) : null}
      </CardContent>
    </Card>
  );
}
