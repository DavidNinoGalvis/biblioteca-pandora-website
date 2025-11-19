import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

type ResultModalProps = {
  isCorrect: boolean;
  seconds: number;
  onContinue: () => void;
};

export default function ResultModal({
  isCorrect,
  seconds,
  onContinue,
}: ResultModalProps) {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <motion.div
      key="result-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center px-4"
    >
          <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-3xl shadow-[0_22px_60px_rgba(15,23,42,0.18)] p-7 text-center space-y-4"
          >
        {isCorrect ? (
          <>
            <div className="text-6xl md:text-7xl">
              <Trophy className="w-16 h-16 mx-auto text-greenSuccess" />
            </div>
            <h2 className="text-3xl font-black text-greenSuccess">¡Excelente!</h2>
            <p className="text-base md:text-lg text-gray-600">
              Completaste el reto en {formatTime(seconds)}
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl md:text-7xl">
              <Trophy className="w-16 h-16 mx-auto text-orangeAccent" />
            </div>
            <h2 className="text-3xl font-black text-orangeAccent">¡Sigue intentando!</h2>
            <p className="text-base md:text-lg text-gray-600">Lo importante es aprender</p>
          </>
        )}
      
      <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        onClick={onContinue}
          className="w-full px-6 py-4 rounded-2xl text-lg font-black shadow-lg bg-linear-to-r from-blueSky to-blueDeep text-white flex items-center justify-center gap-2 transition-transform duration-150"
      >
        <Trophy className="w-5 h-5 md:w-6 md:h-6" />
        Ver mi progreso
      </motion.button>
      </motion.div>
    </motion.div>
  );
}
