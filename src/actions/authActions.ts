'use server';

import { AuthError } from 'next-auth';
import { auth } from '@/auth'; // Importa signOut directamente
import { signIn } from '@/auth';
import { IusuarioRegistro } from '@/types';
import { IfiltroBusqueda } from '@/types';

export async function login(credentials: { email: string; password: string }) {
  try {
    const result = await fetch(`${process.env.API_HOST}/api/usuarios/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: credentials.email,
        contraseña: credentials.password,
      }),
    });

    const data = await result.json();

    if (!result.ok) {
      // Aquí manejamos el error específico del reCAPTCHA

      throw new Error(data.error || 'Error al iniciar sesión');
    }

    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error; // Importante: propagar el error
  }
}

export async function loginFormulario(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const result = await signIn('credentials', {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          throw new Error('Datos Incorrectos'); //esto muestra en el formulario de login
        default:
          throw new Error('Datos Incorrectos'); //esto muestra en el formulario de login
      }
    }
    throw error;
  }
}

export async function Verificar(tokenC: string) {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/recaptcha`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tokenC,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al verificar reCAPTCHA');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en reCAPTCHA:', error);
    throw error;
  }
}

export async function buscarUsuarioPorEmail(email: string) {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/buscarEmail/${email}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    const data = await response.json();

    // Verificación de campos esenciales
    if (!data._id || !data.nombre || !data.email) {
      throw new Error('Datos esenciales del usuario faltan en la respuesta');
    }

    return {
      usuarioID: data._id,
      rol_usuario: data.rol_usuario || 'comprador', // Valor por defecto
      name: `${data.nombre} ${data.apellido || ''}`.trim(), // Nombre completo
      apellido: data.apellido,
      nombre: data.nombre,
      email: data.email,
    };
  } catch (error) {
    console.error('Error en buscarUsuarioPorEmail:', error);
    throw error;
  }
}

export async function fetchUsuario(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/buscar/${id}`
    );
    if (!response.ok) throw new Error('Error fetching usuarios');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
//registro de nuevo usuario
export async function nuevoUsuario(usuarioData: IusuarioRegistro) {
  try {
    const response = await fetch(`${process.env.API_HOST}/api/usuarios/crear`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        ...usuarioData,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear usuario2');
    }
    return await response.json();
  } catch (error) {
    console.log('Error en crearNuevoUsuario', error);
    throw error;
  }
}
export async function bajaUsuario(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/baja/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error('Error al dar de baja el producto');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
export async function altaUsuario(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/alta/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error('Error al dar de baja el producto');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function ListaUsuarios() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/listaDeUsuario`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error('Error al cargar los usuarios');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsuarioActivos() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/activos`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        cache: 'no-store',
      }
    );
    if (!response.ok) throw new Error('error al buscar usuarios activos');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUsuariosInactivos() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/inactivos`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error('error al buscar usuarios inactivos');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function cambiarRol(id: string, rol_usuario: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/usuarios/cambiarRol/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          rol_usuario: rol_usuario,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al cambiar rol de usuario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en cambiarRol:', error);
  }
}

///////////////////////////////productos

///////////////////////////////productos

///////////////////////////////productos

//buscar productos por id
export async function fetchProducto(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/productos/buscar/${id}`
    );
    if (!response.ok) throw new Error('error fetching productos');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

//accion para el buscador de productos
//busca productos por nombre, categoria, etc
export async function buscarProductos(
  filtro: IfiltroBusqueda
): Promise<IfiltroBusqueda[] | null> {
  try {
    const params = new URLSearchParams();

    // Añade parámetros dinámicamente
    Object.entries(filtro).forEach(([key, value]) => {
      if (value) params.append(key, value.toString());
    });
    const response = await fetch(
      `${process.env.API_HOST}/api/productos?${params.toString()}`
    );
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en buscarProductos:', error);
    return null;
  }
}

export async function altaProducto(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/productos/alta/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error('Error al dar de alta el producto');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function bajaProducto(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/productos/baja/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) throw new Error('Error al dar de baja el producto');
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function mostrarProductos() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/productos/lista`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response) {
      throw new Error('error al mostrar la lista de productos');
    }
    return await response.json();
  } catch (error) {
    console.error(error, 'error ');
  }
}

