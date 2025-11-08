import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

type Challenge = {
  type: "Matemáticas" | "Lectura crítica";
  question: string;
  options: string[];
  correctAnswer: number;
};

type QuestionAreaProps = {
  challenge: Challenge;
  selectedAnswer: number | null;
  showResult: boolean;
  isCorrect: boolean;
  onAnswerSelect: (index: number) => void;
};

export default function QuestionArea({
  challenge,
  selectedAnswer,
  showResult,
  isCorrect,
  onAnswerSelect,
}: QuestionAreaProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="w-full max-w-3xl lg:max-w-5xl xl:max-w-6xl flex-1 flex flex-col"
    >
      <div className="bg-white rounded-xl md:rounded-2xl shadow-medium p-4 md:p-6 lg:p-8 xl:p-10 h-full flex flex-col justify-center border-2 md:border-4 border-blueSky/20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-800 text-center leading-tight mb-4 md:mb-6 lg:mb-8">
          {challenge.question}
        </h1>

        {/* Options */}
        <div className="grid gap-2 md:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2">
          {challenge.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: showResult ? 1 : 1.02 }}
              whileTap={{ scale: showResult ? 1 : 0.98 }}
              onClick={() => onAnswerSelect(index)}
              disabled={showResult}
              className={`
                relative p-3 md:p-4 lg:p-5 xl:p-6 rounded-xl md:rounded-2xl text-base sm:text-lg md:text-xl lg:text-2xl font-bold transition-all
                ${
                  showResult && index === challenge.correctAnswer
                    ? "bg-greenSuccess text-white shadow-medium"
                    : showResult && index === selectedAnswer && !isCorrect
                    ? "bg-redDanger text-white shadow-medium"
                    : selectedAnswer === index
                    ? "bg-blueSky text-white shadow-medium"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 border-2 border-gray-300"
                }
                ${showResult ? "cursor-default" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1 text-left">{option}</span>
                {showResult && index === challenge.correctAnswer && (
                  <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-2 md:ml-4" />
                )}
                {showResult && index === selectedAnswer && !isCorrect && (
                  <XCircle className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 ml-2 md:ml-4" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
