export interface Iusuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  rol_usuario: string;
  usuario: string;
  user: string;
  estado: string | boolean;
}

export interface IusuarioRegistro {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  email: string;
  contraseña: string;
}

export interface TurnoData {
  nombre: string;
  apellido: string;
  matricula: string;
  servicio: string;
  fecha: string;
  telefono: string;
  email: string;
  tipo_vehiculo: string;
  modelo: string;
  codigo_turno: string;
  precio: number;
}

export interface TurnoFormProps {
  turnoData: TurnoData;
  setTurnoData: React.Dispatch<React.SetStateAction<TurnoData>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onSubmitSuccess: (data: any) => void;
}

export interface Iproductos {
  _id: string;
  nombre: string;
  precio_venta: string;
  descripcion: string;
  imagen: string;
  estado: boolean;
}
export interface ale {
  estado: boolean;
}

export interface IproductoEditar {
  id: string;
  nombre: string;
  descripcion: string;
  marca: string;
  modelo: string;
  precio_compra: number;
  precio_venta: number;
  stock: number;
  stock_minimo: number;
  estado: string;
  imagen: string;
}

export interface IfiltroBusqueda {
  nombre?: string;
  marca?: string;
  modelo?: string;
  categoria?: string;
  filtro_precio?: string;
  rango_precio?: string;
  pagina?: string;
  limite?: string;
  precio_venta?: string;
  _id?: string;
  keyword: string;
}

export interface Iturno {
  _id: string;
  nombre: string;
  apellido: string;
  matricula: string;
  tipo_vehiculo: string;
  fecha: string;
  telefono: string;
  email: string;
  codigo_turno: string;
  turno: string;
  estado_turno: string;
  fechaLocal: string;
}

export interface TurnoUsuario {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha: string;
  tipo_vehiculo: string;
  modelo: string;
  matricula: string;
  // precio: number;
  creado_el: string;
  estado_turno: string;
  fechaLocal: string;
  descripcion: string;
  servicio: {
    precio: string;
    descripcion: string;
  };
}

export interface Iservicio {
  _id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  estado: boolean;
}
