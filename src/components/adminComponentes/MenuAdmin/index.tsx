'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { logOut } from '@/utils/logOut';

export default function MenuAdmin() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { data: session } = useSession();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }

    function handleResize() {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
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
    <>
      {/* Botón de hamburguesa para móviles */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Menú lateral - Fijo y sin movimiento al hacer scroll */}
      <div
        ref={menuRef}
        className={`
          fixed inset-y-0 left-0 z-40 w-64 h-screen bg-gray-900 p-6
          transform transition-transform duration-300 ease-in-out
          ${
            isMobileMenuOpen
              ? 'translate-x-0'
              : '-translate-x-full lg:translate-x-0'
          }
          flex flex-col justify-between
          overflow-y-auto  // Permite scroll interno si el contenido es muy largo
        `}
      >
        <div>
          <h1 className=" my-4 text-2xl text-gray-50 font-bold mb-2 flex justify-center">
            Admin
          </h1>
          <p className="text-gray-400 text-sm mb-8">
            {session?.user.nombre} {session?.user.apellido}{' '}
          </p>

          <div className="mb-8 border-t border-gray-500 my-4 py-5 ">
            <h2 className="text-gray-400 uppercase text-xs font-semibold mb-4">
              USUARIOS
            </h2>
            <nav>
              <ul className="space-y-2">
                <li className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <Link
                    href={`/PerfilAdmin/usuarios/`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Lista de Usuarios
                  </Link>
                </li>
                <li className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <Link
                    href={`/PerfilAdmin/usuarios/activos`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Activos
                  </Link>
                </li>
                <li className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <Link
                    href={`/PerfilAdmin/usuarios/inactivos`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Inactivos
                  </Link>
                </li>
                {/* <li className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <Link
                    href="/admin/reportes"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Reportes
                  </Link>
                </li>
                <li className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <Link
                    href="/admin/configuracion"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Configuración
                  </Link> 
                </li>*/}
              </ul>
            </nav>
          </div> 

          <div className="mb-8 border-t border-gray-500 h-px my-2 py-5">
            <h2 className="text-gray-400 uppercase text-xs font-semibold mb-4">
              SISTEMA
            </h2>
            <nav>
              <ul className="space-y-2">
                <li className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer">
                  <Link
                    href={`/PerfilAdmin/${session?.user?.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mb-4 border-t border-gray-500 my-4 py-4">
          <button
            className="text-white py-2 px-4 rounded-lg hover:bg-gray-700 cursor-pointer w-full text-left"
            onClick={() => logOut()}
          >
            Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Overlay para móviles */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
