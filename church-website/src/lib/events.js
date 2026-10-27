import { supabase } from "./supabase";

const BUCKET = "event-images";

function requireClient() {
  if (!supabase) throw new Error("Supabase is not configured");
  return supabase;
}

export async function listEvents() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function getEvent(id) {
  if (!supabase) return null;
  const { data, error } = await supabase.from("events").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function uploadEventImage(file) {
  const client = requireClient();
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await client.storage.from(BUCKET).upload(path, file);
  if (error) throw error;
  return client.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

export async function saveEvent(event) {
  const client = requireClient();
  const { id, ...fields } = event;
  const query = id
    ? client.from("events").update(fields).eq("id", id)
    : client.from("events").insert(fields);
  const { error } = await query;
  if (error) throw error;
}

export async function deleteEvent(id) {
  const { error } = await requireClient().from("events").delete().eq("id", id);
  if (error) throw error;
}
