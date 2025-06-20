'use client'
import { useState, KeyboardEvent } from 'react'
import { buscarProductos } from '@/actions/authActions'
import { IfiltroBusqueda } from '@/types'

export default function Buscador() {
  const [termino, setTermino] = useState("")
  const [resultados, setResultados] = useState<IfiltroBusqueda[]>([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState('')

  // Estado para manejar el error y el mensaje de carga 
  const handleBuscar = async () => {
     if (!termino.trim()) return;
    // Evitar búsqueda vacía          
    setCargando(true)
    setError('')
    
    try {
      const productos = await buscarProductos({keyword : termino})
      if (productos) {
        setResultados(productos)
      } else {
        setError('No se encontraron resultados')
      }
    } catch (err) {
      setError('Error al buscar productos')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  // Manejar el evento de tecla "Enter" para realizar la búsqueda
  // al presionar "Enter" en el campo de búsqueda 
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBuscar()
    }
  
  }
  return (
    <div className="relative w-full max-w-md">
      {/* Contenedor DIV (no formulario) */}
      <div className="flex gap-2">
        <input
          type="text"
          value={termino}
          onChange={(e) => setTermino(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Buscar productos..."
          className="flex-1 p-2 border rounded"
          disabled={cargando}
        />
        <button
          onClick={handleBuscar}
          disabled={cargando}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
        >
          {cargando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>

      {/* Mensajes de estado */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {cargando && <p className="text-gray-500 mt-2">Buscando...</p>}

      {/* Resultados */}
      {resultados.length > 0 && (
        <div className="mt-4 border rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {resultados.map((producto) => (
            <div key={producto._id} className="p-4 border-b hover:bg-gray-50">
              <h3 className="font-bold">{producto.nombre}</h3>
              <p className="text-blue-600">${producto.precio_venta}</p>
              {/* Agrega más detalles según necesites */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}