import { createContext, useEffect, useState } from 'react';
import { spotifyApi } from '~/config/spotify';
import getToken from '~/services/getToken';

export const SpotifyContext = createContext();


const SpotifyProvider = ({ children }) => {
    // const [accessToken, setAccessToken] = useState(initAccessToken)
    // const [refreshToken, setRefreshToken] = useState(initRefreshToken)
    
    console.log('re-render');
    // initAccessToken && spotifyApi.setAccessToken(initAccessToken)
    
    const initAccessToken = localStorage.getItem('access_token');
    const initRefreshToken = localStorage.getItem('refresh_token');
    initAccessToken && spotifyApi.setAccessToken(initAccessToken);
    initRefreshToken && spotifyApi.setRefreshToken(initRefreshToken);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            getToken(code).then((data) => {
                console.log('have code');
                // setAccessToken(data.access_token);
                // setRefreshToken(data.refresh_token);
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);
                spotifyApi.setAccessToken(data.access_token);
                spotifyApi.setRefreshToken(data.refresh_token);
                window.location = origin
            });
        }
    }, []);

    return (
        <SpotifyContext.Provider value={{}}>{children}</SpotifyContext.Provider>
    );
};

export default SpotifyProvider;
