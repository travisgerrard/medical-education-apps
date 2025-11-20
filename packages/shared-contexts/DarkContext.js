import React, { useEffect, useState, createContext } from 'react';

export const DARK_KEY = 'DARK';

export const DarkContext = createContext({
  isDarkMode: false,
  setDarkMode: () => { },
});

export const Provider = (props) => {
  const setDarkMode = async (isDarkMode) => {
    setState({ ...state, isDarkMode: isDarkMode });
    try {
      localStorage.setItem(DARK_KEY, JSON.stringify(isDarkMode));
    } catch (e) {
      console.error(e);
    }
  };

  const initState = {
    isDarkMode: false,
    setDarkMode: setDarkMode,
  };

  const [state, setState] = useState(initState);

  useEffect(() => {
    darkSetter();
  }, []);

  async function darkSetter() {
    try {
      const value = localStorage.getItem(DARK_KEY);
      if (value !== null) {
        const isDarkModeBool = JSON.parse(value);

        setDarkMode(isDarkModeBool);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DarkContext.Provider value={state}>{props.children}</DarkContext.Provider>
  );
};

export const Context = DarkContext;
