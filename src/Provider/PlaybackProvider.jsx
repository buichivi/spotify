import { createContext, useReducer } from 'react';
import { initSongState, songReducer } from '~/reducer/songReducer';

const PlaybackContext = createContext();
const PlaybackProvider = ({ children }) => {
    const [songState, dispatchSongState] = useReducer(
        songReducer,
        initSongState,
    );

    console.log(songState);

    return (
        <PlaybackContext.Provider value={{ songState, dispatchSongState }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export default PlaybackProvider;
export { PlaybackContext };
