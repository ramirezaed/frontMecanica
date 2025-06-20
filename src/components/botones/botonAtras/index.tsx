// components/BotonAtras.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function BotonAtras() {
  const router = useRouter();

  return (
    <span
      onClick={() => router.back()}
      className="w-32 px-4 py-2 flex justify-center bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 cursor-pointer"
    >
      Atrás
    </span>
  );
}
