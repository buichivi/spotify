import { useContext, useEffect, useState } from 'react';
import { SpotifyContext } from '~/Provider/SpotifyProvider';
import Category from '~/components/Category';
import { spotifyApi } from '~/config/spotify';
import useAccessToken from '~/hooks/useAccessToken';
// import { spotifyApi } from '~/config/spotify';

const Home = () => {
    document.title = 'Spotify - Web player: Music for everyone';
    const [recommenedPlaylists, setRecommenedPlaylists] = useState([]);
    // const accessToken = useAccessToken();

    useEffect(() => {
        // if (accessToken) {
            console.log(spotifyApi.getAccessToken())
            spotifyApi.getFeaturedPlaylists().then((res) => {
                setRecommenedPlaylists(res.body.playlists);
                // spotifyApi.setAccessToken(accessToken);
            });
        // }
    }, []);

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-6">
                <Category
                    data={recommenedPlaylists?.items}
                    title="Spotify Playlists"
                    className="bg-gradient-to-b from-[#1e1e1e] to-[#121212]"
                />
            </div>
        </div>
    );
};

export default Home;
