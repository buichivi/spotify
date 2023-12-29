import { HeartIcon, PauseIcon, PlayIcon } from '../Icons';
import { useSpotifyApi, useSongReducer, useLibraryReducer } from '~/hooks';
import { durationConvert, convertDateString } from '~/utils';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SongItem = ({
    orderNum = 1,
    trackData = {},
    context,
    isHideArtists = false,
    isHideImg = false,
    isArtist = false,
    isAlbum = false,
    isPlaylist = false,
    artistUri = '',
    albumUri = '',
    playlistUri = '',
    dateAdded = '',
    isSaved = false,
}) => {
    // ? Nên chia ra isAlbum và isPlaylist hay để isAlbumOrPlaylist và thêm isAlbum và isPlaylist

    const { songState, dispatchSongState } = useSongReducer();
    const { dispatchLibraryState } = useLibraryReducer();
    const spotifyApi = useSpotifyApi();
    const [isSavedTrack, setIsSavedTrack] = useState(isSaved);

    useEffect(() => {
        setIsSavedTrack(isSaved);
    }, [isSaved]);

    var isActive = false;
    if (isArtist) {
        isActive =
            songState?.context?.context_uri == artistUri && songState?.context?.option?.uris[0] == trackData?.uri;
    } else if (isAlbum) {
        isActive =
            songState?.context?.context_uri == albumUri && songState?.context?.option?.offset?.uri == trackData?.uri;
    } else if (isPlaylist) {
        isActive =
            songState?.context?.context_uri == playlistUri && songState?.context?.option?.offset?.uri == trackData?.uri;
    }

    const idx = context.indexOf(trackData.uri);
    const new_queue = Array.isArray(context) && [...context.slice(idx), ...context.slice(0, idx)];

    const handlePlayAndResume = async () => {
        var optionPlay = {};
        var payLoad = {};

        if (isArtist) {
            optionPlay = { uris: new_queue };
            payLoad = {
                context_uri: artistUri,
                option: {
                    uris: new_queue,
                },
            };
        } else if (isAlbum || isPlaylist) {
            optionPlay = {
                context_uri: context,
                offset: {
                    uri: trackData?.uri,
                },
            };
            payLoad = {
                context_uri: optionPlay.context_uri,
                option: {
                    offset: optionPlay.offset,
                },
            };
        }

        spotifyApi
            .play({
                device_id: songState.deviceId,
                ...optionPlay,
                position_ms: trackData.id == songState.songId ? songState.position : 0,
            })
            .then(() => {
                dispatchSongState({
                    type: 'SET_CONTEXT',
                    payLoad: {
                        context: payLoad,
                    },
                });
            });
    };

    const handlePause = () => {
        spotifyApi.pause();
    };

    const handleSaveTrack = () => {
        if (isSavedTrack) {
            spotifyApi.removeFromMySavedTracks([trackData.id]).then(() => {
                dispatchLibraryState({
                    type: 'REMOVE_A_SAVED_TRACK',
                    payLoad: 1,
                });
                setIsSavedTrack(false);
            });
        } else {
            spotifyApi.addToMySavedTracks([trackData.id]).then(() => {
                dispatchLibraryState({
                    type: 'ADD_A_SAVE_TRACK',
                    payLoad: 1,
                });
                setIsSavedTrack(true);
            });
        }
    };

    return (
        <div className="group px-4 h-[54px] flex items-center justify-between gap-4 rounded-md hover:bg-[#ffffff1a] transition">
            <div className="flex-shrink-0 w-4 flex items-center justify-center relative">
                <span
                    className="group-hover:hidden block relative top-[2px] text-[#a7a7a7] font-light"
                    style={{
                        display: isActive && songState.isPlaying == true && 'none',
                    }}
                >
                    <span
                        style={{
                            color: isActive ? '#1db954' : '#a7a7a7',
                        }}
                    >
                        {orderNum}
                    </span>
                </span>
                {isActive && songState.isPlaying == true && (
                    <div>
                        <img
                            src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"
                            alt=""
                        />
                    </div>
                )}
                <div className="hidden group-hover:block">
                    <div
                        onClick={handlePlayAndResume}
                        style={{
                            display: isActive && songState.isPlaying == true && 'none',
                        }}
                    >
                        <PlayIcon width={16} height={16} />
                    </div>
                    {isActive && songState.isPlaying == true && (
                        <div onClick={handlePause}>
                            <PauseIcon width={16} height={16} />
                        </div>
                    )}
                </div>
            </div>
            <div className="flex-1 flex-shrink-0 flex items-center">
                {!isHideImg && (
                    <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" src={trackData?.album?.images[0].url} alt="" />
                    </div>
                )}
                <div className="flex flex-col justify-center">
                    <span
                        className="text-base text-white text-climp-1 font-light"
                        style={{
                            color: isActive ? '#1db954' : 'currentcolor',
                        }}
                    >
                        {trackData.name}
                    </span>
                    <div className="flex flex-shrink-0">
                        {trackData.explicit && (
                            <div className="w-4 h-4 mr-2 bg-[#ffffff99] text-[#121212] flex items-center justify-center rounded-sm">
                                <span className="text-[8px] relative top-[1px]">E</span>
                            </div>
                        )}
                        {!isHideArtists && (
                            <div className="relative -top-[2px] text-climp-1 ">
                                {trackData?.artists.map((artist, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            className="text-sm font-light text-[#a7a7a7]"
                                            to={`/artist/${artist?.id}`}
                                        >
                                            <span className="hover:underline">{artist.name}</span>
                                            {index <= trackData?.artists.length - 2 && ', '}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {isPlaylist && (
                <>
                    <div className="hidden md:flex flex-1 flex-col justify-start flex-shrink-0">
                        <Link
                            className="w-fit text-climp-1 text-sm text-[#a7a7a7] font-light hover:underline"
                            to={`/album/${trackData?.album?.id}`}
                        >
                            {trackData?.album?.name}
                        </Link>
                    </div>
                    {dateAdded && (
                        <div className="hidden xl:flex flex-1 flex-col justify-start flex-shrink-0">
                            <span className="text-sm text-[#a7a7a7] font-light">
                                {convertDateString(dateAdded, 'short')}
                            </span>
                        </div>
                    )}
                </>
            )}
            <div className="w-[120px] flex items-center justify-end gap-2">
                <div
                    className={`group-hover:inline-block cursor-pointer ${
                        isSavedTrack ? 'text-[#1db954]' : 'text-[#a7a7a7]'
                    }`}
                    onClick={handleSaveTrack}
                >
                    <HeartIcon
                        width={16}
                        height={16}
                        isLiked={isSavedTrack}
                        className={`${isSavedTrack ? 'inline-block' : 'hidden'} group-hover:inline-block`}
                    />
                </div>
                <span className="w-[60px] text-right text-[#a7a7a7] text-sm font-light">
                    {durationConvert(trackData.duration_ms)}
                </span>
            </div>
        </div>
    );
};

export default SongItem;
