import axios from 'axios';
import { AUTH_ENDPOINT } from '~/config/spotify';

const getToken = async (code) => {
    const access_data = await axios.post(
        `${AUTH_ENDPOINT}/api/token`,
        {
            grant_type: 'authorization_code',
            code,
            redirect_uri: window.location.origin,
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
    return access_data.data;
};
export default getToken;
