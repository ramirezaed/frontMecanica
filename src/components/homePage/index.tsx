import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

export default function HeroSection() {
  return (
    <section className="relative h-[600px] md:h-[700px] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r "></div>
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className="absolute inset-0 animate-pulse z-0"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
            animation: 'wave 8s ease-in-out infinite',
            background:
              'url("https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1983&q=80") center/cover',
          }}
        ></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Mecánica <span className="text-blue-600">Güemes</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
            Mecánicos certificados con tecnología de vanguardia para todas las
            marcas y modelos.
          </p>

          <Button
            className="bg-red-500 hover:bg-red-600 text-white px-10 py-7 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
            asChild
          >
            <Link href="/turnos">Agenda Un Turno</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
