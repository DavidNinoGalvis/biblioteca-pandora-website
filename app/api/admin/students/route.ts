import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPin } from "@/lib/auth";

// GET - Listar todos los estudiantes
export async function GET(request: NextRequest) {
  try {
    const students = await prisma.user.findMany({
      where: { role: "student" },
      select: {
        id: true,
        nickname: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ students });
  } catch (error) {
    console.error("Error al obtener estudiantes:", error);
    return NextResponse.json(
      { error: "Error al obtener estudiantes" },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo estudiante
export async function POST(request: NextRequest) {
  try {
    const { nickname, pin } = await request.json();

    if (!nickname || !pin) {
      return NextResponse.json(
        { error: "Nickname y PIN son requeridos" },
        { status: 400 }
      );
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { error: "El PIN debe tener exactamente 4 dígitos" },
        { status: 400 }
      );
    }

    // Verificar si el nickname ya existe
    const existing = await prisma.user.findUnique({
      where: { nickname },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Este apodo ya está en uso" },
        { status: 400 }
      );
    }

    // Encriptar PIN
    const hashedPin = await hashPin(pin);

    // Crear estudiante
    const student = await prisma.user.create({
      data: {
        nickname,
        pin: hashedPin,
        role: "student",
      },
      select: {
        id: true,
        nickname: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      student,
      message: "Estudiante creado exitosamente",
    });
  } catch (error) {
    console.error("Error al crear estudiante:", error);
    return NextResponse.json(
      { error: "Error al crear estudiante" },
      { status: 500 }
    );
  }
}

// DELETE - Eliminar estudiante
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID requerido" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Estudiante eliminado exitosamente",
    });
  } catch (error) {
    console.error("Error al eliminar estudiante:", error);
    return NextResponse.json(
      { error: "Error al eliminar estudiante" },
      { status: 500 }
    );
  }
}
