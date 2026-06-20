"use client";

import { createContext, useContext, useEffect } from "react";
import { useMe } from "@/action/user";
import { clearAuthStorage } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { setLogoutFn } from "@/lib/api";
import { useQueryClient } from "@tanstack/react-query";

type AuthContextType = {
  user: any;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, isError, refetch } = useMe();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    await clearAuthStorage();
    queryClient.removeQueries({ queryKey: ["me"] });
    refetch();
    router.push("/login");
  };
  useEffect(() => {
    setLogoutFn(async () => {
      await clearAuthStorage();
      queryClient.removeQueries({ queryKey: ["me"] });
      router.push("/login");
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data?.user || null,
        isLoading,
        isError,
        refetch,
        logout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { clearAuthStorage } from "@/lib/storage";
// import { useRouter } from "next/navigation";
// import { setLogoutFn } from "@/lib/api";
// import { useMe } from "@/action/user";

// type AuthContextType = {
//   user: any;
//   isLoading: boolean;
//   isError: boolean;
//   setUser: (user: any) => void;
//   logout: () => void;
// };

// const AuthContext = createContext<AuthContextType | null>(null);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//   const [user, setUser] = useState<any>(null);

//   const { data, isLoading, isError, refetch } = useMe();
//   const router = useRouter();

//   const handleLogout = async () => {
//     await clearAuthStorage();

//     setUser(null); // 🔥 important
//     router.push("/login");
//   };

//   useEffect(() => {
//     setLogoutFn(async () => {
//       await clearAuthStorage();
//       setUser(null);
//       router.push("/login");
//     });
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         isError,
//         setUser,
//         logout: handleLogout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error("useAuth must be used inside AuthProvider");
//   }

//   return context;
// }
