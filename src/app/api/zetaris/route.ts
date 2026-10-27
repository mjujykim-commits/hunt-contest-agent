import { NextResponse } from "next/server";
import {
  contestSourceTables,
  HUNT_FEDERATION_SQL,
  zetarisConfigured,
  zetarisFederatedHunt,
} from "@/lib/zetaris";

export const dynamic = "force-dynamic";

export async function GET() {
  const tables = contestSourceTables();
  try {
    const result = await zetarisFederatedHunt();
    return NextResponse.json({
      configured: zetarisConfigured(),
      tables,
      ...result,
    });
  } catch (e) {
    return NextResponse.json(
      {
        configured: zetarisConfigured(),
        tables,
        provider: "error",
        sql: HUNT_FEDERATION_SQL,
        error: e instanceof Error ? e.message : "unknown",
      },
      { status: 500 }
    );
  }
}
