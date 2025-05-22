"use client";

import { useUser } from "@/context/UserContext";
import { AuthModal } from "./AuthModal";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { userInfo } = useUser();
  if (!userInfo) {
    return <AuthModal />;
  }

  return <>{children}</>;
}
