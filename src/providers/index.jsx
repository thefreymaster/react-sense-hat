import React from 'react';

export const FirebaseContext = React.createContext({});

export const useFirebaseContext = () => React.useContext(FirebaseContext);