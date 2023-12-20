import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import Vibrant from 'node-vibrant';
import { PauseIcon, PlayIcon, VerifyIcon } from '~/components/Icons';
import SongItem from '~/components/SongItem';
import useSongReducer from '~/hooks/useSongReducer';

const Artist = () => {
    const { id } = useParams();
    const { songState, dispatchSongState } = useSongReducer();
    const [artist, setArtist] = useState({});
    const [topTracks, setTopTracks] = useState([]);
    const [mainColor, setMainColor] = useState('');
    const [isFollow, setIsFollow] = useState(false);
    const songItems = useRef([]);
    const spotifyApi = useSpotifyApi();
    const context = topTracks.map((track) => {
        return track?.uri;
    });

    const handlePlayAndResume = async () => {
        const idx = context.indexOf(songState.uri);
        const new_queue = [...context.slice(idx), ...context.slice(0, idx)];

        spotifyApi
            .play({
                device_id: songState.deviceId,
                uris: new_queue,
                position_ms: songState.position,
            })
            .then(() => {
                dispatchSongState({
                    type: 'SET_PLAYING_STATE',
                    payLoad: {
                        isPlaying: true,
                        context_artist: [],
                    },
                });
            });
    };

    const handlePause = () => {
        spotifyApi.pause().then(() => {
            dispatchSongState({
                type: 'SET_PLAYING_STATE',
                payLoad: {
                    isPlaying: false,
                    context_artist: [],
                },
            });
        });
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

        const getTopTracks = async () => {
            const topTracks = await spotifyApi.getArtistTopTracks(id, 'VN');
            setTopTracks(topTracks.body.tracks);
        };
        if (!spotifyApi.error) {
            getArtist();
            getTopTracks();
        }
    }, [spotifyApi, id]);

    return (
        <div className="h-auto w-full -mt-nav">
            <div
                className="h-[40vh] max-h-[400px] px-6 pb-8 min-h-[340px] w-full flex items-end"
                style={{
                    backgroundColor: mainColor,
                }}
            >
                <div className=" flex-shrink-0 w-[232px] h-[232px] mr-8 rounded-full shadow-blur-xl overflow-hidden">
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
                        <span className="text-sm relative top-[2px]">
                            Verified Artist
                        </span>
                    </div>
                    <div className="mt-1 mb-3 text-[96px] capitalize font-extrabold">
                        <h1 className="">{artist?.name}</h1>
                    </div>
                    <div className="text-white mt-1 font-normal">
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
                    '--tw-gradient-from': mainColor,
                }}
            >
                <div className="h-auto p-[18px] flex items-center relative">
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
                    <button
                        className="w-fit ring-1 hover:ring-2 hover:scale-105 ring-white transition rounded-full  py-[3px] px-[15px] cursor-pointer text-sm"
                        onClick={() => {
                            if (isFollow) {
                                spotifyApi.unfollowArtists([id]).then(() => {
                                    setIsFollow(false);
                                });
                            } else {
                                spotifyApi.followArtists([id]).then(() => {
                                    setIsFollow(true);
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
