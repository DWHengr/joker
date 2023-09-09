import React, {createContext, useContext} from "react";

export const GlobalContext = createContext();

export function useGlobalContext() {
    const context = useContext(GlobalContext);
    return context;
}
