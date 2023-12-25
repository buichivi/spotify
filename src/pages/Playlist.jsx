import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import Vibrant from 'node-vibrant';
import { ClockIcon, PauseIcon, PlayIcon } from '~/components/Icons';
import SongItem from '~/components/SongItem';
import useSongReducer from '~/hooks/useSongReducer';
import { convertDurationToText } from '~/utils';

const Playlist = () => {
    const { id } = useParams();
    const { songState, dispatchSongState } = useSongReducer();
    const [playlist, setPlaylist] = useState({});
    const [mainColor, setMainColor] = useState('');
    const [savedTracks, setSavedTracks] = useState([]);
    const spotifyApi = useSpotifyApi();
    const totalTime = playlist?.tracks?.items?.reduce((acc, item) => {
        return acc + Number(item?.track?.duration_ms);
    }, 0);

    // ! Lỗi khi mới tải trang và context_uri = '' và ấn nút play trên trang album
    // ! thì bị lỗi thời gian không reset về 0

    const handlePlayAndResume = async () => {
        const optionPlay =
            playlist?.uri == songState?.context?.context_uri
                ? {
                    context_uri: songState?.context?.context_uri,
                    offset: songState?.context?.option?.offset,
                }
                : {
                    context_uri: playlist?.uri,
                    offset: { uri: playlist?.tracks?.items[0]?.track?.uri },
                };
        spotifyApi
            .play({
                device_id: songState.deviceId,
                ...optionPlay,
                position_ms:
                    songState?.context?.context_uri == playlist?.uri
                        ? songState.position
                        : 0,
            })
            .then(() => {
                dispatchSongState({
                    type: 'SET_CONTEXT',
                    payLoad: {
                        context: {
                            context_uri: optionPlay?.context_uri,
                            option: {
                                offset: optionPlay?.offset,
                            },
                        },
                    },
                });
            });
    };

    const handlePause = () => {
        spotifyApi.pause();
    };

    useEffect(() => {
        const getPlaylist = async () => {
            const playlist = await spotifyApi.getPlaylist(id);
            const color = await Vibrant.from(
                playlist.body.images[0].url,
            ).getPalette();
            setMainColor(color.Vibrant.getHex());
            setPlaylist(playlist.body);
            const trackIds = playlist?.body?.tracks?.items?.map(item => item?.track?.id)
            getSavedTracks(trackIds)
        };

        const getSavedTracks = async (trackIds = []) => {
            const savedTracks = await spotifyApi.containsMySavedTracks(
                trackIds,
            );
            setSavedTracks(savedTracks.body);
        };

        if (!spotifyApi.error) {
            getPlaylist();
        }
    }, [spotifyApi, id]);

    useEffect(() => {
        if (playlist.uri && songState?.context?.context_uri == playlist.uri) {
            dispatchSongState({
                type: 'SET_CONTEXT',
                payLoad: {
                    context: {
                        context_uri: playlist?.uri,
                        option: {
                            offset: {
                                uri: songState?.uri,
                            },
                        },
                    },
                },
            });
        }
    }, [songState.songId, playlist.uri]);

    return (
        <div className="h-auto w-full -mt-nav">
            <div
                className="min-h-[240px] md:min-h-[340px] max-h-[30vh] md:max-h-[40vh] px-6 pb-8 w-full flex items-end
                    bg-gradient-to-b from-[#121212] from-[99%] to-[#121212] to-[99%]
                "
                style={{
                    '--tw-gradient-from': mainColor,
                    '--tw-gradient-to': mainColor + '70',
                }}
            >
                <div className=" flex-shrink-0 w-contentImgWidth h-contentImgHeight mr-8 rounded-md shadow-blur-xl overflow-hidden">
                    <img
                        src={
                            playlist?.images?.length > 0
                                ? playlist.images[0].url
                                : ''
                        }
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div className="flex items-center font-light text-sm capitalize">
                        {playlist?.type}
                    </div>
                    <div className="mt-1 mb-3 text-[18px] md:text-[34px] xl:text-[48px] capitalize font-extrabold">
                        <h1 className="">{playlist?.name}</h1>
                    </div>
                    <div className="min-w-[470px] text-white mt-1 font-normal flex items-end">
                        <Link
                            to={`/user/${playlist?.owner?.id}`}
                            className="text-sm hover:underline"
                        >
                            {playlist?.owner?.display_name}
                        </Link>
                        <div>
                            <span className='before:content-["•"] before:text-[8px] before:relative before:top-1/2 before:-translate-x-1/2 before:mx-1 text-sm font-light'>
                                {playlist?.tracks?.total} song
                                {playlist?.tracks?.total >= 2 && 's'},
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
                className="h-auto bg-gradient-to-b from-[#121212] from-[250px] to-[#121212 to-[250px] opacity-90 sticky top-0"
                style={{
                    '--tw-gradient-from': mainColor + '60',
                }}
            >
                <div className="h-auto p-[24px] flex items-center relative">
                    <button className="w-[56px] h-[56px] bg-[#1db954] text-black overflow-hidden rounded-full flex items-center justify-center hover:scale-105 transition mr-8">
                        <div
                            className="p-[100%]"
                            onClick={handlePlayAndResume}
                            style={{
                                display:
                                    songState?.context?.context_uri ==
                                        playlist?.uri &&
                                    songState?.isPlaying == true &&
                                    'none',
                            }}
                        >
                            <PlayIcon />
                        </div>
                        {songState?.context?.context_uri == playlist?.uri &&
                            songState?.isPlaying == true && (
                                <div className="p-[100%]" onClick={handlePause}>
                                    <PauseIcon />
                                </div>
                            )}
                    </button>
                </div>
                <div className="px-6">
                    <div className="h-[36px] flex items-center justify-between gap-4 px-4 mb-6 border-b-[1px] border-[#ffffff1a] text-[#a7a7a7]">
                        <span className="text-sm  ml-[4px]">#</span>
                        <span className="flex-1 text-sm font-light">Title</span>
                        <span className="hidden md:inline-block flex-1 text-sm font-light">
                            Album
                        </span>
                        <span className="hidden xl:inline-block flex-1 text-sm font-light">
                            Date added
                        </span>
                        <span className="w-[120px] flex flex-shrink-0 items-center justify-end">
                            <ClockIcon width={16} height={16} />
                        </span>
                    </div>
                    <div className="w-full">
                        {playlist?.tracks?.items?.map((item, index) => {
                            return (
                                <div key={index}>
                                    <SongItem
                                        orderNum={index + 1}
                                        trackData={item?.track}
                                        context={playlist?.uri}
                                        playlistUri={playlist?.uri}
                                        dateAdded={item?.added_at}
                                        isPlaylist
                                        isSaved={savedTracks[index]}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Playlist;
