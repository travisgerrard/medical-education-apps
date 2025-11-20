import createDataContext from './createDataContext';

export const READING_KEY = 'READING';

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

// Modified to accept data as argument
const clearReadingArray = (dispatch) => async (data) => {
    try {
        localStorage.setItem(READING_KEY, JSON.stringify(data));
        dispatch({ type: 'setReadingArray', payload: data });
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
    { readingArray: [], errorMessage: '' }
);
