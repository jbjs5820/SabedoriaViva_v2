-- Add age_group column if it doesn't exist
alter table profiles 
add column if not exists age_group text check (age_group in (
  '18-24 anos',
  '25-34 anos',
  '35-44 anos',
  '45-54 anos',
  '55+ anos'
));

-- Ensure email is not required
alter table profiles alter column email drop not null;

-- Ensure avatars bucket exists and is public
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- Update storage policies for avatars
create policy "Avatar images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' )
on conflict do nothing;

create policy "Anyone can upload an avatar"
on storage.objects for insert
with check ( bucket_id = 'avatars' )
on conflict do nothing;

create policy "Anyone can update their own avatar"
on storage.objects for update
using ( bucket_id = 'avatars' )
on conflict do nothing;

-- Ensure user_interests table exists
create table if not exists user_interests (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  interest text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, interest)
);

-- Enable RLS on user_interests
alter table user_interests enable row level security;

-- Update user_interests policies
create policy "Users can view any interests"
on user_interests for select
using (true)
on conflict do nothing;

create policy "Users can insert their own interests"
on user_interests for insert
with check (auth.uid() = user_id)
on conflict do nothing;

create policy "Users can delete their own interests"
on user_interests for delete
using (auth.uid() = user_id)
on conflict do nothing;