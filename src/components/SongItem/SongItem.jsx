import { useEffect, useState } from 'react';
import { PauseIcon, PlayIcon } from '../Icons';
import useSpotifyApi from '~/hooks/useSpotifyApi';

const SongItem = ({ orderNum = 1, trackData = {} }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const spotifyApi = useSpotifyApi();

    const getTrackTime = (time_ms) => {
        const time_s = Math.floor(time_ms / 1000);
        const minute = Math.floor(time_s / 60);
        const second = time_s - minute * 60;
        return minute + ':' + (second - 10 < 0 ? '0' + second : second);
    };

    useEffect(() => {
        const getPlaybackState = async () => {
            const playbackState = await spotifyApi.getMyCurrentPlaybackState();
            setIsPlaying(() => {
                if (playbackState.body?.item?.id === trackData.id) {
                    return playbackState.body.is_playing;
                }
                return false;
            });
        };
        if (!spotifyApi.error) {
            getPlaybackState();
        }
    }, [spotifyApi]);

    return (
        <div className="group px-4 h-[54px] flex items-center justify-between gap-4 rounded-md hover:bg-[#ffffff1a] transition">
            <div className="w-4 flex items-center justify-center relative">
                {!isPlaying ? (
                    <span
                    className="group-hover:hidden relative top-[2px] text-[#a7a7a7] font-light"
                    style={{
                        color: isPlaying ? '#1db954' : 'currentcolor',
                    }}
                    >
                        {orderNum}
                    </span>
                ) : (
                    <div>
                        <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif" alt="" />
                    </div>
                    // <div className="group-hover:opacity-0 opacity-100 music-bars w-[24px] flex-shrink-0 h-[16px] flex items-center justify-center gap-[1px] absolute top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2  overflow-hidden">
                    //     <span className="bar w-[2px] h-full bg-[#1db954] flex-shrink-0 transition-all animate-slide relative bottom-0"></span>
                    //     <span className="bar w-[2px] h-full bg-[#1db954] flex-shrink-0 transition-all animate-slide relative bottom-0"></span>
                    //     <span className="bar w-[2px] h-full bg-[#1db954] flex-shrink-0 transition-all animate-slide relative bottom-0"></span>
                    //     <span className="bar w-[2px] h-full bg-[#1db954] flex-shrink-0 transition-all animate-slide relative bottom-0"></span>
                    // </div>
                )}
                <div className="hidden group-hover:block">
                    {!isPlaying ? (
                        <PlayIcon width={16} height={16} />
                    ) : (
                        <PauseIcon width={16} height={16} />
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
                        color: isPlaying ? '#1db954' : 'currentcolor',
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
                    {getTrackTime(trackData.duration_ms)}
                </span>
            </div>
        </div>
    );
};

export default SongItem;
