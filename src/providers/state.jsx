import React from 'react';

export const StateContext = React.createContext({});

export const useStateContext = () => React.useContext(StateContext);