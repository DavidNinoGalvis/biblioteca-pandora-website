import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "../../../../lib/adminAuth";
import { prisma } from "../../../../lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    const verified = token ? verifyAdmin(token) : null;

    if (!verified) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Delete all completed challenges
    const result = await prisma.completedChallenge.deleteMany({});

    return NextResponse.json({
      success: true,
      message: `Se eliminaron ${result.count} registros de retos completados`,
      deletedCount: result.count,
    });
  } catch (error) {
    console.error("Error resetting points:", error);
    return NextResponse.json(
      { error: "Error al reiniciar puntos" },
      { status: 500 }
    );
  }
}
