import { Home, Search, Artist, Collection, Playlist } from '~/pages'

const publicRoutes = [
    {
        path: '/',
        element: Home
    },
    {
        path: '/search',
        element: Search
    },
    {
        path: '/artist',
        element: Artist
    },
    {
        path: '/collection',
        element: Collection
    },
    {
        path: '/playlist',
        element: Playlist
    },
]

export { publicRoutes }