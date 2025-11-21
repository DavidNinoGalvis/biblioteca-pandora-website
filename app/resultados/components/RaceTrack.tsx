"use client";

import { motion } from "framer-motion";
import { Crown, Trophy, Star } from "lucide-react";

type LeaderboardEntry = {
  userId: string;
  nickname: string;
  totalPoints: number;
  rank: number;
  correctChallenges: number;
  totalChallenges: number;
  accuracy: number;
};

type Props = {
  entries: LeaderboardEntry[];
};

export default function RaceTrack({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600 mb-4">Aún no hay participantes en la carrera.</p>
        <p className="text-sm text-grayMuted">¡Completa retos para unirte a la carrera!</p>
      </div>
    );
  }

  // Calculate max points for positioning
  const maxPoints = Math.max(...entries.map(e => e.totalPoints), 100);
  
  // Car colors for different positions
  const carColors = [
    "from-yellow-400 to-yellow-600", // 1st - Gold
    "from-gray-300 to-gray-500", // 2nd - Silver
    "from-orange-400 to-orange-600", // 3rd - Bronze
    "from-blue-400 to-blue-600",
    "from-green-400 to-green-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
    "from-red-400 to-red-600",
    "from-indigo-400 to-indigo-600",
    "from-teal-400 to-teal-600",
  ];

  return (
    <div className="w-full space-y-4">
      {/* Finish Line */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border-2 border-dashed border-gray-400">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-black text-gray-700">META</span>
        </div>
        <div className="flex-1 h-1 bg-linear-to-r from-transparent via-gray-300 to-transparent"></div>
      </div>

      {/* Race tracks */}
      <div className="space-y-3">
        {entries.slice(0, 10).map((entry, index) => {
          const progress = (entry.totalPoints / maxPoints) * 100;
          const color = carColors[index] || "from-gray-400 to-gray-600";
          
          return (
            <div key={entry.userId} className="relative">
              {/* Track */}
              <div className="relative bg-linear-to-r from-gray-100 via-gray-50 to-white rounded-2xl border-2 border-gray-200 overflow-hidden shadow-sm">
                {/* Track lines (asphalt effect) */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/2 -translate-y-1/2 w-full h-1 border-t-2 border-dashed border-gray-400"></div>
                </div>

                {/* Progress bar background */}
                <div className="relative h-20 flex items-center px-4">
                  {/* Position badge */}
                  <div className="absolute left-3 z-10">
                    {index === 0 ? (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg">
                        <Crown className="w-5 h-5 text-white" />
                      </div>
                    ) : index === 1 ? (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                    ) : index === 2 ? (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-blueSky to-blue-600 flex items-center justify-center shadow-md">
                        <span className="text-white font-black text-sm">{index + 1}</span>
                      </div>
                    )}
                  </div>

                  {/* Car with animation */}
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: `${Math.min(progress, 100)}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 15, duration: 1 }}
                    className="absolute left-16 -translate-x-1/2"
                    style={{ zIndex: 20 }}
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
                      className="relative"
                    >
                      {/* Car body */}
                      <div className={`w-14 h-10 bg-linear-to-br ${color} rounded-lg shadow-lg relative`}>
                        {/* Car top (cabin) */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-8 h-6 bg-linear-to-br from-blue-200 to-blue-400 rounded-t-lg opacity-80"></div>
                        
                        {/* Headlights */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-2 bg-white rounded-l"></div>
                        
                        {/* Wheels */}
                        <div className="absolute -bottom-1 left-1 w-3 h-3 bg-gray-900 rounded-full border-2 border-gray-600"></div>
                        <div className="absolute -bottom-1 right-1 w-3 h-3 bg-gray-900 rounded-full border-2 border-gray-600"></div>
                        
                        {/* Speed lines when moving */}
                        {entry.totalPoints > 0 && (
                          <motion.div
                            animate={{ opacity: [0.3, 0.6, 0.3], x: [-8, -12, -8] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full"
                          >
                            <div className="flex flex-col gap-1">
                              <div className="w-4 h-0.5 bg-gray-400 rounded"></div>
                              <div className="w-3 h-0.5 bg-gray-400 rounded"></div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Player info (right side) */}
                  <div className="ml-auto flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                    <div className="text-right">
                      <div className="font-black text-base md:text-lg text-gray-800">{entry.nickname}</div>
                      <div className="text-xs text-gray-500">{entry.correctChallenges}/{entry.totalChallenges} correctos</div>
                    </div>
                    <div className="flex items-center gap-1.5 bg-linear-to-br from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow-md">
                      <Trophy className="w-4 h-4" />
                      <span className="font-black text-lg">{entry.totalPoints}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkpoint indicators */}
              <div className="absolute top-0 left-0 right-0 h-full pointer-events-none">
                {[25, 50, 75].map((checkpoint) => (
                  <div
                    key={checkpoint}
                    className="absolute top-0 bottom-0 w-px bg-gray-300"
                    style={{ left: `${checkpoint}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Points legend */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
          <span>Checkpoints cada 25% del máximo</span>
        </div>
      </div>
    </div>
  );
}
