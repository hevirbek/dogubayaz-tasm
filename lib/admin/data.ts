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

export async function getAdminAsmWorkingHours() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data } = await supabase.from("asm_working_hours").select("*").eq("id", 1).single();
  return data;
}

export async function getAdminClosedDates() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data } = await supabase.from("closed_dates").select("*").order("date", { ascending: true });
  return data || [];
}

export async function getAdminDoctorLeaves() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data } = await supabase.from("doctor_leaves").select("*, doctors(full_name)").order("start_date", { ascending: true });
  return data || [];
}

export async function getAdminContactMessages() {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
  return data || [];
}
