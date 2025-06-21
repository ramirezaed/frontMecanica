'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { nuevoUsuario, buscarUsuarioPorEmail } from '@/actions/authActions';

export const RegistroForm = ({
  onSuccess,
}: {
  onSuccess: (data: any) => void;
}) => {
  const router = useRouter();
  const [usuarioData, setFormData] = useState({
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    email: '',
    contraseña: '',
    confirmarContraseña: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailVerificado, setEmailVerificado] = useState(false);
  const [verificandoEmail, setVerificandoEmail] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  //verifiar que los dos input de contraseña sean iguales
  useEffect(() => {
    if (usuarioData.confirmarContraseña) {
      if (usuarioData.contraseña !== usuarioData.confirmarContraseña) {
        setConfirmPasswordError('Las contraseñas no coinciden');
      } else {
        setConfirmPasswordError('');
      }
    } else {
      setConfirmPasswordError('');
    }
  }, [usuarioData.contraseña, usuarioData.confirmarContraseña]);

  // Verificación automática del email cuando cambia
  useEffect(() => {
    const verificarEmail = async () => {
      if (!usuarioData.email) {
        setEmailVerificado(false);
        return;
      }

      // Validación de formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(usuarioData.email)) {
        return;
      }

      try {
        setVerificandoEmail(true);
        await buscarUsuarioPorEmail(usuarioData.email);

        // Si no hay error, significa que el email ya existe
        window.alert('Este email ya está registrado');
        setEmailVerificado(false);
      } catch (error) {
        // Si hay error, significa que el email no existe
        setEmailVerificado(true);
      } finally {
        setVerificandoEmail(false);
      }
    };

    const timer = setTimeout(() => {
      verificarEmail();
    }, 1000);

    return () => clearTimeout(timer);
  }, [usuarioData.email]);

  // Validación de contraseña en tiempo real
  useEffect(() => {
    if (usuarioData.contraseña) {
      validatePassword(usuarioData.contraseña);
    } else {
      setPasswordError('');
    }
  }, [usuarioData.contraseña]);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      return false;
    }
    if (!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      setPasswordError('La contraseña debe contener letras y números');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Verificar que el email esté disponible
      if (!emailVerificado) {
        setError('Por favor ingrese un email válido y disponible');
        return;
      }

      // Validar fecha de nacimiento (mayor de 18 años)
      const fechaNacimiento = new Date(usuarioData.fecha_nacimiento);
      const hoy = new Date();
      const edadMinima = new Date(
        hoy.getFullYear() - 18,
        hoy.getMonth(),
        hoy.getDate()
      );

      if (fechaNacimiento > edadMinima) {
        setError('Debes tener al menos 18 años para registrarte');
        return;
      }

      // Validar contraseña
      if (!validatePassword(usuarioData.contraseña)) {
        return;
      }

      // Registrar el usuario
      const resultado = await nuevoUsuario(usuarioData);

      // Iniciar sesión automáticamente
      const loginResult = await signIn('credentials', {
        email: usuarioData.email,
        password: usuarioData.contraseña,
        redirect: false,
      });

      if (loginResult?.error) {
        throw new Error(loginResult.error);
      }

      onSuccess({
        ...resultado,
        nombre: usuarioData.nombre,
        apellido: usuarioData.apellido,
        fecha: usuarioData.fecha_nacimiento,
        email: usuarioData.email,
      });

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-50  p-8 rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Crear Cuenta
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="nombre"
            value={usuarioData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="apellido"
            value={usuarioData.apellido}
            onChange={handleChange}
            placeholder="Apellido"
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
        </div>

        <div>
          <input
            type="date"
            name="fecha_nacimiento"
            value={usuarioData.fecha_nacimiento.split('T')[0]}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
            max={
              new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                .toISOString()
                .split('T')[0]
            }
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={usuarioData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
          {verificandoEmail && (
            <p className="text-sm text-gray-500 mt-1">Verificando email...</p>
          )}
        </div>

        <div className="md:col-span-2">
          <input
            type="password"
            name="contraseña"
            value={usuarioData.contraseña}
            onChange={handleChange}
            placeholder="Contraseña (mínimo 8 caracteres con letras y números)"
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
          {passwordError && (
            <p className="text-sm text-red-500 mt-1">{passwordError}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <input
            type="password"
            name="confirmarContraseña"
            value={usuarioData.confirmarContraseña}
            onChange={handleChange}
            placeholder="Repetir contraseña"
            className="w-full p-3 border border-gray-300 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 transition"
            required
          />
        </div>
        {confirmPasswordError && (
          <p className="text-sm text-red-500 mt-1">{confirmPasswordError}</p>
        )}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={
            loading ||
            !emailVerificado ||
            !!passwordError ||
            !!confirmPasswordError
          }
          className="w-full bg-gray-800 text-white p-3 rounded-xl font-semibold hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
        </button>

        {error && <p className="mt-3 text-red-500 text-center">{error}</p>}

        <Link
          href={'/login'}
          className="block text-center mt-6 text-gray-800 font-semibold hover:underline hover:text-gray-600 transition"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </div>
    </form>
  );
};
