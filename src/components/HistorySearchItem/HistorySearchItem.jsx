import { PlayIcon, XIcon } from '../Icons';
import { Link } from 'react-router-dom';

const HistorySearchItem = ({ name, to, type }) => {
    return (
        <Link
            to={to}
            className="group p-4 relative h-auto bg-[#171717] rounded-md hover:bg-[#282828] transition-all duration-300"
        >
            <img
                src="https://i.scdn.co/image/ab67616100005174214f3cf1cbe7139c1e26ffbb"
                className="w-full aspect-square object-cover rounded-full mb-4 group-hover:shadow-fade"
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
                {name}
            </h3>
            <p
                className="text-sm text-[#a7a7a7] overflow-hidden"
                style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {type}
            </p>
            <button className="bg-[#1ed760] w-12 h-12 absolute shadow-blur top-[44%] right-[16%] group-hover:top-[42%] group-hover:opacity-100 hover:scale-105 group-hover:shadow-fade opacity-0 transition-all duration-300 flex justify-center items-center rounded-full">
                <PlayIcon width={24} height={24} className="text-black" />
            </button>
            <button className="w-7 h-7 bg-[#111111] flex items-center justify-center rounded-full absolute top-[3%] right-[5%] cursor-default hover:scale-105 transition-all">
                <XIcon />
            </button>
        </Link>
    );
};

export default HistorySearchItem;
