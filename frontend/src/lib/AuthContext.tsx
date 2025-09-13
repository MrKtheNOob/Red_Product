"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { BASE_URL } from "./helpers";
import { useRouter } from "next/navigation";
import axios from "axios";

// User type returned by Django
interface User {
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/auth-check", {
          withCredentials: true,
          headers:{
            "X-CSRFToken": document.cookie
              .split("; ")
              .find((row) => row.startsWith("csrftoken="))
              ?.split("=")[1] || "",
          }
        });
        setUser(res.data);
      } catch (error) {
        console.log(error)
        router.replace("/login");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
