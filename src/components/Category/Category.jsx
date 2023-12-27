import { Link } from 'react-router-dom';
import CategoryItem from '../CategoryItem';

const Category = ({ data = [], title, type = 'playlist', to, className }) => {
    return (
        <section className={`px-6 pt-4 ${className}`}>
            <div className="flex items-center justify-between h-[30px] mb-4">
                <Link to={to} className="text-2xl text-white font-bold hover:underline cursor-pointer">
                    {title}
                </Link>
                <Link to={to} className="text-sm text-[#b3b3b3] font-semibold hover:underline cursor-pointer">
                    Show all
                </Link>
            </div>
            <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 4xl:grid-cols-10 gap-category-gap category
                [&>*:nth-child(n+3)]:hidden md:[&>*:nth-child(n+3)]:inline-block 
                [&>*:nth-child(n+4)]:hidden lg:[&>*:nth-child(n+4)]:inline-block 
                [&>*:nth-child(n+5)]:hidden xl:[&>*:nth-child(n+5)]:inline-block
                [&>*:nth-child(n+6)]:hidden 2xl:[&>*:nth-child(n+6)]:inline-block
                [&>*:nth-child(n+8)]:hidden 3xl:[&>*:nth-child(n+8)]:inline-block
                [&>*:nth-child(n+11)]:hidden 4xl:[&>*:nth-child(n+11)]:inline-block
            "
            >
                {data.map((item, index) => {
                    const props =
                        type === 'album'
                            ? {
                                to: `/${type}/${item.track?.album?.id}`,
                                name: item.track?.album?.name,
                                artists: item.track?.album?.artists,
                                trackImg: item.track?.album?.images[0]?.url,
                            }
                            : {
                                to: `/${type}/${item.id}`,
                                name: item.name,
                                desc: item.description,
                                imgUrl: item.images[0].url,
                            };
                    return <CategoryItem key={index} type={type} className="" {...props} />;
                })}
            </div>
        </section>
    );
};

export default Category;
