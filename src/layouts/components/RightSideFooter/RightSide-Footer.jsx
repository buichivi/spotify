import LeftsideFooter from '~/components/LeftsideFooter';
import { RIGHTSIDE_FOOTER_ITEMS, SOCIAL_MEDIA_ITEMS } from '~/const.data';
import useSongReducer from '~/hooks/useSongReducer';

const RightSideFooter = () => {
    const { songState } = useSongReducer();

    return (
        <div className="pt-2 pb-10 px-8">
            <div className="flex pb-10 mb-6 border-b-[1px] border-[#ffffff1a] flex-wrap">
                <div className="flex items-start justify-between md:justify-start flex-auto flex-wrap mb-4">
                    {RIGHTSIDE_FOOTER_ITEMS.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="basis-1/4 flex-grow-0 h-[180px] flex flex-col pr-6 pb-8"
                            >
                                <h4 className="font-bold text-white mb-2">
                                    {item.title}
                                </h4>
                                {item.list.map((listItem, index) => (
                                    <a
                                        key={index}
                                        href={listItem.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-fit py-1 text-[#a7a7a7] hover:text-white hover:underline transition"
                                    >
                                        <span>{listItem.title}</span>
                                    </a>
                                ))}
                            </div>
                        );
                    })}
                </div>
                <div className="w-[152px] mb-0 xl:mb-4">
                    <div className="flex justify-around">
                        {SOCIAL_MEDIA_ITEMS.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={index}
                                    href={item.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full cursor-default bg-[#292929] hover:bg-[#727272] transition flex items-center justify-center"
                                >
                                    <Icon />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="pt-4 flex items-center justify-between flex-wrap">
                {songState.user.name && <LeftsideFooter />}
                <p className="text-sm text-[#a7a7a7] tracking-wide font-light">
                    © 2023 Spotify AB
                </p>
            </div>
        </div>
    );
};

export default RightSideFooter;
