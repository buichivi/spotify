import { Link } from 'react-router-dom';
import { PlayIcon, XIcon } from '../Icons';

const CategoryItem = ({ title, type, desc, to, imgUrl, className }) => {
    return (
        <Link
            to={to}
            className={`group p-4 relative min-h-[262px] bg-[#171717] rounded-md hover:bg-[#282828] transition-all ${className}`}
        >
            <img
                src={imgUrl}
                className="w-full aspect-square object-cover rounded-md mb-4 group-hover:shadow-fade"
                alt=""
            />
            <h3
                className="text-normal font-bold pb-1 overflow-hidden"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {title}
            </h3>
            <p
                className="text-sm text-[#a7a7a7] leading-[1.35rem] overflow-hidden"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {desc}
            </p>
            <button className="bg-[#1ed760] w-12 h-12 absolute shadow-blur top-[44%] right-[16%] group-hover:top-[42%] group-hover:opacity-100 hover:scale-105 group-hover:shadow-fade opacity-0 transition-all duration-300 flex justify-center items-center rounded-full">
                <PlayIcon width={24} height={24} className="text-black" />
            </button>
        </Link>
    );
};

export default CategoryItem;
