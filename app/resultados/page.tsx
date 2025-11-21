"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CountdownBadge, RaceTrack } from "./components";

type LeaderboardEntry = {
  userId: string;
  nickname: string;
  totalPoints: number;
  rank: number;
  correctChallenges: number;
  totalChallenges: number;
  accuracy: number;
};

function getNextSundayMidnight(now = new Date()) {
  const daysAhead = (7 - now.getDay()) % 7 || 7; // always next Sunday (not today)
  const next = new Date(now);
  next.setDate(now.getDate() + daysAhead);
  next.setHours(0, 0, 0, 0);
  return next;
}

function getLastSundayMidnight(now = new Date()) {
  const daysBack = now.getDay(); // 0 = Sunday
  const last = new Date(now);
  last.setDate(now.getDate() - daysBack);
  last.setHours(0, 0, 0, 0);
  return last;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
  const days = Math.floor(diff / 1000 / 60 / 60 / 24);

  return { days, hours, minutes, seconds, remainingMs: diff };
}

export default function ResultadosPage() {
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const nextSunday = useMemo(() => getNextSundayMidnight(), []);
  const lastSunday = useMemo(() => getLastSundayMidnight(), []);
  const countdown = useCountdown(nextSunday);

  useEffect(() => {
    // Load leaderboard from API
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard?period=week');
        if (response.ok) {
          const data = await response.json();
          setLeaderboard(data.leaderboard || []);
        }
      } catch (e) {
        console.error("Error loading leaderboard:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
    
    // Refresh leaderboard every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const addSample = () => {
    // This function is no longer needed as we're using the database
    console.log("Sample data functionality removed - using database");
  };

  return (
    <div className="min-h-screen pt-32 px-6 md:px-8 lg:px-12 bg-linear-to-br from-blue-50 via-white to-orange-50 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-blueDeep">Carrera de Ganadores</h1>
            <p className="text-sm text-gray-600">Los carritos avanzan según los puntos — se reinicia cada domingo</p>
          </div>

          <div>
            {/* Countdown component */}
            <CountdownBadge days={countdown.days} hours={countdown.hours} minutes={countdown.minutes} seconds={countdown.seconds} />
          </div>
        </div>

        <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
          <RaceTrack entries={leaderboard} />
        </div>

        <div className="mt-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg bg-white border-2 border-gray-200 text-gray-800 hover:shadow-md hover:bg-gray-50 text-lg font-medium transition-all"
          >
            Volver
          </button>
        </div>
      </div>
    </div>
  );
}
