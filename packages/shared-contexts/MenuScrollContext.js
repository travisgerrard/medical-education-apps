import createDataContext from './createDataContext';

const menuScrollReducer = (state, action) => {
  switch (action.type) {
    case 'setScrollValue':
      return { ...state, scrollPosition: action.payload };
    default:
      return state;
  }
};

const setScrollValue = (dispatch) => async (scrollPosition) => {
  try {
  } catch (e) {
    console.log(e);
  }
  dispatch({ type: 'setScrollValue', payload: scrollPosition });
};

export const { Provider, Context } = createDataContext(
  menuScrollReducer,
  { setScrollValue },
  {
    scrollPosition: 0,
  }
);
