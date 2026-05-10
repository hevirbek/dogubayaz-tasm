import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  fallbackAnnouncements,
  type Announcement
} from "@/lib/data/announcements";
import { fallbackDoctors, type Doctor } from "@/lib/data/doctors";

export async function getDoctors(): Promise<Doctor[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return fallbackDoctors.filter((doctor) => doctor.is_active);
  }

  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data) {
    return fallbackDoctors.filter((doctor) => doctor.is_active);
  }

  return data as Doctor[];
}

export async function getAnnouncements(): Promise<Announcement[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return fallbackAnnouncements
      .filter((announcement) => announcement.is_active)
      .sort(
        (a, b) =>
          new Date(b.published_at).getTime() -
          new Date(a.published_at).getTime()
      );
  }

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq("is_active", true)
    .order("published_at", { ascending: false });

  if (error || !data) {
    return fallbackAnnouncements.filter((announcement) => announcement.is_active);
  }

  return data as Announcement[];
}

export async function getActiveDoctorLeaves(): Promise<any[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  
  const todayStr = new Date().toISOString().slice(0, 10);
  const { data } = await supabase
    .from("doctor_leaves")
    .select("*")
    .gte("end_date", todayStr);
    
  return data || [];
}
