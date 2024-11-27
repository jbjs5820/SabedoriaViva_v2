-- Drop conflicting policies
drop policy if exists "Users can view any interests" on user_interests;
drop policy if exists "Avatar images are publicly accessible" on storage.objects;

-- Create storage bucket for avatars if it doesn't exist
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

-- Create storage policies
create policy "Avatar images are publicly accessible"
on storage.objects for select
using ( bucket_id = 'avatars' );

-- Create user interests policy
create policy "Users can view any interests"
on user_interests for select
using (true);

-- Ensure email is not required in profiles
alter table profiles alter column email drop not null;

-- Add age_group column if it doesn't exist
alter table profiles 
add column if not exists age_group text check (age_group in (
  '18-24 anos',
  '25-34 anos',
  '35-44 anos',
  '45-54 anos',
  '55+ anos'
));