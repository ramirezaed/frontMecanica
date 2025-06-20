"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { fetchProducto } from "@/actions/authActions"
import { useSession } from "next-auth/react"
import { IproductoEditar } from "@/types"


export default function EditarProducto() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()
  const [producto, setProducto] = useState<IproductoEditar | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { data: session } = useSession();

  //traigo los datos que me devuelve fetchProducto y los guardo en el estado producto
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true)
        const datosProducto = await fetchProducto(id)
        setProducto(datosProducto)
      } catch (err) {
        setError("Error al cargar el producto")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    cargarDatos()
  }, [id])

  // Estado del formulario
  const [formData, setFormData] = useState({
    Nombre: "",
    Descripcion: "",
    Marca: "",
    Modelo: "",
    PrecioCompra: "",
    PrecioVenta: "",
    stock: "",
    stockMinimo: "",
    estado: "",
    imagen: ""
  })

  // Actualizar el formulario cuando se cargan los datos
  useEffect(() => {
    if (producto) {
      setFormData({
        Nombre: producto.nombre || "",
        Descripcion: producto.descripcion || "",
        Marca: producto.marca || "",
        Modelo: producto.modelo || "",
        PrecioCompra: producto.precio_compra?.toString() || "",
        PrecioVenta: producto.precio_venta?.toString() || "",
        stock: producto.stock?.toString() || "",
        stockMinimo: producto.stock_minimo?.toString() || "",
        estado: producto.estado,
        imagen: producto.imagen || ""
      })
    }
  }, [producto])

  // Manejar cambios en el formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  // Manejar envío del formulario   
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/productos/editar/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${session?.user.token}` // Asegúrate de que el token esté disponible aquí
        },
        body: JSON.stringify({
          nombre: formData.Nombre,
          descripcion: formData.Descripcion,
          marca: formData.Marca,
          modelo: formData.Modelo,
          precio_compra: parseFloat(formData.PrecioCompra),
          precio_venta: parseFloat(formData.PrecioVenta),
          stock: parseInt(formData.stock),
          stockMinimo: parseInt(formData.stockMinimo),
          estado: formData.estado,
          imagen: formData.imagen
        })
      })

      if (response.ok) {
        router.push("/vendedor/productos")
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error al editar el producto")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      console.error("Error al editar producto:", err)
    }
  }

  if (loading) return <div className="p-6 text-center">Cargando producto...</div>
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>
  if (!producto) return <div className="p-6">No se encontró el producto</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Editar Producto</h1>     
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nombre */}
          <div className="space-y-2">
            <label htmlFor="Nombre" className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              id="Nombre"
              name="Nombre"
              value={formData.Nombre}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="Marca" className="block text-sm font-medium">Marca</label>
            <input
              type="text"
              id="Marca"
              name="Marca"
              value={formData.Marca}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Modelo */}
          <div className="space-y-2">
            <label htmlFor="Modelo" className="block text-sm font-medium">Modelo</label>
            <input
              type="text"
              id="Modelo"
              name="Modelo"
              value={formData.Modelo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Precio Compra */}
          <div className="space-y-2">
            <label htmlFor="PrecioCompra" className="block text-sm font-medium">Precio de Compra</label>
            <input
              type="number"
              id="PrecioCompra"
              name="PrecioCompra"
              value={formData.PrecioCompra}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Precio Venta */}
          <div className="space-y-2">
            <label htmlFor="PrecioVenta" className="block text-sm font-medium">Precio de Venta</label>
            <input
              type="number"
              id="PrecioVenta"
              name="PrecioVenta"
              value={formData.PrecioVenta}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              step="0.01"
              min="0"
              required
            />
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label htmlFor="stock" className="block text-sm font-medium">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
              required
            />
          </div>

          {/* Stock Mínimo */}
          <div className="space-y-2">
            <label htmlFor="stock_minimo" className="block text-sm font-medium">Stock Mínimo</label>
            <input
              type="number"
              id="stock_minimo"
              name="stock_minimo"
              value={formData.stockMinimo}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              min="0"
              // required
            />
          </div>

          {/* Estado */}
          <div className="space-y-2">
            <label htmlFor="estado" className="block text-sm font-medium">Estado</label>
            <select
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Imagen */}
          <div className="space-y-2">
            <label htmlFor="imagen" className="block text-sm font-medium">URL de la Imagen</label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              value={formData.imagen}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Descripción */}
        <div className="space-y-2">
          <label htmlFor="Descripcion" className="block text-sm font-medium">Descripción</label>
          <textarea
            id="Descripcion"
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push(`/vendedor/productos/${id}`)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}
