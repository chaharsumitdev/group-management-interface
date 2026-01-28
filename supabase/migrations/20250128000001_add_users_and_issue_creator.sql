-- users: users who can create issues
create table users (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null unique,
  created_at timestamptz not null default now()
);

create index users_email_idx on users (email);

-- Add created_by_user_id to issues table
alter table issues
  add column created_by_user_id bigint references users(id) on delete set null;

create index issues_created_by_user_id_idx on issues (created_by_user_id);
