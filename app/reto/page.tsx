"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  TimerBadge,
  ChallengeTypeBadge,
  QuestionArea,
  ResultModal,
  LoadingState,
} from "./components";
import {
  Challenge,
  ChallengeType,
  challengeTypes,
  getRandomChallenge,
} from "./challenges";

type User = {
  id: string;
  nickname: string;
  role?: string;
};

const CHALLENGE_KEY = "bp_current_challenge";
const CHALLENGE_TYPE_KEY = "bp_current_challenge_type";

export default function RetoPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const loadChallenge = async () => {
      try {
        const raw = localStorage.getItem("bp_user");
        if (!raw) {
          router.push("/");
          return;
        }
        const parsedUser = JSON.parse(raw);
        setUser(parsedUser);

        // Try to load active challenge from database
        const response = await fetch(
          `/api/challenges/active?userId=${parsedUser.id}`
        );
        const data = await response.json();

        if (data.activeChallenge) {
          // User has an active challenge in the database
          const activeChallenge = data.activeChallenge;
          const challengeObj: Challenge = {
            type: activeChallenge.type as ChallengeType,
            question: activeChallenge.question,
            options: activeChallenge.options,
            correctAnswer: activeChallenge.correctAnswer,
          };

          setChallenge(challengeObj);
          setStartTime(new Date(activeChallenge.startedAt));
          setSeconds(activeChallenge.elapsedSeconds);
          setTimerRunning(true);

          // Also update localStorage
          localStorage.setItem(CHALLENGE_TYPE_KEY, activeChallenge.type);
          localStorage.setItem(CHALLENGE_KEY, JSON.stringify(challengeObj));
          return;
        }

        // No active challenge in DB, try localStorage
        const storedChallengeRaw = localStorage.getItem(CHALLENGE_KEY);
        if (storedChallengeRaw) {
          const storedChallenge = JSON.parse(storedChallengeRaw) as Challenge;
          setChallenge(storedChallenge);
          setTimerRunning(true);
          return;
        }

        // No challenge found, redirect to dashboard
        router.push("/dashboard");
      } catch (e) {
        console.error("Error loading challenge:", e);
        router.push("/");
      }
    };

    loadChallenge();
  }, [router]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        if (startTime) {
          // Calculate elapsed time from database start time
          const elapsed = Math.floor((Date.now() - startTime.getTime()) / 1000);
          setSeconds(elapsed);
        } else {
          // Fallback to incrementing
          setSeconds((s) => s + 1);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, startTime]);

  const handleAnswerSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    handleSubmit(index);
  };

  const handleSubmit = async (answerIndex?: number) => {
    const resolvedAnswer =
      typeof answerIndex === "number" ? answerIndex : selectedAnswer;
    if (resolvedAnswer === null || !challenge || !user || showResult) return;
    
    setTimerRunning(false);
    const correct = resolvedAnswer === challenge.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    setSelectedAnswer(resolvedAnswer);

    // Save challenge to database via API
    try {
      // Mapear el tipo de challenge a los tipos de la base de datos
      const typeMapping: { [key: string]: string } = {
        Matemáticas: "matematicas",
        "Lectura crítica": "lectura",
      };
      
      const mappedType =
        typeMapping[challenge.type] || challenge.type.toLowerCase();

      const response = await fetch("/api/challenges/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          type: mappedType,
          question: challenge.question,
          timeInSeconds: seconds,
          isCorrect: correct,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Error saving challenge to database:",
          data.error || "Unknown error"
        );
      } else {
        console.log("Challenge saved successfully:", data);
        
        // Delete active challenge from database
        await fetch(`/api/challenges/active?userId=${user.id}`, {
          method: "DELETE",
        });
      }
    } catch (e) {
      console.error("Error saving challenge:", e);
    }
  };

  const handleContinue = () => {
    localStorage.removeItem(CHALLENGE_KEY);
    localStorage.removeItem(CHALLENGE_TYPE_KEY);
    router.push("/dashboard");
  };

  if (!user || !challenge) {
    return <LoadingState />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-linear-to-br from-blue-50 via-white to-orange-50">
      <button
        onClick={() => router.push("/dashboard")}
        className="fixed left-4 top-20 md:top-32 z-50 inline-flex items-center gap-2 bg-white/95 text-gray-800 px-3 py-2 rounded-lg shadow-sm hover:shadow-md transition"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver
      </button>

      <TimerBadge seconds={seconds} />
      
      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-10 py-10">
      <ChallengeTypeBadge type={challenge.type} />

      <QuestionArea
        challenge={challenge}
        selectedAnswer={selectedAnswer}
        showResult={showResult}
        isCorrect={isCorrect}
        onAnswerSelect={handleAnswerSelect}
      />
      </div>

      {showResult && (
        <ResultModal
          isCorrect={isCorrect}
          seconds={seconds}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
