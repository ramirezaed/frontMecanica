'use client';
import { TurnoUsuario } from '@/types';
import Link from 'next/link';
import { EstadoTurno } from '../etiquetas/estadoTurnos';

interface Props {
  turnos: TurnoUsuario[];
}

export default function TableroTurnos({ turnos }: Props) {
  const estados = ['Pendiente', 'En Proceso', 'Finalizado'];

  return (
    <div className="overflow-x-auto mt-10 px-4">
      <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Estado
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Nombre
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Email
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Fecha
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Vehículo
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Precio
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {estados.map((estado) =>
            turnos
              .filter((t) => t.estado_turno === estado)
              .map((turno) => (
                <tr key={turno._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700">
                    <EstadoTurno estado={estado} />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {turno.nombre} {turno.apellido}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {turno.email}
                  </td>
                  <td className="px-4 py-2 text-sm">{turno.fechaLocal}</td>
                  <td className="px-4 py-2 text-sm">
                    {turno.tipo_vehiculo} - {turno.modelo}
                  </td>
                  <td className="px-4 py-2 text-sm">
                    $
                    {turno.servicio?.precio
                      ? `$${turno.servicio.precio}`
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      // href={`/PerfilComprador/${session?.user.id}/turnos/${turno._id}`}
                      href={`/PerfilComprador/turnoDetalle/${turno._id}`}
                      className="w-full"
                    >
                      <button
                        onClick={() => console.log('Detalles de:', turno._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                      >
                        Detalles
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}
