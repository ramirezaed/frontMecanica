import React from 'react';
import { motion } from 'framer-motion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

export default function Historia() {
  // Configuración de las animaciones
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.4,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-3xl font-bold text-gray-900 mb-8 text-center"
          >
            Nuestra Historia
            <div className="w-24 h-1 mt-4 bg-blue-700 mx-auto"></div>
          </motion.h2>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={container}
            className="relative pl-8 pb-20 border-l-2 border-gray-200 space-y-12"
          >
            {/* Timeline Item 1 */}
            <motion.div variants={item}>
              <TimelineItem year="2005" title="Nuestros inicios">
                <p>
                  Fundada por hermanos apasionados por los automóviles, nuestra
                  empresa comenzó como un pequeño taller en el corazón de la
                  ciudad. Con solo dos elevadores y un equipo de tres personas,
                  nos dedicamos a ofrecer servicios honestos y de calidad.
                </p>
              </TimelineItem>
            </motion.div>

            {/* Timeline Item 2 */}
            <motion.div variants={item}>
              <TimelineItem year="2010" title="Crecimiento y expansión">
                <p>
                  Gracias a nuestra reputación de excelencia, logramos expandir
                  nuestras instalaciones y agregamos servicios especializados
                  para atender una gama más amplia de vehículos, incorporando
                  tecnología de diagnóstico avanzada y un equipo más numeroso de
                  técnicos certificados.
                </p>
              </TimelineItem>
            </motion.div>

            {/* Timeline Item 3 */}
            <motion.div variants={item}>
              <TimelineItem year="2015" title="Innovación tecnológica">
                <p>
                  Implementamos un sistema digital de gestión de clientes y
                  diagnóstico computarizado, elevando nuestro nivel de servicio
                  con mayor precisión en la detección de problemas y mejorando
                  la comunicación con nuestros clientes sobre el estado de sus
                  vehículos.
                </p>
              </TimelineItem>
            </motion.div>

            {/* Timeline Item 4 */}
            <motion.div variants={item}>
              <TimelineItem year="2025" title="Presente y futuro">
                <p>
                  Hoy contamos con instalaciones modernas, un gran equipo de
                  especialistas y la confianza de miles de clientes satisfechos.
                  Seguimos innovando y expandiendo nuestros servicios para
                  mantenernos a la vanguardia del cuidado automotriz.
                </p>
              </TimelineItem>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  year: string;
  title: string;
  children: React.ReactNode;
}

const TimelineItem = ({ year, title, children }: TimelineItemProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="relative">
      <div className="absolute -left-[2.55rem] w-5 h-5 rounded-full bg-blue-600 border-4 border-white shadow"></div>

      <div className="hover-scale">
        <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full"
          >
            <CollapsibleTrigger className="flex justify-between items-center w-full p-6 text-left">
              <div>
                <span className="inline-block bg-blue-600 text-white py-1 px-3 rounded-full text-sm mb-2">
                  {year}
                </span>
                <h3 className="text-xl font-semibold">{title}</h3>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform duration-300 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </CollapsibleTrigger>

            <CollapsibleContent>
              <CardContent className="pt-2 pb-6 prose-sm max-w-none">
                {children}
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      </div>
    </div>
  );
};
