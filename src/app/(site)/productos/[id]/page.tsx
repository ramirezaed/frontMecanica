// import React from 'react';
// import { fetchProducto } from '@/actions/authActions';
// import Image from 'next/image';

// // Página asíncrona que usa `await` en params
// export default async function Page({ params }: { params: { id: string } }) {
//   // Espera a que `params` esté disponible
//   const { id } = await params; // Esperamos a que params esté disponible

//   // Obtenemos el producto
//   const producto = await fetchProducto(id);

//   if (!producto) {
//     return <div>No se encontró el producto</div>;
//   }

//   return (
//     <div className="flex flex-col md:flex-row items-center md:items-start p-8 max-w-[900px] mx-auto">
//       {/* Contenedor de la imagen */}
//       <div className="w-[400px] h-[300px] flex justify-center items-center">
//         <Image
//           src={producto.imagen}
//           alt={producto.nombre}
//           className="w-full h-full object-cover rounded-lg shadow-lg"
//         />
//       </div>

//       {/* Contenedor de la información */}
//       <div className="w-full md:w-[500px] h-auto md:h-[300px] flex flex-col justify-center p-4">
//         <h5 className="text-2xl font-semibold">{producto.nombre}</h5>
//         <p className="text-xl font-bold text-blue-600">
//           Precio: ${producto.precio_venta}
//         </p>
//         <p className="mt-4">{producto.descripcion}</p>
//         <p className="mt-4 text-lg">
//           <span className="font-semibold">Marca:</span> {producto.marca}
//         </p>
//         <p className="mt-2 text-lg">
//           <span className="font-semibold">Modelo:</span> {producto.modelo}
//         </p>
//       </div>
//     </div>
//   );
// }

export default function Page() {
  return <div>Producto</div>;
}
