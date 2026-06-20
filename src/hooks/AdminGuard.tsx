"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { loadToken } from "@/lib/storage";
import { verifyToken } from "@/lib/token";


export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const token = loadToken();

    if (!token) {
      router.push("/login");
      return;
    }

     const decoded = verifyToken(token.toString()) as { userId: string ,role:string};
console.log(decoded,'decoded')
    if (decoded.role !== "ADMIN") {
      router.push("/unauthorized");
    }
  }, []);

  return <>{children}</>;
}