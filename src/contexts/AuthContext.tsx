import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FIXED_ADMIN_EMAIL } from "@/constants/auth";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_EMAIL = FIXED_ADMIN_EMAIL.toLowerCase();

const isAdminUser = (user: User | null) => {
  const email = user?.email?.toLowerCase();
  return Boolean(email && email === ADMIN_EMAIL);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAdmin(isAdminUser(firebaseUser));
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const credentials = await signInWithEmailAndPassword(auth, email, password);
      if (!isAdminUser(credentials.user)) {
        await signOut(auth);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isAuthLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
