import { createContext, useEffect, useState } from 'react';
import { spotifyApi } from '~/config/spotify';
import getNewToken from '~/services/getNewToken';
import getToken from '~/services/getToken';

export const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {
    console.log('App re-render');

    const initAccessToken = localStorage.getItem('access_token');
    const initRefreshToken = localStorage.getItem('refresh_token');
    initAccessToken && spotifyApi.setAccessToken(initAccessToken);
    initRefreshToken && spotifyApi.setRefreshToken(initRefreshToken);

    useEffect(() => {
        const code = new URLSearchParams(window.location.search).get('code');
        if (code) {
            getToken(code).then((data) => {
                console.log('have code');
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);                
                spotifyApi.setAccessToken(data.access_token);
                spotifyApi.setRefreshToken(data.refresh_token);
                window.location = origin;
            });
        }

        // get new access_token every 50 minutes
        const timerId = setInterval(() => {
            const refresh_token = spotifyApi.getRefreshToken();
            getNewToken(refresh_token).then(data => {
                localStorage.setItem('access_token', data.access_token);
                spotifyApi.setAccessToken(data.access_token);
            })
        }, 3000000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <SpotifyContext.Provider value={{}}>{children}</SpotifyContext.Provider>
    );
};

export default SpotifyProvider;
