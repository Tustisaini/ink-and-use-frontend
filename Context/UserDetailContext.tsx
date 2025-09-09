"use client";

import { createContext, ReactNode, useState } from "react";
import { User } from "@/app/_components/Header"; // make sure this type is exported

interface UserProviderProps {
  children: ReactNode;
}

export const UserDetailContext = createContext<User | undefined>(undefined);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <UserDetailContext.Provider value={user}>
      {children}
    </UserDetailContext.Provider>
  );
}
