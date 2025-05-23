"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface UserInfo {
  username: string;
  jobTitle: string;
}

interface UserContext {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContext | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem("userInfo");
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleSetUserInfo = (info: UserInfo) => {
    setUserInfo(info);
    localStorage.setItem("userInfo", JSON.stringify(info));
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
  };

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo: handleSetUserInfo,
        isAuthenticated: !!userInfo,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
