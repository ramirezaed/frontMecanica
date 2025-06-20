import { fetchTurnos } from '@/actions/authActions';
import BotonAtras from '@/components/botones/botonAtras';
import Encabezado from '@/components/encabezado/encabezado';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const turno = await fetchTurnos(id);

  if (!turno) {
    return (
      <div>
        <Encabezado title="Error" subtitle="vuelva a intentar de nuevo" />
        <div className="text-center text-red-500 text-lg mt-12 ">
          No se encontró el turno
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Encabezado title="Detalles del Turno" subtitle="" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          {/* Encabezado minimalista */}
          <div className=" bg-gray-200 p-6 text-gray-800">
            <h1 className="text-2xl font-bold">
              {turno.nombre} {turno.apellido}
            </h1>
            <p className="text-gray-800">{turno.email}</p>
          </div>

          {/* Cuerpo principal - diseño limpio */}
          <div className="p-6 space-y-8">
            {/* Información básica en lista simple */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Información de Contacto
                </h3>
                <p className="flex justify-between">
                  <span className="text-gray-600">Teléfono:</span>
                  <span className="text-gray-800 font-medium">
                    {turno.telefono}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="text-gray-800 font-medium">
                    {turno.email}
                  </span>
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Detalles del Vehículo
                </h3>
                <p className="flex justify-between">
                  <span className="text-gray-600">Vehículo:</span>
                  <span className="text-gray-800 font-medium">
                    {turno.tipo_vehiculo} {turno.modelo}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Matrícula:</span>
                  <span className="text-gray-800 font-medium">
                    {turno.matricula}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-600">Fecha:</span>
                  <span className="text-gray-800 font-medium">
                    {new Date(turno.fecha).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </p>
              </div>
            </div>

            {/* Línea de tiempo destacada */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
                Estado del Turno
              </h2>

              <div className="relative">
                {/* Barra de progreso */}
                <div className="absolute top-5 left-0 right-0 h-1.5 bg-gray-300 rounded-full z-0">
                  <div
                    className="h-full bg-gray-800 rounded-full"
                    style={{
                      width:
                        turno.estado_turno === 'pendiente'
                          ? '0%'
                          : turno.estado_turno === 'en proceso'
                          ? '50%'
                          : '100%',
                    }}
                  ></div>
                </div>

                {/* Pasos */}
                <div className="flex justify-between relative z-10">
                  {['pendiente', 'en proceso', 'finalizado'].map(
                    (estado, index) => {
                      const isCompleted =
                        index <
                        ['pendiente', 'en proceso', 'finalizado'].indexOf(
                          turno.estado_turno.toLowerCase()
                        );
                      const isCurrent =
                        index ===
                        ['pendiente', 'en proceso', 'finalizado'].indexOf(
                          turno.estado_turno.toLowerCase()
                        );
                      const isFinished =
                        turno.estado_turno.toLowerCase() === 'finalizado' &&
                        index === 2;

                      return (
                        <div
                          key={estado}
                          className="flex flex-col items-center"
                          style={{ width: '30%' }}
                        >
                          {/* Punto del estado */}
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 border-4 ${
                              isFinished
                                ? 'bg-gray-800 border-gray-800'
                                : isCurrent
                                ? 'bg-white border-gray-800'
                                : isCompleted
                                ? 'bg-gray-800 border-gray-800'
                                : 'bg-white border-gray-300'
                            }`}
                          >
                            {(isCompleted || isFinished) && (
                              <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>

                          {/* Texto del estado */}
                          <span
                            className={`text-sm font-medium capitalize ${
                              isCurrent || isCompleted || isFinished
                                ? 'text-gray-800'
                                : 'text-gray-400'
                            }`}
                          >
                            {estado}
                          </span>

                          {/* Indicador de estado actual */}
                          {isCurrent && !isFinished && (
                            <span className="text-xs text-gray-500 mt-1">
                              Actual
                            </span>
                          )}
                          {isFinished && (
                            <span className="text-xs text-gray-500 mt-1">
                              Completado
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
                Descripción del Servicio
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {turno.descripcion || 'Sin descripción proporcionada.'}
              </p>
            </div>

            {/* Sección de precio simple */}

            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-lg">
              <div>
                <h3 className="text-gray-800 font-semibold">
                  Total del servicio
                </h3>
                <p className="text-gray-600 text-sm">Precio final</p>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ${turno.precio}
              </div>
            </div>

            {/* Pie de página */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                <p>Creado el: {new Date(turno.creado_el).toLocaleString()}</p>
              </div>
              <BotonAtras />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
