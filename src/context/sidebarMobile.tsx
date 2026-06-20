"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type SidebarMobile = {
  open: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
  openSidebar: () => void;
};

const SidebarContext = createContext<SidebarMobile | null>(null);

type Props = {
  children: ReactNode;
};

export function SidebarProvider({ children }: Props) {
  const [open, setOpen] = useState(false);

  const toggleSidebar = () => setOpen((prev) => !prev);
  const closeSidebar = () => setOpen(false);
  const openSidebar = () => setOpen(true);

  return (
    <SidebarContext.Provider
      value={{ open, toggleSidebar, closeSidebar, openSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

// ✅ SAFE HOOK (IMPORTANT FIX)
export function useSidebar() {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider");
  }

  return context;
}