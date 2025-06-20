'use client';
import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Estados } from '@/components/etiquetas/estado';
import { Roles } from '@/components/etiquetas/rol';
import { BuscadorTablas } from '@/components/buscador/buscadorTablas';
import { Iusuario } from '@/types';
import { FiChevronUp, FiChevronDown, FiEye, FiUser } from 'react-icons/fi';

export function TablaUsuarios({ params = [] }: { params?: Iusuario[] }) {
  const [usuarios, setUsuarios] = useState<Iusuario[]>(params || []);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [paginaActual, setPaginaActual] = useState(1);
  const [columnaOrden, setColumnaOrden] = useState<keyof Iusuario>('email');
  const usuariosPorPagina = 10;

  // Memoizar usuarios filtrados y ordenados
  const usuariosFiltrados = useMemo(() => {
    const terminoBusqueda = filtro.toLowerCase();
    return usuarios
      .filter(
        (user) =>
          user.nombre.toLowerCase().includes(terminoBusqueda) ||
          user.apellido.toLowerCase().includes(terminoBusqueda) ||
          user.email.toLowerCase().includes(terminoBusqueda) ||
          user.rol_usuario.toLowerCase().includes(terminoBusqueda)
      )
      .sort((a, b) => {
        const valorA = String(a[columnaOrden]).toLowerCase();
        const valorB = String(b[columnaOrden]).toLowerCase();
        return ordenAscendente
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      });
  }, [usuarios, filtro, columnaOrden, ordenAscendente]);

  // Paginación
  const {
    usuariosPagina,
    totalPaginas,
    indicePrimerUsuario,
    indiceUltimoUsuario,
  } = useMemo(() => {
    const indiceUltimo = paginaActual * usuariosPorPagina;
    const indicePrimer = indiceUltimo - usuariosPorPagina;
    return {
      usuariosPagina: usuariosFiltrados.slice(indicePrimer, indiceUltimo),
      totalPaginas: Math.ceil(usuariosFiltrados.length / usuariosPorPagina),
      indicePrimerUsuario: indicePrimer,
      indiceUltimoUsuario: indiceUltimo,
    };
  }, [paginaActual, usuariosPorPagina, usuariosFiltrados]);

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
    (columna: keyof Iusuario) => {
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

  // Renderizar avatar del usuario
  const renderAvatar = (nombre: string) => (
    <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center shadow-sm">
      <span className="text-indigo-600 font-medium text-sm sm:text-base">
        {nombre.charAt(0).toUpperCase()}
      </span>
    </div>
  );

  return (
    <div className="w-full h-max">
      <div
        className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex flex-col sm:flex-row
                              justify-between items-start sm:items-center gap-3
                              "
      >
        <div className="items-center">
          <h2 className=" text-lg sm:text-2xl font-bold text-gray-800">
            Gestión de Usuarios
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {usuariosFiltrados.length} usuario
            {usuariosFiltrados.length !== 1 ? 's' : ''}
            encontrado{usuariosFiltrados.length !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="relative w-full sm:w-64">
          <BuscadorTablas
            placeholder="Buscar usuarios..."
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
        <table className="min-w-full divide-y divide-gray-200/60">
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
                onClick={() => ordenarPorColumna('estado')}
              >
                <div className="flex items-center">
                  Estado
                  {columnaOrden === 'estado' && (
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
                onClick={() => ordenarPorColumna('rol_usuario')}
              >
                <div className="flex items-center">
                  Rol
                  {columnaOrden === 'rol_usuario' && (
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
          <tbody className="bg-white divide-y divide-gray-200/60">
            {usuariosPagina.length > 0 ? (
              usuariosPagina.map((usuario) => (
                <tr
                  key={usuario._id}
                  className="hover:bg-gray-50/80 transition-colors duration-150"
                >
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {renderAvatar(usuario.nombre)}
                      <div className="ml-2 sm:ml-4">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">
                          {usuario.nombre}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[100px] sm:max-w-none">
                          {usuario.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[80px] sm:max-w-none">
                      {usuario.apellido}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-700 truncate max-w-[120px] sm:max-w-none">
                      {usuario.email}
                    </div>
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <Estados estado={usuario.estado} />
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                    <Roles rol={usuario.rol_usuario} />
                  </td>
                  <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-1">
                      <Link
                        href={`/PerfilAdmin/usuarios/${usuario._id}/`}
                        className="flex items-center text-indigo-600 hover:text-indigo-900 transition-colors p-1 rounded-full hover:bg-indigo-50"
                        title="Ver detalles"
                      >
                        <span className="mr-1">Editar</span>
                        <FiEye className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Link>
                      {/* <button 
                                                    className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-50"
                                                    title="Editar"
                                                >
                                                    <FiEdit2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </button>
                                                <button 
                                                    className="text-gray-500 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
                                                    title="Eliminar"
                                                >
                                                    <FiTrash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                                                </button> */}
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
      {usuariosFiltrados.length > 0 && (
        <div className="bg-gray-50/80 px-3 sm:px-6 py-2 sm:py-3 flex flex-col xs:flex-row items-center justify-between border-t border-gray-200">
          <div className="mb-2 xs:mb-0">
            <p className="text-xs sm:text-sm text-gray-700">
              Mostrando{' '}
              <span className="font-medium">{indicePrimerUsuario + 1}</span> a{' '}
              <span className="font-medium">
                {Math.min(indiceUltimoUsuario, usuariosFiltrados.length)}
              </span>{' '}
              de <span className="font-medium">{usuariosFiltrados.length}</span>{' '}
              usuarios
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
    </div>
  );
}
