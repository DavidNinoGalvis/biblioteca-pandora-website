import { motion } from "framer-motion";
import { Target, Star, Zap } from "lucide-react";

type StatsGridProps = {
  totalChallenges: number;
  totalPoints: number;
  bestTime: number;
};

export default function StatsGrid({ totalChallenges, totalPoints, bestTime }: StatsGridProps) {
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
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
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

      {/* Total Points */}
      <motion.div
        whileHover={{ y: -5 }}
        className="card bg-gradient-to-br from-yellow-50 to-white border-2 border-yellow-400/30"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="bg-yellow-400 text-white rounded-full p-3">
            <Star className="w-6 h-6" fill="currentColor" />
          </div>
          <div className="text-4xl font-black text-yellow-600">
            {totalPoints}
          </div>
        </div>
        <div className="font-bold text-gray-800">Puntos totales</div>
        <div className="text-sm text-grayMuted mt-1">¡Sigue sumando!</div>
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

      {/* Streak removed per request */}
    </motion.section>
  );
}
