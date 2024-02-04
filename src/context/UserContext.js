import React, { createContext, useState, useEffect, useContext } from 'react';
import { setAuthHeader } from '../api/apiService';

export const UserContext = createContext({ user: null, setUser: () => {} });

export const useUser = () => useContext(UserContext);

export const preUserUpdate = (user) => {
  setAuthHeader((user && user.token) || null);
  return user;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => preUserUpdate(JSON.parse(localStorage.getItem('user')) || null));
  console.info("User loaded: ", user);

  useEffect(() => {
    // Update localStorage when user changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const setUserWrapper = (user) => {
    setUser(preUserUpdate(user));
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWrapper }}>
      {children}
    </UserContext.Provider>
  );
};
