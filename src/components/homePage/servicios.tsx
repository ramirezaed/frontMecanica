'use client';

import React from 'react';
// import ServiceCard from './ServiceCard';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ServiciosSeccion() {
  const services = [
    {
      title: 'Reparación de motores',
      description:
        'Diagnóstico y reparación completa de motores con la última tecnología y técnicos certificados.',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1682126114600-150abefef3ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVwYXJhY2lvbiUyMGRlJTIwbW90b3JlcyUyMGRlJTIwdmVjaGljdWxvc3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Mantenimiento preventivo',
      description:
        'Servicio completo para mantener su vehículo en óptimas condiciones y prevenir problemas futuros.',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1723690833182-f709238c9061?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2VydmljZSUyMHZlaGljdWxvc3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      title: 'Diagnóstico electrónico',
      description:
        'Análisis computarizado para detectar y resolver problemas en los sistemas electrónicos del vehículo.',
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1661602000626-823fa4256b06?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGlhZ25vc3RpY28lMjBkZSUyMHZlaGljdWxvc3xlbnwwfHwwfHx8MA%3D%3D',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Controla el tiempo entre cada animación
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: -50,
      transition: {
        duration: 0.9,
        delay: index * 0.5, // Cada tarjeta se retrasa según su índice
      },
    }),
  };

  return (
    <section className=" bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Nuestros servicios
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto"></div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 hover:bg-gray-100 transform hover:-translate-y-2"
              custom={index}
              variants={itemVariants}
            >
              <Image
                src={service.imageUrl}
                alt={service.title}
                width={800}
                height={800}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {/* <button className="border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-600 hover:text-white transition-colors">
                  Ver detalles
                </button> */}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
