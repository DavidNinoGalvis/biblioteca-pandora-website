"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogIn, X } from "lucide-react";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: { id: string; nickname: string; role?: string }) => void;
};

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
}: LoginModalProps) {
  const [nickname, setNickname] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePin = (p: string) => /^\d{4}$/.test(p);

  const handleLogin = async () => {
    setError("");
    if (!nickname.trim()) {
      setError("Necesitas ingresar un apodo");
      return;
    }
    if (!validatePin(pin)) {
      setError("El PIN debe contener 4 números");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim(), pin }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      const user = data.user;
      localStorage.setItem("bp_user", JSON.stringify(user));
      setNickname("");
      setPin("");
      setError("");
      // Notify other components (navbar) about login
      try {
        window.dispatchEvent(new CustomEvent("bp_user:login", { detail: user }));
      } catch (e) {
        // ignore in non-browser environments
      }
      onSuccess(user);
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión. Intenta de nuevo.");
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="login-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="fixed inset-0 bg-black/35 z-50 flex items-center justify-center px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full max-w-md bg-white rounded-3xl shadow-[0_22px_60px_rgba(15,23,42,0.18)] p-7 space-y-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header con botón cerrar */}
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl md:text-3xl font-black text-blueSky">
              Iniciar sesión
            </h2>
            <button
              onClick={onClose}
              className="text-white bg-blueSky/80 hover:bg-blueSky rounded-full p-1 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-sm md:text-base text-gray-600">
            Ingresa tu apodo y PIN para comenzar a jugar
          </p>

          {/* Formulario */}
          <div className="flex flex-col gap-3 mt-4">
            <input
              aria-label="Apodo"
              placeholder="Tu apodo"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blueSky focus:outline-none w-full text-base disabled:opacity-50"
            />

            <input
              aria-label="PIN de 4 dígitos"
              placeholder="PIN (4 números)"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
              onKeyPress={handleKeyPress}
              maxLength={4}
              type="password"
              disabled={loading}
              className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blueSky focus:outline-none w-full text-base disabled:opacity-50"
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-redDanger text-sm font-semibold bg-red-50 px-3 py-2 rounded-lg"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-linear-to-r from-blueSky to-blue-600 text-white px-6 py-4 rounded-2xl text-lg font-black shadow-lg hover:shadow-blue-300/50 transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <LogIn className="w-5 h-5" />
              {loading ? "Entrando..." : "Entrar"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
