import { auth } from "@/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

interface IAuthContext {
  user: User | null;
  loading: boolean;
};

interface IProps {
  children: React.ReactNode;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  loading: true,
});

export function AuthProvider({ children }: IProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

export type AuthContext = ReturnType<typeof useAuth>
