// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { setAuthHeader } from '../api/apiService';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    // Update localStorage when user changes
    localStorage.setItem('user', JSON.stringify(user));
    setAuthHeader((user && user.token) || null);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
