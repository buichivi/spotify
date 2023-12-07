import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { spotifyApi } from '~/config/spotify';
import getNewToken from '~/services/getNewToken';
import getToken from '~/services/getToken';

export const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {
    console.log('App re-render');
    const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refresh_token'));

    // const initAccessToken = localStorage.getItem('access_token');
    // const initRefreshToken = localStorage.getItem('refresh_token');
    // initAccessToken && spotifyApi.setAccessToken(initAccessToken);
    // initRefreshToken && spotifyApi.setRefreshToken(initRefreshToken);

    useEffect(() => {
        console.log('Spofify Provider useEffect()');
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            getToken(code).then((data) => {
                if (data.access_token) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('refresh_token', data.refresh_token);
                    setAccessToken(data.access_token);
                    setRefreshToken(data.refresh_token);
                    window.history.replaceState(document.title, {}, origin);
                }
            });
        }

        // get new access_token every 50 minutes
        // const timerId = setInterval(() => {
        //     const refresh_token = spotifyApi.getRefreshToken();
        //     getNewToken(refresh_token).then((data) => {
        //         localStorage.setItem('access_token', data.access_token);
        //         spotifyApi.setAccessToken(data.access_token);
        //     });
        // }, 3000000);
        // return () => clearInterval(timerId);
    }, []);

    return (
        <SpotifyContext.Provider value={{ accessToken, refreshToken }}>
            {children}
        </SpotifyContext.Provider>
    );
};

export default SpotifyProvider;
