// import TablaTurnos from "@/components/VendedorComponentes/tablaTurnos";
import { TablaTurnos } from '@/components/VendedorComponentes/tablaTurnos';
import { ListaTurnos } from '@/actions/authActions';

export default async function Page() {
  const turnos = await ListaTurnos();
  return (
    <div className="">
      {/* <div className="w-full flex justify-center bg-red-500"> */}
      <TablaTurnos params={turnos} />
    </div>
  );
}
