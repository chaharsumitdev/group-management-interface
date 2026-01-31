-- Add problems_reported: non-negative integer, 0 to n. Half of existing rows get 0, half get 1 (alternating by id).
alter table groups
  add column problems_reported integer not null default 0
  constraint groups_problems_reported_non_negative check (problems_reported >= 0);

comment on column groups.problems_reported is 'Number of problems reported for this group (0 or more).';

-- Initialize existing rows: first entry 0, second 1, third 0, fourth 1, ...
with numbered as (
  select id, (row_number() over (order by id) - 1) % 2 as val
  from groups
)
update groups g
set problems_reported = n.val
from numbered n
where g.id = n.id;
