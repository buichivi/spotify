import { Link } from 'react-router-dom';
import { MusicIcon } from '../Icons';

const LibraryItem = ({ data, isPlay }) => {
    return (
        <Link
            className="w-full h-[64px] p-2 bg-transparent cursor-pointer rounded-md hover:bg-[#393939] flex gap-3 items-center justify-between"
            to={`/${data?.type}/${data.id}`}
        >
            <div className="w-12 h-12 flex-shrink-0 overflow-hidden">
                {data.images.length > 0 ? (
                    <img
                        src={data?.images[0]?.url}
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
                        color: isPlay && '#1db954',
                    }}
                >
                    {data?.name}
                </h4>
                <span className="text-climp-1 text-[#8c8c8c] text-sm capitalize">
                    {data?.type}
                </span>
            </div>
        </Link>
    );
};

export default LibraryItem;
