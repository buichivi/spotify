import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import Vibrant from 'node-vibrant';
import { ClockIcon, PauseIcon, PlayIcon, VerifyIcon } from '~/components/Icons';
import SongItem from '~/components/SongItem';
import useSongReducer from '~/hooks/useSongReducer';
import { convertDurationToText } from '~/utils/convertDurationToText';

const Album = () => {
    const { id } = useParams();
    const { songState, dispatchSongState } = useSongReducer();
    const [album, setAlbum] = useState({});
    const [mainColor, setMainColor] = useState('');
    const spotifyApi = useSpotifyApi();
    const context = album?.tracks?.items?.map((track) => {
        return track?.uri;
    });
    const totalTime = album?.tracks?.items?.reduce((acc, item) => {
        return acc + Number(item?.duration_ms);
    }, 0);

    const handlePlayAndResume = async () => {};

    const handlePause = () => {};

    useEffect(() => {
        const getArtist = async () => {
            const album = await spotifyApi.getAlbum(id);
            const color = await Vibrant.from(
                album.body.images[0].url,
            ).getPalette();
            setMainColor(color.DarkVibrant.getHex());
            setAlbum(album.body);
        };

        if (!spotifyApi.error) {
            getArtist();
        }
    }, [spotifyApi, id]);

    return (
        <div className="h-auto w-full -mt-nav">
            <div
                className="min-h-[240px] md:min-h-[340px] max-h-[30vh] md:max-h-[40vh] px-6 pb-8 w-full flex items-end"
                style={{
                    backgroundColor: mainColor,
                }}
            >
                <div className=" flex-shrink-0 w-contentImgWidth h-contentImgHeight mr-8 rounded-md shadow-blur-xl overflow-hidden">
                    <img
                        src={
                            album?.images?.length > 0 ? album.images[0].url : ''
                        }
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div className="flex items-center font-light text-sm capitalize">
                        {album?.album_type}
                    </div>
                    <div className="mt-1 mb-3 text-[18px] md:text-[34px] xl:text-[48px] capitalize font-extrabold">
                        <h1 className="">{album?.name}</h1>
                    </div>
                    <div className="min-w-[470px] text-white mt-1 font-normal flex items-end">
                        {album?.artists?.map((artist, index) => {
                            return (
                                <div key={index}>
                                    <Link
                                        to={`/artist/${artist.id}`}
                                        className="text-sm font-bold hover:underline"
                                    >
                                        {artist.name}
                                    </Link>
                                    {index <= album?.artists?.length - 2 && (
                                        <span className='before:content-["•"] before:text-[8px] before:top-1/2 before:-translate-x-1/2 mx-1 relative font-light'></span>
                                    )}
                                </div>
                            );
                        })}
                        <div>
                            <span className='before:content-["•"] before:text-[8px] before:relative before:top-1/2 before:-translate-x-1/2 before:mx-1 text-sm font-light'>
                                {new Date(album?.release_date).getFullYear()}
                            </span>
                        </div>
                        <div>
                            <span className='before:content-["•"] before:text-[8px] before:relative before:top-1/2 before:-translate-x-1/2 before:mx-1 text-sm font-light'>
                                {album?.total_tracks} song
                                {album?.total_tracks >= 2 && 's'},
                            </span>
                            <span className="text-sm font-light">
                                {' '}
                                {convertDurationToText(totalTime)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="h-auto bg-gradient-to-b from-[#121212] from-[200px] to-[#121212 to-[200px] opacity-90 sticky top-0"
                style={{
                    '--tw-gradient-from': mainColor,
                }}
            >
                <div className="h-auto p-[24px] flex items-center relative">
                    <button
                        className="w-[56px] h-[56px] bg-[#1db954] text-black rounded-full flex items-center justify-center hover:scale-105 transition mr-8"
                        onClick={() => {
                            if (songState.isPlaying) {
                                handlePause();
                            } else {
                                handlePlayAndResume();
                            }
                        }}
                    >
                        <div
                            style={{
                                display:
                                    songState?.artistIds?.includes(id) &&
                                    songState?.isPlaying == true &&
                                    'none',
                            }}
                        >
                            <PlayIcon />
                        </div>
                        {songState?.artistIds?.includes(id) &&
                            songState?.isPlaying == true && (
                                <div>
                                    <PauseIcon />
                                </div>
                            )}
                    </button>
                </div>
                <div className="px-6">
                    <div className="h-[36px] flex items-center justify-between gap-4 px-4 mb-6 border-b-[1px] border-[#ffffff1a] text-[#a7a7a7]">
                        <span className="text-sm  ml-[4px]">#</span>
                        <span className="flex-1 text-sm font-light">Title</span>
                        <span>
                            <ClockIcon width={16} height={16} />
                        </span>
                    </div>
                    <div className="w-full">
                        {album?.tracks?.items?.map((track, index) => {
                            return (
                                <div key={index}>
                                    <SongItem
                                        orderNum={index + 1}
                                        trackData={track}
                                        context={context}
                                        isHide
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-8 text-sm text-[#b3b3b3] font-light">
                        <span>
                            {new Date(album?.release_date).toLocaleDateString(
                                'en-US',
                                {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                },
                            )}
                        </span>
                        {album?.copyrights?.map((copyright, index) => {
                            return <p key={index} className='text-xs'>{copyright.text}</p>;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Album;
