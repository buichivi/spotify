import { forwardRef, memo, useEffect, useState } from 'react';
import {
    ArrowDownIcon,
    BellIcon,
    ChevronLeft,
    ChevronRight,
    PauseIcon,
    PlayIcon,
} from '~/components/Icons';
import { Link, useLocation } from 'react-router-dom';
import SearchInput from '~/components/SearchInput';
import { AUTH_URL } from '~/config/spotify';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import useSongReducer from '~/hooks/useSongReducer';

// eslint-disable-next-line react-refresh/only-export-components
const NavBar = ({ isHide = true, currentContent = {} }, ref) => {
    const location = useLocation();
    const [topTracks, setTopTracks] = useState([]);
    const [typeIds, setTypeIds] = useState([]);
    const { songState, dispatchSongState } = useSongReducer();
    const spotifyApi = useSpotifyApi();
    console.log('Navbar render');
    const context = topTracks.map((track) => {
        return track?.uri;
    });

    const handlePlayAndResume = async (e) => {
        const artistId = e.currentTarget.parentElement.dataset.id;
        const idx = context.indexOf(songState.uri);
        const new_queue = [...context.slice(idx), ...context.slice(0, idx)];

        spotifyApi
            .play({
                device_id: songState.deviceId,
                uris: songState.artistIds.includes(artistId)
                    ? new_queue
                    : context,
                position_ms: songState.artistIds.includes(artistId)
                    ? songState.position
                    : 0,
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
        const loadArtistTopTracks = async () => {
            const toptracks = await spotifyApi.getArtistTopTracks(
                currentContent.id,
                'VN',
            );
            setTopTracks(toptracks.body.tracks);
        };
        if (!spotifyApi.error && currentContent.id) {
            if (currentContent.type == 'artist') {
                loadArtistTopTracks();
            }
        }
    }, [spotifyApi, currentContent.id]);

    useEffect(() => {
        if (currentContent.type == 'artist') {
            setTypeIds(songState.artistIds);
        }
    }, [location.pathname, songState.artistIds]);

    return (
        <nav
            ref={ref}
            className="w-full h-nav bg-transparent transition-all duration-500 py-4 px-6 flex items-center justify-between gap-3 absolute top-0 left-0 z-10"
        >
            <div className="flex gap-2">
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#000000b3] text-white opacity-[0.6] cursor-not-allowed">
                    <ChevronLeft width={16} height={16} />
                </div>
                <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#000000b3] text-white opacity-[0.6] cursor-not-allowed">
                    <ChevronRight width={16} height={16} />
                </div>
            </div>
            {(location.pathname.includes('/artist') ||
                location.pathname.includes('/album') ||
                location.pathname.includes('/playlist')) && (
                <div
                    className="flex-1 flex-shrink-0 flex items-center gap-2 transition duration-500"
                    style={{
                        opacity: isHide == true ? '0' : '1',
                        pointerEvents: isHide == true ? 'none' : 'all',
                    }}
                >
                    <button
                        className="w-[48px] h-[48px] flex-shrink-0 bg-[#1db954] text-black rounded-full flex items-center justify-center hover:scale-105 transition overflow-hidden"
                        data-id={currentContent?.id}
                    >
                        <div
                            className="p-[100%]"
                            style={{
                                display:
                                    typeIds?.includes(currentContent?.id) &&
                                    songState.isPlaying == true &&
                                    'none',
                            }}
                            onClick={handlePlayAndResume}
                        >
                            <PlayIcon />
                        </div>
                        {typeIds?.includes(currentContent?.id) &&
                            songState.isPlaying == true && (
                                <div className="p-[100%]" onClick={handlePause}>
                                    <PauseIcon />
                                </div>
                            )}
                    </button>
                    <span className="text-climp-1 text-2xl font-bold">
                        {currentContent?.name}
                    </span>
                </div>
            )}
            {location.pathname.includes('/search') && <SearchInput />}
            {Object.keys(songState.user).length === 0 ? (
                <div className="flex items-center justify-between gap-[25px]">
                    <ul className="flex items-center px-2 py-2 gap-2">
                        <li>
                            <a
                                className="inline-block py-2 font-bold text-[#a7a7a7] tracking-widest cursor-pointer hover:text-white hover:scale-105 transition"
                                href=""
                            >
                                Premium
                            </a>
                        </li>
                        <li>
                            <a
                                className="inline-block py-2 font-bold text-[#a7a7a7] tracking-widest cursor-pointer hover:text-white hover:scale-105 transition"
                                href=""
                            >
                                Support
                            </a>
                        </li>
                        <li>
                            <a
                                className="inline-block py-2 font-bold text-[#a7a7a7] tracking-widest cursor-pointer hover:text-white hover:scale-105 transition"
                                href=""
                            >
                                Download
                            </a>
                        </li>
                    </ul>
                    <span className="w-[1px] h-[25px] bg-white blur-[1px]"></span>
                    <div className="flex gap-8 ml-4">
                        <a
                            href={AUTH_URL}
                            className="flex items-center justify-center cursor-pointer font-bold text-[#848484] p-2 hover:scale-105 hover:text-white bg-transparent transition"
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                            }}
                        >
                            Sign up
                        </a>
                        <a
                            href={AUTH_URL}
                            className="flex items-center justify-center cursor-pointer py-2 px-8 h-12 rounded-full bg-white text-black font-bold hover:scale-105 transition"
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                            }}
                        >
                            Log in
                        </a>
                    </div>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <a
                        href="https://open.spotify.com/download"
                        target="_blank"
                        rel="noreferrer"
                        className="py-1 pr-4 pl-[33px] h-8 bg-[#0000008a] cursor-pointer rounded-full relative hidden md:flex items-center justify-center"
                    >
                        <ArrowDownIcon className="absolute top-1/2 left-2 -translate-y-1/2" />
                        <span className="text-climp-1 text-white text-sm font-bold relative top-[1px]">
                            Install App
                        </span>
                    </a>
                    <Link
                        to=""
                        className="hidden md:flex flex-shrink-0 group w-8 h-8 bg-[#0000008a] rounded-full items-center justify-center hover:scale-105 transition"
                    >
                        <BellIcon className="group-hover:font-bold text-white" />
                    </Link>
                    <button
                        onClick={() => {
                            window.localStorage.removeItem('access_token');
                            window.localStorage.removeItem('refresh_token');
                            window.location = origin;
                        }}
                        className="flex items-center gap-2 justify-center cursor-pointer py-1 px-3 h-9 rounded-full transition"
                    >
                        <img
                            src={songState.user.imageUrl}
                            width={28}
                            height={28}
                            alt={songState.user.name}
                            className="rounded-full"
                        />
                        <span>{songState.user.name}</span>
                    </button>
                </div>
            )}
        </nav>
    );
};
// eslint-disable-next-line react-refresh/only-export-components
export default memo(forwardRef(NavBar));
