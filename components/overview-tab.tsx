"use client";

import type { GroupDetail, Label, Project } from "@/types/groups";
import { formatLastActive } from "@/lib/format";
import { Download, LogOut, ChevronsUpDown } from "lucide-react";

interface OverviewTabProps {
  detail: GroupDetail;
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

export function OverviewTab({ detail }: OverviewTabProps) {
  const labels = detail.labels ?? [];

  return (
    <div className="flex flex-col gap-4">
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500 flex-1">Last Active</span>
          <p className="font-medium text-gray-900 flex-1">{formatLastActive(detail.last_active)}</p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 flex-1">Disappearing Messages</span>
          <p className="flex items-center flex-1 gap-1 font-medium text-gray-900">
            {detail.disappearing_messages ? "ON" : "OFF"}
            <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Info">
              <ChevronsUpDown className="h-4 w-4" aria-hidden />
            </button>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 flex-1">Send Message Permission</span>
          <p className="flex items-center gap-1 flex-1 font-medium text-gray-900">
            {detail.send_message_permission.toUpperCase()}
            <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Change">
              <ChevronsUpDown className="h-4 w-4" aria-hidden />
            </button>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 flex-1">Project</span>
          <div className="mt-0.5 flex-1">
            {detail.project ? (
              <ProjectTag project={detail.project} />
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 flex-1">Labels</span>
          <div className="mt-1 flex flex-col flex-1 gap-4 flex-wrap">
            {labels.map((l: Label) => (
              <span
                key={l.id}
                className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium w-fit"
                style={{ backgroundColor: `${l.color}20`, color: l.color }}
              >
                • {l.name}
              </span>
            ))}
            <button
              type="button"
              className="w-fit rounded-md border border-dashed border-gray-300 px-2 py-0.5 text-xs font-medium text-gray-500 hover:border-gray-400 hover:text-gray-700"
            >
              + Add Label
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Download className="h-4 w-4" aria-hidden />
          Export Chat
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" aria-hidden />
          Exit Group
        </button>
      </div>
    </div>
  );
}
