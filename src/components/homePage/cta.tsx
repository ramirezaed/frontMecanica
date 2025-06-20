'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <section className="py-24 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ¿Problemas con su vehículo?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              No espere a que el problema empeore. Contáctenos hoy mismo para un
              diagnóstico profesional y soluciones confiables.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                asChild
              >
                <Link href="/turnos">Contactar ahora</Link>
              </Button>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
