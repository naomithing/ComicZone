import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = await authAPI.getProfile();
          setUser(userData);
        } catch (err) {
          console.error('Auth check failed:', err);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Register a new user
  const register = async (userData) => {
    try {
      console.log('AuthContext: Registering user:', userData);
      setError(null);
      const data = await authAPI.register(userData);
      console.log('AuthContext: Registration successful:', data);
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (err) {
      console.error('AuthContext: Registration failed:', err);
      setError(err.message);
      throw err;
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      console.log('AuthContext: Logging in user:', { email: credentials.email });
      setError(null);
      const data = await authAPI.login(credentials);
      console.log('AuthContext: Login successful:', data);
      localStorage.setItem('token', data.token);
      setUser(data);
      return data;
    } catch (err) {
      console.error('AuthContext: Login failed:', err);
      setError(err.message);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Update profile image
  const updateProfileImage = async (imageFile) => {
    try {
      setError(null);
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const updatedUser = await authAPI.updateProfileImage(formData);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfileImage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 