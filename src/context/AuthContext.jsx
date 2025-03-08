import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebase"; // Ensure this path is correct
import { onAuthStateChanged } from "firebase/auth";

// Create Authentication Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
