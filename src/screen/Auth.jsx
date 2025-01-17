import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create the context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to check if the user is logged in
  const checkLoginStatus = async () => {
    const data = await AsyncStorage.getItem('isloggedin');
    setIsLoggedIn(data === 'true');
  };

  // Function to handle logout
  const logout = async () => {
    await AsyncStorage.removeItem('isloggedin');
    await AsyncStorage.removeItem('usertype');
    setIsLoggedIn(false); // Update the login status to false
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkLoginStatus, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
