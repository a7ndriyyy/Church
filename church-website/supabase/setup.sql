-- Run once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

create table if not exists public.events (
  id          bigint generated always as identity primary key,
  title       text not null,
  description text,
  image_url   text,
  event_date  date,
  event_time  text,
  location    text,
  created_at  timestamptz not null default now()
);

alter table public.events enable row level security;

-- Everyone can read events; only signed-in users (the admin) can change them.
create policy "events are public" on public.events
  for select using (true);
create policy "admin can insert events" on public.events
  for insert to authenticated with check (true);
create policy "admin can update events" on public.events
  for update to authenticated using (true);
create policy "admin can delete events" on public.events
  for delete to authenticated using (true);

-- Public bucket for event pictures.
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do nothing;

create policy "event images are public" on storage.objects
  for select using (bucket_id = 'event-images');
create policy "admin can upload event images" on storage.objects
  for insert to authenticated with check (bucket_id = 'event-images');
create policy "admin can delete event images" on storage.objects
  for delete to authenticated using (bucket_id = 'event-images');
