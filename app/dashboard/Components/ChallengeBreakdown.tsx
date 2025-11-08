import { motion } from "framer-motion";
import { Calculator, BookOpen } from "lucide-react";

type ChallengeBreakdownProps = {
  mathChallenges: number;
  readingChallenges: number;
  totalChallenges: number;
};

export default function ChallengeBreakdown({
  mathChallenges,
  readingChallenges,
  totalChallenges,
}: ChallengeBreakdownProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="grid gap-6 md:grid-cols-2"
    >
      {/* Math Stats */}
      <div className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blueSky/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-blueSky text-white rounded-full p-3">
            <Calculator className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-blueSky">Matemáticas</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Retos completados</span>
            <span className="font-bold text-2xl text-blueSky">
              {mathChallenges}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-blueSky h-full rounded-full transition-all duration-500"
              style={{
                width: `${totalChallenges > 0 ? (mathChallenges / totalChallenges) * 100 : 0}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-grayMuted">
            {totalChallenges > 0
              ? `${Math.round((mathChallenges / totalChallenges) * 100)}% de tus retos`
              : "Aún no has completado retos"}
          </p>
        </div>
      </div>

      {/* Reading Stats */}
      <div className="card bg-gradient-to-br from-orange-50 to-white border-2 border-orangeAccent/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-orangeAccent text-white rounded-full p-3">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-orangeAccent">
            Lectura crítica
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Retos completados</span>
            <span className="font-bold text-2xl text-orangeAccent">
              {readingChallenges}
            </span>
          </div>
          <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-orangeAccent h-full rounded-full transition-all duration-500"
              style={{
                width: `${totalChallenges > 0 ? (readingChallenges / totalChallenges) * 100 : 0}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-grayMuted">
            {totalChallenges > 0
              ? `${Math.round((readingChallenges / totalChallenges) * 100)}% de tus retos`
              : "Aún no has completado retos"}
          </p>
        </div>
      </div>
    </motion.section>
  );
}
