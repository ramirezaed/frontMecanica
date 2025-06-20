'use client';

import Link from 'next/link';
import BotonEditar from '@/components/botones/BotonEditarProducto';
import BotonEliminar from '@/components/botones/botonAltBajaProductos';
import { Iproductos } from '@/types';
import { useState, useEffect } from 'react';
import {
  altaProducto,
  bajaProducto,
  mostrarProductos,
} from '@/actions/authActions';
import { Estados } from '@/components/etiquetas/estado';
import Image from 'next/image';

export default function Page() {
  const [productos, setProductos] = useState<Iproductos[]>([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const result = await mostrarProductos();
      setProductos(result);
    };
    obtenerProductos();
  }, []);

  const handleToggle = async (id: string, nuevoEstado: boolean) => {
    if (nuevoEstado) {
      await altaProducto(id);
    } else {
      await bajaProducto(id);
    }

    // Actualizar estado localmente
    setProductos((prev) =>
      prev.map((producto) =>
        producto._id === id ? { ...producto, estado: nuevoEstado } : producto
      )
    );
  };

  return (
    <div className="p-0 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-white">
        <table className="w-[98%] mx-auto min-w-full divide-y divide-gray-200 px-4">
          <thead className="text-gray-500 uppercase text-xs tracking-wider bg-gray-100">
            <tr>
              <th className="py-5 px-6 text-left">Imagen</th>
              <th className="py-5 px-6 text-left">Producto</th>
              <th className="py-5 px-6 text-left">Descripción</th>
              <th className="py-5 px-6 text-center">Estado</th>
              <th className="py-5 px-6 text-center">Precio</th>
              <th className="py-5 px-6 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm divide-y divide-gray-100">
            {productos.map(
              ({ _id, nombre, imagen, descripcion, estado, precio_venta }) => (
                <tr
                  key={_id}
                  className="hover:bg-gray-50 transition-all duration-300 hover:scale-105"
                >
                  <td className="py-4 px-6 ">
                    {imagen ? (
                      <Image
                        src={imagen}
                        alt={nombre}
                        width={56}
                        height={56}
                        className="object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      //si no hay imagen no muestra nada
                      <div className="h-14 w-14 bg-gray-200 rounded-lg border border-gray-200" />
                    )}
                  </td>
                  <td className="py-4 px-6 font-medium">{nombre}</td>
                  <td className="py-4 px-6 max-w-xs truncate text-gray-500">
                    {descripcion}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Estados estado={estado}></Estados>
                  </td>
                  <td className="py-4 px-6 text-center font-semibold text-indigo-600">
                    ${precio_venta}
                  </td>
                  <td className="py-4 px-6 flex items-center justify-center space-x-2">
                    <BotonEditar id={_id} />
                    <BotonEliminar
                      id={_id}
                      estado={estado}
                      onToggle={handleToggle}
                    />
                    <Link href={`/vendedor/productos/${_id}`}>
                      <span className="text-indigo-500 hover:underline text-xs font-medium">
                        Ver más
                      </span>
                    </Link>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
