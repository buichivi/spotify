import { useContext } from "react";
import { SpotifyContext } from "~/Provider/SpotifyProvider";
import { spotifyApi } from "~/config/spotify";

const useSpotifyApi = () => {
    const { accessToken, refreshToken } = useContext(SpotifyContext);
    if (accessToken) {
        spotifyApi.setAccessToken(accessToken);
        spotifyApi.setRefreshToken(refreshToken);
        return spotifyApi 
    }
    return { 
        error: 'Missing access_token'
    }
}

export default useSpotifyApi