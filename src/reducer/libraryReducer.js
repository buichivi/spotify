export const initLibraryState = {
    playlists: [
        {
            imageUrl: '',
            id: '',
            name: '',
            type: '',
            uri: '',
            owner: '',
        },
    ],
    albums: [
        {
            imageUrl: '',
            id: '',
            name: '',
            type: '',
            uri: '',
            owner: '',
        },
    ],
    artists: [
        {
            imageUrl: '',
            id: '',
            name: '',
            type: '',
            uri: '',
        },
    ],
    savedTracks: 0,
};

export const libraryReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_LIBRARY':
            return {
                ...state,
                ...action.payLoad,
            };
        case 'FOLLOW_ARTIST':
            return {
                ...state,
                artists: [action.payLoad, ...state.artists],
            };
        case 'UNFOLLOW_ARTIST':
            return {
                ...state,
                artists: [...state.artists].filter(
                    (artist) => artist.id !== action.payLoad,
                ),
            };
        case 'SAVE_ALBUM':
            return {
                ...state,
                albums: [...state.albums, action.payLoad],
            };
        case 'REMOVE_ALBUM':
            return {
                ...state,
                albums: [...state.albums].filter(
                    (album) => album.id !== action.payLoad,
                ),
            };
        case 'REMOVE_A_SAVED_TRACK':
            return {
                ...state,
                savedTracks: state.savedTracks - action.payLoad,
            };
        case 'ADD_A_SAVE_TRACK':
            return {
                ...state,
                savedTracks: state.savedTracks + action.payLoad,
            };
        default:
            return state;
    }
};
