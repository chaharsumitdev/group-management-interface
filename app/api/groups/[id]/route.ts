import { fetchGroupDetail } from "@/lib/groups";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const n = parseInt(id, 10);
    if (Number.isNaN(n) || n < 1) {
      return NextResponse.json({ error: "Invalid group id" }, { status: 400 });
    }

    const detail = await fetchGroupDetail(n);
    if (!detail) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(detail);
  } catch (e) {
    console.error("GET /api/groups/[id]", e);
    return NextResponse.json(
      { error: "Failed to fetch group detail" },
      { status: 500 }
    );
  }
}
