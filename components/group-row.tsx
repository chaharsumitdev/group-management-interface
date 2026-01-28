"use client";

import type { Group, Label, Project } from "@/types/groups";
import { formatLastActive } from "@/lib/format";
import { Users } from "lucide-react";

interface GroupRowProps {
  group: Group;
  selected?: boolean;
  checked?: boolean;
  onSelect: (id: number) => void;
  onCheck: (id: number, checked: boolean) => void;
}

function ProjectTag({ project }: { project: Project }) {
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
      style={{ backgroundColor: `${project.color}20`, color: project.color }}
    >
      # {project.name}
    </span>
  );
}

function LabelTags({ labels, max = 2 }: { labels: Label[]; max?: number }) {
  const show = labels.slice(0, max);
  const rest = labels.length - max;

  return (
    <span className="flex flex-wrap items-center gap-1">
      {show.map((l) => (
        <span
          key={l.id}
          className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
          style={{ backgroundColor: `${l.color}20`, color: l.color }}
        >
          • {l.name.slice(0, 6)}{l.name.length > 6 ? "…" : ""}
        </span>
      ))}
      {rest > 0 && (
        <span className="text-xs text-gray-400">{rest}+</span>
      )}
    </span>
  );
}

export function GroupRow({ group, selected, checked = false, onSelect, onCheck }: GroupRowProps) {
  const project = group.project ?? null;

  return (
    <tr
      role="button"
      tabIndex={0}
      onClick={() => onSelect(group.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(group.id);
        }
      }}
      className={`border-b border-gray-100 transition-colors ${selected ? "bg-gray-100" : "bg-white hover:bg-gray-50"} cursor-pointer`}
      data-selected={selected}
      aria-current={selected ? "true" : undefined}
    >
      <td className="w-10 px-4 py-3">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onCheck(group.id, e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Select ${group.name}`}
        />
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600">
            <Users className="h-4 w-4" aria-hidden />
          </span>
          <span className="font-medium text-gray-900">{group.name}</span>
          {group.unread_messages && <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            {group.unread_messages}
          </span>}
        </div>
      </td>
      <td className="px-4 py-3">
        {project ? <ProjectTag project={project} /> : <span className="text-gray-400">—</span>}
      </td>
      <td className="px-4 py-3">
        {group.labels && group.labels.length > 0 ? (
          <LabelTags labels={group.labels} />
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{group.members_count}</td>
      <td className="px-4 py-3 text-sm text-gray-600">
        {formatLastActive(group.last_active)}
      </td>
    </tr>
  );
}
