'use client';

import { motion } from 'framer-motion';

interface EncabezadoProps {
  title: string;
  subtitle: string;
}

const headerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

export default function Encabezado({ title, subtitle }: EncabezadoProps) {
  return (
    <div className="relative py-20 text-white text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-700"></div>

      <motion.div
        className="container mx-auto px-4 relative z-10"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 className="text-5xl font-bold mb-4" variants={itemVariants}>
          {title}
        </motion.h1>
        <motion.p
          className="text-xl max-w-2xl mx-auto mb-8"
          variants={itemVariants}
        >
          {subtitle}
        </motion.p>
      </motion.div>

      {/* Background blobs */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 animate-pulse"></div>
      <div
        className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-tr from-blue-500/10 to-purple-500/10 animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>
      <div
        className="absolute -bottom-2 left-0 right-0 h-20 bg-white"
        style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 100%)' }}
      ></div>
    </div>
  );
}
