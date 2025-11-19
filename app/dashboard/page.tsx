"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DashboardHeader,
  StatsGrid,
  ChallengeBreakdown,
  RecentActivity,
  LoadingState,
} from "./Components";

type User = {
  id: string;
  nickname: string;
  role?: string;
};

type ChallengeRecord = {
  type: string;
  timeInSeconds: number;
  completedAt: string;
  points?: number;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<ChallengeRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const normalizeChallengeType = (type: string) => {
    const normalized = type.toLowerCase();
    if (normalized.startsWith("mat")) return "Matemáticas";
    if (normalized.startsWith("lect")) return "Lectura crítica";
    return type;
  };

  const fetchChallenges = async (userId: string, signal?: AbortSignal) => {
    try {
      setErrorMessage(null);
      const response = await fetch(
        `/api/challenges/complete?userId=${userId}`,
        {
          method: "GET",
          cache: "no-store",
          signal,
        }
      );

      if (!response.ok) {
        throw new Error("No se pudieron obtener los retos");
      }

      const payload = await response.json();
      const normalized: ChallengeRecord[] = (payload.challenges || []).map(
        (challenge: any) => ({
          type: normalizeChallengeType(challenge.type ?? ""),
          timeInSeconds: challenge.timeInSeconds ?? 0,
          completedAt: challenge.completedAt,
          points: challenge.points ?? 0,
        })
      );

      setChallenges(normalized);
      localStorage.setItem("bp_challenges", JSON.stringify(normalized));
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      console.error("Error fetching challenges:", error);
      setErrorMessage(
        "No pudimos actualizar tus estadísticas. Mostramos la información guardada."
      );

      const cached = localStorage.getItem("bp_challenges");
      if (cached) {
        setChallenges(JSON.parse(cached));
      }
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const bootstrap = async () => {
      try {
        const raw = localStorage.getItem("bp_user");
        if (!raw) {
          router.push("/");
          return;
        }

        const parsedUser: User = JSON.parse(raw);
        if (!isMounted) return;
        setUser(parsedUser);

        await fetchChallenges(parsedUser.id, controller.signal);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        console.error("Error loading dashboard data:", e);
        router.push("/");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    bootstrap();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [router]);

  if (loading) return <LoadingState />;
  if (!user) return null;

  // Calculate stats
  const totalChallenges = challenges.length;
  const mathChallenges = challenges.filter(
    (c) => c.type === "Matemáticas"
  ).length;
  const readingChallenges = challenges.filter(
    (c) => c.type === "Lectura crítica"
  ).length;

  const totalPoints = challenges.reduce((acc, c) => acc + (c.points ?? 0), 0);

  const bestTime =
    totalChallenges > 0
      ? Math.min(...challenges.map((c) => c.timeInSeconds))
      : 0;

  return (
    <main className="flex min-h-[calc(100vh-72px)] w-full max-w-6xl mx-auto flex-col gap-8 py-12 px-6">
      <DashboardHeader nickname={user.nickname} />

      {errorMessage && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 text-sm font-semibold px-4 py-3">
          {errorMessage}
        </div>
      )}

      <StatsGrid
        totalChallenges={totalChallenges}
        totalPoints={totalPoints}
        bestTime={bestTime}
      />

      <ChallengeBreakdown
        mathChallenges={mathChallenges}
        readingChallenges={readingChallenges}
        totalChallenges={totalChallenges}
      />

      <RecentActivity challenges={challenges} />
    </main>
  );
}
