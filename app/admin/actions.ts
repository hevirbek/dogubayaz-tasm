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
  doctorAdminSchema
} from "@/lib/validators/admin";

function getString(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function revalidateContent() {
  revalidatePath("/");
  revalidatePath("/hekimler");
  revalidatePath("/duyurular");
  revalidatePath("/admin");
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

  if (!supabase) {
    redirect("/admin?error=supabase");
  }

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

  if (!parsed.success) {
    redirect("/admin?error=validation");
  }

  const { id, ...payload } = parsed.data;
  const response = id
    ? await supabase.from("doctors").update(payload).eq("id", id)
    : await supabase.from("doctors").insert(payload);

  if (response.error) {
    console.error("Doctor save failed", {
      code: response.error.code,
      message: response.error.message,
      details: response.error.details,
      hint: response.error.hint
    });
    redirect("/admin?error=save");
  }

  revalidateContent();
  redirect("/admin?success=doctor");
}

export async function deleteDoctorAction(formData: FormData) {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");

  if (!supabase || !id) {
    redirect("/admin?error=save");
  }

  const { error } = await supabase.from("doctors").delete().eq("id", id);

  if (error) {
    console.error("Doctor delete failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    redirect("/admin?error=save");
  }

  revalidateContent();
  redirect("/admin?success=doctor-deleted");
}

export async function saveAnnouncementAction(formData: FormData) {
  await requireAdmin();

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    redirect("/admin?error=supabase");
  }

  const parsed = announcementAdminSchema.safeParse({
    id: getString(formData, "id") || undefined,
    title: getString(formData, "title"),
    content: getString(formData, "content"),
    published_at: getString(formData, "published_at"),
    is_active: formData.get("is_active") === "on"
  });

  if (!parsed.success) {
    redirect("/admin?error=validation");
  }

  const { id, ...payload } = parsed.data;
  const response = id
    ? await supabase.from("announcements").update(payload).eq("id", id)
    : await supabase.from("announcements").insert(payload);

  if (response.error) {
    console.error("Announcement save failed", {
      code: response.error.code,
      message: response.error.message,
      details: response.error.details,
      hint: response.error.hint
    });
    redirect("/admin?error=save");
  }

  revalidateContent();
  redirect("/admin?success=announcement");
}

export async function deleteAnnouncementAction(formData: FormData) {
  await requireAdmin();

  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");

  if (!supabase || !id) {
    redirect("/admin?error=save");
  }

  const { error } = await supabase.from("announcements").delete().eq("id", id);

  if (error) {
    console.error("Announcement delete failed", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint
    });
    redirect("/admin?error=save");
  }

  revalidateContent();
  redirect("/admin?success=announcement-deleted");
}
