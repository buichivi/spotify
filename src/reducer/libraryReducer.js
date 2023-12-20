export const initLibraryState = {
    playlists: [
        {
            imageUrl: '',
            id: '',
            name: '',
            type: '',
        },
    ],
    albums: [
        {
            imageUrl: '',
            id: '',
            name: '',
            type: '',
        },
    ],
    artists: [
        {
            imageUrl: '',
            id: '',
            name: '',
            type: '',
        },
    ],
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
        default:
            return state;
    }
};
