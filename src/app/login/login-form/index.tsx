'use client';

import { IconAvatar, IconLock, IconEye, IconLoading } from '@/assets/icons';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Verificar } from '@/actions/authActions';

export default function LoginFormulario() {
  const [verContraseña, setVerContraseña] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [googleCargando, setGoogleCargando] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const router = useRouter();
  const captcha = useRef<ReCAPTCHA>(null);

  const onChange = (value: string | null) => {
    setCaptchaToken(value);
    // console.log('Captcha completado:', value);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!captchaToken) {
      setError('Por favor completa el reCAPTCHA.');
      return;
    }

    const verificar = await Verificar(captchaToken);
    if (!verificar.success) {
      setError('Capcha invalido.');
      return;
    }

    setCargando(true);

    const form = e.target as HTMLFormElement; // 👈 NUEVO
    const formData = new FormData(form); // 👈 NUEVO
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setError('Datos Incorrectos.');
    } else if (result?.ok) {
      router.replace('/');
    }

    setCargando(false);
  }

  // async function handleGoogleSignIn() {
  //   setGoogleCargando(true);
  //   setError('');
  //   try {
  //     await signIn('google', { callbackUrl: '/' });
  //   } catch (error) {
  //     setError('Error al iniciar con Google');
  //   } finally {
  //     setGoogleCargando(false);
  //   }
  // }

  return (
    <div className="w-[400px] bg-white rounded-md shadow-md px-8 py-10 flex flex-col items-center border border-gray-200">
      <h2 className="text-2xl font-bold text-center">
        Inicia sesión en tu cuenta
      </h2>
      <p className="text-sm text-gray-500 mt-1">
        ¿No tienes una cuenta?{' '}
        <a href="/registroUsuarios" className="text-blue-600 hover:underline">
          Regístrate ahora
        </a>
      </p>

      <form onSubmit={handleSubmit} className="mt-6 w-full">
        {/* Email */}
        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
        <div className="border border-gray-300 rounded-md bg-white flex items-center px-3 py-2 mb-4">
          <IconAvatar className="w-4 h-4 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="ml-2 w-full bg-transparent text-sm outline-none"
            required
          />
        </div>

        {/* Contraseña */}
        <label className="text-sm font-medium text-gray-700 mb-1">
          Contraseña
        </label>
        <div className="border border-gray-300 rounded-md bg-white flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2 w-full">
            <IconLock className="w-4 h-4 text-gray-500" />
            <input
              type={verContraseña ? 'text' : 'password'}
              name="password"
              placeholder="********"
              className="w-full bg-transparent text-sm outline-none"
              required
            />
          </div>
          <IconEye
            open={verContraseña}
            className="w-4 h-4 text-gray-500 cursor-pointer"
            onClick={() => setVerContraseña(!verContraseña)}
          />
        </div>

        {/* Botón iniciar sesión */}
        <button
          type="submit"
          className="flex justify-center items-center w-full bg-gray-900 text-white font-semibold text-sm py-2 mt-5 rounded-md hover:bg-gray-800 transition"
          disabled={cargando}
        >
          {cargando ? (
            <IconLoading className="h-5 w-5 animate-spin" />
          ) : (
            'Iniciar Sesión'
          )}
        </button>

        {/* Separador */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-xs">o</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Botón Google */}
        {/* <button
          onClick={handleGoogleSignIn}
          disabled={googleCargando}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-sm rounded-md py-2 hover:bg-gray-50 transition disabled:opacity-50"
        >
          {googleCargando ? (
            <IconLoading className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google logo"
                className="w-5 h-5"
              />
              <span>Continuar con Google</span>
            </>
          )}
        </button> */}

        {/* CAPTCHA */}
        <div className="mt-4 flex justify-center">
          <ReCAPTCHA
            ref={captcha}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY_V2!}
            onChange={onChange}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
