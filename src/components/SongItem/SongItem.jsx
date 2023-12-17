import { useContext, useEffect, useState } from 'react';
import { PauseIcon, PlayIcon } from '../Icons';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import { durationConvert } from '~/utils/durationConvert';
import { PlaybackContext } from '~/Provider/PlaybackProvider';

const SongItem = ({ orderNum = 1, trackData = {}, context }) => {
    const { songState, dispatchSongState } = useContext(PlaybackContext);

    const [position_ms, setPosition_ms] = useState(0);
    const spotifyApi = useSpotifyApi();
    const [isPlaying, setIsPlaying] = useState(
        songState.songId == trackData.id && songState.isPlaying,
    );
    const isActive = songState.songId == trackData.id;

    console.log(isPlaying);

    const handlePlayAndResume = async () => {
        const idx = context.indexOf(trackData.uri);
        const new_queue = [...context.slice(idx), ...context.slice(0, idx)];
        spotifyApi
            .play({
                device_id: songState.device_id,
                uris: new_queue,
                position_ms: position_ms || 0,
            })
            .then(() => {
                dispatchSongState({ type: 'SET_ISPLAYING', payLoad: true });
            });
    };

    const handlePause = () => {
        spotifyApi.pause().then(() => {
            dispatchSongState({ type: 'SET_ISPLAYING', payLoad: false });
            spotifyApi.getMyCurrentPlayingTrack().then((res) => {
                setPosition_ms(res.body.progress_ms);
            });
        });
    };

    // useEffect(() => {
    //     const getPlaybackState = async () => {
    //         const playbackState = await spotifyApi.getMyCurrentPlaybackState();
    //         setIsPlaying(() => {
    //             if (playbackState.body?.item?.id === trackData.id) {
    //                 return playbackState.body.is_playing;
    //             }
    //             return false;
    //         });
    //     };
    //     if (!spotifyApi.error) {
    //         getPlaybackState();
    //     }
    // }, [spotifyApi]);

    return (
        <div className="group px-4 h-[54px] flex items-center justify-between gap-4 rounded-md hover:bg-[#ffffff1a] transition">
            <div className="w-4 flex items-center justify-center relative">
                <span
                    className="group-hover:hidden relative top-[2px] text-[#a7a7a7] font-light"
                    style={{
                        color: isActive ? '#1db954' : 'currentcolor',
                    }}
                >
                    {!songState.isPlaying ? (
                        <span>{orderNum}</span>
                    ) : (
                        <div>
                            {isActive && (
                                <img
                                    src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif"
                                    alt=""
                                />
                            )}
                        </div>
                    )}
                </span>
                <div className="hidden group-hover:block">
                    {!songState.isPlaying &&
                    songState.songId == trackData.id ? (
                        <div onClick={handlePlayAndResume}>
                            <PlayIcon width={16} height={16} />
                        </div>
                    ) : (
                        <div onClick={handlePause}>
                            <PauseIcon width={16} height={16} />
                        </div>
                    )}
                </div>
            </div>
            <div className="w-10 h-10 flex-shrink-0 rounded-md overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={trackData?.album?.images[0].url}
                    alt=""
                />
            </div>
            <div className="flex-1 flex flex-col justify-start">
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
                {trackData.explicit && (
                    <div className="w-4 h-4 bg-[#ffffff99] text-[#121212] flex items-center justify-center rounded-sm">
                        <span className="text-[8px] relative top-[1px]">E</span>
                    </div>
                )}
            </div>
            <div className="">
                <span className="text-[#a7a7a7] text-sm">
                    {durationConvert(trackData.duration_ms)}
                </span>
            </div>
        </div>
    );
};

export default SongItem;
