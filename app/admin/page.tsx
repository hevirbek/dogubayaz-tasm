import type { Metadata } from "next";
import { Database, LogOut, Megaphone, Stethoscope } from "lucide-react";

import {
  deleteAnnouncementAction,
  deleteDoctorAction,
  logoutAction,
  saveAnnouncementAction,
  saveDoctorAction
} from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminAnnouncements, getAdminDoctors } from "@/lib/admin/data";
import type { Announcement } from "@/lib/data/announcements";
import type { Doctor } from "@/lib/data/doctors";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Paneli",
  robots: {
    index: false,
    follow: false
  }
};

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  await requireAdmin();

  const params = await searchParams;
  const supabaseConfigured = isSupabaseConfigured();
  const [doctors, announcements] = supabaseConfigured
    ? await Promise.all([getAdminDoctors(), getAdminAnnouncements()])
    : [[], []];

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary">
              Yönetim
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-normal text-slate-950">
              Admin paneli
            </h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Hekim/personel ve duyuru içeriklerini Supabase tabloları
              üzerinden yönetin.
            </p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              <LogOut aria-hidden className="h-4 w-4" />
              Çıkış Yap
            </Button>
          </form>
        </div>

        <AdminFeedback error={params.error} success={params.success} />

        {!supabaseConfigured ? (
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-950">
                <Database aria-hidden className="h-5 w-5" />
                Supabase bağlantısı eksik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-amber-950">
                Admin panelinin içerik kaydedebilmesi için `SUPABASE_URL` ve
                `SUPABASE_SERVICE_ROLE_KEY` ortam değişkenlerini tanımlayın ve
                `supabase/schema.sql` dosyasındaki tabloları oluşturun.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8">
            <AdminSection
              icon={<Stethoscope aria-hidden className="h-5 w-5" />}
              title="Hekim ve personel yönetimi"
              description="Aktif kayıtlar web sitesindeki hekimler bölümünde görünür."
            >
              <DoctorForm />
              <div className="grid gap-5">
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <DoctorForm key={doctor.id} doctor={doctor} />
                  ))
                ) : (
                  <EmptyState text="Henüz hekim/personel kaydı bulunmuyor." />
                )}
              </div>
            </AdminSection>

            <AdminSection
              icon={<Megaphone aria-hidden className="h-5 w-5" />}
              title="Duyuru yönetimi"
              description="Aktif duyurular ana sayfada ve duyurular sayfasında yayınlanır."
            >
              <AnnouncementForm />
              <div className="grid gap-5">
                {announcements.length > 0 ? (
                  announcements.map((announcement) => (
                    <AnnouncementForm
                      key={announcement.id}
                      announcement={announcement}
                    />
                  ))
                ) : (
                  <EmptyState text="Henüz duyuru kaydı bulunmuyor." />
                )}
              </div>
            </AdminSection>
          </div>
        )}
      </div>
    </section>
  );
}

function AdminFeedback({
  error,
  success
}: {
  error?: string;
  success?: string;
}) {
  if (error) {
    const message =
      error === "supabase"
        ? "Supabase bağlantısı yapılandırılmamış."
        : error === "validation"
          ? "Form alanlarını kontrol ediniz."
          : "Kayıt işlemi tamamlanamadı. Lütfen tekrar deneyiniz.";

    return (
      <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-950">
        {message}
      </p>
    );
  }

  if (success) {
    return (
      <p className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-950">
        İşlem başarıyla tamamlandı.
      </p>
    );
  }

  return null;
}

function AdminSection({
  icon,
  title,
  description,
  children
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid gap-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
          {icon}
        </span>
        <div>
          <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      {children}
    </section>
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
        <form action={saveDoctorAction} className="grid gap-4">
          <input type="hidden" name="id" value={doctor?.id || ""} />
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Ad Soyad" name="full_name" defaultValue={doctor?.full_name} required />
            <Field label="Unvan" name="title" defaultValue={doctor?.title} required />
            <Field label="Çalışma odası" name="room" defaultValue={doctor?.room} />
            <Field
              label="Poliklinik saatleri"
              name="working_hours"
              defaultValue={doctor?.working_hours}
            />
            <Field label="Görev türü" name="duty_type" defaultValue={doctor?.duty_type || ""} />
            <Field
              label="Sıralama"
              name="sort_order"
              type="number"
              defaultValue={String(doctor?.sort_order ?? 0)}
            />
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
        </form>
        {isEditing ? (
          <form action={deleteDoctorAction}>
            <input type="hidden" name="id" value={doctor!.id} />
            <Button type="submit" variant="outline" className="w-full sm:w-fit">
              Kaydı Sil
            </Button>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}

function AnnouncementForm({
  announcement
}: {
  announcement?: Announcement;
}) {
  const isEditing = Boolean(announcement);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? announcement?.title : "Yeni duyuru ekle"}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form action={saveAnnouncementAction} className="grid gap-4">
          <input type="hidden" name="id" value={announcement?.id || ""} />
          <Field
            label="Duyuru başlığı"
            name="title"
            defaultValue={announcement?.title}
            required
          />
          <div className="grid gap-2">
            <Label htmlFor={`announcement-content-${announcement?.id || "new"}`}>
              Duyuru içeriği
            </Label>
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
        </form>
        {isEditing ? (
          <form action={deleteAnnouncementAction}>
            <input type="hidden" name="id" value={announcement!.id} />
            <Button type="submit" variant="outline" className="w-full sm:w-fit">
              Duyuruyu Sil
            </Button>
          </form>
        ) : null}
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required = false
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue ?? ""}
        required={required}
      />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <p className="rounded-lg border border-dashed border-border bg-background p-6 text-sm text-muted-foreground">
      {text}
    </p>
  );
}

function toDateTimeLocal(value?: string) {
  const date = value ? new Date(value) : new Date();

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const offsetMs = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}
