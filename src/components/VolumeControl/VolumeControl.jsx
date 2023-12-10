import { useEffect, useRef, useState } from 'react';
import { VolumeMuteIcon, VolumnIcon } from '../Icons';
import useSpotifyApi from '~/hooks/useSpotifyApi';

const VolumeControl = ({ player }) => {
    const initVolume = JSON.parse(localStorage.getItem('volume_percent'));
    console.log(initVolume);
    const [volume, setVolume] = useState(initVolume || 100);
    const volumeBar = useRef();
    // const spotifyApi = useSpotifyApi();

    useEffect(() => {
        const progress = (volume / volumeBar.current.max) * 100;
        volumeBar.current.style.background = `linear-gradient(to right, #1db954 ${progress}%, #ffffff4d ${progress}%)`;
    }, [volume]);

    useEffect(() => {
        if (initVolume) {
            player.setVolume(initVolume / 100).then(() => {
                console.log("Volume is loaded!");
            });
        }
    }, [])

    return (
        <div className="flex items-center justify-end">
            <button className="w-8 h-8 flex items-center justify-center" 
                onClick={() => {
                    if (volume > 0) {
                        setVolume(0);
                        player.setVolume(0).then(() => {
                            console.log('Volume = 0'); 
                        });
                    }
                    else {
                        setVolume(initVolume);
                        player.setVolume(initVolume / 100).then(() => {
                            console.log("Volume = ", initVolume);
                        });
                    }
                }}
            >
                {volume == 0 && <VolumeMuteIcon />}
                {volume > 0 && volume < 30 && <VolumnIcon level='low'/>}
                {volume >= 30 && volume < 70 && <VolumnIcon level='medium'/>}
                {volume >= 70 && <VolumnIcon level='high'/>}
            </button>
            <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onInput={(e) => {
                    setVolume(e.target.value);
                }}
                onMouseUp={() => {
                    localStorage.setItem(
                        'volume_percent',
                        JSON.stringify(volume),
                    );
                    player
                        .setVolume(volume / 100)
                        .then(() => console.log('Volume updated!'));
                }}
                ref={volumeBar}
                className="volume-bar flex-1 max-w-[100px]"
            />
        </div>
    );
};

export default VolumeControl;
