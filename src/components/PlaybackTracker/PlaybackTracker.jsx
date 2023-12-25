import { useEffect, useRef, useState } from 'react';
import useSongReducer from '~/hooks/useSongReducer';
import { durationConvert } from '~/utils';

const PlaybackTracker = ({ player }) => {
    const { songState } = useSongReducer();
    const tracker = useRef();
    const max = Math.floor(songState.duration / 1000);
    const [position, setPosition] = useState(
        Math.floor(songState.position / 1000),
    );
    const [isSeeking, setIsSeeking] = useState(false);
    const [currentSongID, setCurrentSongID] = useState(songState.songId);

    console.log('Playback Tracker re-render');

    useEffect(() => {
        const progress = (position / tracker.current.max) * 100;
        tracker.current.style.background = `linear-gradient(to right, #1db954 ${progress}%, #ffffff4d ${progress}%)`;
    }, [position]);

    useEffect(() => {
        if (currentSongID != songState?.songId) {
            setPosition(0);
            setCurrentSongID(songState?.songId);
        }
        var timer;
        if (songState.isPlaying) {
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
    }, [isSeeking, songState.isPlaying, songState.songId]);

    useEffect(() => {
        setPosition(songState.position / 1000);
    }, [songState.position]);

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
                    setPosition(Number(e.target.value));
                }}
                onMouseUp={() => {
                    setIsSeeking(false);
                    player.seek(position * 1000).then(() => {
                        console.log('Changed position!');
                    });
                }}
                min={0}
                max={max}
                value={position}
            />
            <span className="w-6 flex-shrink-0 text-[11px] text-[#a7a7a7]">
                {durationConvert(songState.duration)}
            </span>
        </div>
    );
};

export default PlaybackTracker;
