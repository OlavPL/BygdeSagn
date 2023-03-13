import { createContext, useContext } from 'react';

const AppContext = createContext("");


export function AppWrapper({ children }) {
  let sharedState = {/* whatever you want */
    title: "Velkommen til Bygdesagn ™"
   
}
  

  return (
    <AppContext.Provider value={sharedState}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

