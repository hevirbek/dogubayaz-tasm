"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  clearAdminSession,
  requireAdmin,
  setAdminSession,
  verifyAdminPassword
} from "@/lib/admin/auth";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  announcementAdminSchema,
  asmWorkingHoursAdminSchema,
  closedDatesAdminSchema,
  doctorAdminSchema,
  doctorLeavesAdminSchema
} from "@/lib/validators/admin";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function revalidateContent() {
  revalidatePath("/", "layout");
}

export async function loginAction(formData: FormData) {
  const password = getString(formData, "password");
  const valid = await verifyAdminPassword(password);

  if (!valid) {
    redirect("/admin/login?error=invalid");
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveDoctorAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase bağlantısı eksik." };

  const parsed = doctorAdminSchema.safeParse({
    id: getString(formData, "id") || undefined,
    full_name: getString(formData, "full_name"),
    title: getString(formData, "title"),
    room: getString(formData, "room"),
    working_hours: getString(formData, "working_hours"),
    duty_type: getString(formData, "duty_type"),
    note: getString(formData, "note"),
    sort_order: getString(formData, "sort_order") || "0",
    is_active: formData.get("is_active") === "on"
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { id, ...payload } = parsed.data;
  const response = id
    ? await supabase.from("doctors").update(payload).eq("id", id)
    : await supabase.from("doctors").insert(payload);

  if (response.error) {
    console.error("Doctor save failed", response.error);
    return { error: "Kayıt işlemi başarısız oldu." };
  }

  revalidateContent();
  return { success: true, message: id ? "Hekim başarıyla güncellendi." : "Hekim başarıyla eklendi." };
}

export async function deleteDoctorAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { error } = await supabase.from("doctors").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  revalidateContent();
  return { success: true, message: "Hekim silindi." };
}

export async function saveAnnouncementAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase bağlantısı eksik." };

  const parsed = announcementAdminSchema.safeParse({
    id: getString(formData, "id") || undefined,
    title: getString(formData, "title"),
    content: getString(formData, "content"),
    published_at: getString(formData, "published_at"),
    is_active: formData.get("is_active") === "on"
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { id, ...payload } = parsed.data;
  const response = id
    ? await supabase.from("announcements").update(payload).eq("id", id)
    : await supabase.from("announcements").insert(payload);

  if (response.error) return { error: "Duyuru kaydedilemedi." };

  revalidateContent();
  return { success: true, message: id ? "Duyuru güncellendi." : "Duyuru eklendi." };
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { error } = await supabase.from("announcements").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  revalidateContent();
  return { success: true, message: "Duyuru silindi." };
}

export async function saveAsmWorkingHoursAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase bağlantısı eksik." };

  const parsed = asmWorkingHoursAdminSchema.safeParse({
    id: 1,
    weekdays_start: getString(formData, "weekdays_start"),
    weekdays_end: getString(formData, "weekdays_end"),
    weekend_closed: formData.get("weekend_closed") === "on"
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { error } = await supabase.from("asm_working_hours").upsert(parsed.data);
  if (error) return { error: "Saatler kaydedilemedi." };

  revalidateContent();
  return { success: true, message: "Çalışma saatleri güncellendi." };
}

export async function saveClosedDateAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase bağlantısı eksik." };

  const parsed = closedDatesAdminSchema.safeParse({
    id: getString(formData, "id") || undefined,
    date: getString(formData, "date"),
    reason: getString(formData, "reason")
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { id, ...payload } = parsed.data;
  const { error } = id 
    ? await supabase.from("closed_dates").update(payload).eq("id", id)
    : await supabase.from("closed_dates").insert(payload);

  if (error) return { error: "Kapalı gün kaydedilemedi." };

  revalidateContent();
  return { success: true, message: "Kapalı gün kaydedildi." };
}

export async function deleteClosedDateAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { error } = await supabase.from("closed_dates").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  revalidateContent();
  return { success: true, message: "Kapalı gün silindi." };
}

export async function saveDoctorLeaveAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase bağlantısı eksik." };

  const parsed = doctorLeavesAdminSchema.safeParse({
    id: getString(formData, "id") || undefined,
    doctor_id: getString(formData, "doctor_id"),
    start_date: getString(formData, "start_date"),
    end_date: getString(formData, "end_date"),
    reason: getString(formData, "reason")
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { id, ...payload } = parsed.data;
  const { error } = id
    ? await supabase.from("doctor_leaves").update(payload).eq("id", id)
    : await supabase.from("doctor_leaves").insert(payload);

  if (error) return { error: "İzin kaydedilemedi." };

  revalidateContent();
  return { success: true, message: "Hekim izni kaydedildi." };
}

export async function deleteDoctorLeaveAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { error } = await supabase.from("doctor_leaves").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  revalidateContent();
  return { success: true, message: "Hekim izni silindi." };
}

export async function deleteContactMessageAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { error } = await supabase.from("contact_messages").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  revalidateContent();
  return { success: true, message: "Mesaj silindi." };
}
