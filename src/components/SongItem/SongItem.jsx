import { PauseIcon, PlayIcon } from '../Icons';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import { durationConvert } from '~/utils/durationConvert';
import useSongReducer from '~/hooks/useSongReducer';
import { Link } from 'react-router-dom';

const SongItem = ({ orderNum = 1, trackData = {}, context, isHide = false }) => {
    const { songState, dispatchSongState } = useSongReducer();
    const spotifyApi = useSpotifyApi();

    const isActive = songState.songId == trackData.id;
    const idx = context.indexOf(trackData.uri);
    const new_queue = [...context.slice(idx), ...context.slice(0, idx)];

    const handlePlayAndResume = async (e) => {
        const targetSongId = e.currentTarget.parentElement.dataset.id;
        spotifyApi
            .play({
                device_id: songState.deviceId,
                uris: new_queue,
                position_ms:
                    targetSongId == songState.songId ? songState.position : 0,
            })
            .then(() => {
                dispatchSongState({
                    type: 'SET_PLAYING_STATE',
                    payLoad: {
                        isPlaying: true,
                        context_artist: new_queue,
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
                    context_artist: new_queue,
                },
            });
        });
    };

    return (
        <div className="group px-4 h-[54px] flex items-center justify-between gap-4 rounded-md hover:bg-[#ffffff1a] transition">
            <div className="flex-shrink-0 w-4 flex items-center justify-center relative">
                <span
                    className="group-hover:hidden block relative top-[2px] text-[#a7a7a7] font-light"
                    style={{
                        display:
                            isActive && songState.isPlaying == true && 'none',
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
                <div
                    className="hidden group-hover:block"
                    data-id={trackData.id}
                >
                    <div
                        onClick={handlePlayAndResume}
                        style={{
                            display:
                                isActive &&
                                songState.isPlaying == true &&
                                'none',
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
            {!isHide && (
                <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden">
                    <img
                        className="w-full h-full object-cover"
                        src={trackData?.album?.images[0].url}
                        alt=""
                    />
                </div>
            )}
            <div className="flex-1 flex flex-col justify-start flex-shrink-0">
                <span
                    className="text-base text-white text-climp-1"
                    style={{
                        color:
                            songState.songId == trackData.id
                                ? '#1db954'
                                : 'currentcolor',
                    }}
                >
                    {trackData.name}
                </span>
                <div className="flex">
                    {trackData.explicit && (
                        <div className="w-4 h-4 mr-2 bg-[#ffffff99] text-[#121212] flex items-center justify-center rounded-sm">
                            <span className="text-[8px] relative top-[1px]">
                                E
                            </span>
                        </div>
                    )}
                    {isHide && <div className="relative -top-[2px]">
                        {trackData?.artists.map((artist, index) => {
                            return (
                                <Link
                                    key={index}
                                    className="text-sm font-light text-[#a7a7a7]"
                                    to={`/artist/${artist?.id}`}
                                >
                                    <span className="hover:underline">
                                        {artist.name}
                                    </span>
                                    {index <= trackData?.artists.length - 2 &&
                                        ', '}
                                </Link>
                            );
                        })}
                    </div>}
                </div>
            </div>
            <div className="">
                <span className="text-[#a7a7a7] text-sm font-light">
                    {durationConvert(trackData.duration_ms)}
                </span>
            </div>
        </div>
    );
};

export default SongItem;
