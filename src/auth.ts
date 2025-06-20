import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { login } from '@/actions/authActions';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  session: {
    strategy: 'jwt',
    // maxAge: 30, //* 1, // 1 hora en segundos (60 segundos * 60 minutos)
    // updateAge: 60 * 30
  },
  secret: process.env.JWT_SECRET,
  providers: [
    Google,
    Credentials({
      async authorize(credentials) {
        try {
          const { email, password } = credentials as {
            email: string;
            password: string;
          };
          const user = await login({
            email: email,
            password: password,
          });
          const token = user.token;

          if (!user) {
            console.error('Usuario no encontrado después de login exitoso');
            return null;
          }

          return {
            id: user._id,
            name: user.name,
            email: user.email,
            rol_usuario: user.rol_usuario,
            nombre: user.nombre,
            apellido: user.apellido,
            estado: user.estado,
            token: token,
          };
        } catch (error: any) {
          console.error('Error en authorize:', error);
          // return null;
          throw new Error(error.message || 'Error al iniciar sesión');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email; // Ahora siempre será string
        token.name = user.name;
        token.emailVerified = user.emailVerified || null;
        token.rol_usuario = user.rol_usuario || '';
        token.nombre = user.nombre || '';
        token.apellido = user.apellido || '';
        token.estado = user.estado || ''; // Añadido para manejar el estado del usuario
        token.token = user.token || ''; // Añadido para manejar el token del usuario
      }

      if (trigger === 'update' && session?.user) {
        token = {
          ...token,
          ...session.user,
          email: token.email, // Garantiza que email nunca sea null
        };
      }

      return token;
    },

    async session({ session, token }) {
      let nombre = token.nombre as string;
      let apellido = token.apellido as string;

      // Si viene de Google y no tiene nombre/apellido, se separa name completo
      if (!nombre && session.user?.name) {
        const partes = session.user.name.split(' ');
        nombre = partes[0];
        apellido = partes.slice(1).join(' ') || '';
      }

      session.user = {
        ...session.user,
        id: token.id as string,
        email: token.email!,
        name: token.name as string,
        emailVerified: token.emailVerified as Date | null,
        rol_usuario: token.rol_usuario as 'admin' | 'comprador' | 'vendedor',
        nombre,
        apellido,
        token: token.token as string,
        estado: token.estado as boolean,
      };

      return session;
    },
  },
});
