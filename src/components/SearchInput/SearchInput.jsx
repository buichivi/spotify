import { useEffect, useRef, useState } from 'react';
import { SearchIcon, XIcon } from '../Icons';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        inputRef.current.focus();
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => {
            if (searchValue) navigate(`/search/${searchValue}`);
        }, 1000);
        return () => clearTimeout(timerId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue]);

    return (
        <div className="flex flex-1 items-center justify-start">
            <form
                className="group flex flex-364 items-center bg-[#242424] relative rounded-full"
                onSubmit={(e) => e.preventDefault()}
            >
                <SearchIcon
                    width={18}
                    height={18}
                    className="group-focus-within:text-white group-hover:text-white absolute top-[50%] left-3 -translate-y-1/2 text-[#ffffffb3]"
                />
                <input
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    spellCheck="false"
                    className="group-focus-within:ring-2 ring-white group-focus-within:bg-[#2a2a2a] hover:bg-[#2a2a2a] rounded-full w-full h-[48px] py-[6px] px-[36px] text-sm bg-transparent outline-none font-normal placeholder:font-light placeholder:text-[#8a8a8a] placeholder:relative placeholder:top-[2px] search-input"
                    type="text"
                    placeholder="What do you want to listen to?"
                    ref={inputRef}
                />
                <div
                    className="clear-btn hidden absolute top-1/2 right-3 -translate-y-1/2"
                    onClick={() => {
                        setSearchValue('');
                        inputRef.current.focus();
                    }}
                >
                    <XIcon />
                </div>
            </form>
        </div>
    );
};

export default SearchInput;
