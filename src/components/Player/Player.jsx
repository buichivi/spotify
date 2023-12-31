import { Link } from 'react-router-dom';
import { HeartIcon, NextIcon, PauseIcon, PlayIcon, PrevIcon, ReplayIcon, ShuffleIcon } from '../Icons';
import VolumeControl from '../VolumeControl';
import PlaybackTracker from '../PlaybackTracker';
import { spotifyApi } from '~/config/spotify';
import { useSongReducer, useLibraryReducer } from '~/hooks';

function Player({ data }) {
    const { player, is_active, is_paused, current_track, state } = data;
    const { songState, dispatchSongState } = useSongReducer();
    const { dispatchLibraryState } = useLibraryReducer();
    console.log('Player re-render');

    const handleSaveTrack = () => {
        if (!songState.isSaved) {
            spotifyApi.addToMySavedAlbums([songState.songId]).then(() => {
                dispatchSongState({
                    type: 'SET_IS_SAVED_TRACK',
                    payLoad: true,
                });
                dispatchLibraryState({
                    type: 'ADD_A_SAVE_TRACK',
                    payLoad: 1,
                });
            });
        } else {
            spotifyApi.removeFromMySavedAlbums([songState.songId]).then(() => {
                dispatchSongState({
                    type: 'SET_IS_SAVED_TRACK',
                    payLoad: false,
                });
                dispatchLibraryState({
                    type: 'REMOVE_A_SAVED_TRACK',
                    payLoad: 1,
                });
            });
        }
    };

    return (
        <>
            {!is_active && <h3>Loading...</h3>}
            {is_active && (
                <div className="w-full h-full flex items-center justify-between relative">
                    <div className="flex-1 flex-shrink-0 flex items-center">
                        <div className="w-14 h-14 flex-shrink-0 rounded-md overflow-hidden">
                            <img
                                src={current_track?.album?.images[0]?.url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col pl-3">
                            <Link
                                to={`/album/${current_track?.album?.uri?.split(':')[2]}`}
                                className="text-climp-1 text-sm text-white hover:underline"
                            >
                                {current_track?.name}
                            </Link>
                            <div className="text-climp-2 flex whitespace-normal">
                                {current_track?.artists.map((artist, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`/artist/${artist?.uri?.split(':')[2]}`}
                                            className="text-[11px] text-[#b3b3b3]"
                                        >
                                            <span className="hover:underline">{artist?.name}</span>
                                            {index <= current_track.artists.length - 2 && <span>, </span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            className="px-4 cursor-pointer hover:text-white"
                            style={{
                                color: songState.isSaved ? '#1db954' : '#b3b3b3',
                            }}
                            onClick={handleSaveTrack}
                        >
                            <HeartIcon width={16} height={16} isLiked={songState.isSaved} />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex items-center mb-2 gap-4">
                            <button
                                className="w-8 h-8 flex-shrink-0 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white"
                                onClick={() => {
                                    spotifyApi.setShuffle(String(!state.shuffle)).then((res) => console.log(res));
                                }}
                            >
                                {state.shuffle ? (
                                    <span className="text-[#1db954] relative before:content-[''] before:w-1 before:h-1 before:bg-[#1db954] before:rounded-full before:absolute before:top-[105%] before:left-1/2 before:-translate-x-1/2">
                                        <ShuffleIcon />
                                    </span>
                                ) : (
                                    <span>
                                        <ShuffleIcon />
                                    </span>
                                )}
                            </button>
                            <button
                                className="w-8 h-8 flex-shrink-0 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white"
                                onClick={() => player.previousTrack()}
                            >
                                <PrevIcon />
                            </button>
                            <button
                                className="w-8 h-8 flex-shrink-0 flex items-center cursor-default mx-[7px] justify-center bg-white rounded-full text-black hover:scale-105 transition"
                                onClick={() => {
                                    player.togglePlay();
                                    if (is_paused) {
                                        player.seek(songState.position).then(() => {
                                            console.log('Updated position');
                                        });
                                    }
                                }}
                            >
                                {is_paused ? <PlayIcon width={18} height={18} /> : <PauseIcon width={18} height={18} />}
                            </button>
                            <button
                                className="w-8 h-8 flex-shrink-0 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white"
                                onClick={() => player.nextTrack()}
                            >
                                <NextIcon />
                            </button>
                            <button
                                className="w-8 h-8 flex-shrink-0 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white"
                                onClick={() => {
                                    const repeatMode = ['off', 'context', 'track'];
                                    const mode = state.repeat_mode + 1 > 2 ? 0 : state.repeat_mode + 1;
                                    spotifyApi.setRepeat(repeatMode[mode]).then((res) => console.log(res));
                                }}
                            >
                                {state.repeat_mode === 0 && <ReplayIcon />}
                                {state.repeat_mode === 1 && (
                                    <span className="text-[#1db954] relative before:content-[''] before:w-1 before:h-1 before:bg-[#1db954] before:rounded-full before:absolute before:top-[105%] before:left-1/2 before:-translate-x-1/2">
                                        <ReplayIcon />
                                    </span>
                                )}
                                {state.repeat_mode === 2 && (
                                    <span className="text-[#1db954] relative before:content-[''] before:w-1 before:h-1 before:bg-[#1db954] before:rounded-full before:absolute before:top-[105%] before:left-1/2 before:-translate-x-1/2">
                                        <ReplayIcon replayOne />
                                    </span>
                                )}
                            </button>
                        </div>
                        <PlaybackTracker player={player} />
                    </div>
                    <div className="flex-1 flex-shrink-0">
                        <VolumeControl player={player} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Player;
