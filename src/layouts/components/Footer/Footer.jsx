import { useEffect, useState } from 'react';
import Player from '~/components/Player';
import { AUTH_URL } from '~/config/spotify';
import useSongReducer from '~/hooks/useSongReducer';
import useSpotifyApi from '~/hooks/useSpotifyApi';

const track = {
    name: '',
    album: {
        images: [{ url: '' }],
    },
    artists: [{ name: '' }],
};

const Footer = () => {
    const spotifyApi = useSpotifyApi();
    const { songState, dispatchSongState } = useSongReducer();

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [state, setState] = useState({});

    console.log('Footer re-render');

    useEffect(() => {
        if (!spotifyApi.error) {
            const script = document.createElement('script');
            script.src = 'https://sdk.scdn.co/spotify-player.js';
            script.async = true;
            document.body.appendChild(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                const access_token = spotifyApi.getAccessToken();
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: (cb) => {
                        cb(access_token);
                    },
                    volume: 0.5,
                });

                setPlayer(player);

                player.addListener('ready', ({ device_id }) => {
                    if (device_id) {
                        spotifyApi.transferMyPlayback([device_id], true);
                        dispatchSongState({
                            type: 'SET_DEVICE',
                            payLoad: device_id,
                        });
                    }
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('player_state_changed', (state) => {
                    if (!state) {
                        return;
                    }

                    dispatchSongState({
                        type: 'UPDATE_SONG_STATE',
                        payLoad: {
                            songId: state?.track_window?.current_track?.id,
                            albumId:
                                state?.track_window?.current_track?.album?.uri.split(
                                    ':',
                                )[2],
                            artistIds:
                                state?.track_window?.current_track?.artists?.map(
                                    (artist) => artist?.uri.split(':')[2],
                                ),
                            uri: state?.track_window?.current_track?.uri,
                            isPlaying: !state?.paused,
                            duration: state?.duration,
                            position: state?.position,
                        },
                    });
                    setState(state);
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);

                    if (is_paused) {
                        document.title =
                            'Spotify - Web player: Music for everyone';
                    } else
                        document.title =
                            state?.track_window?.current_track?.name;

                    player.getCurrentState().then((state) => {
                        !state ? setActive(false) : setActive(true);
                    });
                });

                player.connect();
            };
        }
    }, [spotifyApi]);

    return (
        <>
            {Object.keys(songState.user).length > 0 ? (
                <Player
                    data={{
                        is_active,
                        player,
                        is_paused,
                        current_track,
                        state,
                    }}
                />
            ) : (
                <a
                    href={AUTH_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full h-full pt-[11px] pr-[24px] pb-[7px] pl-[15px] bg-gradient-to-r from-[#af2896] to-[#509bf5] flex items-center justify-between"
                >
                    <div>
                        <h5 className="uppercase text-sm font-thin">
                            Preview of spotify
                        </h5>
                        <p className="font-normal">
                            Sign up to get unlimited songs and podcasts with
                            occasional ads. No credit card needed.
                        </p>
                    </div>
                    <button className="h-12 py-2 px-8 bg-white text-black rounded-full font-bold hover:scale-105">
                        <span className="relative top-[1px]">Sign up free</span>
                    </button>
                </a>
            )}
        </>
    );
};

export default Footer;
