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
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center"
    >
      <div className="bg-white rounded-[28px] shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-6 md:p-8 border border-blueSky/10 w-full">
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 text-center leading-tight mb-5">
          {challenge.question}
        </h1>

        <div className="flex flex-col gap-3">
          {challenge.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: showResult ? 1 : 1.01 }}
              whileTap={{ scale: showResult ? 1 : 0.99 }}
              onClick={() => onAnswerSelect(index)}
              disabled={showResult}
              className={`
                relative p-4 rounded-2xl text-lg md:text-xl font-extrabold transition-all duration-200
                ${
                  showResult && index === challenge.correctAnswer
                    ? "bg-greenSuccess text-white shadow-lg"
                    : showResult && index === selectedAnswer && !isCorrect
                    ? "bg-redDanger text-white shadow-lg"
                    : selectedAnswer === index
                    ? "bg-blueSky text-white shadow-lg"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200"
                }
                ${showResult ? "cursor-default" : "cursor-pointer"}
              `}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="flex-1 text-left">{option}</span>
                {showResult && index === challenge.correctAnswer && (
                  <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7" />
                )}
                {showResult && index === selectedAnswer && !isCorrect && (
                  <XCircle className="w-6 h-6 md:w-7 md:h-7" />
                )}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
