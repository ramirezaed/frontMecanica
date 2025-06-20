'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MenuDerecha from './menuDerecha';
import { Menu as MenuIcon, X } from 'lucide-react';

export default function Menu() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const barraMenu = [
    { nombre: 'Inicio', ruta: '/' },
    { nombre: 'Turnos', ruta: '/turnos' },
    { nombre: 'Consultas', ruta: '/consultas' },
    { nombre: 'Nosotros', ruta: '/nosotros' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50 bg-black shadow-lg">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-slate-50 text-xl font-bold"></div>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-white z-50"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>

        {/* Menú Desktop */}
        <ul className="hidden md:flex gap-6 text-sm">
          {barraMenu.map(({ nombre, ruta }) => (
            <li key={nombre}>
              <Link
                href={ruta}
                className="text-slate-50 hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                {nombre}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex">
          <MenuDerecha />
        </div>
      </div>

      {/* Menú Mobile tipo Drawer */}
      <div
        ref={menuRef}
        className={`
          fixed inset-y-0 left-0 z-40 w-64 h-screen bg-black p-6
          transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:hidden
        `}
      >
        <ul className="flex flex-col gap-4 text-sm">
          {barraMenu.map(({ nombre, ruta }) => (
            <li key={nombre}>
              <Link
                href={ruta}
                className="block text-slate-50 hover:text-blue-600 transition-all duration-300"
                onClick={() => setMobileMenuOpen(false)}
              >
                {nombre}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex justify-end mt-6">
          <MenuDerecha />
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Animación decorativa inferior */}
      <div className="absolute bottom-0 left-0 w-full h-1 overflow-hidden">
        <div className="flex h-full animate-slideLeft">
          <div className="h-full w-full bg-[linear-gradient(to_right,#111,#111,#111,#454545,#454545,#111,#111,#111)]" />
          <div className="h-full w-full bg-[linear-gradient(to_right,#111,#111,#111,#454545,#454545,#111,#111,#111)]" />
        </div>
      </div>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-slideLeft {
          animation: slideLeft 5s linear infinite;
          display: flex;
          width: 200%;
        }
      `}</style>
    </nav>
  );
}
