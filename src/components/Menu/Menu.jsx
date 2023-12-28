import { Link, useLocation } from 'react-router-dom';

import { HomeIcon, HomeIconActived, SearchIcon, SearchIconActived, SpotifyLogo } from '~/components/Icons';
import { useSongReducer } from '~/hooks';
const Menu = ({ isMinimize = false }) => {
    const location = useLocation();
    const { songState } = useSongReducer();

    return (
        <div>
            {!songState.user.name && (
                <a href="" target="_blank" className="inline-block mt-[20px] px-6">
                    <SpotifyLogo />
                </a>
            )}
            <ul className="px-3 py-2">
                <li className="h-[48px] px-3 py-1 ">
                    <Link
                        to="/"
                        className={`h-full flex items-center font-bold text-[#a7a7a7] hover:text-white transition ${
                            location.pathname === '/' ? 'active' : ''
                        }`}
                    >
                        {location.pathname === '/' ? <HomeIconActived /> : <HomeIcon />}
                        {!isMinimize && (
                            <span className="pl-5 text-[15px] leading-10 align-middle relative top-[3px]">Home</span>
                        )}
                    </Link>
                </li>
                <li className="h-[48px] px-3 py-1">
                    <Link
                        to="/search"
                        className={`h-full flex items-center font-bold text-[#a7a7a7] hover:text-white transition ${
                            location.pathname.includes('/search') ? 'active' : ''
                        }`}
                    >
                        {location.pathname.includes('/search') ? <SearchIconActived /> : <SearchIcon />}
                        {!isMinimize && (
                            <span className="pl-5 text-[15px] leading-10 align-middle relative top-[3px]">Search</span>
                        )}
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Menu;
