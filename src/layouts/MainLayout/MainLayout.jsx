import { useRef } from 'react';
import LeftSide from '../components/LeftSide';
import NavBar from '../components/NavBar';
import RightSideFooter from '../components/RightSideFooter';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => {
    const nav = useRef();

    return (
        <div className="w-[100vw] min-h-[100vh] flex flex-col gap-2 bg-black text-white p-2">
            <div className='flex justify-between gap-1 h-main-layout'>
                <div className="w-[280px]  shrink-0 flex flex-col gap-2">
                    <LeftSide />
                </div>
                <div className="resize-bar"></div>
                <div className="flex-auto bg-[#121212] rounded-md relative overflow-hidden">
                    <NavBar ref={nav} />
                    <div
                        className="h-full overflow-auto"
                        onScroll={(e) => {
                            if (e.currentTarget.scrollTop > 0) {
                                nav.current.style.background = '#121212';
                            } else nav.current.style.background = 'transparent';
                        }}
                    >
                        <div className="min-h-[calc(((100vh - 64px) - 90px) - 519px)] pb-8">
                            <div className="pt-nav">{children}</div>
                            <div className="pt-10 h-[393px]">
                                <RightSideFooter />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sign-up-field h-playback">
                <Footer />
            </div>
        </div>
    );
};

export default MainLayout;
