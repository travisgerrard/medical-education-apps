import React, { useReducer } from 'react';

const createDataContext = (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children, initialState }) => {
    const [state, dispatch] = useReducer(reducer, initialState || defaultValue);

    const boundActions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
