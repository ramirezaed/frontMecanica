'use client';
import {
  CambiarEstadoTurno,
  fetchTurnos,
  editarTurno,
} from '@/actions/authActions';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { TurnoUsuario } from '@/types';
import { FiEdit2, FiSave, FiX } from 'react-icons/fi';
import { IconLoading } from '@/assets/icons';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const [cargando, setCargando] = useState(true);
  const [turno, setTurnos] = useState<TurnoUsuario | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Cargar datos del usuario
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const datosTurnos = await fetchTurnos(id);
        setTurnos(datosTurnos);
      } catch (error) {
        setError('Error al cargar los datos del usuario');
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  // Estado del formulario
  const [formData, setFormData] = useState({
    Estado: '',
    Descripcion: '',
  });

  useEffect(() => {
    if (turno) {
      setFormData({
        Estado: turno.estado_turno || '',
        Descripcion: turno.descripcion || '',
      });
    }
  }, [turno]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await CambiarEstadoTurno(id, formData.Estado);
      await editarTurno(id, { descripcion: formData.Descripcion });
      router.push('/PerfilVendedor/turnos');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al cambiar rol de usuario:', err);
    }
  };
  if (cargando) {
    return (
      <div className="flex justify-center items-center mt-20 text-gray-500">
        <IconLoading className="h-5 w-5 animate-spin" />
        Buscando turno...
      </div>
    );
  }
  if (!turno) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        No se encontró el turno
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center  p-19">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-9 mt-20">
        {/* Título principal */}
        <h1 className="text-4xl font-semibold text-gray-800 border-b pb-4 mb-6">
          {turno.nombre} {turno.apellido}
        </h1>
        <p className="text-lg text-gray-600">{turno.email}</p>

        {/* Información general del turno */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Teléfono:</span>
            <span>{turno.telefono}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">| Fecha del Turno:</span>
            <span>{new Date(turno.fecha).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">Vehículo:</span>
            <span>
              {turno.tipo_vehiculo} {turno.modelo}
            </span>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <span className="font-medium">| Matrícula:</span>
            <span>{turno.matricula}</span>
          </div>
        </div>

        {/* Sección de precio */}
        <div className="flex justify-between items-center text-2xl font-semibold text-green-600 mt-8 border-t-2 pt-6">
          <span className="font-medium">Precio:</span>
          <span>${turno.servicio.precio}</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FiEdit2 className="text-gray-600" />
              Estado del turno
            </h2>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="estado_turno"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Estado del Turno
                </label>
                <select
                  id="Estado"
                  name="Estado"
                  value={formData.Estado}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                  required
                >
                  <option value="" disabled>
                    Seleccione un estado
                  </option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="En Proceso">En Proceso</option>
                  <option value="Finalizado">Finalizado</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between text-lg text-gray-700">
            <div>
              <label
                htmlFor="Descripcion"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Descripción
              </label>
              <textarea
                id="Descripcion"
                name="Descripcion"
                value={formData.Descripcion}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                rows={3}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col mt-1">
            <button
              type="button"
              onClick={() => router.push(`/PerfilVendedor/turnos/`)}
              className="flex-1 mt-1 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FiX /> Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 mt-1 px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
            >
              <FiSave /> Guardar Cambios
            </button>
          </div>
        </form>

        {/* Detalle de creación */}
        <div className="mt-4 text-sm text-gray-500">
          <span className="font-semibold">Creado el:</span>{' '}
          {new Date(turno.creado_el).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
