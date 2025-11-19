"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Lock, Mail, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const payload = await res.json();
        setError(payload.error || "Login failed");
        setLoading(false);
        return;
      }
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative min-h-screen bg-linear-to-b from-sky-50 via-white to-amber-50 text-slate-900 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(14,99,225,0.25),transparent_65%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,rgba(249,115,22,0.15),transparent_60%)]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12">
        <section className="flex-1 text-center lg:text-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/80 border border-blue-100 rounded-full px-4 py-2 text-sm uppercase tracking-widest font-semibold text-blue-700 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-blue-500" />
            Panel de Administración
          </div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight text-blue-900">
            Control total para mentores Pandora
          </h1>
          <p className="text-lg text-slate-600">
            Gestiona estudiantes, revisa el progreso de los retos y mantén la
            comunidad motivada con información en tiempo real.
          </p>
          <ul className="space-y-3 text-slate-600 text-sm md:text-base">
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Métricas instantáneas y alertas inteligentes
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              Gestión rápida de estudiantes y retos
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Acceso seguro para educadores autorizados
            </li>
          </ul>
        </section>

        <section className="flex-1 max-w-lg w-full bg-white/90 backdrop-blur-xl border border-blue-100 rounded-[32px] shadow-[0_25px_60px_rgba(15,23,42,0.12)] p-8 space-y-8">
          <header className="space-y-2">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-500">
              Acceso seguro
            </p>
            <h2 className="text-3xl font-black text-blue-900">
              Ingresa con tus credenciales
            </h2>
            <p className="text-sm text-slate-500">
              Solo personal autorizado puede acceder al panel. Tu sesión está
              protegida con cifrado.
            </p>
          </header>

          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 text-sm text-red-600 px-4 py-3">
              <Lock className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-600">
                Correo institucional
              </span>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  inputMode="email"
                  autoComplete="username"
                  placeholder="profe@pandora.edu"
                  className="w-full bg-slate-50 text-slate-900 rounded-2xl py-3 pl-12 pr-4 font-semibold border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
        </label>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-slate-600">
                Contraseña
              </span>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="********"
                  className="w-full bg-slate-50 text-slate-900 rounded-2xl py-3 pl-12 pr-12 font-semibold border border-slate-200 focus:border-blue-400 focus:ring-4 focus:ring-blue-100 outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
        </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-black text-lg py-3 shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Entrando...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  Entrar al panel
                </>
              )}
        </button>
      </form>

          <p className="text-xs text-center text-slate-500">
            ¿Necesitas acceso? Contacta al coordinador académico para generar
            tus credenciales.
          </p>
        </section>
      </div>
    </main>
  );
}
