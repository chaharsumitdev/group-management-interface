-- Add optional avatar path (e.g. /avatar-1.svg) to groups. Empty for all rows initially.
alter table groups
  add column avatar text;

comment on column groups.avatar is 'Optional path to group avatar image (e.g. /avatar-1.svg). If null, UI uses a default avatar.';
