// "use client";

// import { useEffect, useState } from "react";
// import { useSession, signOut } from "next-auth/react";

// export const useSessionTimer = () => {
//   const { data: session } = useSession();
//   const [timeLeft, setTimeLeft] = useState<number>(30);

//   useEffect(() => {
//     if (!session) return;

//     const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
//     let timer: NodeJS.Timeout;

//     const handleActivity = () => {
//       console.log('Actividad detectada - Reiniciando a 30s');
//       setTimeLeft(30);
//     };

//     const startTimer = () => {
//       timer = setInterval(() => {
//         setTimeLeft(prev => {
//           console.log(`Tiempo restante: ${prev - 1}s`);
//           return prev - 1;
//         });
//       }, 1000);
//     };

//     const handleSessionEnd = () => {
//       console.log('Finalizando sesión');
//       signOut({ redirect: false }).then(() => {
//         window.location.href = "/login?sessionExpired=true";
//       });
//     };

//     // Registrar eventos
//     events.forEach(e => document.addEventListener(e, handleActivity));
    
//     // Iniciar temporizador
//     startTimer();

//     // Limpieza
//     return () => {
//       clearInterval(timer);
//       events.forEach(e => document.removeEventListener(e, handleActivity));
//     };
//   }, [session]);

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       signOut({ redirect: false }).then(() => {
//         window.location.href = "/login?sessionExpired=true";
//       });
//     }
//   }, [timeLeft]);
// };