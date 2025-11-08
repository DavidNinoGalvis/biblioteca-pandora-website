"use client";

import { motion } from "framer-motion";
import { 
  Star, 
  Zap, 
  Target, 
  Users, 
  TrendingUp, 
  Award,
  Calculator,
  BookOpen,
  Timer,
  Lightbulb,
  Trophy,
  Rocket,
  Brain,
  FileText,
  BarChart3,
  UserCircle,
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] w-full max-w-5xl mx-auto flex-col items-center gap-8 py-12 px-6">
      {/* Hero Section with Owl */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center relative"
      >
        {/* Decorative floating elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-10"
        >
          <Star className="w-10 h-10 text-orangeAccent" />
        </motion.div>
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
          className="absolute top-10 right-10"
        >
          <BookOpen className="w-10 h-10 text-blueSky" />
        </motion.div>

        {/* Owl Illustration with animation */}
        <motion.div
          initial={{ scale: 0.8, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2 
          }}
          className="flex justify-center mb-6"
        >
          <motion.div
            animate={{ 
              y: [0, -8, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <img
              src="/buho-pandora.png"
              alt="Búho Pandora - Mascota de Biblioteca Pandora"
              width={200}
              height={200}
              className="drop-shadow-2xl"
            />
            {/* Sparkle effect around owl */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute -top-2 -right-2"
            >
              <Trophy className="w-8 h-8 text-orangeAccent" />
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-black text-blueSky mb-3 drop-shadow-sm"
        >
          ¡Bienvenido a Biblioteca Pandora!
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-grayMuted max-w-2xl mx-auto leading-relaxed"
        >
          Pon a prueba tus conocimientos con retos divertidos de{" "}
          <span className="font-bold text-blueSky">Matemáticas</span> y{" "}
          <span className="font-bold text-orangeAccent">Lectura crítica</span>
        </motion.p>

        {/* CTA Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 inline-block"
        >
          <div className="bg-yellowWarm border-2 border-orangeAccent px-6 py-3 rounded-round shadow-soft">
            <div className="flex items-center gap-2 text-gray-800 font-bold">
              <Zap className="w-5 h-5 text-orangeAccent" />
              <span>¡Empieza tu aventura ahora!</span>
              <Rocket className="w-5 h-5 text-blueSky" />
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Cards Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full grid gap-6 md:grid-cols-2"
      >
        {/* How to Start */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="card bg-gradient-to-br from-blue-50 to-white border-2 border-blueSky/30 hover:border-blueSky/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-blueSky text-white rounded-full p-2">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-blueSky">¿Cómo empezar?</h2>
          </div>
          <ol className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blueSky text-white text-base font-bold flex items-center justify-center shadow-soft">
                1
              </span>
              <div>
                <span className="font-semibold text-gray-800 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-blueSky" />
                  Crea tu perfil
                </span>
                <p className="text-sm text-grayMuted mt-0.5">
                  Ingresa tu apodo y un PIN de 4 dígitos en la parte superior
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blueSky text-white text-base font-bold flex items-center justify-center shadow-soft">
                2
              </span>
              <div>
                <span className="font-semibold text-gray-800 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blueSky" />
                  Pide tu reto
                </span>
                <p className="text-sm text-grayMuted mt-0.5">
                  Presiona el botón "¡Nuevo Reto!" cuando estés listo
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-blueSky text-white text-base font-bold flex items-center justify-center shadow-soft">
                3
              </span>
              <div>
                <span className="font-semibold text-gray-800 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blueSky" />
                  ¡A jugar!
                </span>
                <p className="text-sm text-grayMuted mt-0.5">
                  Resuelve el reto lo más rápido que puedas
                </p>
              </div>
            </li>
          </ol>
        </motion.div>

        {/* Challenge Types */}
        <motion.div 
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="card bg-gradient-to-br from-orange-50 to-white border-2 border-orangeAccent/30 hover:border-orangeAccent/50 transition-colors"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="bg-orangeAccent text-white rounded-full p-2">
              <Award className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black text-orangeAccent">Tipos de retos</h2>
          </div>
          <div className="space-y-4">
            <motion.div 
              whileHover={{ x: 5 }}
              className="p-4 rounded-soft bg-white border-2 border-blueSky/30 hover:border-blueSky transition-colors shadow-soft"
            >
              <div className="font-bold text-blueSky flex items-center gap-2 text-lg mb-2">
                <Calculator className="w-6 h-6" />
                Matemáticas
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Suma, resta, multiplicación y problemas lógicos que desafiarán tu mente
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              className="p-4 rounded-soft bg-white border-2 border-orangeAccent/30 hover:border-orangeAccent transition-colors shadow-soft"
            >
              <div className="font-bold text-orangeAccent flex items-center gap-2 text-lg mb-2">
                <FileText className="w-6 h-6" />
                Lectura crítica
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                Comprensión de textos, análisis de historias y razonamiento verbal
              </p>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Preview */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full"
      >
        <div className="card bg-gradient-to-br from-greenSuccess/10 to-white border-2 border-greenSuccess/30">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-greenSuccess text-white rounded-full p-2">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-black text-xl text-gray-800">¿Por qué es genial?</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-soft border border-graySoft">
              <div className="flex justify-center mb-2">
                <Timer className="w-8 h-8 text-blueDeep" />
              </div>
              <div className="font-bold text-gray-800">Cronómetro</div>
              <p className="text-xs text-grayMuted mt-1">Mide tu velocidad</p>
            </div>
            <div className="text-center p-4 bg-white rounded-soft border border-graySoft">
              <div className="flex justify-center mb-2">
                <Brain className="w-8 h-8 text-orangeAccent" />
              </div>
              <div className="font-bold text-gray-800">Variedad</div>
              <p className="text-xs text-grayMuted mt-1">Retos diferentes</p>
            </div>
            <div className="text-center p-4 bg-white rounded-soft border border-graySoft">
              <div className="flex justify-center mb-2">
                <Trophy className="w-8 h-8 text-greenSuccess" />
              </div>
              <div className="font-bold text-gray-800">Progreso</div>
              <p className="text-xs text-grayMuted mt-1">Sigue mejorando</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Info for Parents/Teachers */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="w-full"
      >
        <div className="card bg-gradient-to-r from-yellowWarm to-orange-50 border-2 border-graySoft">
          <div className="flex items-start gap-3">
            <div className="bg-white rounded-full p-2 shadow-soft">
              <Users className="w-6 h-6 text-orangeAccent" />
            </div>
            <div>
              <h3 className="font-black text-lg text-gray-800 mb-2 flex items-center gap-2">
                Para profes y papás
                <Lightbulb className="w-5 h-5 text-orangeAccent" />
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Los retos y el progreso se guardan localmente en el navegador por ahora. 
              </p>
              <div className="bg-white rounded-soft p-3 border border-orangeAccent/30">
                <p className="text-sm text-gray-700 font-semibold mb-2 flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-blueSky" />
                  Próximamente:
                </p>
                <ul className="text-xs text-grayMuted space-y-1.5">
                  <li className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-greenSuccess" />
                    Cuentas de usuario personalizadas
                  </li>
                  <li className="flex items-center gap-2">
                    <BarChart3 className="w-3 h-3 text-blueSky" />
                    Estadísticas detalladas de progreso
                  </li>
                  <li className="flex items-center gap-2">
                    <Trophy className="w-3 h-3 text-orangeAccent" />
                    Seguimiento de mejoras y logros
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="w-3 h-3 text-grayMuted" />
                    Reportes para acompañar el aprendizaje
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}