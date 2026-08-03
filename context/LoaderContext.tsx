"use client";

import { createContext, useContext, useState, useRef } from "react";

/* ========================
   LOADER CONTEXT
   — lets other components know when the loader is done
   — Hero, About, etc. wait for this before animating
   — hasPlayed ensures the loader only runs once per session
======================== */

type LoaderContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  hasPlayed: boolean;
  setHasPlayed: (value: boolean) => void;
};

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  setIsLoading: () => {},
  hasPlayed: false,
  setHasPlayed: () => {},
});

/* hook — use this in any component */
export const useLoader = () => useContext(LoaderContext);

/* provider — wrap around the app */
export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPlayed, setHasPlayed] = useState(false);

  return (
    <LoaderContext.Provider
      value={{ isLoading, setIsLoading, hasPlayed, setHasPlayed }}
    >
      {children}
    </LoaderContext.Provider>
  );
}
