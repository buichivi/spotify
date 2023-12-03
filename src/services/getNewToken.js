import axios from 'axios';
import { AUTH_ENDPOINT } from '~/config/spotify';

const getNewToken = async (refresh_token) => {
    const newAccessData = await axios.post(
        `${AUTH_ENDPOINT}/api/token`,
        {
            grant_type: 'refresh_token',
            refresh_token,
            client_id: import.meta.env.VITE_SPOTIFY_CLIENT_ID
        },
        {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded',
                Authorization:
                    'Basic ' +
                    btoa(
                        import.meta.env.VITE_SPOTIFY_CLIENT_ID +
                            ':' +
                            import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
                    ),
            },
        },
    );
    return newAccessData.data;
};
export default getNewToken;
