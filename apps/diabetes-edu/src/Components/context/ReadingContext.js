// import React, { useEffect, useState, createContext } from 'react';
import createDataContext from './createDataContext';

import { DATA } from '../../../SectionOutline';

export const READING_KEY = 'READING';
// export const NEXT_READING_KEY = 'NEXT_READING';

const readingReducer = (state, action) => {
  switch (action.type) {
    case 'setReadingArray':
      return { ...state, readingArray: action.payload };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const setReadingArray = (dispatch) => async (readingArray) => {
  try {
    localStorage.setItem(READING_KEY, JSON.stringify(readingArray));
    dispatch({ type: 'setReadingArray', payload: readingArray });
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

const clearReadingArray = (dispatch) => async () => {
  try {
    localStorage.setItem(READING_KEY, JSON.stringify(DATA));
    dispatch({ type: 'setReadingArray', payload: DATA });
  } catch (error) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
};

export const { Provider, Context } = createDataContext(
  readingReducer,
  { setReadingArray, clearReadingArray },
  { readingArray: DATA, errorMessage: '' }
);
