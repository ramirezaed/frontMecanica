import { ServiciosActivos } from '@/actions/authActions';
import { Iservicio } from '@/types';
import { Estados } from '@/components/etiquetas/estado';
import Link from 'next/link';

export default async function Page() {
  const servicios = await ServiciosActivos();

  if (!servicios || servicios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-32 px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          No hay servicios
        </h2>
        <p className="text-gray-600">Aún no has registrado servicios.</p>
      </div>
    );
  }

  return (
    <main className="">
      {/* <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Servicios disponibles
      </h1> */}
      <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Nombre
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Descripción
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Precio
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Estado
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white">
                Acción
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {servicios.map((servicio: Iservicio) => (
              <tr key={servicio._id}>
                <td className="px-6 py-4 text-gray-900 font-medium">
                  {servicio.nombre}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {servicio.descripcion}
                </td>
                <td className="px-6 py-4 text-gray-900 font-semibold">
                  ${servicio.precio}
                </td>
                <td className="px-6 py-4">
                  <span>
                    <Estados estado={servicio.estado} />
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link href={`/PerfilVendedor/servicios/${servicio._id}`}>
                    <span className="text-gray-900 font-medium hover:underline cursor-pointer">
                      Editar
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
