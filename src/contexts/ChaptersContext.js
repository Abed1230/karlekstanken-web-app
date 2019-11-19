import React from 'react';

const ChaptersContext = React.createContext();

export const ChaptersProvider = ChaptersContext.Provider;
export const ChaptersConsumer = ChaptersContext.Consumer;

export default ChaptersContext;