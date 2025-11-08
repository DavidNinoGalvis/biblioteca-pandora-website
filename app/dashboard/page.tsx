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
  nickname: string;
  pin: string;
};

type ChallengeRecord = {
  type: string;
  timeInSeconds: number;
  completedAt: string;
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<ChallengeRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bp_user");
      if (!raw) {
        router.push("/");
        return;
      }
      setUser(JSON.parse(raw));

      const challengesRaw = localStorage.getItem("bp_challenges");
      if (challengesRaw) {
        setChallenges(JSON.parse(challengesRaw));
      }
    } catch (e) {
      router.push("/");
    } finally {
      setLoading(false);
    }
  }, [router]);

  if (loading) return <LoadingState />;
  if (!user) return null;

  // Calculate stats
  const totalChallenges = challenges.length;
  const mathChallenges = challenges.filter((c) => c.type === "Matemáticas").length;
  const readingChallenges = challenges.filter((c) => c.type === "Lectura crítica").length;

  const avgTime =
    totalChallenges > 0
      ? Math.round(challenges.reduce((acc, c) => acc + c.timeInSeconds, 0) / totalChallenges)
      : 0;

  const bestTime =
    totalChallenges > 0
      ? Math.min(...challenges.map((c) => c.timeInSeconds))
      : 0;

  return (
    <main className="flex min-h-[calc(100vh-72px)] w-full max-w-6xl mx-auto flex-col gap-8 py-12 px-6">
      <DashboardHeader nickname={user.nickname} />
      
      <StatsGrid 
        totalChallenges={totalChallenges}
        avgTime={avgTime}
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
