'use client';
import { useState, useEffect } from 'react';
import { FiX, FiSave } from 'react-icons/fi';
import { buscarServicioPorId } from '@/actions/authActions';

interface ModalEditarServicioProps {
  id: string;
  onClose: () => void;
  onGuardar: (
    id: string,
    data: {
      nombre: string;
      descripcion: string;
      precio: string;
    }
  ) => void;
  loading: boolean;
}

export default function ModalEditarServicio({
  id,
  onClose,
  onGuardar,
  loading,
}: ModalEditarServicioProps) {
  const [servicioData, setServicioData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });
  const [cargandoDatos, setCargandoDatos] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargandoDatos(true);
        const servicio = await buscarServicioPorId(id);
        if (servicio) {
          setServicioData({
            nombre: servicio.nombre || '',
            descripcion: servicio.descripcion || '',
            precio: servicio.precio ? servicio.precio.toString() : '',
          });
        }
      } catch (error) {
        console.error('Error al cargar servicio:', error);
      } finally {
        setCargandoDatos(false);
      }
    };
    cargarDatos();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setServicioData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGuardar(id, servicioData);
  };

  if (cargandoDatos) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-center">Cargando datos del servicio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-full max-w-[500px] mx-auto bg-white p-6 rounded-lg shadow border border-black">
        <h1 className="text-xl font-bold text-black py-2">Editar servicio</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={servicioData.nombre}
              onChange={handleChange}
              required
              className="mt-1 h-8 block w-full rounded-md border border-gray-500 "
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="descripcion"
              value={servicioData.descripcion}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1 block w-full rounded-md border border-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              value={servicioData.precio}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              className="mt-1 h-8 block w-full rounded-md border border-gray-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-100"
            >
              <FiX className="h-4 w-4" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 disabled:opacity-50"
            >
              <FiSave className="h-4 w-4" />
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
