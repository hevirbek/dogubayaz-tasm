import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import {
  fallbackAnnouncements,
  type Announcement
} from "@/lib/data/announcements";
import { fallbackDoctors, type Doctor } from "@/lib/data/doctors";
import { fallbackNews, type News } from "@/lib/data/news";

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

function sortActiveNews(items: News[]) {
  return items
    .filter((item) => item.is_active)
    .sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
}

export async function getNews(): Promise<News[]> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return sortActiveNews(fallbackNews);
  }

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq("is_active", true)
    .order("published_at", { ascending: false });

  if (error || !data) {
    return sortActiveNews(fallbackNews);
  }

  return data as News[];
}

export async function getNewsBySlug(slugOrId: string): Promise<News | null> {
  const match = (item: News) =>
    item.is_active && (item.slug === slugOrId || item.id === slugOrId);
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return fallbackNews.find(match) || null;
  }

  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      slugOrId
    );
  const column = isUuid ? "id" : "slug";

  const { data, error } = await supabase
    .from("news")
    .select("*")
    .eq(column, slugOrId)
    .maybeSingle();

  if (error) {
    return fallbackNews.find(match) || null;
  }

  if (!data || !data.is_active) {
    return null;
  }

  return data as News;
}

export async function getAnnouncementBySlug(slugOrId: string): Promise<Announcement | null> {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return fallbackAnnouncements.find((a) => a.slug === slugOrId || a.id === slugOrId) || null;
  }

  // Check if it looks like a UUID to query by id, otherwise query by slug
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slugOrId);
  const column = isUuid ? "id" : "slug";

  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .eq(column, slugOrId)
    .single();

  if (error || !data) {
    return fallbackAnnouncements.find((a) => a.slug === slugOrId || a.id === slugOrId) || null;
  }

  return data as Announcement;
}
