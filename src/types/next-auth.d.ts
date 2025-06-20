import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email: string; // Cambiado a obligatorio
    emailVerified?: Date | null;
    rol_usuario?: 'admin' | 'comprador' | 'vendedor';
    nombre?: string;
    apellido?: string;
    token?: string;
    estado: boolean;
  }

  interface Session extends DefaultSession {
    token?: string;
    user: {
      id: string;
      name?: string;
      email?: string; // Cambiado a obligatorio
      rol_usuario?: 'admin' | 'comprador' | 'vendedor';
      nombre?: string;
      apellido?: string;
      telefono?: string;
      fecha_nacimiento: date;
    } & DefaultSession['user'];
  }

  interface JWT {
    id?: string;
    name?: string | null;
    email: string; // Cambiado a obligatorio
    emailVerified?: Date | null;
    rol_usuario?: 'admin' | 'comprador' | 'vendedor';
    nombre?: string;
    apellido?: string;
    token?: string;
  }
}
