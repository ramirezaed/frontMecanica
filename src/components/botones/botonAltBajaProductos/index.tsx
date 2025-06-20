"use client";

import { useState } from "react";

interface BotonEliminarProps {
  id: string;
  estado: boolean;
  onToggle: (id: string, nuevoEstado: boolean) => Promise<void>;
}

export default function BotonEliminar({ id, estado, onToggle }: BotonEliminarProps) {
  const [cargando, setCargando] = useState(false);

  const handleClick = async () => {
    setCargando(true);
    try {
      await onToggle(id, !estado);
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    } finally {
      setCargando(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={cargando}
      className={`px-4 py-2 rounded text-white font-bold ${
        estado ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
      }`}
    >
      {cargando ? "Procesando..." : estado ? "Dar de baja" : "Dar de alta"}
    </button>
  );
}