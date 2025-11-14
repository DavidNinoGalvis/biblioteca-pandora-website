import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { comparePin } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nickname, pin } = body;

    // Validar datos requeridos
    if (!nickname || !pin) {
      return NextResponse.json(
        { error: 'Nickname y PIN son requeridos' },
        { status: 400 }
      );
    }

    // Validar formato del PIN
    if (!/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { error: 'El PIN debe tener 4 dígitos' },
        { status: 400 }
      );
    }

    // Buscar usuario por nickname
    const user = await prisma.user.findUnique({
      where: { nickname },
      select: {
        id: true,
        nickname: true,
        pin: true,
        role: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Usuario no encontrado' },
        { status: 404 }
      );
    }

    // Verificar que sea un estudiante
    if (user.role !== 'student') {
      return NextResponse.json(
        { error: 'Credenciales inválidas' },
        { status: 401 }
      );
    }

    // Verificar PIN
    const isValidPin = await comparePin(pin, user.pin);
    if (!isValidPin) {
      return NextResponse.json(
        { error: 'PIN incorrecto' },
        { status: 401 }
      );
    }

    // Login exitoso
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        nickname: user.nickname,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Error en login de estudiante:', error);
    return NextResponse.json(
      { error: 'Error al iniciar sesión' },
      { status: 500 }
    );
  }
}
