import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Star, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Mision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-100px 0px' });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const values = [
    {
      icon: Award,
      title: 'Excelencia',
      description:
        'Nos comprometemos a ofrecer un servicio de la más alta calidad en cada reparación y mantenimiento que realizamos, sin excepciones.',
    },
    {
      icon: Users,
      title: 'Integridad',
      description:
        'Trabajamos con honestidad y transparencia, brindando siempre la información completa y precisa que nuestros clientes merecen.',
    },
    {
      icon: Star,
      title: 'Innovación',
      description:
        'Buscamos constantemente nuevas tecnologías y métodos para mejorar nuestros servicios y la experiencia de nuestros clientes.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestra Misión y Valores
          </h2>
          <div className="w-24 h-1 bg-blue-700 mx-auto"></div>

          <p className="text-gray-600 max-w-2xl mt-2 mx-auto">
            Nos guiamos por principios fundamentales que definen quiénes somos y
            cómo servimos a nuestra comunidad
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              custom={index}
              variants={cardVariants}
            >
              <ValueCard
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const ValueCard = ({ icon: Icon, title, description }: ValueCardProps) => {
  return (
    <motion.div whileHover={{ y: -5 }}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
        <CardContent className="p-6 text-center h-full flex flex-col">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600/10 text-blue-600 mb-4 mx-auto"
            whileHover={{ scale: 1.1 }}
          >
            <Icon className="w-8 h-8" />
          </motion.div>
          <h3 className="text-xl font-semibold mb-3">{title}</h3>
          <p className="text-gray-600 flex-grow">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};
