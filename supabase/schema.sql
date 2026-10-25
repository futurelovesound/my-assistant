-- Мой ассистент: схема базы. Выполнить один раз в Supabase → SQL Editor.

-- Все данные приложения: один JSON-документ на путь (days/2026-10-25, money/2026-10, settings/main ...)
create table if not exists public.docs (
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  path text not null,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, path)
);
alter table public.docs enable row level security;
drop policy if exists "own docs" on public.docs;
create policy "own docs" on public.docs for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
alter table public.docs replica identity full;
do $$ begin
  alter publication supabase_realtime add table public.docs;
exception when duplicate_object then null; end $$;

-- Подписки устройств на push-уведомления
create table if not exists public.push_subs (
  endpoint text primary key,
  user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
  sub jsonb not null,
  tz text not null default 'Asia/Almaty',
  created_at timestamptz not null default now()
);
alter table public.push_subs enable row level security;
drop policy if exists "own subs" on public.push_subs;
create policy "own subs" on public.push_subs for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Журнал отправленных напоминаний, чтобы не слать одно и то же дважды
create table if not exists public.push_log (
  user_id uuid not null,
  reminder_id text not null,
  day date not null,
  primary key (user_id, reminder_id, day)
);
alter table public.push_log enable row level security;  -- доступ только у сервисной роли
