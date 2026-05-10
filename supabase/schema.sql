create table if not exists public.doctors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  title text not null,
  room text,
  working_hours text,
  duty_type text,
  nurse_name text,
  note text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists doctors_sort_order_idx
  on public.doctors (sort_order);

create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  content text not null,
  published_at timestamptz not null default now(),
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists announcements_published_at_idx
  on public.announcements (published_at desc);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

grant usage on schema public to service_role;

grant select, insert, update, delete
  on public.doctors,
     public.announcements,
     public.contact_messages
  to service_role;

create table if not exists public.asm_working_hours (
  id integer primary key default 1,
  weekdays_start text not null default '08:00',
  weekdays_end text not null default '17:00',
  weekend_closed boolean not null default true
);

create table if not exists public.closed_dates (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.doctor_leaves (
  id uuid primary key default gen_random_uuid(),
  doctor_id uuid references public.doctors(id) on delete cascade not null,
  start_date date not null,
  end_date date not null,
  reason text,
  created_at timestamptz not null default now()
);

grant select, insert, update, delete
  on public.asm_working_hours,
     public.closed_dates,
     public.doctor_leaves
  to service_role;
