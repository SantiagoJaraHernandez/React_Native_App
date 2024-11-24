// src/context/LoaderContext.tsx
import React, { createContext, useState, useContext } from 'react';

// Definimos el contexto y su tipo
interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Creamos el contexto
export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// Componente que provee el estado global del loader
export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

// Hook para usar el contexto
export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
};
