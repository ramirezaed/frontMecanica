'use client';
import React from 'react';
import { MapPin, Clock, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Encontranos() {
  const contactos = [
    {
      titulo: 'Dirección',
      description: 'Av. Independencia 5198',
      icon: <MapPin className="text-gray-50 w-10 h-10" />,
    },
    {
      titulo: 'Contacto',
      description:
        'Email: mecanicaguemes@hotmail.com Teléfono: +54 379 4815033',
      icon: <Phone className="text-gray-50 w-10 h-10 " />,
    },
    {
      titulo: 'Horarios de Atención',
      description: 'De Mañana Lun - Sab: 8:00 - 12:00',
      descripcion2: 'De Tarde Lun - Vie 15:30 - 19:30',
      icon: <Clock className="text-gray-50 w-10 h-10" />,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Encontranos</h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {contactos.map((contacto, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 hover:bg-gray-100 transform hover:-translate-y-2"
              variants={itemVariants}
            >
              <div className="flex flex-col items-center p-6">
                <div className="inline-flex items-center justify-center  w-16 h-16 rounded-2xl bg-blue-600">
                  {contacto.icon}
                </div>
              </div>

              <div className="p-6">
                <h3 className="flex flex-col items-center text-xl font-bold mb-2">
                  {contacto.titulo}
                </h3>
                <p className="text-gray-600 mb-4 flex flex-col items-center ">
                  {contacto.description}
                </p>
                <p className="text-gray-600 mb-4 flex flex-col items-center">
                  {contacto.descripcion2}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
