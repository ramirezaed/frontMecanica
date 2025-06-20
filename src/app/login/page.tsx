import Image from 'next/image';
import LoginFomulario from './login-form';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await auth();
  if (session) {
    redirect('/');
  }

  return (
    <main className="w-screen h-screen flex flex-col md:flex-row">
      {/* Contenedor de la imagen - Oculto en mobile, visible en pantallas medianas/grandes */}
      <div className="hidden md:block relative md:w-1/2 h-1/3 md:h-full overflow-hidden">
        <Image
          src="/logo1.png"
          alt="Imagen de fondo"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Contenedor del formulario - Ocupa 100% en mobile, 50% en pantallas grandes */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4">
        <LoginFomulario />
      </div>
    </main>
  );
}
