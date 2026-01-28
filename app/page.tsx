import { fetchGroupsList } from "@/lib/groups";
import { GroupsTable } from "@/components/groups-table";

const DEFAULT_PAGE = 1;
const PAGE_SIZE = 50;

export default async function GroupsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page ?? String(DEFAULT_PAGE), 10) || DEFAULT_PAGE);

  let data;
  try {
    data = await fetchGroupsList(page, PAGE_SIZE);
  } catch (e) {
    console.error("Failed to fetch groups", e);
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="font-medium text-red-800">Failed to load groups</p>
          <p className="mt-1 text-sm text-red-600">
            Ensure Supabase is configured (.env.local) and migrations + seed are applied.
          </p>
        </div>
      </div>
    );
  }

  return <GroupsTable initial={data} />;
}
