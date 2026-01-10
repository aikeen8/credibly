import { createContext, useContext, useState, useEffect, type ReactNode } from "react"; // Removed 'React'
import { API_URL } from "../config";

type User = {
  username: string;
  role: string;
  avatar: string;
};

interface UserContextType {
  user: User;
  refreshUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>({
    username: "Student",
    role: "Learner",
    avatar: ""
  });

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/api/auth/profile`, {
        headers: { "x-auth-token": token }
      });
      if (res.ok) {
        const data = await res.json();
        setUser({
          username: data.username,
          role: data.role || "Student",
          avatar: data.avatar || ""
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, refreshUser: fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}