// Contexto de autenticación (educativo, sin backend real).
// - Registro e inicio de sesión con persistencia en localStorage.
// - Hash pseudo-simple para fines académicos (NO usar en producción).

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

// Hash pseudo simple: NO seguro, uso educativo.
function pseudoHash(str) {
  return Array.from(str)
    .map((c, i) => c.charCodeAt(0) ^ i)
    .reduce((acc, n) => acc + n, 0)
    .toString(16);
}

// Helpers de persistencia.
function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem('users')) || [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}
function loadSession() {
  try {
    return JSON.parse(localStorage.getItem('session')) || null;
  } catch {
    return null;
  }
}
function saveSession(user) {
  localStorage.setItem('session', JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem('session');
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Inicializa usuarios y sesión desde localStorage.
  useEffect(() => {
    setUsers(loadUsers());
    setCurrentUser(loadSession());
  }, []);

  // Estado derivado: hay sesión activa.
  const isAuthenticated = useMemo(() => !!currentUser, [currentUser]);

  // Registro con validación básica y apertura de sesión automática.
  const register = ({ name, email, password }) => {
    const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error('El correo ya está registrado.');
    }
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      passwordHash: pseudoHash(password)
    };
    const nextUsers = [...users, newUser];
    setUsers(nextUsers);
    saveUsers(nextUsers);
    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };
    setCurrentUser(sessionUser);
    saveSession(sessionUser);
  };

  // Inicio de sesión por email + password.
  const login = ({ email, password }) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) throw new Error('Usuario no encontrado.');
    if (user.passwordHash !== pseudoHash(password)) throw new Error('Contraseña incorrecta.');
    const sessionUser = { id: user.id, name: user.name, email: user.email };
    setCurrentUser(sessionUser);
    saveSession(sessionUser);
  };

  // Cierre de sesión.
  const logout = () => {
    setCurrentUser(null);
    clearSession();
  };

  const value = {
    isAuthenticated,
    currentUser,
    register,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
