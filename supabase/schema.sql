-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  email text not null unique,
  avatar_url text,
  bio text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create events table
create table events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  date date not null,
  time time not null,
  location text not null,
  category text not null,
  image_url text,
  spots integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create event registrations table
create table event_registrations (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references events on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(event_id, user_id)
);

-- Create user interests table
create table user_interests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  interest text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, interest)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;
alter table events enable row level security;
alter table event_registrations enable row level security;
alter table user_interests enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can insert their own profile"
  on profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

create policy "Events are viewable by everyone"
  on events for select
  using (true);

create policy "Only authenticated users can register for events"
  on event_registrations for insert
  with check (auth.role() = 'authenticated');

create policy "Users can view their own registrations"
  on event_registrations for select
  using (auth.uid() = user_id);

create policy "Users can manage their own interests"
  on user_interests for all
  using (auth.uid() = user_id);

-- Create helper functions
create or replace function get_available_spots(event_id uuid)
returns integer as $$
  select e.spots - count(er.id)::integer
  from events e
  left join event_registrations er on er.event_id = e.id
  where e.id = $1
  group by e.spots;
$$ language sql stable;

-- Create triggers for updating timestamps
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
  before update on profiles
  for each row
  execute function update_updated_at();

create trigger update_events_updated_at
  before update on events
  for each row
  execute function update_updated_at();

-- Insert sample data
insert into events (title, description, date, time, location, category, image_url, spots) values
('Workshop de Fotografia Digital', 'Aprenda técnicas essenciais de fotografia digital com profissionais experientes.', '2024-05-15', '14:00', 'Centro Cultural de Lisboa', 'Arte', 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa', 12),
('Encontro de Jardinagem', 'Compartilhe experiências e aprenda novas técnicas de jardinagem.', '2024-05-20', '10:00', 'Jardim Botânico', 'Lazer', 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae', 20),
('Introdução ao Smartphone', 'Curso básico para aprender a usar todas as funcionalidades do seu smartphone.', '2024-05-25', '15:00', 'Biblioteca Municipal', 'Tecnologia', 'https://images.unsplash.com/photo-1551650975-87deedd944c3', 15);