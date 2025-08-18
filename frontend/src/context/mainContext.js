import React, { createContext, useContext, useState } from 'react';

const initialMainTime = {
  city: 'Jakarta',
  country: 'Indonesia',
  hour: 0,
  minute: 0,
  second: 0,
  ampm: 'AM',
  date: '20 March 2023',
  code: 'ID',
  timezone: 'Asia/Jakarta'
};

const initialIsLoadingMainTime = false

const initialSecondaryTime = [
  { code: 'VN', timezone: 'Asia/Ho_Chi_Minh', country: 'Vietnam', hour: 8, minute: 40, second: 20 },
  { code: 'SG', timezone: "Asia/Singapore", country: 'Singapore', hour: 8, minute: 40, second: 20 },
  { code: 'MY', timezone: "Asia/Kuala_Lumpur", country: 'Malaysia', hour: 8, minute: 40, second: 20 },
  { code: 'TH', timezone: "Asia/Bangkok", country: 'Thailand', hour: 8, minute: 40, second: 20 },
]

const initialMode = ''

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [mainTime, setMainTime] = useState(initialMainTime);
  const [isLoadingMainTime, setIsLoadingMainTime] = useState(initialIsLoadingMainTime);
  const [secondaryTime, setSecondaryTime] = useState(initialSecondaryTime);
  const [mode, setMode] = useState(initialMode);
  const [inputElement, setInputElement] = useState(null);
  const [mainTimeElement, setMainTimeElement] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isPendingSecondary, setIsPendingSecondary] = useState(true);

  return (
    <MainContext.Provider value={{ mainTime, setMainTime, isLoadingMainTime, setIsLoadingMainTime, secondaryTime, setSecondaryTime, mode, setMode, inputElement, setInputElement, mainTimeElement, setMainTimeElement, isPending, setIsPending, isPendingSecondary, setIsPendingSecondary }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);