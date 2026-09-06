import { useState, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // const BASE_URL = "https://sandeep-portfolio-0z4a.onrender.com/api/admin";
  const BASE_URL = "http://localhost:3000/api/admin";
  const [role, setRole] = useState(null);

  const isAdminTokenValid = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isValid = payload.exp * 1000 > Date.now();
      if (!isValid) localStorage.removeItem("adminToken");
      return isValid;
    } catch {
      localStorage.removeItem("adminToken");
      return false;
    }
  };

  // Login as admin
  const adminLogin = async (credentials) => {
    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to login as admin");
      }
      
      setRole(data.role);
      return data;
    } catch (error) {
      throw new Error(error.message || "An error occurred while logging in as admin");
    }
  };

  return (
    <AuthContext.Provider value={{ isAdminTokenValid, adminLogin, role }}>
      {children}
    </AuthContext.Provider>
  );
};
