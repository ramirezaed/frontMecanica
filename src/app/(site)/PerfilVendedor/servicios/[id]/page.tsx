'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  buscarServicioPorId,
  altaServicio,
  bajaServicio,
  editarServicio,
} from '@/actions/authActions';
import { Iservicio } from '@/types';
import { FiTag, FiX, FiCheck } from 'react-icons/fi';
import { Estados } from '@/components/etiquetas/estado';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [servicio, setServicio] = useState<Iservicio | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    estado: true,
  });
  const [estadoServicio, setEstadoServicio] = useState(false);

  // Cargar datos
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const datosServicio = await buscarServicioPorId(id);
        setServicio(datosServicio);
        if (datosServicio) {
          setFormData({
            nombre: datosServicio.nombre || '',
            descripcion: datosServicio.descripcion || '',
            precio: datosServicio.precio ? datosServicio.precio.toString() : '',
            estado: datosServicio.estado || true,
          });
          setEstadoServicio(datosServicio.estado === true);
        }
      } catch (error) {
        setError('Error al cargar los datos del servicio');
        console.error(error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  const handleGuardar = async () => {
    try {
      setCargando(true);
      setError(null);
      await editarServicio(id, {
        nombre: formData.nombre,
        descripcion: formData.descripcion,
        precio: formData.precio,
      });
      router.replace('/PerfilVendedor/servicios');
    } catch (err) {
      console.error('Error al editar servicio:', err);
      setError('No se pudo editar el servicio');
    } finally {
      setCargando(false);
    }
  };

  const toogleEstadoServicio = async () => {
    try {
      setCargando(true);
      estadoServicio ? await bajaServicio(id) : await altaServicio(id);
      setEstadoServicio(!estadoServicio);
    } catch (error) {
      setError('No se pudo actualizar el estado del servicio');
      console.error(error);
    } finally {
      setCargando(false);
    }
  };

  if (cargando && !servicio) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FiTag className="text-gray-600" />
            Editar el servicio: {servicio?.nombre}
          </h1>
          <span className="px-3 py-1 rounded-full text-xs font-medium ">
            <Estados estado={estadoServicio} />
          </span>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleGuardar();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 py-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 py-2">
              Descripción
            </label>
            <textarea
              value={formData.descripcion}
              onChange={(e) =>
                setFormData({ ...formData, descripcion: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              rows={3}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 py-2">
              Precio
            </label>
            <input
              type="number"
              value={formData.precio}
              onChange={(e) =>
                setFormData({ ...formData, precio: e.target.value })
              }
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
              step="0.01"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Estado del Servicio
              </h3>
              <p className="text-sm text-gray-500">
                {estadoServicio
                  ? 'Servicio habilitado'
                  : 'Servicio deshabilitado'}
              </p>
            </div>
            <button
              type="button"
              onClick={toogleEstadoServicio}
              disabled={cargando}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                estadoServicio
                  ? 'bg-red-50 text-red-700 hover:bg-red-100'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              }`}
            >
              {estadoServicio ? (
                <>
                  <FiX /> Deshabilitar
                </>
              ) : (
                <>
                  <FiCheck /> Habilitar
                </>
              )}
            </button>
          </div>

          <div className="flex gap-4 justify-center py-10">
            <button
              type="button"
              onClick={() => router.back()}
              className="w-60 flex items-center justify-center gap-2 border border-gray-400 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300"
            >
              ✖ Cancelar
            </button>
            <button
              type="submit"
              disabled={cargando}
              className="w-60 py-2 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700"
            >
              <span role="img" aria-label="lock">
                🔒
              </span>{' '}
              {cargando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
