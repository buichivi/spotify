export const initSongState = {
    user: {
        name: '',
        imageUrl: '',
    },
    songId: '',
    albumId: '',
    artistIds: [],
    deviceId: '',
    uri: '',
    isPlaying: false,
    duration: 0,
    position: 0,
    volume: 50,
    context: {
        artist: [],
        album: {},
        playlist: {},
    },
};

export const songReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DEVICE':
            return {
                ...state,
                deviceId: action.payLoad,
            };
        case 'UPDATE_SONG_STATE':
            return {
                ...state,
                ...action.payLoad,
            };
        case 'SET_PLAYING_STATE':
            return {
                ...state,
                isPlaying: action.payLoad.isPlaying,
                context: {
                    album: { ...state.context.album },
                    playlist: { ...state.context.playlist },
                    artist: [
                        ...state.context.artist,
                        ...action.payLoad.context_artist,
                    ],
                },
            };
        case 'SET_USER': 
            return {
                ...state,
                user: { ...action.payLoad }
            }
        default:
            return state;
    }
};
