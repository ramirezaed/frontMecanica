'use client';

import React from 'react';
import { Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Porque() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Imagen con animación scroll */}
          <motion.div
            className="w-full md:w-1/2"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* <img
              src="https://res.cloudinary.com/dkmndxxbv/image/upload/v1747951126/tallerGuemes_gdkkel.png"
              alt="Taller mecánico profesional"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
            /> */}
            <Image
              src="https://res.cloudinary.com/dkmndxxbv/image/upload/v1747951126/tallerGuemes_gdkkel.png"
              alt="Taller mecánico profesional"
              width={800} // ancho estimado, ajustalo a tu diseño
              height={500} // alto fijo
              className="rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>

          {/* Texto con animación stagger desde abajo */}
          <motion.div
            className="w-full md:w-1/2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-8"
              variants={itemVariants}
            >
              ¿Por qué elegirnos?
              <div className="w-24 h-1 bg-blue-700 mx-36 mt-4"></div>
            </motion.h2>

            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ),
                  title: 'Técnicos certificados',
                  description:
                    'Nuestro equipo cuenta con certificaciones y años de experiencia en el sector automotriz.',
                },
                {
                  icon: <Clock className="h-6 w-6" />,
                  title: 'Servicio rápido',
                  description:
                    'Entendemos el valor de su tiempo. Trabajamos con eficiencia sin comprometer la calidad.',
                },
                {
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ),
                  title: 'Precios justos',
                  description:
                    'Ofrecemos tarifas transparentes y competitivas sin costos ocultos.',
                },
              ].map((item, index) => (
                <motion.div
                  className="flex items-start"
                  key={index}
                  variants={itemVariants}
                >
                  <div className="bg-blue-600 text-white p-4 rounded-xl mr-5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
