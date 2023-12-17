import { useEffect, useRef, useState } from 'react';
import { durationConvert } from '~/utils/durationConvert';

const PlaybackTracker = ({ player, state }) => {
    const tracker = useRef();
    const max = Math.floor(state.duration / 1000);
    const [position, setPosition] = useState(Math.floor(state.position / 1000));
    const [isSeeking, setIsSeeking] = useState(false);
    const [currentSongID, setCurrentSongID] = useState(state?.track_window?.current_track?.id);

    console.log('Playback Tracker re-render');

    useEffect(() => {
        const progress = (position / tracker.current.max) * 100;
        tracker.current.style.background = `linear-gradient(to right, #1db954 ${progress}%, #ffffff4d ${progress}%)`;
    }, [position]);

    useEffect(() => {
        if (currentSongID != state.track_window.current_track.id) {
            setPosition(0);
            setCurrentSongID(state.track_window.current_track.id);
        }
        var timer;
        if (!state.paused) {
            timer = setInterval(() => {
                setPosition((prev) => {
                    if (prev >= tracker.current.max) {
                        return 0;
                    }
                    return prev + 1;
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isSeeking, state.paused, state.playback_id]);

    return (
        <div className="w-full flex items-center justify-between gap-2">
            <span className="w-6 flex-shrink-0 text-[11px] text-[#a7a7a7]">
                {durationConvert(position * 1000)}
            </span>
            <input
                type="range"
                className="playback-tracker"
                ref={tracker}
                onInput={(e) => {
                    setIsSeeking(true);
                    console.log(Number(e.target.value));
                    setPosition(Number(e.target.value));
                }}
                onMouseUp={() => {
                    setIsSeeking(false);
                    console.log(position);
                    player.seek(position * 1000).then(() => {
                        console.log('Changed position!');
                    });
                }}
                min={0}
                max={max}
                value={position}
            />
            <span className="w-6 flex-shrink-0 text-[11px] text-[#a7a7a7]">
                {durationConvert(state.duration)}
            </span>
        </div>
    );
};

export default PlaybackTracker;
