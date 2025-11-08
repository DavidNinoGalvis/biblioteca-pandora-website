"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Timer, Trophy, LogIn, Target, Star, Play, Pause, X } from "lucide-react";

type User = {
  nickname: string;
  pin: string;
};

export default function Navbar() {
  const [nickname, setNickname] = useState("");
  const [pin, setPin] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");
  const [assignedChallenge, setAssignedChallenge] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<number | null>(null);

  // Load user from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("bp_user");
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  // Timer logic
  useEffect(() => {
    if (running) {
      timerRef.current = window.setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  const validatePin = (p: string) => /^\d{4}$/.test(p);

  const handleLogin = () => {
    setError("");
    if (!nickname.trim()) return setError("¡Necesitas un apodo!");
    if (!validatePin(pin)) return setError("El PIN debe tener 4 números");

    const u: User = { nickname: nickname.trim(), pin };
    setUser(u);
    localStorage.setItem("bp_user", JSON.stringify(u));
    setNickname("");
    setPin("");
  };

  const handleLogout = () => {
    setUser(null);
    setAssignedChallenge(null);
    setRunning(false);
    setSeconds(0);
    localStorage.removeItem("bp_user");
  };

  const assignChallenge = () => {
    const types = ["Matemáticas", "Lectura crítica"];
    const chosen = types[Math.floor(Math.random() * types.length)];
    setAssignedChallenge(chosen);
    setSeconds(0);
    setRunning(true);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
      .toString()
      .padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <>
      {/* Navbar principal con colores personalizados - Fijo en la parte superior */}
      <nav className="bg-blueSky shadow-medium fixed top-0 left-0 right-0 z-40">
        <div className="container-center">
          <div className="flex items-center justify-between py-4">
            {/* Logo con animación */}
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="bg-white rounded-round p-2 shadow-soft">
                <BookOpen className="text-blueDeep w-7 h-7" />
              </div>
              <div className="text-white">
                <div className="font-black text-2xl tracking-tight drop-shadow-md">
                  Biblioteca Pandora
                </div>
                <div className="text-xs font-medium text-white/90">
                  ¡Aventuras de aprendizaje!
                </div>
              </div>
            </motion.div>

            {/* Sección central - Login o Usuario */}
            <div className="flex-1 flex justify-center">
              <AnimatePresence mode="wait">
                {!user ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="card flex flex-col gap-3"
                  >
                    <div className="flex gap-2 items-center">
                      <input
                        aria-label="Apodo"
                        placeholder="Tu apodo"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="w-40"
                      />
                      <input
                        aria-label="PIN de 4 dígitos"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
                        maxLength={4}
                        type="password"
                        className="w-24"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleLogin}
                        className="bg-greenSuccess flex items-center gap-2"
                      >
                        <LogIn className="w-5 h-5" />
                        ¡Entrar!
                      </motion.button>
                    </div>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-redDanger text-sm font-semibold bg-red-50 px-3 py-2 rounded-soft"
                      >
                        {error}
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="user"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="card flex gap-3 items-center"
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-yellowWarm rounded-full p-2 border-2 border-orangeAccent">
                        <Star className="w-5 h-5 text-orangeAccent fill-orangeAccent" />
                      </div>
                      <div>
                        <div className="text-xs text-grayMuted font-medium">Hola,</div>
                        <div className="text-lg font-black text-gray-800">{user.nickname}</div>
                      </div>
                    </div>
                    
                    <div className="h-10 w-px bg-graySoft"></div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={assignChallenge}
                      className="bg-blueDeep flex items-center gap-2"
                    >
                      <Target className="w-5 h-5" />
                      ¡Nuevo Reto!
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="bg-grayMuted"
                    >
                      Salir
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Botón de resultados */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-gray-800 flex items-center gap-2"
            >
              <Trophy className="w-5 h-5 text-orangeAccent" />
              <span>Premios</span>
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Tarjeta flotante del reto */}
      <AnimatePresence>
        {assignedChallenge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed top-28 left-1/2 -translate-x-1/2 z-50"
          >
            {/* Borde decorativo con color principal */}
            <div className="bg-blueSky rounded-round shadow-medium p-1">
              <div className="bg-white rounded-round p-6 w-80">
                {/* Header del reto */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-yellowWarm rounded-full p-2 border-2 border-orangeAccent">
                      <Target className="w-5 h-5 text-orangeAccent" />
                    </div>
                    <div>
                      <div className="text-xs text-grayMuted font-semibold">Tu Reto</div>
                      <div className="text-xl font-black text-gray-800">{assignedChallenge}</div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setRunning(false);
                      setSeconds(0);
                      setAssignedChallenge(null);
                    }}
                    className="text-grayMuted hover:text-gray-800 transition-colors bg-transparent shadow-none p-1"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Cronómetro grande */}
                <div className="bg-yellowWarm rounded-soft p-6 mb-4 border-2 border-orangeAccent/20">
                  <div className="flex flex-col items-center">
                    <Timer className="w-10 h-10 text-blueDeep mb-2" />
                    <div className="text-5xl font-black text-gray-800 tracking-wider">
                      {formatTime(seconds)}
                    </div>
                    <div className="text-sm text-grayMuted font-semibold mt-1">
                      {running ? "¡En marcha!" : "Pausado"}
                    </div>
                  </div>
                </div>

                {/* Botones de control */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setRunning((r) => !r)}
                    className={`flex-1 flex items-center justify-center gap-2 ${
                      running
                        ? "bg-orangeAccent"
                        : "bg-greenSuccess"
                    }`}
                  >
                    {running ? (
                      <>
                        <Pause className="w-5 h-5 fill-white" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 fill-white" />
                        Continuar
                      </>
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setRunning(false);
                      setSeconds(0);
                      setAssignedChallenge(null);
                    }}
                    className="flex-1 bg-blueDeep flex items-center justify-center gap-2"
                  >
                    <Trophy className="w-5 h-5" />
                    Terminar
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}