'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

import { fetchUsuario } from '@/actions/authActions';

export default function EditarCliente() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [formData, setFormdata] = useState({
    nombre: session?.user?.nombre || '',
    apellido: session?.user?.apellido || '',
    email: session?.user?.email || '',
    telefono: session?.user?.telefono || '',
    fecha_nacimiento: session?.user?.fecha_nacimiento || '',
  });

  const [errors, setErrors] = useState({
    telefono: '',
    fecha_nacimiento: '',
  });
  const [formCargado, setFormCargado] = useState(false);

  // Cargar datos del usuario
  useEffect(() => {
    async function cargarUsuario() {
      if (session?.user) {
        const usuario = await fetchUsuario(id);
        setFormdata({
          nombre: usuario.nombre || '',
          apellido: usuario.apellido || '',
          email: usuario.email || '',
          telefono: usuario.telefono || '',
          fecha_nacimiento: usuario.fecha_nacimiento || '',
        });
        setFormCargado(true);
      }
    }
    cargarUsuario();
  }, [id, session]);

  // Validar teléfono
  const validatePhone = (phone: string) => {
    const phoneRegex = /^\+?\d{10,15}$/;
    if (!phoneRegex.test(phone)) {
      setErrors((prev) => ({
        ...prev,
        telefono:
          'El teléfono debe tener entre 10 y 15 dígitos (puede incluir + al inicio)',
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, telefono: '' }));
    return true;
  };

  // Validar edad (mayor de 18 años)
  const validateAge = (birthDate: string) => {
    if (!birthDate) {
      setErrors((prev) => ({ ...prev, fecha_nacimiento: '' }));
      return true;
    }

    const birthDateObj = new Date(birthDate);
    const today = new Date();
    const minAgeDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    );

    if (birthDateObj > minAgeDate) {
      setErrors((prev) => ({
        ...prev,
        fecha_nacimiento: 'Debes tener al menos 18 años',
      }));
      return false;
    }
    setErrors((prev) => ({ ...prev, fecha_nacimiento: '' }));
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Validación especial para el teléfono
    if (name === 'telefono') {
      // Permitir solo números y el signo + al inicio
      const validPhone = value.match(/^\+?[0-9]*$/);
      if (!validPhone && value !== '') return;
    }

    setFormdata({
      ...formData,
      [name]: value,
    });

    // Validaciones en tiempo real
    if (name === 'telefono') {
      validatePhone(value);
    } else if (name === 'fecha_nacimiento') {
      validateAge(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones finales antes de enviar
    const isPhoneValid = validatePhone(formData.telefono);
    const isAgeValid = validateAge(formData.fecha_nacimiento);

    if (!isPhoneValid || !isAgeValid) {
      return;
    }

    try {
      const dataToSend = {
        ...formData,
        fecha_nacimiento: formData.fecha_nacimiento
          ? new Date(formData.fecha_nacimiento).toISOString()
          : null,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/api/usuarios/editar/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.user.token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        await update({
          ...session,
          user: {
            ...session?.user,
            nombre: formData.nombre,
            apellido: formData.apellido,
            email: formData.email,
            telefono: formData.telefono,
            fecha: formData.fecha_nacimiento,
          },
        });
        router.push(`/PerfilVendedor/${id}`);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('error al actualizar:', error);
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className="py-5">
      {/* <Encabezado title="Informacion Personal" subtitle=""></Encabezado> */}
      <div className="bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg">
          {/* Header */}
          <div className="flex items-center gap-2 px-6 py-4 bg-gray-800 text-gray-50 rounded-t-xl">
            <button
              onClick={() => router.back()}
              className="text-gray-50 hover:text-black"
            >
              ←
            </button>
            <h1 className="text-lg font-semibold">Editar</h1>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido
                </label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha Nacimiento
              </label>
              <input
                required
                type="date"
                name="fecha_nacimiento"
                value={
                  formData.fecha_nacimiento
                    ? new Date(formData.fecha_nacimiento)
                        .toISOString()
                        .split('T')[0]
                    : ''
                }
                onChange={handleChange}
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split('T')[0]
                }
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fecha_nacimiento && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fecha_nacimiento}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+541123456789 o 1123456789"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                pattern="^\+?\d{10,15}$"
                title="Debe tener entre 10 y 15 dígitos (puede incluir + al inicio)"
                required
              />
              {errors.telefono && (
                <p className="text-sm text-red-500 mt-1">{errors.telefono}</p>
              )}
            </div>

            <div className="flex justify-between gap-4 pt-4">
              <button
                type="submit"
                disabled={!!errors.telefono || !!errors.fecha_nacimiento}
                className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white px-5 py-2 rounded-lg font-semibold hover:bg-gray-700 disabled:bg-gray-400"
              >
                <span role="img" aria-label="lock">
                  🔒
                </span>{' '}
                Guardar Cambios
              </button>

              <button
                type="button"
                onClick={() => router.back()}
                className="w-full flex items-center justify-center gap-2 border border-gray-400 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300"
              >
                ✖ Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
