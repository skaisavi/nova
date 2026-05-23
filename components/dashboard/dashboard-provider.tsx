"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type DashboardContextType = {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
};

const DashboardContext = createContext<DashboardContextType>({
  mobileOpen: false,
  setMobileOpen: () => {}
});

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <DashboardContext.Provider value={{ mobileOpen, setMobileOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
