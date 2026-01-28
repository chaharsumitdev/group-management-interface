import type { Group, GroupDetail, GroupsListResponse } from "@/types/groups";
import type { Label, Project } from "@/types/groups";
import { getTotalPages } from "@/lib/pagination";
import { supabase } from "@/lib/supabase";

const DEFAULT_PAGE_SIZE = 50;

function mapGroupRow(row: {
  id: number;
  name: string;
  project_id: number | null;
  members_count: number;
  unread_messages: number;
  last_active: string;
  disappearing_messages: boolean;
  send_message_permission: string;
  created_at?: string;
  projects?: { id: number; name: string; color: string } | null;
  group_labels?: Array<{ labels: { id: number; name: string; color: string } | null }>;
  labels?: Array<{ id: number; name: string; color: string }>;
}): Group {
  const labels: Label[] =
    row.labels ?? (row.group_labels ?? []).map((gl) => gl.labels).filter((l): l is Label => l != null);
  return {
    id: row.id,
    name: row.name,
    project_id: row.project_id,
    project: row.projects ?? null,
    labels,
    members_count: row.members_count,
    unread_messages: row.unread_messages,
    last_active: row.last_active,
    disappearing_messages: row.disappearing_messages,
    send_message_permission: row.send_message_permission,
    created_at: row.created_at,
  };
}

export async function fetchGroupsList(
  page: number = 1,
  pageSize: number = DEFAULT_PAGE_SIZE,
  search?: string
): Promise<GroupsListResponse> {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from("groups")
    .select(
      `
      id,
      name,
      project_id,
      members_count,
      unread_messages,
      last_active,
      disappearing_messages,
      send_message_permission,
      created_at,
      projects ( id, name, color ),
      group_labels ( labels ( id, name, color ) )
    `,
      { count: "exact" }
    );

  // Filter by name if search query is provided
  if (search && search.trim()) {
    query = query.ilike("name", `%${search.trim()}%`);
  }

  const { data: rows, error, count } = await query
    .order("last_active", { ascending: false })
    .range(from, to);

  if (error) throw error;

  const total = count ?? 0;
  const totalPages = getTotalPages(total, pageSize);
  const groups = (rows ?? []).map((r) => mapGroupRow(r as unknown as Parameters<typeof mapGroupRow>[0]));

  return {
    groups,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  };
}

export async function fetchGroupDetail(id: number): Promise<GroupDetail | null> {
  const { data: row, error } = await supabase
    .from("groups")
    .select(
      `
      id,
      name,
      project_id,
      members_count,
      unread_messages,
      last_active,
      disappearing_messages,
      send_message_permission,
      created_at,
      projects ( id, name, color ),
      group_labels ( labels ( id, name, color ) )
    `
    )
    .eq("id", id)
    .single();

  if (error || !row) return null;

  const g = mapGroupRow(row as unknown as Parameters<typeof mapGroupRow>[0]);
  const project: Project | null = g.project ?? null;
  const labels: Label[] = g.labels ?? [];

  const { data: issueRows } = await supabase
    .from("issues")
    .select(
      `
      id,
      group_id,
      code,
      title,
      context_type,
      occurred_at,
      created_at,
      created_by_user_id,
      users:created_by_user_id ( id, name, email, created_at )
    `
    )
    .eq("group_id", id)
    .limit(1);

  const issue = issueRows?.[0]
    ? {
        id: issueRows[0].id,
        group_id: issueRows[0].group_id,
        code: issueRows[0].code,
        title: issueRows[0].title,
        context_type: issueRows[0].context_type,
        occurred_at: issueRows[0].occurred_at,
        created_at: issueRows[0].created_at,
        created_by:
          issueRows[0].users && typeof issueRows[0].users === "object" && !Array.isArray(issueRows[0].users)
            ? {
                id: (issueRows[0].users as { id: number }).id,
                name: (issueRows[0].users as { name: string }).name,
                email: (issueRows[0].users as { email: string }).email,
                created_at: (issueRows[0].users as { created_at?: string }).created_at,
              }
            : null,
      }
    : null;

  return {
    ...g,
    project,
    labels,
    issue,
  };
}
