"use client";

import { useUser } from "@/context/UserContext";
import { AuthModal } from "./AuthModal";

/**
 * This component is a guard that checks if the user is authenticated.
 * If the user is not authenticated, it shows the AuthModal component.
 */
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { userInfo } = useUser();
  if (!userInfo) {
    return <AuthModal />;
  }

  return <>{children}</>;
};
