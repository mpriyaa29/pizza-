"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Role = "admin" | "customer" | null;

interface User {
  role: Role;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: Role, email?: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("piozza_user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem("piozza_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: Role, email?: string) => {
    const newUser = { role, email };
    setUser(newUser);
    localStorage.setItem("piozza_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("piozza_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
