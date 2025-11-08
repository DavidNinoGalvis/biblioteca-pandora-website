import { motion } from "framer-motion";
import { Target, Timer, Zap, Star } from "lucide-react";

type StatsGridProps = {
  totalChallenges: number;
  avgTime: number;
  bestTime: number;
};

export default function StatsGrid({ totalChallenges, avgTime, bestTime }: StatsGridProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
    >
      {/* Total Challenges */}
      <motion.div
        whileHover={{ y: -5 }}
        className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blueSky/30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="bg-blueSky text-white rounded-full p-3">
            <Target className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black text-blueSky">
            {totalChallenges}
          </div>
        </div>
        <div className="font-bold text-gray-800">Retos completados</div>
        <div className="text-sm text-grayMuted mt-1">¡Sigue así!</div>
      </motion.div>

      {/* Average Time */}
      <motion.div
        whileHover={{ y: -5 }}
        className="card bg-gradient-to-br from-orange-50 to-white border-2 border-orangeAccent/30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="bg-orangeAccent text-white rounded-full p-3">
            <Timer className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black text-orangeAccent">
            {avgTime > 0 ? formatTime(avgTime) : "—"}
          </div>
        </div>
        <div className="font-bold text-gray-800">Tiempo promedio</div>
        <div className="text-sm text-grayMuted mt-1">Por reto</div>
      </motion.div>

      {/* Best Time */}
      <motion.div
        whileHover={{ y: -5 }}
        className="card bg-gradient-to-br from-green-50 to-white border-2 border-greenSuccess/30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="bg-greenSuccess text-white rounded-full p-3">
            <Zap className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black text-greenSuccess">
            {bestTime > 0 ? formatTime(bestTime) : "—"}
          </div>
        </div>
        <div className="font-bold text-gray-800">Mejor tiempo</div>
        <div className="text-sm text-grayMuted mt-1">¡Tu récord!</div>
      </motion.div>

      {/* Streak */}
      <motion.div
        whileHover={{ y: -5 }}
        className="card bg-gradient-to-br from-yellow-50 to-white border-2 border-yellowWarm"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="bg-gradient-to-br from-orangeAccent to-yellow-500 text-white rounded-full p-3">
            <Star className="w-6 h-6" />
          </div>
          <div className="text-4xl font-black text-orangeAccent">
            {totalChallenges > 0 ? "🔥" : "💤"}
          </div>
        </div>
        <div className="font-bold text-gray-800">Racha activa</div>
        <div className="text-sm text-grayMuted mt-1">
          {totalChallenges > 0 ? "¡Sigue practicando!" : "Empieza tu racha"}
        </div>
      </motion.div>
    </motion.section>
  );
}
