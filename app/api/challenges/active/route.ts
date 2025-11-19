import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";

// GET: Obtener el reto activo del usuario (si existe)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId es requerido" },
        { status: 400 }
      );
    }

    const activeChallenge = await prisma.activeChallenge.findUnique({
      where: { userId },
    });

    if (!activeChallenge) {
      return NextResponse.json({ activeChallenge: null });
    }

    // Calcular el tiempo transcurrido
    const elapsedSeconds = Math.floor(
      (Date.now() - activeChallenge.startedAt.getTime()) / 1000
    );

    return NextResponse.json({
      activeChallenge: {
        id: activeChallenge.id,
        type: activeChallenge.type,
        question: activeChallenge.question,
        options: activeChallenge.options,
        correctAnswer: activeChallenge.correctAnswer,
        startedAt: activeChallenge.startedAt.toISOString(),
        elapsedSeconds,
      },
    });
  } catch (error) {
    console.error("Error getting active challenge:", error);
    return NextResponse.json(
      { error: "Error al obtener el reto activo" },
      { status: 500 }
    );
  }
}

// POST: Asignar un nuevo reto al usuario
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, type, question, options, correctAnswer } = body;

    if (!userId || !type || !question || !options || correctAnswer === undefined) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Eliminar reto activo anterior si existe
    await prisma.activeChallenge.deleteMany({
      where: { userId },
    });

    // Crear nuevo reto activo
    const activeChallenge = await prisma.activeChallenge.create({
      data: {
        userId,
        type,
        question,
        options,
        correctAnswer,
      },
    });

    return NextResponse.json({
      success: true,
      activeChallenge: {
        id: activeChallenge.id,
        type: activeChallenge.type,
        question: activeChallenge.question,
        options: activeChallenge.options,
        correctAnswer: activeChallenge.correctAnswer,
        startedAt: activeChallenge.startedAt.toISOString(),
        elapsedSeconds: 0,
      },
    });
  } catch (error) {
    console.error("Error creating active challenge:", error);
    return NextResponse.json(
      { error: "Error al asignar el reto" },
      { status: 500 }
    );
  }
}

// DELETE: Eliminar el reto activo del usuario (cuando lo completa)
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId es requerido" },
        { status: 400 }
      );
    }

    await prisma.activeChallenge.deleteMany({
      where: { userId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting active challenge:", error);
    return NextResponse.json(
      { error: "Error al eliminar el reto activo" },
      { status: 500 }
    );
  }
}
