"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

function StudentLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [nickname, setNickname] = useState("");
  const [pin, setPin] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validatePin = (p: string) => /^\d{4}$/.test(p);

  const handleLogin = async () => {
    setError("");
    if (!nickname.trim()) return setError("Necesitas ingresar un apodo");
    if (!validatePin(pin)) return setError("El PIN debe contener 4 números");
    if (!ageGroup) return setError("Selecciona tu rango de edad");

    setLoading(true);
    try {
      const response = await fetch("/api/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: nickname.trim(), pin, ageGroup }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al iniciar sesión");
        setLoading(false);
        return;
      }

      const user = data.user;
      localStorage.setItem("bp_user", JSON.stringify(user));
      // Notify other components that user logged in
      try {
        window.dispatchEvent(new CustomEvent("bp_user:login", { detail: user }));
      } catch (e) {}
      router.push(next);
    } catch (err) {
      console.error("Login error:", err);
      setError("Error de conexión. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-2xl p-6 shadow-lg"
      >
        <h1 className="text-2xl font-black mb-4">Iniciar sesión</h1>

        <div className="flex flex-col gap-3">
          <input
            aria-label="Apodo"
            placeholder="Tu apodo"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blueSky focus:outline-none w-full"
          />

          <input
            aria-label="PIN de 4 dígitos"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/[^0-9]/g, ""))}
            maxLength={4}
            type="password"
            className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blueSky focus:outline-none w-full"
          />

          <select
            aria-label="Rango de edad"
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            disabled={loading}
            className="px-3 py-2 rounded-lg border-2 border-gray-200 focus:border-blueSky focus:outline-none w-full disabled:opacity-50"
          >
            <option value="">Selecciona tu edad</option>
            <option value="A6_7">6-7 años</option>
            <option value="A8_10">8-10 años</option>
            <option value="A11_13">11-13 años</option>
            <option value="A14_15">14-15 años</option>
          </select>

          {error && (
            <div className="text-redDanger text-sm font-semibold">{error}</div>
          )}

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blueSky text-white px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            {loading ? "Entrando..." : "Entrar"}
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}

export default function StudentLoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <div className="text-blueSky font-bold">Cargando...</div>
        </div>
      </main>
    }>
      <StudentLoginForm />
    </Suspense>
  );
}
