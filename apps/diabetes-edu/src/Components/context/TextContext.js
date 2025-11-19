import createDataContext from './createDataContext';
export const TEXT_KEY = 'TEXT';

const textReducer = (state, action) => {
  switch (action.type) {
    case 'changeTextSize':
      return { ...state, textSize: action.payload };

    default:
      return state;
  }
};

const changeTextSize = (dispatch) => async ({ textSize, isIncrease }) => {
  var newTextSize = null;
  if (isIncrease) {
    if (textSize === '16px') {
      newTextSize = '18px';
    }
    if (textSize === '18px') {
      newTextSize = '20px';
    }
    if (textSize === '20px') {
      newTextSize = '22px';
    }
  } else {
    if (textSize === '22px') {
      newTextSize = '20px';
    }
    if (textSize === '20px') {
      newTextSize = '18px';
    }
    if (textSize === '18px') {
      newTextSize = '16px';
    }
  }

  if (newTextSize !== null) {
    dispatch({ type: 'changeTextSize', payload: newTextSize });
    localStorage.setItem(TEXT_KEY, newTextSize);
  }
};

const setTextSizeOnLoad = (dispatch) => () => {
  try {
    const value = localStorage.getItem(TEXT_KEY);
    if (value !== null) {
      dispatch({ type: 'changeTextSize', payload: value });
    }
  } catch (error) {
    console.log(error);
  }
};

export const { Provider, Context } = createDataContext(
  textReducer,
  {
    changeTextSize,
    setTextSizeOnLoad,
  },
  {
    textSize: '16px',
  }
);
