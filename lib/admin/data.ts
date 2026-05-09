import "server-only";

import type { Announcement } from "@/lib/data/announcements";
import type { Doctor } from "@/lib/data/doctors";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function getAdminDoctors(): Promise<Doctor[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as Doctor[];
}

export async function getAdminAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("published_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data as Announcement[];
}
