'use client';

import { useState, useEffect } from 'react';
import { crearNuevoTurno, ServiciosActivos } from '@/actions/authActions';
import { useSession } from 'next-auth/react';
import { Iservicio } from '@/types';

export const TurnoForm = ({
  onSuccess,
}: {
  onSuccess: (data: Iservicio) => void;
}) => {
  const { data: session } = useSession();
  const [turnoData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    tipo_vehiculo: '',
    modelo: '',
    matricula: '',
    fecha: '',
    servicio: '',
  });
  const [servicios, setServicios] = useState<Iservicio[]>([]);
  const [selectedServicio, setSelectedServicio] = useState<Iservicio | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    // Fecha mínima hoy
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        nombre: session.user.nombre || '',
        apellido: session.user.apellido || '',
        email: session.user.email || '',
      }));
    }
  }, [session]);

  useEffect(() => {
    async function fetchServicios() {
      try {
        const data = await ServiciosActivos();
        setServicios(data);
      } catch (err) {
        console.error('Error al cargar servicios', err);
      }
    }
    fetchServicios();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === 'telefono') {
      const validPhone = value.match(/^\+?[0-9]*$/);
      if (!validPhone && value !== '') return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServicioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const servicio = servicios.find((s) => s._id === e.target.value);
    setSelectedServicio(servicio || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(turnoData.telefono)) {
      setError(
        'El teléfono debe tener entre 10 y 15 dígitos (puede incluir + al inicio)'
      );
      setLoading(false);
      return;
    }

    if (!selectedServicio) {
      setError('Por favor seleccione un servicio');
      setLoading(false);
      return;
    }

    const selectedDate = new Date(turnoData.fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate <= today) {
      setError('Debe seleccionar una fecha futura');
      setLoading(false);
      return;
    }

    try {
      const fechaFormateada = turnoData.fecha.includes('T')
        ? turnoData.fecha.split('T')[0]
        : turnoData.fecha;

      const resultado = await crearNuevoTurno({
        ...turnoData,
        fecha: fechaFormateada,
        servicioID: selectedServicio._id,
      });

      onSuccess({ ...resultado, ...turnoData, servicio: selectedServicio });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Reserva de Turno
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campos personales (nombre, apellido, email, teléfono) */}
              <div>
                <label className="block font-medium mb-2">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={turnoData.nombre}
                  onChange={handleChange}
                  placeholder="Juan"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={turnoData.apellido}
                  onChange={handleChange}
                  placeholder="Pérez"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={turnoData.email}
                  onChange={handleChange}
                  placeholder="ejemplo@correo.com"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={turnoData.telefono}
                  onChange={handleChange}
                  placeholder="+541123456789 o 1123456789"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>

              {/* Campos del vehículo */}
              <div>
                <label className="block font-medium mb-2">
                  Tipo de Vehículo
                </label>
                <input
                  type="text"
                  name="tipo_vehiculo"
                  value={turnoData.tipo_vehiculo}
                  onChange={handleChange}
                  placeholder="Camioneta"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Vehículo (Marca, Modelo, Año)
                </label>
                <input
                  type="text"
                  name="modelo"
                  value={turnoData.modelo}
                  onChange={handleChange}
                  placeholder="Ej: Ford Focus 2019"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Matrícula</label>
                <input
                  type="text"
                  name="matricula"
                  value={turnoData.matricula}
                  onChange={handleChange}
                  placeholder="Matrícula"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={turnoData.fecha}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                  min={minDate}
                />
              </div>

              {/* Servicio (siempre visible) */}
              <div>
                <label className="block font-medium mb-2">Servicio</label>
                <select
                  value={selectedServicio?._id || ''}
                  onChange={handleServicioChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Seleccione un servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio._id} value={servicio._id}>
                      {servicio.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {/* Precio (siempre visible) */}
              <div>
                <label className="block font-medium mb-2">Precio</label>
                <input
                  type="text"
                  value={
                    selectedServicio?.precio
                      ? `$${selectedServicio.precio}`
                      : ''
                  }
                  disabled
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>

              {/* Descripción (textarea grande, siempre visible) */}
              <div className="md:col-span-2">
                {' '}
                {/* Ocupa 2 columnas en pantallas medianas/grandes */}
                <label className="block font-medium mb-2">
                  Descripción del Servicio
                </label>
                <textarea
                  value={
                    selectedServicio?.descripcion ||
                    'Seleccione un servicio para ver detalles'
                  }
                  disabled
                  rows={4} // Altura ajustable
                  className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 resize-none"
                />
              </div>
            </div>
            <label className="font-medium mb-2 flex justify-center text-black">
              ¡ATENCION!
            </label>
            <label className="font-medium mb-2 flex justify-center text-red-500">
              El costo del servicio solo incluye mano de obra
            </label>
            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creando turno...
                  </span>
                ) : (
                  'Solicitar Turno'
                )}
              </button>
            </div>
            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};
