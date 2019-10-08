import React from 'react';

const AuthUserContext = React.createContext();

export const AuthUserProvider = AuthUserContext.Provider;
export const AuthUserConsumer = AuthUserContext.Consumer;

export default AuthUserContext;