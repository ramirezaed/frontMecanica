// 'use client';
// import { useState, useMemo, useCallback } from 'react';

// import { Iproductos } from '@/types';

// export function TablaUsuarios({ params = [] }: { params?: Iproductos[] }) {
//   const [productos, setUsuarios] = useState<Iproductos[]>(params || []);
//   const [ordenAscendente, setOrdenAscendente] = useState(true);
//   const [filtro, setFiltro] = useState('');
//   const [paginaActual, setPaginaActual] = useState(1);
//   const [columnaOrden, setColumnaOrden] = useState<keyof Iproductos>('nombre');
//   const productosPorPagina = 3;

//   // Memoizar usuarios filtrados y ordenados
//   const productosFiltrados = useMemo(() => {
//     const terminoBusqueda = filtro.toLowerCase();
//     return productos
//       .filter(
//         (product) =>
//           product.nombre.toLowerCase().includes(terminoBusqueda) ||
//           product.descripcion.toLowerCase().includes(terminoBusqueda) ||
//           product.precio_venta.toLowerCase().includes(terminoBusqueda)
//       )
//       .sort((a, b) => {
//         const valorA = String(a[columnaOrden]).toLowerCase();
//         const valorB = String(b[columnaOrden]).toLowerCase();
//         return ordenAscendente
//           ? valorA.localeCompare(valorB)
//           : valorB.localeCompare(valorA);
//       });
//   }, [productos, filtro, columnaOrden, ordenAscendente]);

//   // Paginación
//   const {
//     productosPagina,
//     totalPaginas,
//     indicePrimerProducto,
//     indiceUltimoProducto,
//   } = useMemo(() => {
//     const indiceUltimo = paginaActual * productosPorPagina;
//     const indicePrimer = indiceUltimo - productosPorPagina;
//     return {
//       productosPagina: productosFiltrados.slice(indicePrimer, indiceUltimo),
//       totalPaginas: Math.ceil(productosFiltrados.length / productosPorPagina),
//       indicePrimerProducto: indicePrimer,
//       indiceUltimoProducto: indiceUltimo,
//     };
//   }, [paginaActual, productosPorPagina, productosFiltrados]);

//   // Cambiar página con validación
//   const cambiarPagina = useCallback(
//     (numeroPagina: number) => {
//       setPaginaActual(Math.max(1, Math.min(numeroPagina, totalPaginas)));
//     },
//     [totalPaginas]
//   );

//   // Generar rango de páginas para la paginación
//   const generarRangoPaginas = useCallback(() => {
//     const paginas = [];
//     const paginasAMostrar = 5;
//     let inicio = 1;
//     let fin = totalPaginas;

//     if (totalPaginas > paginasAMostrar) {
//       if (paginaActual <= Math.ceil(paginasAMostrar / 2)) {
//         fin = paginasAMostrar;
//       } else if (
//         paginaActual >=
//         totalPaginas - Math.floor(paginasAMostrar / 2)
//       ) {
//         inicio = totalPaginas - paginasAMostrar + 1;
//       } else {
//         inicio = paginaActual - Math.floor(paginasAMostrar / 2);
//         fin = paginaActual + Math.floor(paginasAMostrar / 2);
//       }
//     }
//     for (let i = inicio; i <= fin; i++) {
//       paginas.push(i);
//     }
//     return paginas;
//   }, [paginaActual, totalPaginas]);

//   // Ordenar por columna
//   const ordenarPorColumna = useCallback(
//     (columna: keyof Iproductos) => {
//       if (columna === columnaOrden) {
//         setOrdenAscendente(!ordenAscendente);
//       } else {
//         setColumnaOrden(columna);
//         setOrdenAscendente(true);
//       }
//       setPaginaActual(1);
//     },
//     [columnaOrden, ordenAscendente]
//   );
// }
