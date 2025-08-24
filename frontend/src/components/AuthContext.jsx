import React, { useState, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]); // [{email, password}]

  const register = (email, password) => {
    if (users.find((u) => u.email === email)) return false;
    setUsers((prev) => [...prev, { email, password }]);
    setUser({ email });
    return true;
  };

  const login = (email, password) => {
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser({ email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  const forgotPassword = (email) => {
    const found = users.find((u) => u.email === email);
    if (found) return found.password;
    return null;
  };

  return (
    <AuthContext.Provider
      value={{ user, register, login, logout, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
