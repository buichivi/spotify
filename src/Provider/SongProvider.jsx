import { createContext, useEffect, useReducer } from 'react';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import { initSongState, songReducer } from '~/reducer/songReducer';

const SongContext = createContext();
const SongProvider = ({ children }) => {
    const [songState, dispatchSongState] = useReducer(
        songReducer,
        initSongState,
    );

    const spotifyApi = useSpotifyApi();

    console.log(songState);

    useEffect(() => {
        const loadUser = async () => {
            const user = await spotifyApi.getMe();
            dispatchSongState({
                type: 'SET_USER',
                payLoad: {
                    name: user?.body?.display_name,
                    imageUrl: user?.body?.images[0]?.url,
                },
            });
        };
        if (!spotifyApi.error) {
            loadUser();
        }
    }, [spotifyApi]);

    return (
        <SongContext.Provider value={{ songState, dispatchSongState }}>
            {children}
        </SongContext.Provider>
    );
};

export default SongProvider;
export { SongContext };
