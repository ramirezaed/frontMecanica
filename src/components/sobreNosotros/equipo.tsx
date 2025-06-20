import React from 'react';
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function Equipo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Profesionales apasionados por la mecánica y comprometidos con
            brindar un servicio excepcional
          </p>
        </div>

        {/* <div className="max-w-5xl mx-auto">
          <Carousel className="w-full">
            <CarouselContent>
              {teamMembers.map((member, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-2">
                    <TeamMemberCard {...member} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-8 flex justify-center gap-4">
              <CarouselPrevious className="relative inset-auto left-0 right-0 mx-2" />
              <CarouselNext className="relative inset-auto left-0 right-0 mx-2" />
            </div>
          </Carousel>
        </div> */}
      </div>
    </section>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  yearsExperience: number;
}

const TeamMemberCard = ({ name, role, yearsExperience }: TeamMemberProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="mb-4 bg-gray-200 rounded-full overflow-hidden w-32 h-32 mx-auto">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-500 mb-2">{role}</p>
          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {yearsExperience} años de experiencia
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

const teamMembers = [
  { name: 'Carlos Rodríguez', role: 'Maestro Mecánico', yearsExperience: 15 },
  {
    name: 'Ana Martínez',
    role: 'Especialista en Diagnóstico',
    yearsExperience: 8,
  },
  {
    name: 'Roberto Sánchez',
    role: 'Técnico en Electrónica',
    yearsExperience: 12,
  },
  {
    name: 'Laura González',
    role: 'Gerente de Atención al Cliente',
    yearsExperience: 7,
  },
  {
    name: 'Miguel Torres',
    role: 'Especialista en Transmisiones',
    yearsExperience: 10,
  },
];
