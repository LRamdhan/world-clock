import React, { createContext, useContext, useState } from 'react';

const CountryResultContext = createContext();

export const CountryResultProvider = ({ children }) => {
  const [countryResult, setCountryResult] = useState([]);
  const [keyword, setKeyword] = useState('');

  return (
    <CountryResultContext.Provider value={{ countryResult, setCountryResult, keyword, setKeyword }}>
      {children}
    </CountryResultContext.Provider>
  );
};

export const useCountryResultContext = () => useContext(CountryResultContext);