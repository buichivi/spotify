import { useEffect, useState } from 'react';
import Category from '~/components/Category';
import GenreItem from '~/components/GenreItem';
import HistorySearch from '~/components/HistorySearch';
import { spotifyApi } from '~/config/spotify';
import useAccessToken from '~/hooks/useAccessToken';

const Search = () => {
    document.title = 'Spotify - Search';
    const [userPlaylists, setUserPlaylists] = useState([]);
    const token = useAccessToken();
    useEffect(() => {
        if (token) {
            spotifyApi.setAccessToken(token);
            spotifyApi
                .getMyRecentlyPlayedTracks({ limit: 6 })
                .then(data => setUserPlaylists(data.body.items));
        }
    }, []);

    return (
        <div className="px-6">
            <HistorySearch />
            <div className="mt-4 mb-5">
                <h3 className="h-[45px] text-2xl font-bold text-white">
                    Browse all
                </h3>
                <div className="grid grid-cols-5 2xl:grid-cols-8 gap-3">
                    <GenreItem
                        className=""
                        title="Pop"
                        color={'bg-green-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                    <GenreItem
                        className=""
                        title="Ballad"
                        color={'bg-purple-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                    <GenreItem
                        className=""
                        title="Vietnamese Music"
                        color={'bg-green-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                    <GenreItem
                        className=""
                        title="Comedy"
                        color={'bg-green-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                    <GenreItem
                        className=""
                        title="Discover"
                        color={'bg-green-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                    <GenreItem
                        className=""
                        title="Rock"
                        color={'bg-green-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                    <GenreItem
                        className=""
                        title="R&B"
                        color={'bg-green-500'}
                        thumbImg="https://i.scdn.co/image/ab6765630000ba8a81f07e1ead0317ee3c285bfa"
                    />
                </div>
            </div>
            <div>
                <Category
                    data={userPlaylists.items}
                    title="Recently played"
                    className="bg-[#121212]"
                />
            </div>
        </div>
    );
};

export default Search;