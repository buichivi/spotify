import { createContext, useReducer } from 'react';
import { initLibraryState, libraryReducer } from '~/reducer/libraryReducer';

export const LibraryContext = createContext();
const LibraryProvider = ({ children }) => {
    const [libraryState, dispatchLibraryState] = useReducer(
        initLibraryState,
        libraryReducer,
    );
    return (
        <LibraryContext.Provider value={{ libraryState, dispatchLibraryState }}>
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryProvider;
