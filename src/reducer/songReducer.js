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
        context_uri: '',
        option: {
            uris: [],
            offset: {
                uri: '',
            },
        },
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
        case 'SET_CONTEXT':
            // ! Nên chỉ để context
            return {
                ...state,
                context: {
                    context_uri: action.payLoad.context.context_uri,
                    option: action.payLoad.context.option,
                },
            };
        case 'SET_USER':
            return {
                ...state,
                user: { ...action.payLoad },
            };
        default:
            return state;
    }
};
