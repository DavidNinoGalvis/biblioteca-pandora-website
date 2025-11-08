import { motion } from "framer-motion";
import { BarChart3, Award, Calculator, BookOpen, Calendar, Clock } from "lucide-react";

type ChallengeRecord = {
  type: string;
  timeInSeconds: number;
  completedAt: string;
};

type RecentActivityProps = {
  challenges: ChallengeRecord[];
};

export default function RecentActivity({ challenges }: RecentActivityProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  const isEmpty = challenges.length === 0;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="card">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-blueSky to-blueDeep text-white rounded-full p-3">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-800">
            Actividad reciente
          </h2>
        </div>

        {isEmpty ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-grayMuted mx-auto mb-4 opacity-50" />
            <p className="text-grayMuted text-lg font-semibold mb-2">
              Aún no tienes retos completados
            </p>
            <p className="text-sm text-grayMuted">
              ¡Presiona "¡Nuevo Reto!" en la barra superior para empezar!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {challenges.slice(-5).reverse().map((challenge, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-soft border border-gray-200 hover:border-blueSky/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-full p-2 ${
                      challenge.type === "Matemáticas"
                        ? "bg-blue-100 text-blueSky"
                        : "bg-orange-100 text-orangeAccent"
                    }`}
                  >
                    {challenge.type === "Matemáticas" ? (
                      <Calculator className="w-5 h-5" />
                    ) : (
                      <BookOpen className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">
                      {challenge.type}
                    </div>
                    <div className="text-sm text-grayMuted flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      {new Date(challenge.completedAt).toLocaleDateString("es-ES")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Clock className="w-4 h-4 text-grayMuted" />
                  {formatTime(challenge.timeInSeconds)}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
