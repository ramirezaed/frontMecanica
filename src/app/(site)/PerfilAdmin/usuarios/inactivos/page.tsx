import { TablaUsuarios } from '@/components/adminComponentes/TablaUsuarios';
import { fetchUsuariosInactivos } from '@/actions/authActions';

export default async function Page() {
  const usuarios = await fetchUsuariosInactivos();
  if (!usuarios) {
    return <div>error al cargar usuarios Inactivos</div>;
  }
  return <TablaUsuarios params={usuarios} />;
}
