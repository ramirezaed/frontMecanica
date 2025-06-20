// import Image from "next/image";
// import Link from "next/link";
// import { productosActivos } from "@/actions/authActions";

// interface Iproducto {
//     _id:string,
//     nombre: string,
//     precio_venta:number,
//     descripcion:string,
//     imagen:string
// }

// export default async function Page( {params}:{params?: {pagina?:string}}) {
//     const productos = await productosActivos() as Iproducto[]
//     return (
//       // <ProductoCard productos={productosC}/>
//         <div className="w-full flex justify-center py-4">
//           <div className="grid grid-cols-1  gap-6 p-4">
//             {productos.map(({ _id, nombre, imagen, descripcion, precio_venta }) => (

//               <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4" key={_id}>
//                 {/* Imagen del producto */}
//                 <div className="w-36 h-36 flex-shrink-0">
//                   <img src={imagen} alt={nombre} className="w-full h-full object-cover rounded-lg" />
//                 </div>

//                 {/* Detalles del producto */}
//                 <div className="flex flex-col flex-grow">
//                   <h2 className="text-lg font-semibold text-gray-900">{nombre}</h2>
//                   <p className="text-sm text-gray-600 mb-2">{descripcion}</p>

//                   {/* Precio y Descuento */}
//                   <div className="flex items-center gap-2">
//                     <span className="text-lg font-bold text-green-600">${precio_venta}</span>
//                     <span className="text-sm text-gray-500 line-through">${(precio_venta * 1.2).toFixed(2)}</span>
//                     <span className="text-sm text-green-500 font-semibold">20% OFF</span>
//                   </div>

//                   {/* Botones */}
//                   <div className="flex gap-2 mt-3">
//                     <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700">
//                       Comprar Ahora
//                     </button>
//                     <button className="bg-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-300">
//                       Agregar al Carrito
//                     </button>
//                     <Link href={`/productos/${_id}`} className="text-blue-500">
//                      Ver más
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//        );
//     }

export default function Page() {
  return <div>Producto</div>;
}
