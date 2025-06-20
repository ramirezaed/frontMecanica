'use client';
// import SobreNosotros from '@/components/sobreNosotros/sobreNosotros';
import Historia from '@/components/sobreNosotros/historia';
import Encabezado from '@/components/encabezado/encabezado';
// import { useInView } from 'framer-motion';
import Mision from '@/components/sobreNosotros/mision';
// import { useRef } from 'react';

export default function Nosotros() {
  // const refHistoria = useRef(null);
  // const refMision = useRef(null);

  // const isInViewHistoria = useInView(refHistoria, {
  //   once: false,
  //   margin: '-100px 0px',
  // });
  // const isInViewMision = useInView(refMision, {
  //   once: false,
  //   margin: '-100px 0px',
  // });

  // // Variantes para Historia (efecto original)
  // const historiaVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       duration: 0.7,
  //       ease: 'easeOut',
  //     },
  //   },
  // };

  // // Nuevas variantes para Misión con efecto diferente
  // const misionVariants = {
  //   hidden: {
  //     opacity: 0,
  //     x: -50, // Empieza desplazado a la izquierda
  //     rotate: -5, // Ligera inclinación inicial
  //   },
  //   visible: {
  //     opacity: 1,
  //     x: 0, // Vuelve a posición normal
  //     rotate: 0, // Sin inclinación
  //     transition: {
  //       duration: 0.9,
  //       ease: [0.16, 1, 0.3, 1], // Curva de easing personalizada
  //       when: 'beforeChildren',
  //       staggerChildren: 0.2,
  //     },
  //   },
  // };

  return (
    <div>
      <Encabezado
        title="Sobre Nosotros"
        subtitle="conoce la historia detras de nuestra pasion por los vehiculos"
      />
      <Historia />
      <Mision />
    </div>
  );
}
