"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SplashContextType {
  splashDone: boolean;
  setSplashDone: (value: boolean) => void;
}

const SplashContext = createContext<SplashContextType | undefined>(undefined);

export function SplashProvider({ children }: { children: ReactNode }) {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <SplashContext.Provider value={{ splashDone, setSplashDone }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const context = useContext(SplashContext);
  if (context === undefined) {
    throw new Error('useSplash must be used within a SplashProvider');
  }
  return context;
}
