export const initSongState = {
    songId: '',
    albumId: '',
    artistIds: [],
    device_id: '',
    uri: '',
    isPlaying: false,
    duration: 0,
    position: 0,
    volume: 50,
};

export const songReducer = (state, action) => {
    switch (action.type) {
        case 'SETDEVICE':
            return {
                ...state,
                device_id: action.payLoad
            }
        case 'UPDATE_SONG_STATE':
            return {
                ...state,
                ...action.payLoad
            }
        case 'SET_ISPLAYING':
            return {
                ...state,
                isPlaying: action.payLoad
            }
        default:
            return state;
    }
};
