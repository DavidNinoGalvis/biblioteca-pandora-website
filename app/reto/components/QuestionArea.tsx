import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";

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
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    // Load voices first (they might not be ready immediately)
    const loadVoices = () => {
      window.speechSynthesis.getVoices();
    };
    
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    // Auto-read question when component mounts or challenge changes
    const timer = setTimeout(() => readQuestion(), 300);
    return () => clearTimeout(timer);
  }, [challenge.question]);

  const readQuestion = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(challenge.question);
    utterance.lang = 'es-ES';
    utterance.rate = 0.85; // Slower for better clarity
    utterance.pitch = 1.1; // Slightly higher pitch for female voice
    utterance.volume = 1;
    
    // Try to select a female Spanish voice
    const voices = window.speechSynthesis.getVoices();
    const femaleSpanishVoice = voices.find(voice => 
      (voice.lang.startsWith('es') || voice.lang.startsWith('es-')) && 
      (voice.name.toLowerCase().includes('female') || 
       voice.name.toLowerCase().includes('mujer') ||
       voice.name.toLowerCase().includes('mónica') ||
       voice.name.toLowerCase().includes('paulina') ||
       voice.name.toLowerCase().includes('luciana') ||
       voice.name.toLowerCase().includes('sabina'))
    ) || voices.find(voice => 
      voice.lang.startsWith('es') && !voice.name.toLowerCase().includes('male')
    );
    
    if (femaleSpanishVoice) {
      utterance.voice = femaleSpanishVoice;
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeech = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      readQuestion();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 }}
      className="w-full max-w-3xl mx-auto flex flex-col items-center justify-center"
    >
      <div className="bg-white rounded-[28px] shadow-[0_18px_45px_rgba(15,23,42,0.08)] p-6 md:p-8 border border-blueSky/10 w-full">
        <div className="flex items-start gap-3 mb-5">
          <h1 className="flex-1 text-2xl md:text-3xl font-black text-gray-900 text-center leading-tight">
            {challenge.question}
          </h1>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSpeech}
            className={`shrink-0 p-3 rounded-full transition-colors ${
              isSpeaking 
                ? 'bg-blueSky text-white' 
                : 'bg-gray-100 text-blueSky hover:bg-blueSky hover:text-white'
            }`}
            title={isSpeaking ? "Detener lectura" : "Leer pregunta"}
          >
            <Volume2 className={`w-6 h-6 ${isSpeaking ? 'animate-pulse' : ''}`} />
          </motion.button>
        </div>

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
