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
        firstName: true,
        lastName: true,
        createdAt: true,
        desescolarizado: true,
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
    const {
      nickname: rawNickname,
      pin,
      desescolarizado,
      firstName,
      lastName,
    } = await request.json();

    if (!pin) {
      return NextResponse.json(
        { error: "El PIN es requerido" },
        { status: 400 }
      );
    }

    if (pin.length !== 4 || !/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { error: "El PIN debe tener exactamente 4 dígitos" },
        { status: 400 }
      );
    }

    // Generador simple de apodos aleatorios
    const adjectives = [
      "Rayo",
      "Valiente",
      "Sabio",
      "Luna",
      "Fiero",
      "Traveso",
      "Brisa",
      "Ágil",
      "Zafiro",
      "Brillante",
    ];
    const animals = [
      "Búho",
      "Zorro",
      "Tortuga",
      "Cóndor",
      "León",
      "Buho",
      "Búho",
      "Gato",
      "Lobo",
      "Águila",
    ];

    const generateNickname = () => {
      const a = adjectives[Math.floor(Math.random() * adjectives.length)];
      const b = animals[Math.floor(Math.random() * animals.length)];
      const num = Math.floor(Math.random() * 90) + 10; // 10-99
      return `${a}${b}${num}`;
    };

    let nickname =
      rawNickname && rawNickname.trim()
        ? rawNickname.trim()
        : generateNickname();

    // Asegurar unicidad (reintentos limitados)
    let attempt = 0;
    while (attempt < 6) {
      const existing = await prisma.user.findUnique({ where: { nickname } });
      if (!existing) break;
      nickname = generateNickname();
      attempt++;
    }

    // Encriptar PIN
    const hashedPin = await hashPin(pin);

    // Crear estudiante incluyendo campo desescolarizado (si viene)
    const student = await prisma.user.create({
      data: {
        nickname,
        pin: hashedPin,
        role: "student",
        desescolarizado: !!desescolarizado,
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
      },
      select: {
        id: true,
        nickname: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        desescolarizado: true,
      },
    });

    return NextResponse.json({
      success: true,
      student,
      message: "Estudiante creado exitosamente",
      secretMessage: `Apodo secreto, ¡No le digas a nadie! ${student.nickname}`,
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
