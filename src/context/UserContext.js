import React, { createContext, useState, useEffect, useContext } from 'react';
import { setAuthHeader } from '../api/apiService';

export const UserContext = createContext({ user: null, setUser: () => {} });

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  console.log("Cont: ", user);

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
