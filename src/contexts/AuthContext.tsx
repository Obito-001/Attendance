
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { students, teachers } from "../services/mockData";

// Define types
export type UserRole = "teacher" | "student" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Mock user data for demo
const MOCK_USERS = [
  {
    id: "t1",
    name: "Harikanth",
    email: "harikanth@example.com",
    password: "teacher123",
    role: "teacher" as UserRole,
  },
  {
    id: "s1",
    name: "Barani",
    email: "barani@example.com",
    password: "student123",
    role: "student" as UserRole,
  },
  {
    id: "a1",
    name: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin" as UserRole,
  }
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("ams_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login functionality
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        throw new Error("Invalid credentials");
      }
      
      // Create user object (exclude password)
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Store in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem("ams_user", JSON.stringify(userWithoutPassword));
      
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed: " + (error as Error).message);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Signup functionality
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setLoading(true);
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      
      // In a real app, we would save to backend
      // For demo, just create a new user object
      const newUser = {
        id: `u${Date.now()}`,
        name,
        email,
        role,
      };
      
      // Store in state and localStorage
      setUser(newUser);
      localStorage.setItem("ams_user", JSON.stringify(newUser));
      
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Signup failed: " + (error as Error).message);
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem("ams_user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
