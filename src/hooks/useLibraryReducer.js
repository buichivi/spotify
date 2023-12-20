import { useContext } from 'react';
import { LibraryContext } from '~/Provider/LibraryProvider';

export default function useLibraryReducer() {
    const { libraryState, dispatchLibraryState } = useContext(LibraryContext);
    return { libraryState, dispatchLibraryState };
}
