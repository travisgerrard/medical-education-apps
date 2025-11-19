import React, { useEffect, useState, createContext } from 'react';
import { AsyncStorage } from '@react-native-community/async-storage';

export const DARK_KEY = 'DARK';

export const DarkContext = createContext({
  isDarkMode: false,
  setDarkMode: () => {},
});

export const DarkContextProvider = (props) => {
  const setDarkMode = async (isDarkMode) => {
    setState({ ...state, isDarkMode: isDarkMode });
    try {
      await AsyncStorage.setItem(DARK_KEY, JSON.stringify(isDarkMode));
    } catch (e) {
      alert(e);
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
      const value = await AsyncStorage.getItem(DARK_KEY); //null; //
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
