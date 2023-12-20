import { createContext, useEffect, useReducer } from 'react';
import useSpotifyApi from '~/hooks/useSpotifyApi';
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
