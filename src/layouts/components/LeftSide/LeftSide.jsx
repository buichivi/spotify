import { useRef } from 'react';
import { LanguageIcon, LibraryIcon, PlusIcon } from '~/components/Icons';
import LibraryItem from '~/components/LibraryItem';
import Menu from '~/components/Menu';
import { LEFTSIDE_FOOTER_ITEMS } from '~/const.data';
import useLibraryReducer from '~/hooks/useLibraryReducer';
import useSongReducer from '~/hooks/useSongReducer';

const LeftSide = () => {
    const shadow = useRef();
    const { songState } = useSongReducer();
    const { libraryState } = useLibraryReducer();
    const { albums, artists, playlists, savedTracks } = libraryState;

    const handleScroll = (e) => {
        if (e.target.scrollTop) shadow.current.style.display = 'block';
        else shadow.current.style.display = 'none';
    };

    return (
        <>
            <div className="w-full h-auto bg-[#121212] rounded-md">
                <Menu />
            </div>
            <div className="w-full flex-auto flex flex-col justify-between overflow-hidden bg-[#121212] rounded-md">
                <header className="h-[56px] flex items-center justify-between py-2 px-4 text-[#a7a7a7]">
                    <div className="flex items-center px-2 py-1 hover:text-white transition cursor-pointer">
                        <LibraryIcon />
                        <span className="relative top-[2px] pl-3">
                            Your Library
                        </span>
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1a1a1a] cursor-pointer transition-all">
                        <PlusIcon width={16} height={16} />
                    </div>
                </header>
                <div className="relative h-[132px] flex-auto">
                    <span
                        ref={shadow}
                        className="absolute w-full h-2 bg-transparent -top-2 left-0 shadow-blur hidden"
                    ></span>
                    <div
                        className="w-full h-full p-2 overflow-y-auto overflow-x-hidden"
                        onScroll={handleScroll}
                    >
                        <div className="w-full h-full flex flex-col justify-between">
                            {songState.user.name == '' ? (
                                <>
                                    <div className="w-full h-[134px] flex flex-col justify-between my-2 py-4 px-5 bg-[#242424] rounded-md">
                                        <div className="w-full h-[50px] flex flex-col justify-between">
                                            <h3 className="font-semibold">
                                                Create your first playlist
                                            </h3>
                                            <span className="text-sm">
                                                It's easy, we'll help you
                                            </span>
                                        </div>
                                        <button className="w-[126px] h-8 px-4 py-1 rounded-full bg-white text-black text-sm leading-8 font-medium hover:bg-[#b3b3b3] hover:scale-105 transition">
                                            <span className="relative -top-[2px]">
                                                Create playlist
                                            </span>
                                        </button>
                                    </div>
                                    <div className="w-full h-[176px] flex flex-col justify-between my-2 py-4 px-5 bg-[#242424] rounded-md">
                                        <div className="w-full h-[92px] flex flex-col justify-between">
                                            <h3 className="font-semibold">
                                                Let's find some podcasts to
                                                follow
                                            </h3>
                                            <span className="text-sm">
                                                We'll keep you updated on new
                                                episodes
                                            </span>
                                        </div>
                                        <button className="inline-flex w-[142px] h-8 px-4 py-1 rounded-full bg-white text-black text-sm leading-8 font-medium hover:bg-[#b3b3b3] hover:scale-105 transition">
                                            <span className="relative -top-[2px]">
                                                Browse podcasts
                                            </span>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="w-full h-full">
                                    <LibraryItem
                                        data={{
                                            type: 'collection',
                                            id: 'tracks',
                                            imageUrl: 'https://t.ly/1m3eT',
                                            name: 'Liked songs'
                                        }}
                                        owner={savedTracks + ' song' + (savedTracks > 2 ? 's' : '')}
                                    />
                                    {artists.length > 0 &&
                                        playlists
                                            .concat(albums, artists)
                                            .map((item, index) => {
                                                return (
                                                    <div
                                                        key={index}
                                                        className="w-full h-auto"
                                                    >
                                                        <LibraryItem
                                                            data={item}
                                                            isActive={
                                                                songState
                                                                    ?.context
                                                                    ?.context_uri ==
                                                                item?.uri
                                                            }
                                                            isPlaying={
                                                                songState
                                                                    ?.context
                                                                    ?.context_uri ==
                                                                    item?.uri &&
                                                                songState.isPlaying
                                                            }
                                                            owner={item?.owner}
                                                        />
                                                    </div>
                                                );
                                            })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {songState.user.name == '' && (
                    <div>
                        <ul className="px-6 my-8 flex flex-wrap">
                            {LEFTSIDE_FOOTER_ITEMS.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className="text-[11px] text-[#a7a7a7] h-[29px] mr-4"
                                    >
                                        <a href={item.url}>{item.title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                        <button className="flex items-center gap-1 py-1 px-3 ml-6 mb-8 ring-1 ring-[#6d6d6d] rounded-full hover:scale-105 hover:ring-2 hover:ring-[#727272] transition">
                            <LanguageIcon width={16} height={16} />
                            <span className="text-sm font-bold relative top-[2px]">
                                English
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeftSide;
