// import React, { useEffect, useState, createContext } from 'react';
import createDataContext from './createDataContext';
export const NEXT_READING_KEY = 'NEXT_READING';

const nextToReadReducer = (state, action) => {
  switch (action.type) {
    case 'setNextOnReadingList':
      return { ...state, nextOnReadingList: action.payload };
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

const setNextOnReadingList = (dispatch) => async (nextOnReadingList) => {
  try {
    await localStorage.setItem(
      NEXT_READING_KEY,
      JSON.stringify(nextOnReadingList)
    );
  } catch (e) {
    dispatch({
      type: 'add_error',
      payload: 'Something went wrong with sign up',
    });
  }
  dispatch({ type: 'setNextOnReadingList', payload: nextOnReadingList });
};

const clearNextReading = (dispatch) => async () => {
  dispatch({
    type: 'setNextOnReadingList',
    payload: {
      section: null,
      sectionSlug: null,
      theNextSectionTitle: null,
      theNextSectionSlug: null,
      theNextSectionId: null,
    },
  });
};

export const { Provider, Context } = createDataContext(
  nextToReadReducer,
  { setNextOnReadingList, clearNextReading },
  {
    nextOnReadingList: {},
    errorMessage: '',
  }
);
