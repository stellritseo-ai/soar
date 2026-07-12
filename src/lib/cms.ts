import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  image_url: string | null;
  sort_order: number;
};

export type EventRow = {
  id: string;
  title: string;
  description: string | null;
  event_date: string | null;
  location: string | null;
  image_url: string | null;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  published_at: string | null;
};

export type GalleryImage = {
  id: string;
  title: string | null;
  image_url: string;
  sort_order: number;
};

export type HeroSettings = {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  stat1_value?: string;
  stat1_label?: string;
  stat2_value?: string;
  stat2_label?: string;
  stat3_value?: string;
  stat3_label?: string;
};

export type ContactSettings = {
  email?: string;
  phone?: string;
  address?: string;
  hours?: string;
};

export function useTeam() {
  return useQuery({
    queryKey: ["cms", "team"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as TeamMember[];
    },
  });
}

export function useEventsList() {
  return useQuery({
    queryKey: ["cms", "events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("event_date", { ascending: true, nullsFirst: false });
      if (error) throw error;
      return data as EventRow[];
    },
  });
}

export function usePublishedPosts() {
  return useQuery({
    queryKey: ["cms", "blog", "published"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .not("published_at", "is", null)
        .lte("published_at", new Date().toISOString())
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useAllPosts() {
  return useQuery({
    queryKey: ["cms", "blog", "all"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });
}

export function useGallery() {
  return useQuery({
    queryKey: ["cms", "gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true });
      if (error) throw error;
      return data as GalleryImage[];
    },
  });
}

export function useSetting<T = Record<string, unknown>>(key: string) {
  return useQuery({
    queryKey: ["cms", "setting", key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", key)
        .maybeSingle();
      if (error) throw error;
      return (data?.value ?? {}) as T;
    },
  });
}
