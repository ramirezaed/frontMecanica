import React from 'react';
import { auth } from '@/auth';
import Link from 'next/link';
import { fetchUsuario } from '@/actions/authActions';
import { UserIcon, CalendarIcon, MailIcon, PhoneIcon } from 'lucide-react';

// export default async function Page({ params }: { params: { id: string } }) {
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  const isCurrentUser = session?.user?.id === id;
  const cliente = await fetchUsuario(session!.user.id);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800"></h2>

          <p className="mt-4 text-gray-600">
            Por favor inicia sesión para ver este perfil
          </p>
        </div>
      </div>
    );
  }
  if (session.user.rol_usuario !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">
            Acceso No Autorizado
          </h2>
          <p className="mt-4 text-gray-600">
            No tienes permisos para ver esta página
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row p-8 gap-6 max-w-5xl mx-auto">
        {/* Panel lateral */}
        <div className="w-full md:w-1/3 max-w-sm rounded-xl shadow-lg flex flex-col overflow-hidden">
          {/* Encabezado con gradiente */}
          <div className="bg-gradient-to-b from-slate-900 to-slate-700 text-white p-6 flex flex-col items-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center text-2xl font-bold">
              {cliente.nombre?.charAt(0)}
              {cliente.apellido?.charAt(0)}
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold">
                {cliente.nombre} {cliente.apellido}
              </h2>
            </div>
          </div>

          {/* Cuerpo con fondo blanco */}
          <div className="bg-white text-gray-700 p-6 space-y-4 flex flex-col items-center">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MailIcon className="w-4 h-4 text-gray-600" />
              {cliente.email}
            </p>

            {isCurrentUser && (
              <>
                <Link
                  href={`/PerfilAdmin/${session.user.id}/editar`}
                  className="w-full"
                >
                  <button className="w-full px-4 py-2 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700">
                    Editar Perfil
                  </button>
                </Link>
                <button className="w-full px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600">
                  Eliminar Cuenta
                </button>
              </>
            )}
          </div>
        </div>

        {/* Panel principal */}
        <div className="flex flex-col w-full md:w-2/3 max-w-3xl space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
              <UserIcon className="w-5 h-5" /> Información Personal
            </h3>
            <div className="grid md:grid-cols-2 gap-4 text-gray-700">
              <p className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold">Nombre:</span> {cliente.nombre}
              </p>
              <p className="flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold">Apellido:</span>{' '}
                {cliente.apellido}
              </p>

              <p className="flex items-center gap-2">
                <MailIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold">Email:</span> {cliente.email}
              </p>
              <p className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold">Teléfono:</span>
                {cliente.telefono}
              </p>
              <p className="flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-gray-600" />
                <span className="font-semibold">Fecha Nacimiento:</span>
                {new Date(cliente.fecha_nacimiento).toLocaleDateString('es-AR')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
