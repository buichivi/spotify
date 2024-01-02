import { Link, useLocation } from 'react-router-dom';
import { MusicIcon, VolumnIcon } from '../Icons';
import { useEffect, useRef, useState } from 'react';

const LibraryItem = ({ data = {}, isActive = false, isPlaying = false, owner = '', isMinimize = false }) => {
    const librayItem = useRef();
    const location = useLocation();
    const [id, setId] = useState('');

    useEffect(() => {
        if (isActive) {
            librayItem.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [isActive]);

    useEffect(() => {
        setId(location.pathname.split('/')[2]);
    }, [location]);

    return (
        <Link
            ref={librayItem}
            className={`${
                isMinimize ? 'w-[64px] justify-center -ml-1' : 'w-full justify-between'
            } p-2 h-[64px] bg-transparent cursor-pointer rounded-md flex gap-3 items-center`}
            to={`/${data?.type}/${data?.id}`}
            style={{
                backgroundColor: id == data?.id && '#232323',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = id == data.id ? '#393939' : '#1a1a1a';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = id == data.id ? '#232323' : 'transparent';
            }}
        >
            <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                {data?.imageUrl ? (
                    <img
                        src={data?.imageUrl}
                        alt=""
                        className={`w-full h-full object-cover ${
                            data?.type == 'artist' ? 'rounded-full' : 'rounded-md'
                        }`}
                    />
                ) : (
                    <div className="w-full h-full bg-[#282828] flex items-center justify-center">
                        <MusicIcon width="24" height="24" className="text-[#b3b3b3]" />
                    </div>
                )}
            </div>
            {!isMinimize && (
                <>
                    <div className="flex-1 flex flex-col justify-between">
                        <h4
                            className="text-climp-1 text-[#f5f5f5] font-normal"
                            style={{
                                color: isActive && '#1db954',
                            }}
                        >
                            {data?.name}
                        </h4>
                        <div className="text-climp-1 text-[#8c8c8c] text-sm font-light">
                            <span className="capitalize">{data?.type}</span>
                            {owner && (
                                <>
                                    <span className='before:content-["•"] before:text-[8px] before:top-1/2 before:-translate-x-1/2 mx-1 relative font-light'></span>
                                    <span>{owner}</span>
                                </>
                            )}
                        </div>
                    </div>
                    {isPlaying && (
                        <div>
                            <VolumnIcon level="high" className="text-[#1db954]" />
                        </div>
                    )}
                </>
            )}
        </Link>
    );
};

export default LibraryItem;
