import { motion } from "framer-motion";

type ChallengeTypeBadgeProps = {
  type: "Matemáticas" | "Lectura crítica";
};

export default function ChallengeTypeBadge({ type }: ChallengeTypeBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className={`mb-3 md:mb-4 px-5 py-2 md:px-6 md:py-2 lg:px-8 lg:py-3 rounded-round shadow-soft ${
        type === "Matemáticas"
          ? "bg-blueSky text-white"
          : "bg-orangeAccent text-white"
      }`}
    >
      <span className="text-sm md:text-base lg:text-lg font-bold">{type}</span>
    </motion.div>
  );
}
