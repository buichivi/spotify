import { PlayIcon } from '../Icons';

const SongItem = ({ orderNum = 1, trackData = {} }) => {
    const getTrackTime = (time_ms) => {
        const time_s = Math.floor(time_ms / 1000);
        const minute = Math.floor(time_s / 60);
        const second = time_s - minute * 60;
        return minute + ':' + (second - 10 < 0 ? '0' + second : second);
    };

    return (
        <div className="group px-4 h-[54px] flex items-center justify-between gap-4 rounded-md hover:bg-[#ffffff1a]">
            <div className="w-4 flex items-center justify-center">
                <span className="group-hover:hidden relative top-[2px] text-[#a7a7a7]">
                    {orderNum}
                </span>
                <div className="hidden group-hover:block">
                    <PlayIcon width={16} height={16} />
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
                <span className="text-base text-white">{trackData.name}</span>
                {trackData.explicit && (
                    <div className="w-4 h-4 bg-[#ffffff99] text-[#121212] flex items-center justify-center rounded-sm">
                        <span className="text-[8px] relative top-[1px]">E</span>
                    </div>
                )}
            </div>
            <div className="">
                <span className="text-[#a7a7a7] text-sm">{getTrackTime(trackData.duration_ms)}</span>
            </div>
        </div>
    );
};

export default SongItem;
