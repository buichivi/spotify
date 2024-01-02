import LeftSide from '../components/LeftSide';
import Footer from '../components/Footer';
import RightSide from '../components/RightSide';
import SongProvider from '~/Provider/SongProvider';
import LibraryProvider from '~/Provider/LibraryProvider';
import { useEffect, useRef, useState } from 'react';

const MainLayout = ({ children }) => {
    const [leftsideWidth, setLeftsideWidth] = useState(0)
    const leftSide = useRef();
    const rightSide = useRef();
    const container = useRef();
    const resizer = useRef();
    let x = 0;
    let leftWidth = 0;

    console.log(leftWidth);

    const handleMouseMove = (e) => {
        const dx = e.clientX - x;
        const newLeftWidth = ((leftWidth + dx) * 100) / (container.current.getBoundingClientRect().width);
        leftSide.current.style.width = newLeftWidth + '%';

        leftSide.current.style.userSelect = 'none';
        leftSide.current.style.pointerEvents = 'none';

        rightSide.current.style.userSelect = 'none';
        rightSide.current.style.pointerEvents = 'none';

    };

    const handleMouseDown = (e) => {
        x = e.clientX;
        leftWidth = leftSide.current.getBoundingClientRect().width;

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseUp = () => {
        resizer.current.style.removeProperty('cursor');
        document.body.style.removeProperty('cursor');

        leftSide.current.style.removeProperty('user-select');
        leftSide.current.style.removeProperty('pointer-events');

        rightSide.current.style.removeProperty('user-select');
        rightSide.current.style.removeProperty('pointer-events');

        
        // Remove the handlers of `mousemove` and `mouseup`
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        const leftWidth = leftSide.current.getBoundingClientRect().width;
        setLeftsideWidth(leftWidth)
    };

    return (
        <div className="w-[100vw] min-h-[100vh] flex flex-col gap-2 bg-black text-white p-2">
            <SongProvider>
                <LibraryProvider>
                    <div className="flex justify-between h-main-layout" ref={container}>
                        <LeftSide ref={leftSide} width={leftsideWidth} containerWidth={container?.current?.getBoundingClientRect()?.width}/>
                        <div
                            className="resize-bar group w-2 flex-shrink-0 bg-transparent cursor-col-resize"
                            draggable={false}
                            ref={resizer}
                            onMouseDown={handleMouseDown}
                        >
                            <div className='w-[1px] h-full bg-transparent group-hover:bg-[#a3a3a3]'></div>
                        </div>
                        <div
                            className="flex-auto min-w-[450px] bg-[#121212] rounded-md relative overflow-hidden"
                            ref={rightSide}
                        >
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
