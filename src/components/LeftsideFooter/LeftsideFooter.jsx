import { LEFTSIDE_FOOTER_ITEMS } from '~/const.data';
import { LanguageIcon } from '../Icons';
import { useSongReducer } from '~/hooks';

const LeftsideFooter = () => {
    const { songState } = useSongReducer();
    return (
        <div>
            <ul className="px-6 my-8 flex flex-wrap"
                style={{ 
                    padding: songState.user.name && '0',
                    margin: songState.user.name && '12px 0',
                }}
            >
                {LEFTSIDE_FOOTER_ITEMS.map((item, index) => {
                    return (
                        <li
                            key={index}
                            className="font-light text-[11px] text-[#a7a7a7] hover:text-white h-[29px] mr-4 flex items-center"
                            style={{
                                fontSize: songState.user.name && '14px'
                            }}
                        >
                            <a href={item.url}>{item.title}</a>
                        </li>
                    );
                })}
            </ul>
            {!songState.user.name && (
                <button className="flex items-center gap-1 py-1 px-3 ml-6 mb-8 ring-1 ring-[#6d6d6d] rounded-full hover:scale-105 hover:ring-2 hover:ring-[#727272] transition">
                    <LanguageIcon width={16} height={16} />
                    <span className="text-sm font-bold relative top-[2px]">
                        English
                    </span>
                </button>
            )}
        </div>
    );
};

export default LeftsideFooter;
