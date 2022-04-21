import React, { useState, createContext } from "react";

const appContext = createContext();

export const AppProvider = ({ children }) => {
  return <appContext.Provider>{children}</appContext.Provider>;
};
