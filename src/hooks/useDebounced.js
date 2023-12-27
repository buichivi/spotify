import { useEffect, useState } from 'react';

const useDebounced = (value, delay = 250) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timerId);
        };
    }, [value, delay]);
    return debouncedValue;
};

export default useDebounced;
