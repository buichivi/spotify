import { useEffect, useState } from 'react';
import Category from '~/components/Category';
import { useSpotifyApi } from '~/hooks';

const Home = () => {
    document.title = 'Spotify - Web player: Music for everyone';
    const [recommenedPlaylists, setRecommenedPlaylists] = useState([]);
    const [recentAlbums, setRecentAlbums] = useState([]);
    const spotifyApi = useSpotifyApi();

    const removeSimilarSongs = (arr) => {
        const unique = [];
        const albumIds = [];
        arr.forEach((item) => {
            if (!albumIds.includes(item?.track?.album?.id)) {
                albumIds.push(item?.track?.album?.id);
                unique.push(item);
            }
        });
        return unique;
    };

    useEffect(() => {
        const loadHomeData = async () => {
            if (!spotifyApi.error) {
                const featuredPlaylist = await spotifyApi.getFeaturedPlaylists();
                const recentTracks = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 40 });
                setRecommenedPlaylists(featuredPlaylist.body.playlists);
                setRecentAlbums(recentTracks.body.items);
            }
        };
        if (!spotifyApi.error) {
            loadHomeData();
        }
    }, [spotifyApi]);

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
