import { createContext, useReducer } from 'react';
import { initSongState, songReducer } from '~/reducer/songReducer';

const SongContext = createContext();
const SongProvider = ({ children }) => {
    const [songState, dispatchSongState] = useReducer(
        songReducer,
        initSongState,
    );

    return (
        <SongContext.Provider value={{ songState, dispatchSongState }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongProvider;
export { SongContext };
