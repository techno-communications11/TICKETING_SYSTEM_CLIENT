import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
const GlobalContext = createContext();

const useGlobalCurrentUserState = () => useContext(GlobalContext);

const GlobalAuthStates = ({ children }) => {
    const contextValue = useMemo(() => ({

    }), []);

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};

export { GlobalAuthStates, useGlobalCurrentUserState };
