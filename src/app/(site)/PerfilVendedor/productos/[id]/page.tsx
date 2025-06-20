import React from 'react';
import { fetchProducto } from '@/actions/authActions';
import BotonAtras from '@/components/botones/botonAtras';
import BotonEditar from '@/components/botones/BotonEditarProducto';
import Image from 'next/image';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const producto = await fetchProducto(id);
  if (!producto) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        No se encontró el producto
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Imagen del producto */}
            <div className="w-full md:w-1/2 h-[300px] flex justify-center items-center">
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Información del producto */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">{producto.nombre}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  {producto.descripcion}
                </p>

                <p className="text-lg text-blue-600 font-semibold mb-2">
                  Precio: ${producto.precio_venta}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Marca:</span> {producto.marca}
                </p>
                <p className="text-sm mb-1">
                  <span className="font-semibold">Modelo:</span>{' '}
                  {producto.modelo}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Estado:</span>{' '}
                  <span
                    className={
                      producto.estado
                        ? 'text-green-500 font-semibold'
                        : 'text-red-500 font-semibold'
                    }
                  >
                    {producto.estado ? 'Disponible' : 'No disponible'}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 mt-6">
                <BotonEditar id={producto._id} />

                <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
                  Eliminar
                </button>

                <BotonAtras />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
