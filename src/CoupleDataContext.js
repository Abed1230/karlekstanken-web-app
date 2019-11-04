import React from 'react';

const CoupleDataContext = React.createContext();

export const CoupleDataProvider = CoupleDataContext.Provider;
export const CoupleDataConsumer = CoupleDataContext.Consumer;

export default CoupleDataContext;