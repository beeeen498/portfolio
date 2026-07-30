"use client";

import { createContext, useContext, useState } from "react";

/* ========================
   LOADER CONTEXT
   — lets other components know when the loader is done
   — Hero, About, etc. wait for this before animating
======================== */

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  setIsLoading: () => {},
});

/* hook — use this in any component */
export const useLoader = () => useContext(LoaderContext);

/* provider — wrap around the app */
export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
