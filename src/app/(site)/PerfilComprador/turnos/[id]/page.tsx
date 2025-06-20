import Encabezado from '@/components/encabezado/encabezado';
import { usuarioTurno } from '@/actions/authActions';
import BotonAtras from '@/components/botones/botonAtras';
import TableroTurnos from '@/components/misTurnos/tableroTurnos';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const turnos = await usuarioTurno(id);

  if (!turnos || turnos.length === 0) {
    return (
      <div>
        <Encabezado title="Mis Turnos" subtitle="" />
        <div className="flex flex-col items-center justify-center mt-16">
          <div className="text-2xl font-semibold text-gray-700 mb-4 mt-11">
            No tienes turnos asignados
          </div>
          <div className="text-sm text-gray-500 py-8 mt-14">
            Una vez que tengas turnos, aparecerán aquí.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Encabezado title="Mis Turnos" subtitle="" />

      <div className="flex justify-center w-full mt-10">
        <div className="w-full max-w-6xl">
          <TableroTurnos turnos={turnos} />
        </div>
      </div>

      <div className="flex justify-center mt-10 py-10">
        <BotonAtras />
      </div>
    </div>
  );
}
