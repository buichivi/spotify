import { useContext } from 'react';
import { SpotifyContext } from '~/Provider/SpotifyProvider';

const useAccessToken = () => {
    const { accessToken } = useContext(SpotifyContext);
    return accessToken;
};

export default useAccessToken;
