import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyAdmin } from "../../../../../../lib/adminAuth";
import { prisma } from "../../../../../../lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

    const { id } = await params;
    const body = await req.json();
    const { hidden } = body;

    if (typeof hidden !== "boolean") {
      return NextResponse.json(
        { error: "El campo 'hidden' debe ser un booleano" },
        { status: 400 }
      );
    }

    // Update user visibility
    const updatedUser = await prisma.user.update({
      where: { id },
      data: { hidden },
      select: {
        id: true,
        nickname: true,
        hidden: true,
      },
    });

    return NextResponse.json({
      success: true,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user visibility:", error);
    return NextResponse.json(
      { error: "Error al actualizar visibilidad del usuario" },
      { status: 500 }
    );
  }
}
