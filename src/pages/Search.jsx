import { useEffect, useState } from 'react';
import GenreItem from '~/components/GenreItem';
import HistorySearch from '~/components/HistorySearch';
import { useSpotifyApi } from '~/hooks';

const Search = () => {
    document.title = 'Spotify - Search';
    const [genres, setGenres] = useState([]);
    const spotifyApi = useSpotifyApi();

    useEffect(() => {
        const getGenres = async () => {
            const genres = await spotifyApi.getCategories({ limit: 50 });
            setGenres(genres.body.categories.items);
        };
        if (!spotifyApi.error) {
            getGenres();
        }
    }, [spotifyApi]);

    return (
        <div className="px-6">
            <HistorySearch />
            <div className="mt-4 mb-5">
                <h3 className="h-[45px] text-2xl font-bold text-white">Browse all</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-3">
                    {genres.map((genre, index) => {
                        return <GenreItem key={index} genreData={genre} />;
                    })}
                </div>
            </div>
            <div></div>
        </div>
    );
};

export default Search;
