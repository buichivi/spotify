import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSpotifyApi, useSongReducer, useLibraryReducer } from '~/hooks';
import Vibrant from 'node-vibrant';
import { ClockIcon, HeartIcon, PauseIcon, PlayIcon } from '~/components/Icons';
import SongItem from '~/components/SongItem';
import { convertDurationToText, convertDateString } from '~/utils';

const Album = () => {
    const { id } = useParams();
    const { songState, dispatchSongState } = useSongReducer();
    const { dispatchLibraryState } = useLibraryReducer();
    const [album, setAlbum] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const [savedTracks, setSavedTracks] = useState([]);
    const [mainColor, setMainColor] = useState('');
    const spotifyApi = useSpotifyApi();
    const totalTime = album?.tracks?.items?.reduce((acc, item) => {
        return acc + Number(item?.duration_ms);
    }, 0);

    // ! Lỗi khi mới tải trang và context_uri = '' và ấn nút play trên trang album
    // ! thì bị lỗi thời gian không reset về 0

    const handlePlayAndResume = async () => {
        const optionPlay =
            album.uri == songState?.context?.context_uri
                ? {
                      context_uri: songState?.context?.context_uri,
                      offset: songState?.context?.option?.offset,
                  }
                : {
                      context_uri: album?.uri,
                      offset: { uri: album?.tracks?.items[0]?.uri },
                  };
        spotifyApi
            .play({
                device_id: songState.deviceId,
                ...optionPlay,
                position_ms: songState?.context?.context_uri == album?.uri ? songState.position : 0,
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
        const getAlbum = async () => {
            const album = await spotifyApi.getAlbum(id);
            const color = await Vibrant.from(album.body.images[0].url).getPalette();
            setMainColor(color.DarkVibrant.getHex());
            setAlbum(album.body);
            const trackIds = album?.body?.tracks?.items?.map((item) => item.id);
            getSavedTracks(trackIds);
        };

        const getSavedTracks = async (trackIds = []) => {
            const savedTracks = await spotifyApi.containsMySavedTracks(trackIds);
            setSavedTracks(savedTracks.body);
        };

        const isLikeAlbum = async () => {
            const isSaved = await spotifyApi.containsMySavedAlbums([id]);
            setIsSaved(isSaved?.body[0]);
        };

        if (!spotifyApi.error) {
            getAlbum();
            isLikeAlbum();
        }
    }, [spotifyApi, id]);

    useEffect(() => {
        if (id === songState.albumId && album.uri && songState?.context?.context_uri == album.uri) {
            dispatchSongState({
                type: 'SET_CONTEXT',
                payLoad: {
                    context: {
                        context_uri: album?.uri,
                        option: {
                            offset: {
                                uri: songState?.uri,
                            },
                        },
                    },
                },
            });
        }
    }, [songState.songId, album.uri]);

    // console.log(album);

    return (
        <div className="h-auto w-full -mt-nav">
            <div
                className="min-h-[240px] md:min-h-[340px] max-h-[30vh] md:max-h-[40vh] px-6 pb-8 w-full flex items-end
                bg-gradient-to-b from-[#121212] from-[99%] to-[#121212] to-[99%]
                "
                style={{
                    '--tw-gradient-from': mainColor,
                    '--tw-gradient-to': mainColor + 'B3',
                }}
            >
                <div className=" flex-shrink-0 w-contentImgWidth h-contentImgHeight mr-8 rounded-md shadow-blur-xl overflow-hidden">
                    <img
                        src={album?.images?.length > 0 ? album.images[0].url : ''}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <div className="flex items-center font-light text-sm capitalize">{album?.album_type}</div>
                    <div className="mt-1 mb-3 text-[18px] md:text-[34px] xl:text-[48px] capitalize font-extrabold">
                        <h1 className="">{album?.name}</h1>
                    </div>
                    <div className="min-w-[470px] text-white mt-1 font-normal flex items-end">
                        {album?.artists?.map((artist, index) => {
                            return (
                                <div key={index}>
                                    <Link to={`/artist/${artist.id}`} className="text-sm font-bold hover:underline">
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
                            <span className="text-sm font-light"> {convertDurationToText(totalTime)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="h-auto bg-gradient-to-b from-[#121212] from-[250px] to-[#121212 to-[250px] opacity-90 sticky top-0"
                style={{
                    '--tw-gradient-from': mainColor + '99',
                }}
            >
                <div className="h-auto p-[24px] flex items-center relative">
                    <button className="w-[56px] h-[56px] bg-[#1db954] text-black overflow-hidden rounded-full flex items-center justify-center hover:scale-105 transition mr-8">
                        <div
                            className="p-[100%]"
                            onClick={handlePlayAndResume}
                            style={{
                                display:
                                    songState?.context?.context_uri == album?.uri &&
                                    songState?.isPlaying == true &&
                                    'none',
                            }}
                        >
                            <PlayIcon />
                        </div>
                        {songState?.context?.context_uri == album?.uri && songState?.isPlaying == true && (
                            <div className="p-[100%]" onClick={handlePause}>
                                <PauseIcon />
                            </div>
                        )}
                    </button>
                    <div
                        className="text-[#a7a7a7] hover:text-white cursor-pointer"
                        onClick={() => {
                            if (!isSaved) {
                                spotifyApi.addToMySavedAlbums([id]).then(() => {
                                    setIsSaved(true);
                                    dispatchLibraryState({
                                        type: 'SAVE_ALBUM',
                                        payLoad: {
                                            imageUrl: album?.images[0]?.url,
                                            id: album?.id,
                                            name: album?.name,
                                            type: album?.type,
                                            uri: album?.uri,
                                            owner: album?.artists[0].name,
                                        },
                                    });
                                });
                            } else {
                                spotifyApi.removeFromMySavedAlbums([id]).then(() => {
                                    setIsSaved(false);
                                    dispatchLibraryState({
                                        type: 'REMOVE_ALBUM',
                                        payLoad: id,
                                    });
                                });
                            }
                        }}
                    >
                        <HeartIcon
                            className={`w-6 h-6 md:w-8 md:h-8 ${isSaved && 'text-[#1db954]'}`}
                            isLiked={isSaved}
                        />
                    </div>
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
                                        context={album?.uri}
                                        isHideImg
                                        isAlbum
                                        albumUri={album?.uri}
                                        isSaved={savedTracks[index]}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-8 text-sm text-[#b3b3b3] font-light">
                        <span>{convertDateString(album?.release_date)}</span>
                        {album?.copyrights?.map((copyright, index) => {
                            return (
                                <p key={index} className="text-xs">
                                    {copyright.text}
                                </p>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Album;
