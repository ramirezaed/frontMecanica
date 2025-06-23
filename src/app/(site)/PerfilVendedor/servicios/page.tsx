'use client';
import {
  ListaServicios,
  agregarServicio,
  editarServicio,
} from '@/actions/authActions';
import { Estados } from '@/components/etiquetas/estado';
import { Iservicio } from '@/types';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ModalAgregarServicio from '@/components/modales/agregarServicio';
import ModalEditarServicio from '@/components/modales/editarServicio';
import { IconLoading } from '@/assets/icons';

export default function Page() {
  const [servicios, setServicios] = useState<Iservicio[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargando, setCargando] = useState(true);
  const [loading, setLoading] = useState(false);
  const [idServicioEditar, setIdServicioEditar] = useState<string | null>(null);
  const { data: session } = useSession();

  // Cargar servicios
  const cargarServicios = async () => {
    try {
      setCargando(true);
      const data = await ListaServicios();
      setServicios(data);
    } catch (error) {
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarServicios();
  }, []);

  // Agregar servicio
  const handleAgregarServicio = async (data: {
    nombre: string;
    descripcion: string;
    precio: string;
  }) => {
    setLoading(true);
    try {
      await agregarServicio(data);
      await cargarServicios();
      setMostrarModal(false);
    } catch (error) {
      console.error('Error al agregar servicio:', error);
      alert('Ocurrió un error al agregar el servicio');
    } finally {
      setLoading(false);
    }
  };

  // Editar servicio
  const handleEditarServicio = async (
    id: string,
    data: { nombre: string; descripcion: string; precio: string }
  ) => {
    setLoading(true);
    try {
      await editarServicio(id, data);
      await cargarServicios();
      setIdServicioEditar(null); // Cierra el modal al guardar
    } catch (error) {
      console.error('Error al editar el servicio:', error);
      alert('Ocurrió un error al editar el servicio');
    } finally {
      setLoading(false);
    }
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center mt-20 text-gray-500">
        <IconLoading className="h-5 w-5 animate-spin" />
        Buscando Servicios...
      </div>
    );
  }

  // Control de acceso
  if (!session?.user.token || session.user?.rol_usuario !== 'vendedor') {
    return (
      <div className="flex flex-col items-center justify-center mt-32 px-6">
        <h2 className="text-3xl font-bold text-red-600 mb-2">
          Acceso denegado
        </h2>
        <p className="text-gray-600">
          No tienes permiso para acceder a esta página.
        </p>
      </div>
    );
  }

  return (
    <main>
      {servicios.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-32 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            No hay servicios
          </h2>
          <p className="text-gray-500">Aún no has registrado servicios.</p>
          <button
            onClick={() => setMostrarModal(true)}
            className="mt-6 inline-flex items-center rounded-lg bg-gray-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 transition"
          >
            + Agregar servicio
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div>
              <h1 className="flex justify-center text-xl font-bold text-gray-800">
                Servicios
              </h1>
            </div>
            <button
              onClick={() => setMostrarModal(true)}
              className="mt-3 sm:mt-0 inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-600 transition"
            >
              + Agregar servicio
            </button>
          </div>

          <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 bg-white">
              <thead className="bg-gray-50">
                <tr className="bg-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-50 uppercase tracking-wide">
                    Nombre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-50 uppercase tracking-wide">
                    Descripción
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-50 uppercase tracking-wide">
                    Precio
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-50 uppercase tracking-wide">
                    Estado
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-50 uppercase tracking-wide">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {servicios.map((servicio) => (
                  <tr key={servicio._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {servicio.nombre}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {servicio.descripcion}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-medium">
                      ${servicio.precio}
                    </td>
                    <td className="px-4 py-3">
                      <Estados estado={servicio.estado} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => setIdServicioEditar(servicio._id)}
                        className="inline-flex items-center rounded-full bg-gray-700 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-gray-600 transition"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {mostrarModal && (
        <ModalAgregarServicio
          onClose={() => setMostrarModal(false)}
          onGuardar={handleAgregarServicio}
          loading={loading}
        />
      )}

      {idServicioEditar && (
        <ModalEditarServicio
          id={idServicioEditar}
          onClose={() => setIdServicioEditar(null)}
          onGuardar={handleEditarServicio}
          loading={loading}
        />
      )}
    </main>
  );
}
