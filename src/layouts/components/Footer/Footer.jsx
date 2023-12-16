import { useEffect, useState } from 'react';
import Player from '~/components/Player';
import { AUTH_URL } from '~/config/spotify';
import useSpotifyApi from '~/hooks/useSpotifyApi';

const track = {
    name: '',
    album: {
        images: [{ url: '' }],
    },
    artists: [{ name: '' }],
};

const Footer = () => {
    const [user, setUser] = useState({});
    const spotifyApi = useSpotifyApi();

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);
    const [state, setState] = useState({});

    console.log('Footer re-render');

    // useEffect(() => {
    //     if (!spotifyApi.error) {
    //         spotifyApi
    //             .play({
    //                 device_id: [device_id],
    //                 context_uri: 'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
    //                 offset: {
    //                     position: 5,
    //                 },
    //                 position_ms: 0,
    //             })
    //             .then((res) => {
    //                 console.log(res.body);
    //             })
    //             .catch((err) => console.log(err));
    //     }
    // }, [spotifyApi]);

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
                        spotifyApi.getMyDevices().then((data) => {
                            spotifyApi.transferMyPlayback(
                                [data.body.devices[0].id],
                                true,
                            );
                        });
                        spotifyApi
                            .play({
                                device_id: [device_id],
                                context_uri:
                                    'spotify:album:5ht7ItJgpBH7W6vJ5BqpPr',
                                offset: {
                                    position: 5,
                                },
                                position_ms: 0,
                            })
                            .then((res) => {
                                console.log('The song is loaded!');
                                console.log(res.body);
                            })
                            .catch((err) => console.log(err));
                    }
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('player_state_changed', (state) => {
                    if (!state) {
                        return;
                    }
                    setState(state);
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);

                    player.getCurrentState().then((state) => {
                        !state ? setActive(false) : setActive(true);
                    });
                });

                player.connect();
            };
        }
    }, [spotifyApi]);

    useEffect(() => {
        if (!spotifyApi.error) {
            spotifyApi.getMe().then((data) => {
                setUser(data.body);
            });
        }
    }, [spotifyApi]);

    return (
        <>
            {Object.keys(user).length > 0 ? (
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
