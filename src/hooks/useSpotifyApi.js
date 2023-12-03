import { spotifyApi } from '~/config/spotify';

const useSpotifyApi = (access_token) => {
    spotifyApi.setAccessToken(access_token);
    return spotifyApi;
};

export default useSpotifyApi;
