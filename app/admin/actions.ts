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
  doctorLeavesAdminSchema,
  newsAdminSchema
} from "@/lib/validators/admin";
import { slugify } from "@/lib/utils";

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
    nurse_name: getString(formData, "nurse_name"),
    note: getString(formData, "note"),
    sort_order: getString(formData, "sort_order") || "0",
    is_active: formData.get("is_active") === "on"
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { id, ...payload } = parsed.data;
  const photo = getImageFile(formData, "photo");

  let existing: {
    photo_url: string | null;
    photo_path: string | null;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("doctors")
      .select("photo_url, photo_path")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) {
      const missingColumn = error?.message.toLowerCase().includes("photo_");
      return {
        error: missingColumn
          ? "Hekim görseli kaydedilemedi. schema.sql içindeki doctors fotoğraf alanlarını çalıştırın."
          : "Hekim bulunamadı."
      };
    }
    existing = data;
  }

  let photoUrl = existing?.photo_url ?? null;
  let photoPath = existing?.photo_path ?? null;
  let uploadedPath: string | null = null;
  let pathToRemove: string | null = null;

  if (photo) {
    const uploaded = await uploadPublicImage(supabase, "doctor-photos", photo, "Hekim görseli");
    if ("error" in uploaded) return uploaded;
    uploadedPath = uploaded.path;
    photoUrl = uploaded.url;
    photoPath = uploaded.path;
    if (existing?.photo_path && existing.photo_path !== uploaded.path) {
      pathToRemove = existing.photo_path;
    }
  }

  const dataToSave = {
    ...payload,
    photo_url: photoUrl,
    photo_path: photoPath
  };

  const response = id
    ? await supabase.from("doctors").update(dataToSave).eq("id", id)
    : await supabase.from("doctors").insert(dataToSave);

  if (response.error) {
    if (uploadedPath) await removePublicImage(supabase, "doctor-photos", uploadedPath);
    console.error("Doctor save failed", response.error);
    const missingColumn = response.error.message.toLowerCase().includes("photo_");
    return {
      error: missingColumn
        ? "Hekim görseli kaydedilemedi. schema.sql içindeki doctors fotoğraf alanlarını çalıştırın."
        : "Kayıt işlemi başarısız oldu."
    };
  }

  if (pathToRemove) {
    await removePublicImage(supabase, "doctor-photos", pathToRemove);
  }

  revalidateContent();
  return { success: true, message: id ? "Hekim başarıyla güncellendi." : "Hekim başarıyla eklendi." };
}

export async function deleteDoctorAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { data } = await supabase
    .from("doctors")
    .select("photo_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("doctors").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  if (data?.photo_path) {
    await removePublicImage(supabase, "doctor-photos", data.photo_path);
  }

  revalidateContent();
  return { success: true, message: "Hekim silindi." };
}

export async function removeDoctorPhotoAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { data, error: readError } = await supabase
    .from("doctors")
    .select("photo_url, photo_path")
    .eq("id", id)
    .maybeSingle();

  if (readError || !data) {
    const missingColumn = readError?.message.toLowerCase().includes("photo_");
    return {
      error: missingColumn
        ? "Hekim görseli kaydedilemedi. schema.sql içindeki doctors fotoğraf alanlarını çalıştırın."
        : "Hekim bulunamadı."
    };
  }

  if (!data.photo_url && !data.photo_path) {
    return { error: "Kaldırılacak görsel yok." };
  }

  const { error } = await supabase
    .from("doctors")
    .update({ photo_url: null, photo_path: null })
    .eq("id", id);

  if (error) return { error: "Görsel kaldırılamadı." };

  if (data.photo_path) {
    await removePublicImage(supabase, "doctor-photos", data.photo_path);
  }

  revalidateContent();
  return { success: true, message: "Görsel kaldırıldı." };
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
  const dataToSave = { ...payload, slug: slugify(payload.title) };

  const response = id
    ? await supabase.from("announcements").update(dataToSave).eq("id", id)
    : await supabase.from("announcements").insert(dataToSave);

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

const PUBLIC_IMAGE_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

const PUBLIC_IMAGE_LIMIT = 2 * 1024 * 1024;

function getImageFile(formData: FormData, field: string) {
  const value = formData.get(field);
  if (!(value instanceof File) || value.size <= 0) {
    return null;
  }

  return value;
}

function isAllowedImage(buffer: Buffer, type: string) {
  if (buffer.length < 12) {
    return false;
  }

  if (type === "image/jpeg") {
    return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  }

  if (type === "image/png") {
    return buffer.subarray(0, 4).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]));
  }

  if (type === "image/webp") {
    return (
      buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
      buffer.subarray(8, 12).toString("ascii") === "WEBP"
    );
  }

  return false;
}

