import { Link } from 'react-router-dom';
import { MusicIcon, VolumnIcon } from '../Icons';

const LibraryItem = ({ data, isActive, isPlaying }) => {
    return (
        <Link
            className="w-full h-[64px] p-2 bg-transparent cursor-pointer rounded-md hover:bg-[#393939] flex gap-3 items-center justify-between"
            to={`/${data?.type}/${data?.id}`}
        >
            <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                {data?.imageUrl ? (
                    <img
                        src={data?.imageUrl}
                        alt=""
                        className={`w-full h-full object-cover ${
                            data?.type == 'artist'
                                ? 'rounded-full'
                                : 'rounded-md'
                        }`}
                    />
                ) : (
                    <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                        <MusicIcon
                            width="24"
                            height="24"
                            className="text-[#b3b3b3]"
                        />
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <h4
                    className="text-climp-1 text-[#f5f5f5] font-normal"
                    style={{
                        color: isActive && '#1db954',
                    }}
                >
                    {data?.name}
                </h4>
                <span className="text-climp-1 text-[#8c8c8c] text-sm capitalize font-light">
                    {data?.type}
                </span>
            </div>
            {isPlaying && (
                <div>
                    <VolumnIcon level="high" className="text-[#1db954]" />
                </div>
            )}
        </Link>
    );
};

export default LibraryItem;
