import { signOut } from 'next-auth/react';

export async function logOut() {
  try {
    // Limpieza de datos de cliente
    localStorage.clear();
    sessionStorage.clear();

    if (caches?.keys) {
      const names = await caches.keys();
      for (const name of names) {
        await caches.delete(name);
      }
    }

    // Cerrar sesión sin redirección automática
    await signOut({ redirect: false });

    // Reemplazar la página actual para evitar volver atrás
    window.location.replace('/');
  } catch (error) {
    console.error('Error cerrando sesión:', error);
  }
}
