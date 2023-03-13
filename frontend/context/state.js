import { createContext, useContext, useState } from 'react';

const AppContext = createContext(({
  title: "Tittel",
  setTitle: async (value) => null
}));


export function AppWrapper({ children }) {
  const [title, setTitle] = useState("Velkommen til Bygdesagn ™");
  

  return (
    <AppContext.Provider value={{title, setTitle}}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}