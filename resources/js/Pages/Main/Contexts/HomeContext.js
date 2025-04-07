import { createContext, useContext } from "react";

export const HomeContext = createContext(null);

export const useHomeContext = () => useContext(HomeContext);
