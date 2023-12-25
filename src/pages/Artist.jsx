import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import Vibrant from 'node-vibrant';
import { PauseIcon, PlayIcon, VerifyIcon } from '~/components/Icons';
import SongItem from '~/components/SongItem';
import useSongReducer from '~/hooks/useSongReducer';
import useLibraryReducer from '~/hooks/useLibraryReducer';

const Artist = () => {
    const { id } = useParams();
    const { songState, dispatchSongState } = useSongReducer();
    const { dispatchLibraryState } = useLibraryReducer();
    const [artist, setArtist] = useState({});
    const [topTracks, setTopTracks] = useState([]);
    const [mainColor, setMainColor] = useState('');
    const [savedTracks, setSavedTracks] = useState([])
    const [isFollow, setIsFollow] = useState(false);
    const songItems = useRef([]);
    const spotifyApi = useSpotifyApi();
    const context = topTracks.map((track) => {
        return track?.uri;
    });
    const trackIds = topTracks.map(track => track?.id)

    const idx = context.indexOf(songState.uri);
    // ? Nên chỉ để new_queue từ bài click chạy đến cuối không cần lặp lại
    const new_queue = [...context.slice(idx), ...context.slice(0, idx)];

    const handlePlayAndResume = async () => {
        const optionPlay =
            songState?.context?.context_uri == artist?.uri
                ? {
                    uris: songState?.context?.option?.uris,
                }
                : {
                    uris: context,
                };
        spotifyApi
            .play({
                device_id: songState.deviceId,
                ...optionPlay,
                position_ms:
                    songState?.context?.context_uri == artist?.uri
                        ? songState.position
                        : 0,
            })
            .then(() => {
                dispatchSongState({
                    type: 'SET_CONTEXT',
                    payLoad: {
                        context: {
                            context_uri: artist?.uri,
                            option: optionPlay,
                        },
                    },
                });
            });
    };

    const handlePause = () => {
        spotifyApi.pause();
    };

    useEffect(() => {
        const getArtist = async () => {
            const artist = await spotifyApi.getArtist(id);
            const color = await Vibrant.from(
                artist.body.images[0].url,
            ).getPalette();
            setMainColor(color.DarkVibrant.getHex());
            setArtist(artist.body);
            const isFolllow = await spotifyApi.isFollowingArtists([id]);
            setIsFollow(isFolllow.body[0]);
        };

        const getSavedTracks = async (trackIds = []) => {
            const savedTracks = await spotifyApi.containsMySavedTracks(trackIds)
            setSavedTracks(savedTracks.body);
        }

        const getTopTracks = async () => {
            const topTracks = await spotifyApi.getArtistTopTracks(id, 'VN');
            const trackIds = topTracks.body.tracks.map((track) => track.id)
            getSavedTracks(trackIds);
            setTopTracks(topTracks.body.tracks);
        };
        if (!spotifyApi.error) {
            getArtist();
            getTopTracks();
        }
    }, [spotifyApi, id]);

    useEffect(() => {
        if (
            songState?.artistIds?.includes(id) &&
            artist?.uri &&
            songState?.context?.context_uri == artist.uri
        ) {
            dispatchSongState({
                type: 'SET_CONTEXT',
                payLoad: {
                    context: {
                        context_uri: artist?.uri,
                        option: {
                            uris: new_queue,
                        },
                    },
                },
            });
        }
    }, [songState.songId, id]);

    return (
        <div className="h-auto w-full -mt-nav">
            <div
                className="px-6 pb-8 min-h-[240px] md:min-h-[340px] max-h-[30vh] md:max-h-[40vh] w-full flex items-end
                    bg-gradient-to-b from-[#121212] from-[99%] to-[#121212] to-[99%]
                "
                style={{
                    '--tw-gradient-from': mainColor,
                    '--tw-gradient-to': mainColor + '90'
                }}
            >
                <div className="flex-shrink-0 w-contentImgWidth h-contentImgHeight mr-8 rounded-full shadow-blur-xl overflow-hidden">
                    <img
                        src={
                            artist?.images?.length > 0
                                ? artist.images[0].url
                                : ''
                        }
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                    />
                </div>
                <div>
                    <div className="flex items-center">
                        <div className="w-4 h-4 mr-2 flex items-center justify-center bg-white">
                            <VerifyIcon
                                className="text-[#3d91f4] flex-shrink-0"
                                width={24}
                                height={24}
                            />
                        </div>
                        <span className="text-sm relative top-[2px] font-light">
                            Verified Artist
                        </span>
                    </div>
                    <div className="mt-1 mb-3 text-[32px] md:text-[60px] xl:text-[96px] capitalize font-extrabold">
                        <h1 className="">{artist?.name}</h1>
                    </div>
                    <div className="text-white mt-1 font-normal text-sm md:text-base">
                        <span>
                            {String(artist?.followers?.total).replace(
                                /\B(?=(\d{3})+(?!\d))/g,
                                ',',
                            )}{' '}
                            followers
                        </span>
                    </div>
                </div>
            </div>
            <div
                className="h-auto bg-gradient-to-b from-[#121212] from-[200px] to-[#121212 to-[200px] opacity-90 sticky top-0"
                style={{
                    '--tw-gradient-from': mainColor + '70',
                }}
            >
                <div className="h-auto p-[18px] flex items-center relative">
                    <button className="flex-shrink-0 flex items-center justify-center w-[56px] h-[56px] bg-[#1db954] text-black rounded-full hover:scale-105 transition mr-8 overflow-hidden">
                        <div
                            className="p-[100%]"
                            style={{
                                display:
                                    songState?.context?.context_uri ==
                                        artist?.uri &&
                                    songState?.isPlaying == true &&
                                    'none',
                            }}
                            onClick={handlePlayAndResume}
                        >
                            <PlayIcon />
                        </div>
                        {songState?.context?.context_uri == artist?.uri &&
                            songState?.isPlaying == true && (
                                <div className="p-[100%]" onClick={handlePause}>
                                    <PauseIcon />
                                </div>
                            )}
                    </button>
                    <button
                        className="w-fit ring-1 hover:ring-2 hover:scale-105 ring-white transition rounded-full  py-[3px] px-[15px] cursor-pointer text-sm"
                        onClick={() => {
                            if (isFollow) {
                                spotifyApi.unfollowArtists([id]).then(() => {
                                    setIsFollow(false);
                                    dispatchLibraryState({
                                        type: 'UNFOLLOW_ARTIST',
                                        payLoad: id,
                                    });
                                });
                            } else {
                                spotifyApi.followArtists([id]).then(() => {
                                    setIsFollow(true);
                                    dispatchLibraryState({
                                        type: 'FOLLOW_ARTIST',
                                        payLoad: {
                                            id: id,
                                            imageUrl: artist?.images[0]?.url,
                                            name: artist?.name,
                                            type: artist?.type,
                                        },
                                    });
                                });
                            }
                        }}
                    >
                        <span className="relative top-[2px]">
                            {!isFollow ? 'Follow' : 'Following'}
                        </span>
                    </button>
                </div>
                <div className="px-6">
                    <h3 className="text-2xl mb-4 font-bold">Popular</h3>
                    <div className="w-full">
                        {topTracks.map((track, index) => {
                            return (
                                <div
                                    key={index}
                                    className="top-track-limit-5"
                                    ref={(el) => {
                                        songItems.current[index] = el;
                                    }}
                                >
                                    <SongItem
                                        orderNum={index + 1}
                                        trackData={track}
                                        context={context}
                                        artistUri={artist?.uri}
                                        isArtist
                                        isHideArtists
                                        isSaved={savedTracks[index]}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <button
                        className="p-4 text-sm text-[#a7a7a7] cursor-default hover:text-white transition"
                        onClick={(e) => {
                            songItems.current.forEach((song) => {
                                song.classList.toggle('top-track-limit-5');
                            });
                            e.currentTarget.innerText =
                                songItems.current[0].classList.contains(
                                    'top-track-limit-5',
                                )
                                    ? 'See more'
                                    : 'Show less';
                        }}
                    >
                        See more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Artist;
