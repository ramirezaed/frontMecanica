'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IproductosProps {
  id: number;
  nombre: string;
  precio_venta: string;
  imagen?: string; // Añadido para imágenes
}

export default function ProductoCard({
  productos,
}: {
  productos: IproductosProps[];
}) {
  const [indiceActual, setIndiceActual] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const router = useRouter();

  const siguiente = () => {
    const esUltimo = indiceActual >= productos.length - 4;
    setIndiceActual(esUltimo ? 0 : indiceActual + 1);
  };

  const anterior = () => {
    const esPrimero = indiceActual === 0;
    setIndiceActual(
      esPrimero ? Math.max(0, productos.length - 4) : indiceActual - 1
    );
  };

  const siguienteDeshabilitado = indiceActual >= productos.length - 4;
  const anteriorDeshabilitado = indiceActual === 0;

  return (
    <div className="relative max-w-6xl mx-auto px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        Nuestros Productos
      </h2>

      <div className="relative group">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productos.slice(indiceActual, indiceActual + 4).map((producto) => (
            <div
              key={producto.id}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
                hoveredCard === producto.id
                  ? 'transform -translate-y-2 shadow-xl'
                  : ''
              }`}
              onMouseEnter={() => setHoveredCard(producto.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => router.push(`/productos/${producto.id}`)}
            >
              <div className="h-48 bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center">
                {producto.imagen ? (
                  <Image
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-5xl text-gray-300">📷</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {producto.nombre}
                </h3>
                <p className="text-xl font-bold text-indigo-600 mt-2">
                  ${producto.precio_venta}
                </p>
                <button className="mt-4 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors duration-200">
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`absolute top-1/2 -left-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 ${
            anteriorDeshabilitado
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100'
          }`}
          onClick={anterior}
          disabled={anteriorDeshabilitado}
          aria-label="Producto anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          className={`absolute top-1/2 -right-6 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 ${
            siguienteDeshabilitado
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100'
          }`}
          onClick={siguiente}
          disabled={siguienteDeshabilitado}
          aria-label="Siguiente producto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(productos.length / 4) }).map(
          (_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                indiceActual >= index * 4 && indiceActual < (index + 1) * 4
                  ? 'bg-indigo-600'
                  : 'bg-gray-300'
              }`}
              onClick={() => setIndiceActual(index * 4)}
              aria-label={`Ir a página ${index + 1}`}
            />
          )
        )}
      </div>
    </div>
  );
}
