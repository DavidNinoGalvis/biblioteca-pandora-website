"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Rocket,
  Star,
  BookOpen,
  Trophy,
  Zap,
  Calculator,
  Users,
  UserPlus,
  Target,
  Award,
} from "lucide-react";
import LoginModal from "./Components/LoginModal";

type User = {
  id: string;
  nickname: string;
  role?: string;
};

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("bp_user");
      if (raw) {
        const u = JSON.parse(raw);
        setUser(u);
      }
    } catch (e) {
      setUser(null);
    }
  }, []);

  const handlePlayClick = () => {
    if (!user) {
      setShowLoginModal(true);
    } else {
      router.push("/reto");
    }
  };

  const handleLoginSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    setShowLoginModal(false);
    router.push("/reto");
  };

  return (
    <main className="fixed inset-0 flex items-center justify-center w-full overflow-hidden bg-white">
      {/* Main content centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center z-10 px-6 w-full max-w-4xl pt-10"
      >
        {/* Owl mascot */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <img
              src="/buho-pandora.png"
              alt="Mascota Mundo Pandora"
              width={140}
              height={140}
              className="select-none drop-shadow-2xl"
              draggable={false}
            />
            <motion.div
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-2 -right-2"
            >
              <Trophy className="w-8 h-8 text-yellow-400" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-blueSky mb-4 drop-shadow-sm tracking-tight">
          Mundo Pandora
        </h1>
        <p className="text-sm md:text-base text-gray-700 font-semibold mb-8 flex items-center justify-center gap-2">
          <Rocket className="w-5 h-5 text-blueSky" />
          Aventuras para aprender jugando
          <Zap className="w-5 h-5 text-orangeAccent" />
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayClick}
            className="w-48 bg-linear-to-r from-blueSky to-blue-600 text-white px-6 py-3 rounded-2xl font-black text-lg shadow-2xl hover:shadow-blue-300/50 transition-shadow"
          >
            <div className="flex items-center justify-center gap-2">
              <Rocket className="w-5 h-5" />
              Jugar
            </div>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/dashboard")}
            className="w-48 bg-white border-3 border-blueSky text-blueSky px-6 py-3 rounded-2xl font-bold text-lg shadow-lg hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center justify-center gap-2">
              <Star className="w-5 h-5" />
              {user?.nickname ? "Mi Perfil" : "Crear Perfil"}
            </div>
          </motion.button>
        </div>

        {/* Mini steps badges */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 items-center justify-center text-xs mt-6"
        >
          <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-blue-200/50 font-semibold text-gray-700 flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blueSky" />
            Crea tu perfil
          </div>
          <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-blue-200/50 font-semibold text-gray-700 flex items-center gap-2">
            <Target className="w-4 h-4 text-orangeAccent" />
            Pide un reto
          </div>
          <div className="bg-white/70 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-blue-200/50 font-semibold text-gray-700 flex items-center gap-2">
            <Award className="w-4 h-4 text-greenSuccess" />
            Gana puntos
          </div>
        </motion.div>
      </motion.div>

      {/* Floating decorative icons */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 md:left-20"
      >
        <Star
          className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 drop-shadow-lg"
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -12, 0], rotate: [0, -8, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-20 right-10 md:right-24"
      >
        <BookOpen className="w-10 h-10 md:w-14 md:h-14 text-blueSky drop-shadow-lg" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-20 left-16 md:left-32"
      >
        <Calculator className="w-10 h-10 md:w-12 md:h-12 text-orangeAccent drop-shadow-lg" />
      </motion.div>

      <motion.div
        animate={{ y: [0, -18, 0], rotate: [0, -12, 0] }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute bottom-32 right-20 md:right-40"
      >
        <Trophy
          className="w-12 h-12 md:w-14 md:h-14 text-yellow-500 drop-shadow-lg"
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-1/3 left-8 md:left-16"
      >
        <Zap
          className="w-8 h-8 md:w-10 md:h-10 text-orange-400 drop-shadow-lg"
          fill="currentColor"
        />
      </motion.div>

      <motion.div
        animate={{ y: [0, -14, 0], x: [0, -8, 0] }}
        transition={{
          duration: 3.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.2,
        }}
        className="absolute top-1/2 right-12 md:right-20"
      >
        <Users className="w-9 h-9 md:w-11 md:h-11 text-purple-400 drop-shadow-lg" />
      </motion.div>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />
    </main>
  );
}
