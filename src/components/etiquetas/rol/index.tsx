export const Roles = ({ rol }: { rol: string }) => {
  const estilos = {
    admin: 'bg-purple-100 text-purple-800',
    vendedor: 'bg-blue-100 text-blue-800',
    comprador: 'bg-gray-100 text-gray-800',
  };
  const estilo = estilos[rol as keyof typeof estilos] || estilos.comprador;
  return (
    // <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md text-xs ${estilo}`}>
    <span
      className={`px-2 py-0.5 sm:px-3 sm:py-1 inline-flex text-xs leading-4 sm:leading-5 font-semibold rounded-full ${estilo}`}
    >
      {rol}
    </span>
  );
};
