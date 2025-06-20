'use client';

import { useState } from 'react';
import { RegistroForm } from '@/app/registroUsuarios/formularioRegistro';
import Encabezado from '@/components/encabezado/encabezado';

export default function CrearUsuarioPage() {
  const [resultado, setResultado] = useState<any>(null);
  return (
    <div>
      <Encabezado title="Registro Usuario" subtitle="" />
      <main className="container mx-auto py-5 max-w-2xl print: print:max-w-none">
        <RegistroForm onSuccess={setResultado} />
      </main>
    </div>
  );
}
