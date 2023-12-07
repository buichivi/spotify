import { useEffect, useRef } from 'react';

const PlaybackTracker = ({ duration = 0 }) => {
    const playbar = useRef();
    const handler = useRef();

    const handleMouseDown = (e) => {
        console.log(e);
    };

    const handleMouseMove = (e) => {
        console.log(e);
        console.dir(handler.current.parentElement);
        if (e.clientX - handler.current.parentElement.clientLeft > 0) {
            handler.current.style.left = (e.clientX - handler.current.parentElement.clientWidth) / handler.current.parentElement.clientWidth + '%'
        }
        else {
            handler.current.style.left = 0;
        }
        // console.log(handler.current.clientX);
    }

    useEffect(() => {
        handler.current.onmousedown = () => {
            document.onmousemove = handleMouseMove
        };
        document.onmouseup = () => {
            console.log("Mouse up");
            document.onmousemove = null;
        }
    }, []);

    return (
        <div className="w-[70%] flex items-center justify-between gap-2">
            <span className="text-[11px] text-[#a7a7a7]">--:--</span>
            {/* <input
                                type="range"
                                className="flex-1"
                                min={0}
                                max={100}
                            /> */}
            <div className="group flex-1 w-full h-1 bg-transparent relative">
                <div
                    ref={handler}
                    className="hidden group-hover:block w-3 h-3 bg-white rounded-full absolute top-1/2 -translate-y-1/2 right-1/2 z-10"
                    // onMouseDown={handleMouseDown}
                ></div>
                <div className="w-full h-full bg-[#ffffff4d] relative overflow-hidden rounded-full">
                    <div
                        ref={playbar}
                        className="w-full h-full bg-white rounded-full group-hover:bg-[#1db954] relative right-1/2"
                    ></div>
                </div>
            </div>
            <span className="text-[11px] text-[#a7a7a7]">{duration}</span>
        </div>
    );
};

export default PlaybackTracker;
