export { auth as middleware } from '@/auth';

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const response = NextResponse.next();

//   // Headers para evitar caché en rutas sensibles
//   if (
//     request.nextUrl.pathname.startsWith('/comprador') ||
//     request.nextUrl.pathname.startsWith('/vendedor') ||
//     request.nextUrl.pathname.startsWith('/admin')
//   ) {
//     response.headers.set('Cache-Control', 'no-store, max-age=0');
//     response.headers.set('Pragma', 'no-cache');
//     response.headers.set('Expires', '0');
//   }

//   return response;
// }
