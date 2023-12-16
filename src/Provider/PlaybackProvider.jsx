import { createContext, useEffect, useState } from 'react';
import useSpotifyApi from '~/hooks/useSpotifyApi';

const PlaybackContext = createContext();
const PlaybackProvider = ({ children }) => {
    const spotifyApi = useSpotifyApi();
    const [playbackState, setPlaybackState] = useState();
    const [player, setPlayer] = useState();

    useEffect(() => {
        const getPlayer = async () => {
            const playbackState = await spotifyApi.getMyCurrentPlaybackState();
            setPlaybackState(playbackState.body);
            const deviceIds = await spotifyApi.getMyDevices()
            console.log(deviceIds.body);
            
        };
        if (!spotifyApi.error) {
            getPlayer();
        }
    }, [spotifyApi]);

    return (
        <PlaybackContext.Provider value={{ playbackState }}>
            {children}
        </PlaybackContext.Provider>
    );
};

export default PlaybackProvider;
export { PlaybackContext };
