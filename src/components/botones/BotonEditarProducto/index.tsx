// components/BotonEditar.tsx
"use client";

import { useRouter } from "next/navigation";

interface BotonEditarProps {
  id: string;
}

export default function BotonEditar({ id }: BotonEditarProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/vendedor/productos/${id}/editar`);
  };
  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
    >
      Editar
    </button>
  );
}
