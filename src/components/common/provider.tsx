"use client";

import { SidebarProvider } from "@/context/sidebarMobile";
// import AdminGuard from "@/hooks/AdminGuard";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60, // 1 min cache
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      <SidebarProvider>
        {/* <AdminGuard> */}
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
        {/* </AdminGuard> */}
      </SidebarProvider>
    </QueryClientProvider>
  );
}
