import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminAsmWorkingHours, getAdminClosedDates } from "@/lib/admin/data";
import { saveAsmWorkingHoursAction, saveClosedDateAction, deleteClosedDateAction } from "@/app/admin/actions";
import { Field, EmptyState } from "@/components/admin/Shared";
import { ActionForm } from "@/components/admin/ActionForm";

export const dynamic = "force-dynamic";

export default async function SaatlerPage() {
  await requireAdmin();
  const [workingHours, closedDates] = await Promise.all([
    getAdminAsmWorkingHours(),
    getAdminClosedDates()
  ]);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Çalışma Saatleri</h1>
        <p className="mt-1 text-sm text-muted-foreground">Aile sağlığı merkezinin haftalık çalışma saatlerini düzenleyin.</p>
      </div>

      <WorkingHoursForm workingHours={workingHours} />

      <div className="mt-8 border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-slate-950">Kapalı Günler (Resmi Tatiller)</h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">Merkezin genel olarak kapalı olduğu tarihleri (bayramlar vb.) ekleyin.</p>
        
        <ClosedDateForm />
        
        <div className="grid gap-5 mt-5">
          {closedDates.length > 0 ? (
            closedDates.map((date: any) => (
              <ClosedDateForm key={date.id} closedDate={date} />
            ))
          ) : (
            <EmptyState text="Henüz eklenmiş kapalı gün bulunmuyor." />
          )}
        </div>
      </div>
    </div>
  );
}

function WorkingHoursForm({ workingHours }: { workingHours: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Genel Çalışma Saatleri</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ActionForm action={saveAsmWorkingHoursAction} className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Hafta içi başlangıç saati (Örn: 08:00)" name="weekdays_start" defaultValue={workingHours?.weekdays_start || "08:00"} required />
            <Field label="Hafta içi bitiş saati (Örn: 17:00)" name="weekdays_end" defaultValue={workingHours?.weekdays_end || "17:00"} required />
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="weekend_closed"
              defaultChecked={workingHours?.weekend_closed ?? true}
              className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />
            Hafta sonları kapalı
          </label>
          <Button type="submit" className="w-full sm:w-fit">Ayarları Kaydet</Button>
        </ActionForm>
      </CardContent>
    </Card>
  );
}

function ClosedDateForm({ closedDate }: { closedDate?: any }) {
  const isEditing = Boolean(closedDate);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "Kapalı Günü Düzenle" : "Yeni Kapalı Gün Ekle"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ActionForm action={saveClosedDateAction} resetOnSuccess={!isEditing} className="grid gap-4">
          <input type="hidden" name="id" value={closedDate?.id || ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Tarih" name="date" type="date" defaultValue={closedDate?.date} required />
            <Field label="Açıklama/Neden (Örn: Kurban Bayramı)" name="reason" defaultValue={closedDate?.reason} required />
          </div>
          <Button type="submit" className="w-full sm:w-fit">
            {isEditing ? "Güncelle" : "Ekle"}
          </Button>
        </ActionForm>
        {isEditing ? (
          <ActionForm action={deleteClosedDateAction}>
            <input type="hidden" name="id" value={closedDate!.id} />
            <Button type="submit" variant="outline" className="w-full sm:w-fit border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              Sil
            </Button>
          </ActionForm>
        ) : null}
      </CardContent>
    </Card>
  );
}
