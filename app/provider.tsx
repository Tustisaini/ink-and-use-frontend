"use client";

import React, { useState, createContext, ReactNode } from "react";

// Define the shape of your user (adjust as needed)
interface User {
  name: string;
  email: string;
  picture: string;
}

interface UserContextType {
  userDetail: User | null;
  setUserDetail: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserDetailContext = createContext<UserContextType | undefined>(
  undefined
);

interface ProviderProps {
  children: ReactNode;
}

function Provider({ children }: ProviderProps) {
  const [userDetail, setUserDetail] = useState<User | null>(null);

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;
