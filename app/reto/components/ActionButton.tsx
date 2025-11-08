import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

type ActionButtonProps = {
  showResult: boolean;
  selectedAnswer: number | null;
  onSubmit: () => void;
};

export default function ActionButton({ showResult, selectedAnswer, onSubmit }: ActionButtonProps) {
  if (showResult) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.button
        key="submit"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSubmit}
        disabled={selectedAnswer === null}
        className={`
          px-6 py-3 md:px-10 md:py-4 lg:px-12 lg:py-5 rounded-xl md:rounded-2xl text-lg md:text-xl lg:text-2xl font-black shadow-medium
          flex items-center gap-2 md:gap-3 mt-3 md:mt-4
          ${
            selectedAnswer === null
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blueSky to-blueDeep text-white"
          }
        `}
      >
        Enviar respuesta
        <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
      </motion.button>
    </AnimatePresence>
  );
}
