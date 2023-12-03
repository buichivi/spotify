import { useEffect, useState } from 'react';
import Category from '~/components/Category';
import { spotifyApi } from '~/config/spotify';
// import { spotifyApi } from '~/config/spotify';

const Home = () => {
    document.title = 'Spotify - Web player: Music for everyone';
    const [recommenedPlaylists, setRecommenedPlaylists] = useState([]);
    const [recentAlbums, setRecentAlbums] = useState([]);

    const removeSimilarSongs = (arr) => {
        var i = 1;
        var nextValue = arr[i];
        const newArr = arr.filter((item) => {
            const next = { ...nextValue };
            nextValue = { ...arr[i + 1] };
            i++;
            return item?.track?.album?.id != next?.track?.album?.id;
        });
        return newArr;
    };

    useEffect(() => {
        spotifyApi.getFeaturedPlaylists().then((res) => {
            setRecommenedPlaylists(res.body.playlists);
        });
        spotifyApi.getMyRecentlyPlayedTracks({ limit: 40 }).then((data) => {
            setRecentAlbums(data.body.items);
        });
    }, []);

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-6">
                <Category
                    data={recommenedPlaylists?.items}
                    title="Spotify Playlists"
                    className="bg-gradient-to-b from-[#1e1e1e] to-[#121212]"
                />
                {recentAlbums.length > 0 && (
                    <Category
                        data={removeSimilarSongs(recentAlbums)}
                        type="album"
                        title="Recently played"
                        className="bg-[#121212]"
                    />
                )}
            </div>
        </div>
    );
};

export default Home;
