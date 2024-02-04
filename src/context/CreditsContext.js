import React, { createContext, useState, useContext, useEffect } from 'react';
import { useUser } from './UserContext';
import apiService from '../api/apiService';

export const CreditsContext = createContext({ credits: null, updateCredits: () => {} });

export const useCredits = () => useContext(CreditsContext);

export const CreditsProvider = ({ children }) => {
  const [credits, setCredits] = useState(null);
  const { user } = useUser();

  const updateCredits = () => {
    if (user) {
      apiService.get('/users/credits').then((response) => {
        setCredits(Number(response.data.amount));
        console.info("Credits:", response.data.amount);
      });
    } else {
      setCredits(null);
    }
  };

  useEffect(updateCredits, [user]);

  return (
    <CreditsContext.Provider value={{ credits, updateCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};
