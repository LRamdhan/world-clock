import React, { createContext, useContext, useState } from 'react';

const initialMainTime = {
  city: 'Jakarta',
  country: 'Indonesia',
  hour: 11,
  minute: 59,
  second: 50,
  ampm: 'AM',
  date: '20 Februari 2023',
};

const initialIsLoadingMainTime = false

const initialSecondaryTime = [
  { code: 'ID', time: '08:32' },
  { code: 'SG', time: '82:82' },
  { code: 'MY', time: '23:23' },
  { code: 'TH', time: '23:74' },
]

const initialMode = ''

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [mainTime, setMainTime] = useState(initialMainTime);
  const [isLoadingMainTime, setIsLoadingMainTime] = useState(initialIsLoadingMainTime);
  const [secondaryTime, setSecondaryTime] = useState(initialSecondaryTime);
  const [mode, setMode] = useState(initialMode);

  return (
    <MainContext.Provider value={{ mainTime, setMainTime, isLoadingMainTime, setIsLoadingMainTime, secondaryTime, setSecondaryTime, mode, setMode }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);