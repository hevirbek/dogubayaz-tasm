import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { requireAdmin } from "@/lib/admin/auth";
import { getAdminDoctors, getAdminDoctorLeaves } from "@/lib/admin/data";
import { saveDoctorAction, deleteDoctorAction, removeDoctorPhotoAction, saveDoctorLeaveAction, deleteDoctorLeaveAction } from "@/app/admin/actions";
import { Field, EmptyState } from "@/components/admin/Shared";
import { ActionForm } from "@/components/admin/ActionForm";
import type { Doctor } from "@/lib/data/doctors";

export const dynamic = "force-dynamic";

export default async function HekimlerPage() {
  await requireAdmin();
  const [doctors, doctorLeaves] = await Promise.all([
    getAdminDoctors(),
    getAdminDoctorLeaves()
  ]);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-950">Hekim & Personel Yönetimi</h1>
        <p className="mt-1 text-sm text-muted-foreground">Aktif kayıtlar web sitesindeki hekimler bölümünde görünür.</p>
      </div>

      <DoctorForm />
      
      <div className="grid gap-5">
        {doctors.length > 0 ? (
          doctors.map((doctor) => <DoctorForm key={doctor.id} doctor={doctor} />)
        ) : (
          <EmptyState text="Henüz hekim/personel kaydı bulunmuyor." />
        )}
      </div>

      <div className="mt-8 border-t border-border pt-8">
        <h2 className="text-2xl font-bold text-slate-950">Hekim İzinleri</h2>
        <p className="mt-1 mb-6 text-sm text-muted-foreground">Hekimlerin izinli olduğu tarih aralıklarını belirleyin.</p>
        
        <DoctorLeaveForm doctors={doctors} />
        
        <div className="grid gap-5 mt-5">
          {doctorLeaves.length > 0 ? (
            doctorLeaves.map((leave: any) => (
              <DoctorLeaveForm key={leave.id} leave={leave} doctors={doctors} />
            ))
          ) : (
            <EmptyState text="Henüz eklenmiş hekim izni bulunmuyor." />
          )}
        </div>
      </div>
    </div>
  );
}

function DoctorForm({ doctor }: { doctor?: Doctor }) {
  const isEditing = Boolean(doctor);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? doctor?.full_name : "Yeni hekim/personel ekle"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {doctor?.photo_url ? (
          <div className="flex items-center gap-4">
            <Image
              src={doctor.photo_url}
              alt=""
              width={96}
              height={96}
              className="h-24 w-24 rounded-md object-cover"
            />
            <ActionForm action={removeDoctorPhotoAction}>
              <input type="hidden" name="id" value={doctor.id} />
              <Button
                type="submit"
                variant="outline"
                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                Görseli kaldır
              </Button>
            </ActionForm>
          </div>
        ) : null}
        <ActionForm action={saveDoctorAction} resetOnSuccess={!isEditing} className="grid gap-4">
          <input type="hidden" name="id" value={doctor?.id || ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Ad Soyad" name="full_name" defaultValue={doctor?.full_name} required />
            <Field label="Unvan" name="title" defaultValue={doctor?.title} required />
            <Field label="Çalışma odası" name="room" defaultValue={doctor?.room} />
            <Field label="Poliklinik saatleri" name="working_hours" defaultValue={doctor?.working_hours} />
            <Field label="Görev türü (Örn: Aile Hekimi)" name="duty_type" defaultValue={doctor?.duty_type || ""} />
            <Field label="Beraber çalıştığı Ebe / Hemşire (İsteğe bağlı)" name="nurse_name" defaultValue={doctor?.nurse_name || ""} />
            <Field label="Sıralama" name="sort_order" type="number" defaultValue={String(doctor?.sort_order ?? 0)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`doctor-note-${doctor?.id || "new"}`}>Kısa not</Label>
            <Textarea
              id={`doctor-note-${doctor?.id || "new"}`}
              name="note"
              defaultValue={doctor?.note || ""}
              maxLength={400}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`doctor-photo-${doctor?.id || "new"}`}>Fotoğraf</Label>
            <Input
              id={`doctor-photo-${doctor?.id || "new"}`}
              name="photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
            />
            <p className="text-xs text-muted-foreground">
              JPEG, PNG veya WebP. En fazla 2 MB. İsteğe bağlı.
              {isEditing ? " Yeni dosya seçip güncellerseniz görsel değişir." : ""}
            </p>
          </div>
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="is_active"
              defaultChecked={doctor?.is_active ?? true}
              className="h-4 w-4 rounded border-input text-primary focus:ring-ring"
            />
            Aktif olarak yayınla
          </label>
          <Button type="submit" className="w-full sm:w-fit">
            {isEditing ? "Hekimi Güncelle" : "Hekim Ekle"}
          </Button>
        </ActionForm>
        {isEditing ? (
          <ActionForm action={deleteDoctorAction}>
            <input type="hidden" name="id" value={doctor!.id} />
            <Button type="submit" variant="outline" className="w-full sm:w-fit border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              Kaydı Sil
            </Button>
          </ActionForm>
        ) : null}
      </CardContent>
    </Card>
  );
}

function DoctorLeaveForm({ leave, doctors }: { leave?: any; doctors: Doctor[] }) {
  const isEditing = Boolean(leave);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? "İzni Düzenle" : "Yeni İzin Ekle"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ActionForm action={saveDoctorLeaveAction} resetOnSuccess={!isEditing} className="grid gap-4">
          <input type="hidden" name="id" value={leave?.id || ""} />
          <div className="grid gap-2">
            <Label htmlFor={`doctor_id_${leave?.id || "new"}`}>Hekim</Label>
            <select
              id={`doctor_id_${leave?.id || "new"}`}
              name="doctor_id"
              defaultValue={leave?.doctor_id || ""}
              required
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="" disabled>Hekim Seçin</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>{d.full_name}</option>
              ))}
            </select>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Başlangıç Tarihi" name="start_date" type="date" defaultValue={leave?.start_date} required />
            <Field label="Bitiş Tarihi" name="end_date" type="date" defaultValue={leave?.end_date} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`reason_${leave?.id || "new"}`}>Açıklama (İsteğe bağlı)</Label>
            <Input id={`reason_${leave?.id || "new"}`} name="reason" defaultValue={leave?.reason || ""} />
          </div>
          <Button type="submit" className="w-full sm:w-fit">
            {isEditing ? "Güncelle" : "Ekle"}
          </Button>
        </ActionForm>
        {isEditing ? (
          <ActionForm action={deleteDoctorLeaveAction}>
            <input type="hidden" name="id" value={leave!.id} />
            <Button type="submit" variant="outline" className="w-full sm:w-fit border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
              Sil
            </Button>
          </ActionForm>
        ) : null}
      </CardContent>
    </Card>
  );
}
