-- Drop existing policies if they exist
drop policy if exists "Public profiles are viewable by everyone" on profiles;
drop policy if exists "Users can insert their own profile" on profiles;
drop policy if exists "Users can update their own profile" on profiles;
drop policy if exists "Avatar images are publicly accessible" on storage.objects;
drop policy if exists "Anyone can upload an avatar" on storage.objects;
drop policy if exists "Anyone can update their own avatar" on storage.objects;
drop policy if exists "Users can view any interests" on user_interests;
drop policy if exists "Users can insert their own interests" on user_interests;
drop policy if exists "Users can update their own interests" on user_interests;
drop policy if exists "Users can delete their own interests" on user_interests;

-- Create or update the profiles table
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  email text,
  avatar_url text,
  bio text,
  location text,
  age_group text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create or update the user_interests table
create table if not exists user_interests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  interest text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, interest)
);

-- Create avatars bucket if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Enable RLS
alter table profiles enable row level security;
alter table user_interests enable row level security;

-- Create new policies
create policy "Public profiles are viewable by everyone"
on profiles for select
using (true);

create policy "Users can insert their own profile"
on profiles for insert
with check (auth.uid() = id);

create policy "Users can update their own profile"
on profiles for update
using (auth.uid() = id);

-- Storage policies
create policy "Avatar images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' );

create policy "Anyone can upload an avatar"
on storage.objects for insert
with check ( bucket_id = 'avatars' );

create policy "Anyone can update their own avatar"
on storage.objects for update
using ( bucket_id = 'avatars' );

-- Interest policies
create policy "Users can view any interests"
on user_interests for select
using (true);

create policy "Users can insert their own interests"
on user_interests for insert
with check (auth.uid() = user_id);

create policy "Users can update their own interests"
on user_interests for update
using (auth.uid() = user_id);

create policy "Users can delete their own interests"
on user_interests for delete
using (auth.uid() = user_id);