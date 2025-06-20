// 'use client';

// import { createContext, useContext, useState } from 'react';
// import { ReactNode } from 'react';
// export const SharedStateContext = createContext<any>(null);
// export const SharedStateProvider = ({ children }: { children: ReactNode }) => {
//   const [language, setLanguage] = useState<'es' | 'en'>('en');

//   return (
//     <SharedStateContext.Provider value={{ language, setLanguage }}>
//       {children}
//     </SharedStateContext.Provider>
//   );
// };
// export function useSharedState() {
//   return useContext(SharedStateContext);
// }
