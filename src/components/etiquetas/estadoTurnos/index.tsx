export const EstadoTurno = ({ estado }: { estado: string }) => {
  const estilos = {
    Finalizado: 'bg-green-200 text-black',
    'En Proceso': 'bg-yellow-100 text-black',
    Pendiente: 'bg-gray-100 text-black',
  };
  const estilo = estilos[estado as keyof typeof estilos] || estilos.Pendiente;
  return (
    <span
      //   className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs ${estilo}`}
      className={`px-2 py-0.5 sm:px-3 sm:py-1 inline-flex text-xs leading-4 sm:leading-5 font-semibold rounded-full ${estilo}`}
    >
      {estado}
    </span>
  );
};
