import { fetchGroupsList } from "@/lib/groups";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
    const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("pageSize") ?? "50", 10)));
    const search = searchParams.get("search") ?? undefined;

    const result = await fetchGroupsList(page, pageSize, search);
    return NextResponse.json(result);
  } catch (e) {
    console.error("GET /api/groups", e);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}
