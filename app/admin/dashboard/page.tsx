import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyAdmin } from "../../../lib/adminAuth";
import { prisma } from "../../../lib/prisma";
import StudentManager from "./StudentManager";
import LogoutButton from "./LogoutButton";
import ResetPointsButton from "./ResetPointsButton";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  const verified = token ? verifyAdmin(token) : null;
  if (!verified) {
    redirect("/admin/login");
  }

  // Gather stats - usando el nuevo schema
  const totalStudents = await prisma.user.count({ where: { role: "student" } });
  const totalDesescolarizados = await prisma.user.count({
    where: { role: "student", desescolarizado: true },
  });
  const totalChallenges = await prisma.completedChallenge.count();
  const correctChallenges = await prisma.completedChallenge.count({
    where: { isCorrect: true },
  });

  const avgTimeAgg = await prisma.completedChallenge.aggregate({
    _avg: { timeInSeconds: true },
  });

  const avgTime = Math.round((avgTimeAgg._avg.timeInSeconds ?? 0) as number);
  const totalActiveStudents = totalStudents - totalDesescolarizados;

  // Obtener lista de estudiantes
  const students = await prisma.user.findMany({
    where: { role: "student" },
    select: {
      id: true,
      nickname: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      desescolarizado: true,
      hidden: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 pt-15 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-800">
              Panel de Administración
            </h1>
            <p className="text-gray-600 mt-1">
              Gestiona estudiantes y visualiza estadísticas
            </p>
          </div>
          <div className="flex gap-3">
            <ResetPointsButton />
            <LogoutButton />
          </div>
        </div>

        {/* Estadísticas */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blueSky">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Estudiantes activos
            </div>
            <div className="text-4xl font-black text-blueSky">
              {totalActiveStudents}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Conectados a colegios o sedes
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-400">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Estudiantes desescolarizados
            </div>
            <div className="text-4xl font-black text-amber-500">
              {totalDesescolarizados}
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Estadísticas separadas
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-teal-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Total de estudiantes
            </div>
            <div className="text-4xl font-black text-teal-600">
              {totalStudents}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Retos completados
            </div>
            <div className="text-4xl font-black text-green-600">
              {totalChallenges}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-orange-500">
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
              Tasa de acierto
            </div>
            <div className="text-3xl font-black text-orange-600">
              {totalChallenges > 0
                ? ((correctChallenges / totalChallenges) * 100).toFixed(1)
                : 0}
              %
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Tiempo promedio: {avgTime}s
            </div>
          </div>
        </section>

        {/* Gestión de estudiantes */}
        <StudentManager
          initialStudents={students.map(
            (s: {
              id: string;
              nickname: string;
              firstName?: string | null;
              lastName?: string | null;
              createdAt: Date;
              desescolarizado?: boolean;
              hidden?: boolean;
            }) => ({
              id: s.id,
              nickname: s.nickname,
              firstName: s.firstName,
              lastName: s.lastName,
              createdAt: s.createdAt.toISOString(),
              desescolarizado: !!s.desescolarizado,
              hidden: !!s.hidden,
            })
          )}
        />
      </div>
    </main>
  );
}
