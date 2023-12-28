import { createContext, useEffect, useReducer } from 'react';
import { useSpotifyApi } from '~/hooks';
import { initSongState, songReducer } from '~/reducer/songReducer';

const SongContext = createContext();
const SongProvider = ({ children }) => {
    const [songState, dispatchSongState] = useReducer(songReducer, initSongState);

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
                    product: user?.body?.product
                },
            });
        };
        if (!spotifyApi.error) {
            loadUser();
        }
    }, [spotifyApi]);

    useEffect(() => {
        const isSavedTrack = async () => {
            const isSaved = await spotifyApi.containsMySavedTracks([songState.songId]);
            dispatchSongState({
                type: 'SET_IS_SAVED_TRACK',
                payLoad: isSaved.body[0],
            });
        };
        if (songState.songId) isSavedTrack();
    }, [songState.songId]);

    return <SongContext.Provider value={{ songState, dispatchSongState }}>{children}</SongContext.Provider>;
};

export default SongProvider;
export { SongContext };
