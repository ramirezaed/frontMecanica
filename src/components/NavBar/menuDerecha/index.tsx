'use client';
import { IconAvatar } from '@/assets/icons';
import Link from 'next/link';
import { alatsi } from '@/app/fonts';
import { signOut, useSession } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
// import { logOut } from '@/actions/authActions';

function verIniciales(nomYap?: string): string {
  if (!nomYap) return 'U';
  const parts = nomYap.split(' ').filter((part) => part.length > 0);
  if (parts.length === 0) return 'U';
  const inicialNombre = parts[0][0].toUpperCase();
  if (parts.length === 1) return inicialNombre;
  const inicialApellido = parts[parts.length - 1][0].toUpperCase();
  return `${inicialNombre}${inicialApellido}`;
}

export default function MenuDerecha() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar el menú al hacer clic fuera de él
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
    <div className={`w-10 flex h-10 ${alatsi.className}`}>
      <div className="w-full flex justify-end items-center gap-10 ">
        <div className="flex gap-2 items-center relative" ref={menuRef}>
          <div className="w-6 h-6 bg-slate-50 rounded-full flex items-center justify-center uppercase text-sm font-medium">
            {session?.user ? (
              verIniciales(
                `${session?.user?.nombre ?? ''} ${
                  session?.user?.apellido ?? ''
                }`
              )
            ) : (
              <IconAvatar className="w-4 h-4 text-gray-800" />
            )}
          </div>

          {session?.user ? (
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1 cursor-pointer w-36"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="text-slate-50 text-xs">
                  {/*este es el nombre que aparece cuando inico sesion */}
                  {`${session.user.nombre} ${session.user.apellido}` ||
                    'Usuario'}
                </span>
                {isMenuOpen ? (
                  <ChevronUp className="w-4 h-4 text-gray-500" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                )}
              </div>

              {/* Menú desplegable */}
              {isMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    href={`/PerfilComprador/${session.user.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                  <Link
                    href={`/PerfilComprador/turnos/${session.user.id}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mis Turnos
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={async () => {
                      // await signOut();
                      await signOut({ redirect: false });
                      window.location.href = '/'; // Forzar recarga
                    }}
                  >
                    {/* <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={logOut}
                  > */}
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
        <div className="w-3 h-6 text-slate-50" />
      </div>
    </div>
  );
}