async function uploadPublicImage(
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
  bucket: string,
  file: File,
  label: string
) {
  if (file.size > PUBLIC_IMAGE_LIMIT) {
    return { error: `${label} 2 MB'dan küçük olmalıdır.` };
  }

  const extension = PUBLIC_IMAGE_TYPES[file.type];
  if (!extension) {
    return { error: `${label} JPEG, PNG veya WebP olmalıdır.` };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!isAllowedImage(buffer, file.type)) {
    return { error: `${label} JPEG, PNG veya WebP olmalıdır.` };
  }

  const path = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: file.type,
    upsert: false
  });

  if (error) {
    console.error("Image upload failed", error);
    const missingBucket = error.message.toLowerCase().includes("bucket");
    return {
      error: missingBucket
        ? `${bucket} kovası bulunamadı. schema.sql içindeki depolama komutunu çalıştırın.`
        : `${label} yüklenemedi.`
    };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { path, url: data.publicUrl };
}

async function removePublicImage(
  supabase: NonNullable<ReturnType<typeof getSupabaseAdmin>>,
  bucket: string,
  path: string
) {
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error) {
    console.error("Image delete failed", error);
  }
}

export async function saveNewsAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  if (!supabase) return { error: "Supabase bağlantısı eksik." };

  const parsed = newsAdminSchema.safeParse({
    id: getString(formData, "id") || undefined,
    title: getString(formData, "title"),
    excerpt: getString(formData, "excerpt"),
    content: getString(formData, "content"),
    published_at: getString(formData, "published_at"),
    is_active: formData.get("is_active") === "on"
  });

  if (!parsed.success) return { error: "Form alanlarını kontrol ediniz." };

  const { id, ...payload } = parsed.data;
  const cover = getImageFile(formData, "cover");

  let existing: {
    slug: string;
    cover_image_url: string | null;
    cover_image_path: string | null;
  } | null = null;

  if (id) {
    const { data, error } = await supabase
      .from("news")
      .select("slug, cover_image_url, cover_image_path")
      .eq("id", id)
      .maybeSingle();

    if (error || !data) return { error: "Haber bulunamadı." };
    existing = data;
  }

  if (!cover && !existing?.cover_image_url) {
    return { error: "Kapak görseli zorunludur." };
  }

  let coverImageUrl = existing?.cover_image_url || "";
  let coverImagePath = existing?.cover_image_path || null;
  let uploadedPath: string | null = null;

  if (cover) {
    const uploaded = await uploadPublicImage(supabase, "news-covers", cover, "Kapak görseli");
    if ("error" in uploaded) return uploaded;
    uploadedPath = uploaded.path;
    coverImageUrl = uploaded.url;
    coverImagePath = uploaded.path;
  }

  const slug = existing?.slug || slugify(payload.title);
  if (!slug) {
    if (uploadedPath) await removePublicImage(supabase, "news-covers", uploadedPath);
    return { error: "Başlık geçerli bir adres üretmiyor." };
  }

  const dataToSave = {
    ...payload,
    slug,
    cover_image_url: coverImageUrl,
    cover_image_path: coverImagePath
  };

  const response = id
    ? await supabase.from("news").update(dataToSave).eq("id", id)
    : await supabase.from("news").insert(dataToSave);

  if (response.error) {
    if (uploadedPath) await removePublicImage(supabase, "news-covers", uploadedPath);
    console.error("News save failed", response.error);
    if (response.error.code === "23505") {
      return { error: "Bu başlığa ait bir haber zaten var." };
    }
    return {
      error: "Haber kaydedilemedi. news tablosu kurulu değilse schema.sql komutunu çalıştırın."
    };
  }

  if (
    uploadedPath &&
    existing?.cover_image_path &&
    existing.cover_image_path !== uploadedPath
  ) {
    await removePublicImage(supabase, "news-covers", existing.cover_image_path);
  }

  revalidateContent();
  return {
    success: true,
    message: id ? "Haber güncellendi." : "Haber eklendi."
  };
}

export async function deleteNewsAction(formData: FormData) {
  await requireAdmin();
  const supabase = getSupabaseAdmin();
  const id = getString(formData, "id");
  if (!supabase || !id) return { error: "Kayıt bulunamadı." };

  const { data } = await supabase
    .from("news")
    .select("cover_image_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return { error: "Silme işlemi başarısız." };

  if (data?.cover_image_path) {
    await removePublicImage(supabase, "news-covers", data.cover_image_path);
  }

  revalidateContent();
  return { success: true, message: "Haber silindi." };
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
