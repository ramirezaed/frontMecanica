import { TablaTurnos } from '@/components/VendedorComponentes/tablaTurnos';
import { ListaTurnos } from '@/actions/authActions';

export default async function Page() {
  const turnos = await ListaTurnos();
  if (!turnos || turnos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-16">
        <div className="text-2xl font-semibold text-gray-700 mb-4 mt-11">
          No se encontro ninguna solicitud para un turno
        </div>
        <div className="text-sm text-gray-500 py-8 mt-14">
          Una vez que se realice una solicitud, aparecerá aquí.
        </div>
      </div>
    );
  }
  return (
    <div className="">
      <TablaTurnos params={turnos} />
    </div>
  );
}
