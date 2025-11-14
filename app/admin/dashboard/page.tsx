import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdmin } from "../../../lib/adminAuth";
import { prisma } from "../../../lib/prisma";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const verified = token ? verifyAdmin(token) : null;
  if (!verified) {
    redirect('/admin/login');
  }

  // Gather stats - usando el nuevo schema
  const totalStudents = await prisma.user.count({ where: { role: 'student' } });
  const totalChallenges = await prisma.completedChallenge.count();
  const correctChallenges = await prisma.completedChallenge.count({ where: { isCorrect: true } });

  const avgTimeAgg = await prisma.completedChallenge.aggregate({
    _avg: { timeInSeconds: true },
  });

  const avgTime = Math.round((avgTimeAgg._avg.timeInSeconds ?? 0) as number);

  return (
    <main className="flex min-h-[calc(100vh-72px)] w-full max-w-6xl mx-auto flex-col gap-8 py-12 px-6">
      <header>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Estadísticas del grupo</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Estudiantes totales</div>
          <div className="text-2xl font-semibold">{totalStudents}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Retos completados</div>
          <div className="text-2xl font-semibold">{totalChallenges}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Retos correctos</div>
          <div className="text-2xl font-semibold">{correctChallenges}</div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Tasa de acierto</div>
          <div className="text-2xl font-semibold">
            {totalChallenges > 0 ? ((correctChallenges / totalChallenges) * 100).toFixed(1) : 0}%
          </div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Tiempo promedio (s)</div>
          <div className="text-2xl font-semibold">{avgTime}</div>
        </div>
      </section>

      <footer className="mt-6">
        <form action="/api/admin/logout" method="post">
          <button type="submit" className="px-3 py-2 bg-red-600 text-white rounded">Cerrar sesión</button>
        </form>
      </footer>
    </main>
  );
}
