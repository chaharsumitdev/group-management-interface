"use client";

import { useEffect, useState } from "react";
import type { GroupDetail } from "@/types/groups";
import { OverviewTab } from "@/components/overview-tab";
import { getAvatarUrl } from "@/lib/avatar";
import Image from "next/image";
import { RefreshCw, CalendarFold } from "lucide-react";
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { TripOrigin } from "@mui/icons-material";

interface GroupSidePanelProps {
  groupId: number;
  groupName: string;
}

type TabId = "overview" | "members" | "logs";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
  return (parts[0][0] ?? "").toUpperCase();
}

export function GroupSidePanel({ groupId, groupName }: GroupSidePanelProps) {
  const [detail, setDetail] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>("overview");

  useEffect(() => {
    let cancelled = false;
    /* eslint-disable react-hooks/set-state-in-effect -- reset on groupId change before async fetch */
    setLoading(true);
    setError(null);
    /* eslint-enable react-hooks/set-state-in-effect */
    fetch(`/api/groups/${groupId}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((d) => {
        if (!cancelled) setDetail(d);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [groupId]);

  const tabs: { id: TabId; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "members", label: "Members" },
    { id: "logs", label: "Logs" },
  ];

  return (
    <aside
      className="flex w-96 flex-shrink-0 flex-col border-l border-gray-200 bg-white"
      aria-label="Group details"
    >
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
              <Image
                src={getAvatarUrl(detail?.avatar, groupId)}
                alt=""
                width={40}
                height={40}
                className="object-cover"
                aria-hidden
              />
            </span>
            <h3 className="truncate text-sm font-semibold text-gray-900">{groupName}</h3>
          </div>
          <button
            type="button"
            className="flex flex-shrink-0 px-2 py-1 items-center justify-center rounded-sm text-gray-400 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            aria-label="Refresh"
          >
            <RefreshCw className="h-3 w-3" aria-hidden />
            <span className="text-sm ml-2">Refresh</span>
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200 px-4">
        <div className="flex gap-4" role="tablist" aria-label="Group details tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`w-fit px-2 py-2 text-sm font-medium ${tab === t.id
                ? "border-b-2 border-green-600 text-green-700"
                : "text-gray-500 hover:text-gray-700"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {loading && (
          <p className="text-sm text-gray-500 p-4">Loading…</p>
        )}
        {error && (
          <p className="text-sm text-red-600">Failed to load details.</p>
        )}
        {!loading && !error && detail && tab === "overview" && (
          <>
            <OverviewTab detail={detail} />
            {detail.issue && (
              <div className="mt-6 px-4">
                <div className="relative rounded-lg shadow-[0px_1px_16px_6px_rgba(0,_0,_0,_0.1)] p-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                    <span>
                      {detail.issue.code} | {detail.name}
                    </span>
                    {detail.issue.created_by && (
                      <div className="ml-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-800 text-xs font-medium text-white">
                        {getInitials(detail.issue.created_by.name)}
                      </div>
                    )}
                  </div>
                  <div className="flex mt-1 gap-2 items-center">
                    <span className="h-[12px] w-[12px] flex items-center">
                      <TripOrigin style={{ height: 16, width: 16, color: 'red' }} aria-hidden />
                    </span>
                    <p className="text-sm text-gray-900 font-semibold">
                      {detail.issue.title}
                    </p>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-900">
                    <span className="border py-1 px-2 border-gray-300 rounded-sm">
                      <SignalCellularAltIcon style={{ height: 16, width: 16 }} aria-hidden />
                    </span>
                    <span className="flex py-1 px-2 border border-gray-300 rounded-sm items-center gap-1">
                      <CalendarFold className="h-[12px] w-[12px]" style={{ color: 'red' }} />
                      {detail.issue.occurred_at
                        ? new Date(detail.issue.occurred_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                        : "—"}
                    </span>
                    {detail.issue.context_type && <span className="flex items-center border border-gray-300 py-1 px-2 rounded-sm gap-1"><span
                      className="h-2.5 w-2.5 rounded-full bg-black"
                    />{detail.issue.context_type}</span>}
                    <span className="ml-auto text-gray-400">3 days</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        {!loading && !error && tab === "members" && (
          <p className="text-sm text-gray-500 p-4">Members placeholder</p>
        )}
        {!loading && !error && tab === "logs" && (
          <p className="text-sm text-gray-500 p-4">Logs placeholder</p>
        )}
      </div>
    </aside>
  );
}
