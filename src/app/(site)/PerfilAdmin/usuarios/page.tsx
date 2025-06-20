import { TablaUsuarios } from '@/components/adminComponentes/TablaUsuarios';

import { ListaUsuarios } from '@/actions/authActions';

export default async function Page() {
  const usuarios = await ListaUsuarios();

  if (!usuarios) {
    return <div>error al cargar usuarios acd</div>;
  }
  return (
    <div className="">
      <TablaUsuarios params={usuarios} />
    </div>
  );
}
