import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
    NextIcon,
    PlayIcon,
    PrevIcon,
    ReplayIcon,
    ShuffleIcon,
} from '../Icons';
import VolumeControl from '../VolumeControl';
import PlaybackTracker from '../PlaybackTracker';

function Player({ data }) {
    const { player, is_active, is_pause, current_track } = data;
    const getTrackTime = (time_ms) => {
        const time_s = Math.floor(time_ms / 1000);
        const minute = Math.floor(time_s / 60);
        const second = time_s - minute * 60;
        return minute + ':' + (second - 10 < 0 ? '0' + second : second);
    };
    return (
        <>
            {!is_active && <h3>Loading...</h3>}
            {is_active && (
                <div className="w-full h-full flex items-center justify-between ">
                    <div className="flex items-center">
                        <div className="w-14 h-14 rounded-md overflow-hidden">
                            <img
                                src={current_track?.album?.images[0]?.url}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col pl-3">
                            <Link
                                to={`/album/${
                                    current_track?.album?.uri?.split(':')[2]
                                }`}
                                className="text-sm text-white hover:underline"
                            >
                                {current_track?.name}
                            </Link>
                            {current_track?.artists.map((artist, index) => {
                                return (
                                    <Link
                                        key={index}
                                        to={`/artist/${
                                            artist?.uri?.split(':')[2]
                                        }`}
                                        className="text-xs text-[#b3b3b3] hover:underline"
                                    >
                                        <span>{artist?.name}</span>
                                        {index <=
                                            current_track.artists.length -
                                                2 && <span>,</span>}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="basis-1/2 flex flex-col items-center justify-center">
                        <div className="flex items-center mb-2 gap-4">
                            <button className="w-8 h-8 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white">
                                <ShuffleIcon />
                            </button>
                            <button className="w-8 h-8 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white">
                                <PrevIcon />
                            </button>
                            <button
                                className="w-8 h-8 flex items-center cursor-default mx-[7px] justify-center bg-white rounded-full text-black hover:scale-105 transition"
                                onClick={() => player.togglePlay()}
                            >
                                <PlayIcon width={18} height={18} />
                            </button>
                            <button className="w-8 h-8 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white">
                                <NextIcon />
                            </button>
                            <button className="w-8 h-8 flex items-center cursor-default justify-center text-[#ffffffb3] hover:text-white">
                                <ReplayIcon />
                            </button>
                        </div>
                        <PlaybackTracker duration={getTrackTime(current_track.duration_ms)}/>
                    </div>
                    <div>
                        <VolumeControl />
                    </div>
                </div>
            )}
        </>
    );
}

export default Player;
