import { Link } from 'react-router-dom';
import { PlayIcon } from '../Icons';
import { createRef, useRef } from 'react';

const CategoryItem = ({
    name = '',
    type = 'playlist',
    to,
    desc,
    imgUrl,
    artists = [],
    trackImg,
    className,
}) => {
    const linkTag = useRef();

    return (
        <div
            className={`group p-4 relative min-h-[262px] bg-[#171717] rounded-md cursor-pointer hover:bg-[#282828] transition-all ${className}`}
            onClick={() => linkTag.current.click()}
        >
            <img
                src={type === 'album' ? trackImg : imgUrl}
                className="w-full aspect-square object-cover rounded-md mb-4 group-hover:shadow-fade"
                alt=""
            />
            <Link
                to={to}
                className="text-climp-1 text-normal font-bold pb-1 overflow-hidden no-underline"
                
                onClick={e => e.stopPropagation()}
            >
                {name}
            </Link>
            {type === 'album' ? (
                <div
                    className="text-climp-2 flex whitespace-normal"
                    
                >
                    {artists.map((artist, index) => {
                        return (
                            <span
                                key={index}
                                className="w-fit text-sm text-[#a7a7a7] leading-[1.35rem] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Link
                                    to={`/artist/${artist.id}`}
                                    className="hover:underline"
                                >
                                    {artist.name}
                                </Link>
                                {index < artists.length - 1 && (
                                    <span className="text-sm text-[#a7a7a7] leading-[1.35rem]">
                                        ,{' '}
                                    </span>
                                )}
                            </span>
                        );
                    })}
                </div>
            ) : (
                <p
                    className="text-climp-2 text-sm text-[#a7a7a7] leading-[1.35rem] overflow-hidden"
                >
                    {desc}
                </p>
            )}
            <button className="bg-[#1ed760] w-12 h-12 absolute shadow-blur top-[44%] right-[16%] group-hover:top-[42%] group-hover:opacity-100 hover:scale-105 group-hover:shadow-fade opacity-0 transition-all duration-300 flex justify-center items-center rounded-full">
                <PlayIcon width={24} height={24} className="text-black" />
            </button>
            <Link to={to} ref={linkTag} className="hidden"></Link>
        </div>
    );
};

export default CategoryItem;
