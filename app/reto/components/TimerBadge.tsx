import { motion } from "framer-motion";
import { Timer } from "lucide-react";

type TimerBadgeProps = {
  seconds: number;
};

export default function TimerBadge({ seconds }: TimerBadgeProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-36 right-3 md:right-6 lg:right-8 bg-white rounded-full shadow-medium px-4 py-2 md:px-6 md:py-3 border-2 border-blueSky/30 z-30"
    >
      <div className="flex items-center gap-2">
        <Timer className="w-4 h-4 md:w-5 md:h-5 text-blueSky" />
        <span className="text-lg md:text-2xl font-black text-gray-800">{formatTime(seconds)}</span>
      </div>
    </motion.div>
  );
}
