import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week'; // week, month, all

    let weekStart: Date | undefined;

    if (period === 'week') {
      // Calcular inicio de la semana actual (lunes)
      const now = new Date();
      const dayOfWeek = now.getDay();
      const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      weekStart = new Date(now.setDate(diff));
      weekStart.setHours(0, 0, 0, 0);
    } else if (period === 'month') {
      // Inicio del mes actual
      const now = new Date();
      weekStart = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    // Obtener todos los usuarios estudiantes
    const students = await prisma.user.findMany({
      where: { role: 'student' },
      select: {
        id: true,
        nickname: true,
      },
    });

    // Obtener los retos completados según el período
    const where: any = {};
    if (weekStart) {
      where.weekStart = { gte: weekStart };
    }

    const challenges = await prisma.completedChallenge.findMany({
      where,
      select: {
        userId: true,
        points: true,
        isCorrect: true,
        type: true,
      },
    });

    // Calcular estadísticas por usuario
    const leaderboard = students.map((student: { id: string; nickname: string }) => {
      const userChallenges = challenges.filter((c: any) => c.userId === student.id);
      const totalPoints = userChallenges.reduce((sum: number, c: any) => sum + c.points, 0);
      const correctChallenges = userChallenges.filter((c: any) => c.isCorrect).length;
      const totalChallenges = userChallenges.length;

      // Contar por tipo de reto
      const challengesByType: { [key: string]: number } = {};
      userChallenges.forEach((c: any) => {
        challengesByType[c.type] = (challengesByType[c.type] || 0) + 1;
      });

      return {
        userId: student.id,
        nickname: student.nickname,
        totalPoints,
        correctChallenges,
        totalChallenges,
        accuracy: totalChallenges > 0 ? (correctChallenges / totalChallenges) * 100 : 0,
        challengesByType,
      };
    });

    // Ordenar por puntos (de mayor a menor)
    leaderboard.sort((a: any, b: any) => b.totalPoints - a.totalPoints);

    // Agregar posición/ranking
    const rankedLeaderboard = leaderboard.map((entry: any, index: number) => ({
      ...entry,
      rank: index + 1,
    }));

    return NextResponse.json({
      period,
      weekStart: weekStart?.toISOString(),
      leaderboard: rankedLeaderboard,
    });
  } catch (error) {
    console.error('Error obteniendo leaderboard:', error);
    return NextResponse.json(
      { error: 'Error al obtener el leaderboard' },
      { status: 500 }
    );
  }
}
