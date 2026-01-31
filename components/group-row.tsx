"use client";

import type { Group, Label, Project } from "@/types/groups";
import { getAvatarUrl } from "@/lib/avatar";
import { formatLastActive } from "@/lib/format";
import Image from "next/image";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

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
      className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium"
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
          className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium text-gray-700 border border-gray-300"
        >
          <span className="rounded-full h-2 w-2 mr-1" style={{ backgroundColor: l.color }}></span> {l.name.slice(0, 6)}{l.name.length > 6 ? "…" : ""}
        </span>
      ))}
      {rest > 0 && (
        <span className="text-xs text-gray-400 border border-gray-300 rounded-full px-1.5 py-0.5">{rest}+</span>
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
      className={`transition-colors text-center ${selected ? "bg-gray-100" : "bg-white hover:bg-gray-50"} cursor-pointer`}
      data-selected={selected}
      aria-current={selected ? "true" : undefined}
    >
      <td className="w-10 px-3 py-3">
        <input
          type="checkbox"
          className="rounded border-gray-300 text-green-600 focus:ring-green-500"
          checked={checked}
          onChange={(e) => {
            e.stopPropagation();
            onCheck(group.id, e.target.checked);
          }}
          onClick={(e) => e.stopPropagation()}
          aria-label={`Select ${group.name}`}
        />
      </td>
      <td className="px-3 py-3">
        <div className="flex items-center gap-2">
          <span className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-gray-600">
            <Image
              src={getAvatarUrl(group.avatar, group.id)}
              alt=""
              width={36}
              height={36}
              className="object-cover"
              aria-hidden
            />
          </span>
          <p className="font-medium text-sm text-gray-600 text-left">{group.name}</p>
          {group.problems_reported > 0 && <ReportProblemIcon style={{ height: 16, width: 16, color: "red" }} aria-hidden />}
          {group.unread_messages ? (
            <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-green-400 px-1 text-xs font-medium text-white">
              {group.unread_messages}
            </span>
          ) : null}
        </div>
      </td>
      <td className="px-3 py-3">
        {project ? <ProjectTag project={project} /> : <span className="text-gray-400">—</span>}
      </td>
      <td className="px-3 py-3">
        {group.labels && group.labels.length > 0 ? (
          <LabelTags labels={group.labels} />
        ) : (
          <span className="text-gray-400">—</span>
        )}
      </td>
      <td className="px-3 py-3 text-sm text-gray-600">{group.members_count}</td>
      <td className="px-3 py-3 text-sm text-gray-400">
        {formatLastActive(group.last_active)}
      </td>
    </tr>
  );
}
