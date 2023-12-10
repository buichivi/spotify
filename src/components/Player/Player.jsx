import { Link } from 'react-router-dom';
import {
    NextIcon,
    PauseIcon,
    PlayIcon,
    PrevIcon,
    ReplayIcon,
    ShuffleIcon,
} from '../Icons';
import VolumeControl from '../VolumeControl';
import PlaybackTracker from '../PlaybackTracker';
import { spotifyApi } from '~/config/spotify';

function Player({ data }) {
    const { player, is_active, is_paused, current_track, state } = data;
    console.log('Player re-render');

    return (
        <>
            {!is_active && <h3>Loading...</h3>}
            {is_active && (
                <div className="w-full h-full flex items-center justify-between relative">
                    <div className="flex-1 flex items-center">
                        <div className="w-14 h-14 rounded-md overflow-hidden">
                            <img
                                src={current_track?.album?.images[0]?.url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col pl-3">
                            <Link
                                to={`/album/${
                                    current_track?.album?.uri?.split(':')[2]
                                }`}
                                className="text-sm text-white hover:underline"
                            >
                                {current_track?.name}
                            </Link>
                            <div
                                className="text-climp-2 flex whitespace-normal"

                            >
                                {current_track?.artists.map((artist, index) => {
                                    return (
                                        <Link
                                            key={index}
                                            to={`/artist/${
                                                artist?.uri?.split(':')[2]
                                            }`}
                                            className="text-[11px] text-[#b3b3b3] hover:underline"
                                        >
                                            <span>{artist?.name}</span>
                                            {index <=
                                                current_track.artists.length -
                                                    2 && <span>, </span>}
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="flex items-center mb-2 gap-4">
                            <button
                                className="w-8 h-8 flex-shrink-0 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white"
                                onClick={() => {
                                    spotifyApi
                                        .setShuffle(String(!state.shuffle))
                                        .then((res) => console.log(res));
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
                                onClick={() => player.togglePlay()}
                            >
                                {is_paused ? (
                                    <PlayIcon width={18} height={18} />
                                ) : (
                                    <PauseIcon width={18} height={18} />
                                )}
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
                                    const repeatMode = [
                                        'off',
                                        'context',
                                        'track',
                                    ];
                                    const mode =
                                        state.repeat_mode + 1 > 2
                                            ? 0
                                            : state.repeat_mode + 1;
                                    spotifyApi
                                        .setRepeat(repeatMode[mode])
                                        .then((res) => console.log(res));
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
                        <PlaybackTracker player={player} state={state} />
                    </div>
                    <div className='flex-1 flex-shrink-0'>
                        <VolumeControl player={player}/>
                    </div>
                </div>
            )}
        </>
    );
}

export default Player;
