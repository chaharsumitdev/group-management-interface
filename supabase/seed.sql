-- Seed projects
insert into projects (name, color) values
  ('Demo', '#3b82f6'),
  ('Clients', '#f97316'),
  ('Internal', '#8b5cf6');

-- Seed labels
insert into labels (name, color) values
  ('High V', '#111827'),
  ('Priority', '#22c55e'),
  ('Pilot', '#a855f7'),
  ('Warm', '#ef4444'),
  ('Cool', '#0ea5e9');

-- Seed 256 groups with varied data
insert into groups (name, project_id, members_count, unread_messages, last_active, disappearing_messages, send_message_permission)
select
  case (n % 12)
    when 0 then 'Evoke <> Skope'
    when 1 then 'Xindus Trade Network <> Periskope'
    when 2 then 'TBC <> Periskope'
    when 3 then 'Acme Corp <> Skope'
    when 4 then 'Beta Team <> Periskope'
    when 5 then 'Gamma <> Skope'
    when 6 then 'Delta Partners <> Periskope'
    when 7 then 'Epsilon <> Skope'
    when 8 then 'Zeta Network <> Periskope'
    when 9 then 'Omega <> Skope'
    when 10 then 'Alpha Group <> Periskope'
    else 'Group ' || n || ' <> Periskope'
  end,
  (select id from projects order by random() limit 1),
  3 + (random() * 8)::int,
  floor(random() * 101)::int,
  now() - (random() * interval '30 days'),
  random() > 0.7,
  'all'
from generate_series(1, 256) as n;

-- Link groups to labels (1–4 distinct labels per group)
do $$
declare
  g record;
  lbl record;
  cnt int;
  added int;
begin
  for g in select id from groups
  loop
    cnt := 1 + (random() * 3)::int;
    added := 0;
    for lbl in select id from labels order by random()
    loop
      exit when added >= cnt;
      begin
        insert into group_labels (group_id, label_id) values (g.id, lbl.id);
        added := added + 1;
      exception when unique_violation then
        null;
      end;
    end loop;
  end loop;
end $$;

-- Seed users
insert into users (name, email) values
  ('Harvey Specter', 'harvey@periskope.com'),
  ('Mike Ross', 'mike@periskope.com'),
  ('Donna Paulsen', 'donna@periskope.com'),
  ('Louis Litt', 'louis@periskope.com'),
  ('Rachel Zane', 'rachel@periskope.com'),
  ('Jessica Pearson', 'jessica@periskope.com'),
  ('Robert Zane', 'robert@periskope.com'),
  ('Katrina Bennett', 'katrina@periskope.com');

-- Seed issues for top 50 groups by last_active (PER-011 style cards)
-- This ensures issues appear for groups that show at the top of the table
-- Assign random users as creators
insert into issues (group_id, code, title, context_type, occurred_at, created_by_user_id)
select
  g.id,
  'PER-' || lpad((10 + (row_number() over (order by g.last_active desc))::int)::text, 3, '0'),
  case (random() * 4)::int
    when 0 then 'Issues with mentions on groups'
    when 1 then 'Delivery delay in bulk messages'
    when 2 then 'Sync error with contacts'
    else 'Media upload failure'
  end,
  (array['client', 'internal', 'support'])[1 + (random() * 2)::int],
  (current_date - (random() * 14)::int),
  (select id from users order by random() limit 1)
from groups g
order by g.last_active desc
limit 50;
