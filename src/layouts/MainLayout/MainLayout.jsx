import LeftSide from '../components/LeftSide';
import Footer from '../components/Footer';
import RightSide from '../components/RightSide';
import SongProvider from '~/Provider/SongProvider';
import LibraryProvider from '~/Provider/LibraryProvider';

const MainLayout = ({ children }) => {
    return (
        <div className="w-[100vw] min-h-[100vh] flex flex-col gap-2 bg-black text-white p-2">
            <SongProvider>
                <LibraryProvider>
                    <div className="flex justify-between gap-1 h-main-layout">
                        {/* <div className="w-[280px] shrink-0 flex flex-col gap-2"> */}
                            <LeftSide />
                        {/* </div> */}
                        <div className="resize-bar"></div>
                        <div className="flex-auto bg-[#121212] rounded-md relative overflow-hidden">
                            <RightSide>{children}</RightSide>
                        </div>
                    </div>
                    <div className="sign-up-field h-playback">
                        <Footer />
                    </div>
                </LibraryProvider>
            </SongProvider>
        </div>
    );
};

export default MainLayout;
