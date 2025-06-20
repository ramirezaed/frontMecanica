'use client';

import { useState } from 'react';
import { TurnoForm } from '@/components/turnos/turnoFormulario';
import { TurnoComprobante } from '@/components/turnos/comprobanteTurno';
import { motion, AnimatePresence } from 'framer-motion';
import Encabezado from '@/components/encabezado/encabezado';
export default function CrearTurnoPage() {
  const [resultado, setResultado] = useState<any>(null);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.5, duration: 0.7 }, // Retraso para que aparezca después del título
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sección del encabezado con animación */}
      <Encabezado
        title="Solicita un Turno"
        subtitle=" Agenda una visita con nuestros expertos mecánicos"
      />

      <AnimatePresence>
        {!resultado ? (
          <motion.div
            className="bg-white p-6 rounded-lg shadow print:hidden"
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <TurnoForm onSuccess={setResultado} />
          </motion.div>
        ) : (
          <div className="print:fixed print:inset-0 print:bg-white print:z-50">
            <TurnoComprobante turno={resultado} />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
