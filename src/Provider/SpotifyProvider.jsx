import { createContext, useEffect, useState } from 'react';
import getToken from '~/services/getToken';

export const SpotifyContext = createContext();

const SpotifyProvider = ({ children }) => {
    console.log('App re-render');
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem('access_token'),
    );
    const [refreshToken, setRefreshToken] = useState(
        localStorage.getItem('refresh_token'),
    );

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
    }, []);

    return (
        <SpotifyContext.Provider value={{ accessToken, refreshToken }}>
            {children}
        </SpotifyContext.Provider>
    );
};

export default SpotifyProvider;
