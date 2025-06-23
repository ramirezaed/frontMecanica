import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import HeroSection from '@/components/homePage';
import ServiciosSeccion from '@/components/homePage/servicios';
import Encontranos from '@/components/homePage/Encontranos';
import CTA from '@/components/homePage/cta';
import Porque from '@/components/homePage/porqueNosotros';

export default async function Home() {
  const session = await auth();
  const rol = session?.user.rol_usuario;

  if (rol === 'admin') {
    redirect('/PerfilAdmin/usuarios/');
  } else if (rol === 'vendedor') {
    redirect('/PerfilVendedor/productos/');
  }

  return (
    <main>
      <HeroSection />
      <ServiciosSeccion />
      <Porque />
      <CTA />
      <Encontranos />
    </main>
  );
}
