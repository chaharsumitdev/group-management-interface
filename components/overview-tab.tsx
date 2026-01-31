"use client";

import type { GroupDetail, Label, Project } from "@/types/groups";
import { formatLastActive } from "@/lib/format";
import { ChevronsUpDown } from "lucide-react";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

interface OverviewTabProps {
  detail: GroupDetail;
}

function ProjectTag({ project }: { project: Project }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
      style={{ backgroundColor: `${project.color}20`, color: project.color }}
    >
      # {project.name}
    </span>
  );
}

export function OverviewTab({ detail }: OverviewTabProps) {
  const labels = detail.labels ?? [];

  return (
    <div className="flex flex-col gap-2">
      <div className="space-y-4 text-sm p-4">
        <div className="flex justify-between">
          <span className="text-gray-400 flex-2">Last Active</span>
          <p className="font-medium text-gray-900 flex-1">{formatLastActive(detail.last_active)}</p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 flex-2">Disappearing Messages</span>
          <p className="flex items-center flex-1 gap-1 font-medium text-gray-900">
            {detail.disappearing_messages ? "ON" : "OFF"}
            <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Info">
              <ChevronsUpDown className="h-3 w-3" aria-hidden />
            </button>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 flex-2">Send Message Permission</span>
          <p className="flex items-center gap-1 flex-1 font-medium text-gray-900">
            {detail.send_message_permission.charAt(0).toUpperCase() + detail.send_message_permission.slice(1)}
            <button type="button" className="text-gray-400 hover:text-gray-600" aria-label="Change">
              <ChevronsUpDown className="h-3 w-3" aria-hidden />
            </button>
          </p>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 flex-2">Project</span>
          <div className="mt-0.5 flex-1">
            {detail.project ? (
              <ProjectTag project={detail.project} />
            ) : (
              <span className="text-gray-400">—</span>
            )}
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 flex-2">Labels</span>
          <div className="mt-1 flex flex-col flex-1 gap-1 flex-wrap">
            {labels.map((l: Label) => (
              <span
                key={l.id}
                className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium w-fit border border-gray-300 text-gray-700"
              >
                <span className="rounded-full h-2 w-2 mr-1" style={{ backgroundColor: l.color }}></span> {l.name}
              </span>
            ))}
            <button
              type="button"
              className="w-fit rounded-full border border-gray-300 px-2 py-1 text-xs font-medium text-gray-400 hover:border-gray-400 hover:text-gray-700"
            >
              + Add Label
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-gray-200 pt-4 px-4">
        <button
          type="button"
          className="flex items-center gap-2 w-fit text-sm font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
        >
          <FileUploadOutlinedIcon style={{ height: 16, width: 16 }} aria-hidden />
          Export Chat
        </button>
        <button
          type="button"
          className="flex items-center w-fit gap-2 text-sm font-medium text-red-600 hover:text-red-700 cursor-pointer"
        >
          <ExitToAppOutlinedIcon style={{ height: 16, width: 16 }} aria-hidden />
          Exit Group
        </button>
      </div>
    </div>
  );
}
