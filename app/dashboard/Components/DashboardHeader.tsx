import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

type DashboardHeaderProps = {
  nickname: string;
};

export default function DashboardHeader({ nickname }: DashboardHeaderProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-4 mb-2">
        <div className="bg-gradient-to-br from-blueSky to-blueDeep text-white rounded-full p-4 shadow-medium">
          <Trophy className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-black text-gray-800">
            ¡Hola, {nickname}!
          </h1>
          <p className="text-grayMuted text-lg">
            Aquí está tu progreso de aprendizaje
          </p>
        </div>
      </div>
    </motion.section>
  );
}
