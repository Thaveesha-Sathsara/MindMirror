import { useContext, createContext, useState } from "react";

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
    const [isStoreUpdated, setIsStoreUpdated] = useState(true);
    const [store, setStore] = useState();
    const [searchState, setSearchState] = useState();

    return (
        <StoreContext.Provider value={{store, setStore, searchState, setSearchState, isStoreUpdated, setIsStoreUpdated}}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStore = () => useContext(StoreContext);