import { useContext } from 'react';
import { SongContext } from '~/Provider/SongProvider';

export default function useSongReducer() {
    const { songState, dispatchSongState } = useContext(SongContext);
    return { songState, dispatchSongState };
}
