import { Home, Search, Artist, Collection, Playlist } from '~/pages'
import Album from '~/pages/Album'

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
        path: '/artist/:id',
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
    {
        path: '/album/:id',
        element: Album
    },
]

export { publicRoutes }