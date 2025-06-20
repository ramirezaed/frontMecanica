'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  altaUsuario,
  bajaUsuario,
  cambiarRol,
  fetchUsuario,
} from '@/actions/authActions';

import { Iusuario } from '@/types';
import {
  FiUser,
  FiMail,
  FiEdit2,
  FiSave,
  FiX,
  FiCheck,
  FiAlertCircle,
} from 'react-icons/fi';

export default function Page() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [usuario, setUsuario] = useState<Iusuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const { data: session } = useSession();

  // Cargar datos del usuario
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const datosUsuario = await fetchUsuario(id);
        setUsuario(datosUsuario);
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
    nombre: '',
    Apellido: '',
    Email: '',
    rol_usuario: '',
  });

  useEffect(() => {
    if (usuario) {
      setFormData({
        nombre: usuario.nombre || '',
        Apellido: usuario.apellido || '',
        Email: usuario.email || '',
        rol_usuario: usuario.rol_usuario || '',
      });
    }
  }, [usuario]);

  // Estado del usuario
  const [estadoUsuario, setEstadoUsuario] = useState(false);
  useEffect(() => {
    if (usuario) {
      setEstadoUsuario(usuario.estado === 'true' || usuario.estado === true);
    }
  }, [usuario]);

  // Cambiar estado del usuario
  const toggleEstadoUsuario = async () => {
    try {
      setCargando(true);
      estadoUsuario ? await bajaUsuario(id) : await altaUsuario(id);
      setEstadoUsuario(!estadoUsuario);
    } catch (error) {
      setError('No se pudo actualizar el estado del usuario');
      console.error('Error al cambiar el estado:', error);
    } finally {
      setCargando(false);
    }
  };

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //cambio el rol del usuario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cambiarRol(id, formData.rol_usuario);
      router.push('/PerfilAdmin/usuarios');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error al cambiar rol de usuario:', err);
    }
  };

  if (cargando) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FiUser className="text-gray-600" />
          Editar Usuario {usuario?.nombre}
        </h1>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            estadoUsuario
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {estadoUsuario ? 'Activo' : 'Inactivo'}
        </span>
      </div>

      {/* Tarjeta de información del usuario */}
      <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Nombre
            </label>
            <div className="flex items-center gap-2 text-gray-800">
              <FiUser className="text-gray-400" />
              {usuario?.nombre || 'N/A'}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Apellido
            </label>
            <div className="text-gray-800">{usuario?.apellido || 'N/A'}</div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Email
            </label>
            <div className="flex items-center gap-2 text-gray-800">
              <FiMail className="text-gray-400" />
              {usuario?.email || 'N/A'}
            </div>
          </div>
        </div>

        {/* Estado del usuario */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              Estado de la cuenta
            </h3>
            <p className="text-sm text-gray-500">
              {estadoUsuario ? 'Cuenta habilitada' : 'Cuenta deshabilitada'}
            </p>
          </div>
          <button
            onClick={toggleEstadoUsuario}
            disabled={cargando}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
              estadoUsuario
                ? 'bg-red-50 text-red-700 hover:bg-red-100'
                : 'bg-green-50 text-green-700 hover:bg-green-100'
            }`}
          >
            {estadoUsuario ? (
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
      </div>

      {/* Formulario de edición */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FiEdit2 className="text-gray-600" />
            Configuración del Rol
          </h2>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="rol_usuario"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Rol del Usuario
              </label>
              <select
                id="rol_usuario"
                name="rol_usuario"
                value={formData.rol_usuario}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-colors"
                required
              >
                <option value="" disabled>
                  Seleccione un rol
                </option>
                <option value="vendedor">Vendedor</option>
                <option value="comprador">Comprador</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.push(`/PerfilAdmin/usuarios/`)}
            className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <FiX /> Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <FiSave /> Guardar Cambios
          </button>
        </div>
      </form>

      {/* Mensaje de error */}
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200 flex items-start gap-3">
          <FiAlertCircle className="text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Error</h3>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}
    </div>
  );
}
