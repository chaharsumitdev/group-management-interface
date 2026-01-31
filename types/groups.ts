export interface Project {
  id: number;
  name: string;
  color: string;
}

export interface Label {
  id: number;
  name: string;
  color: string;
}

export interface Group {
  id: number;
  name: string;
  project_id: number | null;
  project?: Project | null;
  labels?: Label[];
  members_count: number;
  unread_messages: number;
  last_active: string;
  disappearing_messages: boolean;
  send_message_permission: string;
  avatar?: string | null;
  created_at?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface Issue {
  id: number;
  group_id: number;
  code: string;
  title: string;
  context_type: string | null;
  occurred_at: string | null;
  created_at?: string;
  created_by?: User | null;
}

export interface GroupDetail extends Group {
  project: Project | null;
  labels: Label[];
  issue?: Issue | null;
}

export interface GroupsListResponse {
  groups: Group[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}
