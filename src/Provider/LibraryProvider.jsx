import { createContext, useEffect, useReducer } from 'react';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import { initLibraryState, libraryReducer } from '~/reducer/libraryReducer';

export const LibraryContext = createContext();
const LibraryProvider = ({ children }) => {
    const [libraryState, dispatchLibraryState] = useReducer(
        libraryReducer,
        initLibraryState,
    );
    const spotifyApi = useSpotifyApi();

    useEffect(() => {
        const loadLibrary = async () => {
            const playlists = await spotifyApi.getUserPlaylists();
            const artists = await spotifyApi.getFollowedArtists({
                limit: 50,
            });
            const albums = await spotifyApi.getMySavedAlbums();
            const payLoad = {
                playlists: playlists.body.items.map((playlist) => ({
                    imageUrl: playlist?.images[0]?.url,
                    id: playlist?.id,
                    name: playlist?.name,
                    type: playlist?.type,
                })),
                artists: artists.body.artists.items.map((artist) => ({
                    imageUrl: artist?.images[0].url,
                    id: artist?.id,
                    name: artist?.name,
                    type: artist?.type,
                })),
                albums: albums.body.items.map((item) => ({
                    imageUrl: item?.album.images[0].url,
                    id: item?.album.id,
                    name: item?.album.name,
                    type: item?.album.type,
                })),
            };
            dispatchLibraryState({
                type: 'UPDATE_LIBRARY',
                payLoad: payLoad,
            });
        };
        if (!spotifyApi.error) {
            loadLibrary();
        }
    }, [spotifyApi]);

    return (
        <LibraryContext.Provider value={{ libraryState, dispatchLibraryState }}>
            {children}
        </LibraryContext.Provider>
    );
};

export default LibraryProvider;
