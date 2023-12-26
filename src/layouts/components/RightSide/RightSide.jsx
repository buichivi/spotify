import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import Vibrant from 'node-vibrant';
import useSpotifyApi from '~/hooks/useSpotifyApi';
import NavBar from '../NavBar';
import RightSideFooter from '../RightSideFooter';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

const RightSide = ({ children }) => {
    const location = useLocation();
    const [isHidePlayBtn, setIsHidePlayBtn] = useState(true);
    const [navColor, setNavColor] = useState('');
    const [isMainContent, setIsMainContent] = useState(false);
    const [content, setContent] = useState('');
    const nav = useRef();
    const mainContentDiv = useRef();
    const spotifyApi = useSpotifyApi();

    useEffect(() => {
        if (
            location.pathname.includes('/artist') ||
            location.pathname.includes('/album') ||
            location.pathname.includes('/playlist')
        ) {
            setIsMainContent(true);
        } else {
            setIsMainContent(false);
        }
        const getNavColor = async () => {
            var contentID;
            if (location.pathname.includes('/artist')) {
                contentID = location.pathname.split('/artist/')[1];
                const artist = await spotifyApi.getArtist(contentID);
                setContent(artist.body);
                const color = await Vibrant.from(
                    artist.body.images[0].url,
                ).getPalette();
                setNavColor(color.DarkVibrant.getHex());
            } else if (location.pathname.includes('/album')) {
                contentID = location.pathname.split('/album/')[1];
                const album = await spotifyApi.getAlbum(contentID);
                setContent(album.body);
                const color = await Vibrant.from(
                    album.body.images[0].url,
                ).getPalette();
                setNavColor(color.DarkVibrant.getHex());
            } else if (location.pathname.includes('/playlist')) {
                contentID = location.pathname.split('/playlist/')[1];
                const playlist = await spotifyApi.getPlaylist(contentID);
                setContent(playlist.body);
                const color = await Vibrant.from(
                    playlist.body.images[0].url,
                ).getPalette();
                setNavColor(color.Vibrant.getHex());
            }
        };
        if (!spotifyApi.error) {
            getNavColor();
        }
    }, [location, spotifyApi]);

    useEffect(() => {
        mainContentDiv.current.scrollTop = 0;
    }, [location.pathname]);

    const handleScroll = (e) => {
        let scrollTop = 0;
        if (isMainContent) {
            scrollTop = Math.max(340, window.outerHeight * 0.4 + 32);
        }
        if (e.currentTarget.scrollTop > scrollTop) {
            nav.current.style.background = '#121212';
            if (isMainContent) {
                nav.current.style.background = navColor;
                setIsHidePlayBtn(false);
            }
        } else {
            nav.current.style.background = 'transparent';
            if (isMainContent) {
                setIsHidePlayBtn(true);
            }
        }
    };

    return (
        <>
            <NavBar ref={nav} isHide={isHidePlayBtn} currentContent={content} />
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
                className="h-full"
                ref={mainContentDiv}
            >
                {/* <div
                    ref={mainContentDiv}
                    className="h-full overflow-y-auto overflow-x-hidden"
                    onScroll={handleScroll}
                > */}
                    <div className="min-h-[calc(((100vh - 64px) - 90px) - 519px)] pb-8">
                        <div className="pt-nav">{children}</div>
                        <div className="pt-10 h-[393px]">
                            <RightSideFooter />
                        </div>
                    </div>
                {/* </div> */}
            </OverlayScrollbarsComponent>
        </>
    );
};

export default RightSide;
