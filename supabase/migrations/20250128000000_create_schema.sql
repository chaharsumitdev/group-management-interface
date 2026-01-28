-- projects: tag-style categories (e.g. # Demo, # Clients)
create table projects (
  id bigint generated always as identity primary key,
  name text not null,
  color text not null default '#3b82f6'
);

-- labels: small tags per group (e.g. High V, Priority, Pilot, Warm)
create table labels (
  id bigint generated always as identity primary key,
  name text not null,
  color text not null default '#6b7280'
);

-- groups: WhatsApp groups
create table groups (
  id bigint generated always as identity primary key,
  name text not null,
  project_id bigint references projects(id) on delete set null,
  members_count int not null default 0,
  unread_messages int not null default 0,
  last_active timestamptz not null default now(),
  disappearing_messages boolean not null default false,
  send_message_permission text not null default 'all',
  created_at timestamptz not null default now()
);

create index groups_project_id_idx on groups (project_id);
create index groups_last_active_idx on groups (last_active desc);

-- group_labels: many-to-many
create table group_labels (
  group_id bigint not null references groups(id) on delete cascade,
  label_id bigint not null references labels(id) on delete cascade,
  primary key (group_id, label_id)
);

create index group_labels_group_id_idx on group_labels (group_id);
create index group_labels_label_id_idx on group_labels (label_id);

-- issues: bottom card (e.g. PER-011 | Evoke <> Skope, "Issues with mentions on groups")
create table issues (
  id bigint generated always as identity primary key,
  group_id bigint not null references groups(id) on delete cascade,
  code text not null,
  title text not null,
  context_type text,
  occurred_at date,
  created_at timestamptz not null default now()
);

create index issues_group_id_idx on issues (group_id);
