"use client";

import { useState, useEffect, useRef } from "react";
import type { GroupsListResponse } from "@/types/groups";
import { GroupRow } from "@/components/group-row";
import { Pagination } from "@/components/pagination";
import { GroupSidePanel } from "@/components/group-side-panel";
import { ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import FilterList from "@mui/icons-material/FilterList";

interface GroupsTableProps {
  initial: GroupsListResponse;
}

export function GroupsTable({ initial }: GroupsTableProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(initial.page);
  const [groupsData, setGroupsData] = useState<GroupsListResponse>(initial);
  const [loading, setLoading] = useState(false);
  const isInitialMount = useRef(true);
  const { groups, total, page, total_pages } = groupsData;
  const selectedGroup = selectedId != null ? groups.find((g) => g.id === selectedId) : null;

  // Check if all visible rows are checked
  const allChecked = groups.length > 0 && groups.every((g) => checkedIds.has(g.id));
  const someChecked = groups.some((g) => checkedIds.has(g.id));

  // Debounce search input (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      // Reset to page 1 when search changes
      if (searchQuery !== debouncedSearch) {
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  // Fetch groups when debounced search or page changes
  useEffect(() => {
    let cancelled = false;
    // Skip fetch on initial mount if no search (use initial data)
    if (isInitialMount.current && debouncedSearch === "" && currentPage === initial.page) {
      isInitialMount.current = false;
      return;
    }
    isInitialMount.current = false;

    setLoading(true);

    const params = new URLSearchParams();
    params.set("page", currentPage.toString());
    params.set("pageSize", "50");
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    fetch(`/api/groups?${params.toString()}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch");
        return r.json();
      })
      .then((data: GroupsListResponse) => {
        if (!cancelled) {
          setGroupsData(data);
          // Clear selection if selected group is no longer in results
          setSelectedId((prevId) => {
            if (prevId != null && !data.groups.some((g) => g.id === prevId)) {
              return null;
            }
            return prevId;
          });
        }
      })
      .catch((e) => {
        console.error("Failed to fetch groups:", e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only refetch on search/page changes
  }, [debouncedSearch, currentPage]);

  const handleSelect = (id: number) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  const handleCheck = (id: number, checked: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Select all visible rows
      setCheckedIds(new Set(groups.map((g) => g.id)));
    } else {
      // Deselect all visible rows
      setCheckedIds((prev) => {
        const next = new Set(prev);
        groups.forEach((g) => next.delete(g.id));
        return next;
      });
    }
  };

  return (
    <div className="flex h-full min-h-0 gap-0">
      <div className="flex min-w-0 min-h-0 flex-1 flex-col">
        <div className="border-b border-gray-200 bg-gray-50 px-4 py-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
              <input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-sm border border-gray-200 bg-white py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                aria-label="Search groups"
              />
            </div>
            <button
              type="button"
              className="flex items-center gap-1 rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <FilterList style={{ height: 12, width: 12 }} aria-hidden />
              Filter
            </button>
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                className="rounded-sm bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-900"
              >
                Bulk message
              </button>
              <button
                type="button"
                className="flex items-center gap-1 rounded-sm border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Group Actions
                <ChevronsUpDown className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto bg-white">
          {loading && (
            <div className="flex items-center justify-center py-8">
              <p className="text-sm text-gray-500">Loading…</p>
            </div>
          )}
          {!loading && (
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-white shadow-sm">
                <tr>
                  <th className="w-10 px-3 py-2 font-medium uppercase tracking-wider text-gray-500" scope="col">
                    <input
                      type="checkbox"
                      className="rounded border-gray-200 text-green-600 focus:ring-green-500"
                      checked={allChecked}
                      ref={(input) => {
                        if (input) input.indeterminate = someChecked && !allChecked;
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label="Select all groups"
                    />
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium tracking-wider text-gray-700" scope="col">
                    Group Name
                  </th>
                  <th className="px-3 py-2 text-center text-sm font-medium tracking-wider text-gray-700" scope="col">
                    Project
                  </th>
                  <th className="px-3 py-2 text-left text-sm font-medium tracking-wider text-gray-700" scope="col">
                    Labels
                  </th>
                  <th className="px-3 py-2 text-center text-sm font-medium tracking-wider text-gray-700" scope="col">
                    Members
                  </th>
                  <th className="px-3 py-2 text-center text-sm font-medium tracking-wider text-gray-700" scope="col">
                    Last Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => (
                  <GroupRow
                    key={g.id}
                    group={g}
                    selected={selectedId === g.id}
                    checked={checkedIds.has(g.id)}
                    onSelect={handleSelect}
                    onCheck={handleCheck}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>

        <Pagination
          page={page}
          totalPages={total_pages}
          total={total}
          onPageChange={setCurrentPage}
        />
      </div>

      {selectedId != null && selectedGroup ? (
        <GroupSidePanel groupId={selectedId} groupName={selectedGroup.name} />
      ) : null}
    </div>
  );
}
