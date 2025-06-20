'use client';
import { IconAvatar, IconCart } from '@/assets/icons';
import Link from 'next/link';
import { alatsi } from '@/app/fonts';
import { useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { logOut } from '@/utils/logOut';

interface MenuDerechaProps {
  perfilHref: string;
  turnosHref: string;
}

function verIniciales(nomYap?: string): string {
  if (!nomYap) return 'U';
  const parts = nomYap.split(' ').filter((part) => part.length > 0);
  if (parts.length === 0) return 'U';
  const inicialNombre = parts[0][0].toUpperCase();
  if (parts.length === 1) return inicialNombre;
  const inicialApellido = parts[parts.length - 1][0].toUpperCase();
  return `${inicialNombre}${inicialApellido}`;
}

export default function MenuDerechaProps({
  perfilHref,
  turnosHref,
}: MenuDerechaProps) {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (status === 'loading') {
    return (
      <div className={`w-1/6 ${alatsi.className}`}>
        <div className="w-full flex justify-end items-center gap-8">
          <div className="animate-pulse bg-gray-200 rounded-md h-8 w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`w-1/2 flex ${alatsi.className}`}>
      <div className="w-full flex justify-end items-center gap-10">
        <div className="flex gap-2 items-center relative" ref={menuRef}>
          <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center uppercase text-sm font-medium">
            {session?.user ? (
              verIniciales(
                `${session.user.nombre ?? ''} ${session.user.apellido ?? ''}`
              )
            ) : (
              <IconAvatar className="w-5 h-5 text-gray-800" />
            )}
          </div>

          {session?.user ? (
            <div className="flex items-center justify-end gap-2">
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="text-slate-50 text-xs">
                  {`${session.user.nombre} ${session.user.apellido}` ||
                    'Usuario'}
                </span>
                {isMenuOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>

              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={perfilHref}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    href={turnosHref}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mis Turnos
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={logOut}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="text-slate-50 hover:text-gray-700 text-sm"
            >
              Login
            </Link>
          )}
        </div>

        <IconCart className="w-6 h-6 text-slate-50" />
      </div>
    </div>
  );
}
