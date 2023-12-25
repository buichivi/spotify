import Vibrant from 'node-vibrant';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GenreItem = ({ genreData = {}, className = '' }) => {
    const [color, setColor] = useState('');

    useEffect(() => {
        const getColor = async () => {
            const color = await Vibrant.from(genreData?.icons[0]?.url).getPalette();
            setColor(color.Vibrant.getHex());
        };
        getColor();
    }, [genreData?.id]);

    return (
        <Link
            to={`/genre/${genreData?.id}`}
            className={`aspect-square rounded-md ${className} relative overflow-hidden`}
            style={{ backgroundColor: color }}
        >
            <h3 className="p-4 text-sm md:text-xl xl:text-2xl font-bold">{genreData.name}</h3>
            <div className="w-[60%] aspect-square object-fill absolute bottom-0 right-0 rotate-[25deg] translate-x-[18%] translate-y-[4%] shadow-md">
                <img src={genreData?.icons[0]?.url} alt="" />
            </div>
        </Link>
    );
};

export default GenreItem;
