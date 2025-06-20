// components/turnos/ColumnTurnos.tsx
import { TurnoUsuario } from '@/types';

interface Props {
  estado: string;
  turnos: TurnoUsuario[];
  color: string;
}

export default function ColumnTurnos({ estado, turnos, color }: Props) {
  return (
    <div className="w-full md:w-1/3 px-4">
      <h2 className={`text-xl font-bold mb-4 text-${color}-700`}>{estado}</h2>
      <div className="space-y-4">
        {turnos.map((turno) => (
          <div
            key={turno._id}
            className={`bg-white rounded-lg shadow-md p-4 border-l-4 border-${color}-500`}
          >
            <p className="font-semibold">
              {turno.nombre} {turno.apellido}
            </p>
            <p className="text-sm text-gray-600">{turno.email}</p>
            <p className="text-sm">
              📆 {new Date(turno.fecha).toLocaleString('es-AR')}
            </p>
            <p className="text-sm">
              🚗 {turno.tipo_vehiculo} - {turno.modelo}
            </p>
            <p className="text-sm">💲 ${turno.precio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
