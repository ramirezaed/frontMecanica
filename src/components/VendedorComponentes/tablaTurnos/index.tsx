'use client';
import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { EstadoTurno } from '@/components/etiquetas/estadoTurnos';
import { BuscadorTablas } from '@/components/buscador/buscadorTablas';
import { FiChevronUp, FiChevronDown, FiEye, FiUser } from 'react-icons/fi';
import { Iturno } from '@/types';

export function TablaTurnos({ params = [] }: { params?: Iturno[] }) {
  const [turnos, setTurnos] = useState<Iturno[]>(params || []);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [columnaOrden, setColumnaOrden] = useState<keyof Iturno>('email');
  const turnosPorPagina = 10;

  const turnosFiltrados = useMemo(() => {
    const terminoBusqueda = filtro.toLowerCase();
    return turnos
      .filter(
        (turno) =>
          (turno.nombre?.toLowerCase() || '').includes(terminoBusqueda) ||
          (turno.apellido?.toLowerCase() || '').includes(terminoBusqueda) ||
          (turno.email?.toLowerCase() || '').includes(terminoBusqueda) ||
          (turno.matricula?.toLowerCase() || '').includes(terminoBusqueda) ||
          (turno.fecha?.toLowerCase() || '').includes(terminoBusqueda)
      )
      .sort((a, b) => {
        const valorA = String(a[columnaOrden] || '').toLowerCase();
        const valorB = String(b[columnaOrden] || '').toLowerCase();
        return ordenAscendente
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      });
  }, [turnos, filtro, columnaOrden, ordenAscendente]);

  // Paginación
  const { turnosPagina, totalPaginas, indicePrimerTurno, indiceUltimoTurno } =
    useMemo(() => {
      const indiceUltimo = paginaActual * turnosPorPagina;
      const indicePrimer = indiceUltimo - turnosPorPagina;
      return {
        turnosPagina: turnosFiltrados.slice(indicePrimer, indiceUltimo),
        totalPaginas: Math.ceil(turnosFiltrados.length / turnosPorPagina),
        indicePrimerTurno: indicePrimer,
        indiceUltimoTurno: indiceUltimo,
      };
    }, [paginaActual, turnosPorPagina, turnosFiltrados]);

  // Cambiar página con validación
  const cambiarPagina = useCallback(
    (numeroPagina: number) => {
      setPaginaActual(Math.max(1, Math.min(numeroPagina, totalPaginas)));
    },
    [totalPaginas]
  );

  // Generar rango de páginas para la paginación
  const generarRangoPaginas = useCallback(() => {
    const paginas = [];
    const paginasAMostrar = 5;
    let inicio = 1;
    let fin = totalPaginas;

    if (totalPaginas > paginasAMostrar) {
      if (paginaActual <= Math.ceil(paginasAMostrar / 2)) {
        fin = paginasAMostrar;
      } else if (
        paginaActual >=
        totalPaginas - Math.floor(paginasAMostrar / 2)
      ) {
        inicio = totalPaginas - paginasAMostrar + 1;
      } else {
        inicio = paginaActual - Math.floor(paginasAMostrar / 2);
        fin = paginaActual + Math.floor(paginasAMostrar / 2);
      }
    }
    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }
    return paginas;
  }, [paginaActual, totalPaginas]);

  // Ordenar por columna
  const ordenarPorColumna = useCallback(
    (columna: keyof Iturno) => {
      if (columna === columnaOrden) {
        setOrdenAscendente(!ordenAscendente);
      } else {
        setColumnaOrden(columna);
        setOrdenAscendente(true);
      }
      setPaginaActual(1);
    },
    [columnaOrden, ordenAscendente]
  );

  return (
    <div className="">
      <div
        className="px-3 sm:px-6 py-10 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row 
                                justify-between items-start sm:items-center gap-3 
                                bg-gray-800 "
      >
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-50">Turnos</h2>
          <p className="text-xs sm:text-sm text-gray-50 mt-1">
            {turnosFiltrados.length} turno
            {turnosFiltrados.length !== 1 ? 's ' : ''}
            encontrado{turnosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <BuscadorTablas
            placeholder="Buscar turnos..."
            onBuscar={(termino) => {
              setFiltro(termino);
              setPaginaActual(paginaActual);
            }}
            valorInicial={filtro}
            delay={300}
          />
        </div>
      </div>

      {/* Contenido principal - Tabla responsiva */}
      <div className="overflow-x-auto sm:overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200/60 ">
          <thead className="bg-gray-50/80">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-colors"
                onClick={() => ordenarPorColumna('nombre')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Nombre</span>
                  <span className="sm:hidden">Nom.</span>
                  {columnaOrden === 'nombre' && (
                    <span className="ml-1">
                      {ordenAscendente ? (
                        <FiChevronUp className="h-3 w-3" />
                      ) : (
                        <FiChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-colors"
                onClick={() => ordenarPorColumna('apellido')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Apellido</span>
                  <span className="sm:hidden">Ape.</span>
                  {columnaOrden === 'apellido' && (
                    <span className="ml-1">
                      {ordenAscendente ? (
                        <FiChevronUp className="h-3 w-3" />
                      ) : (
                        <FiChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-colors"
                onClick={() => ordenarPorColumna('email')}
              >
                <div className="flex items-center">
                  Email
                  {columnaOrden === 'email' && (
                    <span className="ml-1">
                      {ordenAscendente ? (
                        <FiChevronUp className="h-3 w-3" />
                      ) : (
                        <FiChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>

              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-colors"
                onClick={() => ordenarPorColumna('matricula')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Matricula</span>
                  <span className="sm:hidden">Mat.</span>
                  {columnaOrden === 'matricula' && (
                    <span className="ml-1">
                      {ordenAscendente ? (
                        <FiChevronUp className="h-3 w-3" />
                      ) : (
                        <FiChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>
              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-colors"
                onClick={() => ordenarPorColumna('fecha')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Fecha</span>
                  <span className="sm:hidden">Fech.</span>
                  {columnaOrden === 'fecha' && (
                    <span className="ml-1">
                      {ordenAscendente ? (
                        <FiChevronUp className="h-3 w-3" />
                      ) : (
                        <FiChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>

              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100/60 transition-colors"
                onClick={() => ordenarPorColumna('estado_turno')}
              >
                <div className="flex items-center">
                  <span className="hidden sm:inline">Estado</span>
                  <span className="sm:hidden">Mat.</span>
                  {columnaOrden === 'estado_turno' && (
                    <span className="ml-1">
                      {ordenAscendente ? (
                        <FiChevronUp className="h-3 w-3" />
                      ) : (
                        <FiChevronDown className="h-3 w-3" />
                      )}
                    </span>
                  )}
                </div>
              </th>

              <th
                scope="col"
                className="px-3 py-2 sm:px-4 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Acciones
              </th>
            </tr>
          </thead>

          {/* CUERPO DE LA TABLA (ACA VAN LOS DATOS DE LOS USUARIOS) */}

          <tbody className="bg-white divide-y divide-gray-200/60 overflow-hidden">
            {turnosPagina.length > 0 ? (
              turnosPagina.map((turnos) => (
                <tr
                  key={turnos._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150 hover:scale-105"
                >
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-2 sm:ml-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">
                          {turnos.nombre}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-none">
                          {turnos.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[80px] sm:max-w-none">
                      {turnos.apellido}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                      {turnos.email}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                      {turnos.matricula}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                      {turnos.fechaLocal}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                      <EstadoTurno estado={turnos.estado_turno} />
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-1">
                      <Link
                        href={`/PerfilVendedor/turnos/${turnos._id}/`}
                        className="flex items-center text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded-full hover:bg-indigo-50"
                        title="Ver detalles"
                      >
                        <span className="mr-1">ver más</span>
                        <FiEye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="mb-4 p-4 bg-gray-100 rounded-full">
                      <FiUser className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-700">
                      No se encontraron usuarios
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Intenta ajustar tu búsqueda o filtro
                    </p>
                    <button
                      className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium flex items-center"
                      onClick={() => setFiltro('')}
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pie de tabla con paginación */}
      {turnosFiltrados.length > 0 && (
        <div className="bg-gray-50/80 px-3 sm:px-6 py-2 sm:py-3 flex flex-col xs:flex-row items-center justify-between border-t border-gray-200">
          <div className="mb-2 xs:mb-0">
            <p className="text-xs sm:text-sm text-gray-700">
              Mostrando{' '}
              <span className="font-medium">{indicePrimerTurno + 1}</span> a{' '}
              <span className="font-medium">
                {Math.min(indiceUltimoTurno, turnosFiltrados.length)}
              </span>{' '}
              de <span className="font-medium">{turnosFiltrados.length}</span>{' '}
              Turnos
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
              className={`p-1 sm:p-1.5 rounded-md ${
                paginaActual === 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Página anterior"
            >
              <FiChevronUp className="transform rotate-90 h-3 w-3 sm:h-4 sm:w-4" />
            </button>

            {generarRangoPaginas().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => cambiarPagina(pageNum)}
                className={`text-xs sm:text-sm w-6 h-6 sm:w-8 sm:h-8 rounded-md flex items-center justify-center ${
                  paginaActual === pageNum
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
              className={`p-1 sm:p-1.5 rounded-md ${
                paginaActual === totalPaginas
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title="Página siguiente"
            >
              <FiChevronUp className="transform -rotate-90 h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
