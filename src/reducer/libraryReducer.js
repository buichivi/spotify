export const initLibraryState = {
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
            artistUrl: '',
            id: '',
            name: '',
            type: '',
        },
    ],
    playlists: [
        {
            playlistUrl: '',
            id: '',
            name: '',
            type: '',
        },
    ],
};

export const libraryReducer = (state, action) => {
    switch (action.type) {
        case '':
            return {};
        default:
            return state;
    }
};
