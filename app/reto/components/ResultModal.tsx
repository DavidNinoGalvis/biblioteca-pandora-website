import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

type ResultModalProps = {
  isCorrect: boolean;
  seconds: number;
  onContinue: () => void;
};

export default function ResultModal({ isCorrect, seconds, onContinue }: ResultModalProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center mt-3 md:mt-4"
    >
      {isCorrect ? (
        <div className="mb-3 md:mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 md:mb-3"
          >
            🎉
          </motion.div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-greenSuccess mb-1 md:mb-2">
            ¡Excelente!
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Completaste el reto en {formatTime(seconds)}
          </p>
        </div>
      ) : (
        <div className="mb-3 md:mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-2 md:mb-3"
          >
            💪
          </motion.div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-orangeAccent mb-1 md:mb-2">
            ¡Sigue intentando!
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-600">
            Lo importante es aprender
          </p>
        </div>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
        className="px-6 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl lg:text-2xl font-black shadow-medium bg-gradient-to-r from-blueSky to-blueDeep text-white flex items-center gap-2 md:gap-3 mx-auto"
      >
        <Trophy className="w-5 h-5 md:w-6 md:h-6" />
        Ver mi progreso
      </motion.button>
    </motion.div>
  );
}