export async function productosActivos() {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/productos/activos`
    );
    if (!response) {
      throw new Error('no se encotraron productos activos o error');
    }
    return response.json();
  } catch (error) {
    console.error('error', error);
  }
}

/////////////////////turnos

/////////////////////turnos

/////////////////////turnos

//muestra el turno especifico
export async function fetchTurnos(id: string) {
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/turnos/buscar/${id}`
    );
    if (response.status === 500) {
      return null; // No hay turno, front lo maneja sin error
    }
    if (!response.ok) throw new Error('Error fetching turnos');

    return await response.json();
  } catch (error) {
    console.error('Error fetching turnos:', error);
    return null;
  }
}

export const crearNuevoTurno = async (turnoData: {
  nombre: string;
  apellido: string;
  matricula: string;
  fecha: string;
  telefono: string;
  email: string;
  tipo_vehiculo: string;
  modelo: string;
  servicioID: string;
  // precio: number;
}) => {
  try {
    const session = await auth();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_HOST}/api/turnos/nuevo`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...turnoData,
          // servicio: 'Alineación y balanceo', // Ejemplo de valor fijo // ESTO TENGO QUE MIRAR PORQ EL SERVICIO TIENE QUE VENIR DE LA API
          codigo_turno: '', // El backend lo genera
          usuarioId: session?.user.id,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error en respuesta API crear turno:', errorData);
      throw new Error(errorData.message || 'Error al crear turno');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en crearNuevoTurno:', error);
    throw error;
  }
};

//muestra la lista de todos los turnos
export async function ListaTurnos() {
  const session = await auth();
  try {
    const response = await fetch(`${process.env.API_HOST}/api/turnos/lista`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.user.token}`,
      },
    });
    if (!response.ok) {
      throw new Error('error al mostrar tusnor');
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}
//muestra los turnos de que tiene el cliente
export async function usuarioTurno(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/turnos/buscarUsuarioTurno/${id}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );

    if (!response.ok) throw new Error('Error fetching turnos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching turnos:', error);
    return null;
  }
}

export async function editarTurno(id: string, data: { descripcion?: string }) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/turnos/editar/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al editar el turno');
    }
    return await response.json();
  } catch (error) {
    console.error('Error editar turnos:', error);
    return null;
  }
}
//modificar en el backend para sea por id params
export async function CancelarTurno() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/turnos/cancelar`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response) {
      throw new Error('error al cancelar turno');
    }
    return response.json();
  } catch (error) {
    console.error('error ', error);
  }
}

export async function CambiarEstadoTurno(id: string, estado_turno: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/turnos/cambiarEstado/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          estado_turno: estado_turno,
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || 'Error al cambiar estado del usuario'
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error en cambiarEstado:', error);
  }
}
///////////////servicios
//////////////
//////////////
//////////////

export async function crearServicio(nuevoServicio: {
  nombre: string;
  precio: string;
  descripcion: string;
}) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/crear`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          ...nuevoServicio,
          usuarioId: session?.user.id, // Asegúrate de que el usuarioId esté disponible
        }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al crear servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en crearServicio:', error);
    throw error;
  }
}

export async function ListaServicios() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/lista`,
      {
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error al mostrar la lista de servicios');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en mostrarServicios:', error);
  }
}

export async function ServiciosInactivos() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/inactivos`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('No se encontraron servicios activos o error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en ServiciosActivos:', error);
  }
}

export async function ServiciosActivos() {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/activos`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('No se encontraron servicios activos o error');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en ServiciosActivos:', error);
  }
}

export async function buscarServicioPorId(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/buscar/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error('Error al buscar servicio por ID');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en buscarServicioPorId:', error);
  }
}

export async function bajaServicio(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/baja/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!session || !session.user.token) {
      throw new Error('No se encontró la sesión o el token de usuario');
    }
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al eliminar1 servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en eliminarServicio:', error);
  }
}

export async function altaServicio(id: string) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/alta/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
      }
    );
    if (!session || !session.user.token) {
      throw new Error('No se encontró la sesión o el token de usuario');
    }
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al activar servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en activarServicio:', error);
  }
}

export async function editarServicio(
  id: string,
  data: { nombre?: string; precio?: string; descripcion?: string }
) {
  const session = await auth();
  try {
    const response = await fetch(
      `${process.env.API_HOST}/api/servicios/editar/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al editar servicio');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en editarServicio:', error);
    throw error;
  }
}
