import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { useEffect, useRef, useState } from 'react';
import { LibraryIcon, PlusIcon, SearchIcon, XIcon } from '~/components/Icons';
import LeftsideFooter from '~/components/LeftsideFooter';
import LibraryItem from '~/components/LibraryItem';
import Menu from '~/components/Menu';
import { useDebounced, useLibraryReducer, useSongReducer } from '~/hooks';

const LeftSide = () => {
    const shadow = useRef();
    const { songState } = useSongReducer();
    const { libraryState } = useLibraryReducer();
    const [libraryFilter, setLibraryFilter] = useState('');
    const [searchLibrary, setSearchLibrary] = useState('');
    const { albums, artists, playlists, savedTracks } = libraryState;
    const search = useDebounced(searchLibrary.toLowerCase().trim(), 500);
    var library = [...playlists, ...albums, ...artists];
    if (libraryFilter) {
        library = [...playlists, ...albums, ...artists].filter((item) => item.type == libraryFilter);
    }
    if (search) {
        library = library.filter((item) => {
            return item?.name?.toLowerCase().includes(search) || item?.owner?.toLowerCase().includes(search);
        });
    }

    const handleScroll = (e) => {
        if (e.target.scrollTop) shadow.current.style.display = 'block';
        else shadow.current.style.display = 'none';
    };

    const handleFilter = (type) => {
        setLibraryFilter(type);
    };

    return (
        <>
            <div className="w-full h-auto bg-[#121212] rounded-md">
                <Menu />
            </div>
            <div className="w-full flex-auto flex flex-col justify-between bg-[#121212] rounded-md">
                <header className="px-4 h-auto text-[#a7a7a7]">
                    <div className="py-3 flex items-center justify-between">
                        <div className="flex items-center px-2 py-1 hover:text-white transition cursor-pointer">
                            <LibraryIcon />
                            <span className="relative top-[2px] pl-3">Your Library</span>
                        </div>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] cursor-pointer transition-all">
                            <PlusIcon width={16} height={16} />
                        </div>
                    </div>
                    {songState.user.name && (
                        <div className="h-12 flex items-center gap-2 text-white font-light text-sm">
                            {libraryFilter && (
                                <button
                                    className="h-8 w-8 flex-shrink-0 text-[#b3b3b3] bg-[#ffffff12] hover:bg-[#ffffff1a] rounded-full flex items-center justify-center"
                                    onClick={() => handleFilter('')}
                                >
                                    <XIcon />
                                </button>
                            )}
                            {['playlist', 'artist', 'album']
                                .filter((type) => {
                                    if (!libraryFilter) {
                                        return true;
                                    }
                                    return type == libraryFilter;
                                })
                                .map((type, index) => {
                                    return (
                                        <button
                                            key={index}
                                            className={`h-8 py-1 px-3 ${
                                                type == libraryFilter
                                                    ? 'bg-white text-black'
                                                    : 'bg-[#ffffff12] text-white hover:bg-[#ffffff1a]'
                                            } rounded-full`}
                                            onClick={() => handleFilter(type)}
                                        >
                                            <span className="relative top-[1px] capitalize">{type + 's'}</span>
                                        </button>
                                    );
                                })}
                        </div>
                    )}
                    {songState.user.name && (
                        <div className="h-8 flex items-center relative">
                            <input
                                type="checkbox"
                                name=""
                                id="search-library"
                                className="peer/checkbox hidden"
                                onChange={(e) => {
                                    const isChecked = e.currentTarget.checked;
                                    if (isChecked) e.currentTarget.nextElementSibling.nextElementSibling.focus();
                                }}
                            />
                            <label
                                htmlFor="search-library"
                                className="peer-checked/checkbox:text-[#b3b3b3] peer-checked/checkbox:cursor-text peer-checked/checkbox:hover:bg-transparent w-8 h-8 flex items-center justify-center rounded-full text-[#b3b3b3] hover:bg-[#ffffff12] hover:text-white cursor-pointer absolute"
                                onClick={(e) => {
                                    const isChecked = e.currentTarget.previousElementSibling.checked;
                                    if (isChecked) {
                                        e.currentTarget.previousElementSibling.checked = false;
                                    } else {
                                        e.currentTarget.style.pointerEvents = 'none';
                                    }
                                }}
                            >
                                <SearchIcon width={16} height={16} className="" />
                            </label>
                            <input
                                type="text"
                                placeholder="Search in Your Library"
                                className="peer/input h-full w-0 peer-checked/checkbox:w-full peer-checked/checkbox:inline-block peer-checked/checkbox:focus peer-checked/checkbox:bg-[#ffffff1a] rounded-md pl-8 py-2 pr-2 bg-transparent outline-none border-none text-sm font-light placeholder:relative placeholder:top-[2px] transition-all duration-300"
                                onBlur={(e) => {
                                    if (!e.currentTarget.value) {
                                        e.currentTarget.previousElementSibling.style.pointerEvents = 'auto';
                                        e.currentTarget.previousElementSibling.previousElementSibling.checked = false;
                                    }
                                }}
                                value={searchLibrary}
                                onChange={(e) => setSearchLibrary(e.target.value)}
                            />
                            <span
                                className="inline-block peer-placeholder-shown/input:hidden absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={(e) => {
                                    setSearchLibrary('');
                                    e.currentTarget.previousElementSibling.focus();
                                }}
                            >
                                <XIcon />
                            </span>
                        </div>
                    )}
                </header>
                <div className="relative h-[132px] flex-auto">
                    <span
                        ref={shadow}
                        className="absolute w-full h-2 bg-transparent -top-2 left-0 shadow-blur hidden z-10"
                    ></span>
                    <OverlayScrollbarsComponent
                        element="div"
                        options={{
                            scrollbars: {
                                theme: '',
                                autoHide: 'leave',
                                autoHideDelay: 1000,
                            },
                            overflow: { x: 'hidden' },
                        }}
                        events={{ scroll: (instance, e) => handleScroll(e) }}
                        defer
                        className="w-full h-full p-2"
                    >
                        <div className="w-full h-full flex flex-col justify-between">
                            {songState.user.name == '' ? (
                                <>
                                    <div className="w-full h-[134px] flex flex-col justify-between my-2 py-4 px-5 bg-[#242424] rounded-md">
                                        <div className="w-full h-[50px] flex flex-col justify-between">
                                            <h3 className="font-semibold">Create your first playlist</h3>
                                            <span className="text-sm font-light">It's easy, we'll help you</span>
                                        </div>
                                        <button className="w-[126px] h-8 px-4 py-1 rounded-full bg-white text-black text-sm leading-8 font-medium hover:bg-[#b3b3b3] hover:scale-105 transition">
                                            <span className="relative -top-[2px]">Create playlist</span>
                                        </button>
                                    </div>
                                    <div className="w-full h-[176px] flex flex-col justify-between my-2 py-4 px-5 bg-[#242424] rounded-md">
                                        <div className="w-full h-[92px] flex flex-col justify-between">
                                            <h3 className="font-semibold">Let's find some podcasts to follow</h3>
                                            <span className="text-sm font-light">
                                                We'll keep you updated on new episodes
                                            </span>
                                        </div>
                                        <button className="inline-flex w-[142px] h-8 px-4 py-1 rounded-full bg-white text-black text-sm leading-8 font-medium hover:bg-[#b3b3b3] hover:scale-105 transition">
                                            <span className="relative -top-[2px]">Browse podcasts</span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full">
                                    {!libraryFilter && !search && (
                                        <LibraryItem
                                            data={{
                                                type: 'collection',
                                                id: 'tracks',
                                                imageUrl: 'https://t.ly/1m3eT',
                                                name: 'Liked songs',
                                            }}
                                            owner={savedTracks + ' song' + (savedTracks > 2 ? 's' : '')}
                                        />
                                    )}
                                    {library.length > 0 ? (
                                        library.map((item, index) => {
                                            return (
                                                <div key={index} className="w-full h-auto">
                                                    <LibraryItem
                                                        data={item}
                                                        isActive={songState?.context?.context_uri == item?.uri}
                                                        isPlaying={
                                                            songState?.context?.context_uri == item?.uri &&
                                                            songState.isPlaying
                                                        }
                                                        owner={item?.owner}
                                                    />
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="w-[90%] absolute top-1/2 -translate-y-1/2">
                                            <h3 className="text-center">Couldn't find "{searchLibrary}"</h3>
                                            <p className="text-center font-light text-sm">
                                                Try searching again using a different spelling or keyword.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </OverlayScrollbarsComponent>
                </div>
                {!songState.user.name && <LeftsideFooter />}
            </div>
        </>
    );
};

export default LeftSide;
