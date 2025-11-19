"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";

export default function ResetPointsButton() {
  const [loading, setLoading] = useState(false);

  const handleResetPoints = async () => {
    const confirmed = confirm(
      "¿Estás seguro de reiniciar todos los puntos? Esta acción eliminará todos los retos completados y no se puede deshacer."
    );

    if (!confirmed) return;

    const doubleConfirm = confirm(
      "ÚLTIMA CONFIRMACIÓN: Se borrarán TODOS los retos completados de TODOS los estudiantes. ¿Continuar?"
    );

    if (!doubleConfirm) return;

    setLoading(true);
    try {
      const response = await fetch("/api/admin/reset-points", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `Puntos reiniciados exitosamente. Se eliminaron ${data.deletedCount} registros.`
        );
        window.location.reload();
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error resetting points:", error);
      alert("Error de conexión al reiniciar puntos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleResetPoints}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <RotateCcw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
      {loading ? "Reiniciando..." : "Reiniciar Puntos"}
    </motion.button>
  );
}
