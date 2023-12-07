import { Link } from 'react-router-dom';
import CategoryItem from '../CategoryItem';

const Category = ({ data = [], title, type = 'playlist', to, className }) => {
    return (
        <section className={`px-6 pt-4 ${className}`}>
            <div className="flex items-center justify-between h-[30px] mb-4">
                <Link
                    to={to}
                    className="text-2xl text-white font-bold hover:underline cursor-pointer"
                >
                    {title}
                </Link>
                <Link
                    to={to}
                    className="text-sm text-[#b3b3b3] font-semibold hover:underline cursor-pointer"
                >
                    Show all
                </Link>
            </div>
            <div className="grid grid-cols-5 2xl:grid-cols-8 gap-category-gap category">
                {data.map((item, index) => {
                    const props =
                        type === 'album'
                            ? {
                                  to: `/${type}/${item.track?.album?.id}`,
                                  name: item.track?.album?.name,
                                  artists: item.track?.album?.artists,
                                  trackImg: item.track?.album?.images[0]?.url,
                                  className: 'category-item',
                              }
                            : {
                                  to: `/${type}/${item.id}`,
                                  name: item.name,
                                  desc: item.description,
                                  imgUrl: item.images[0].url,
                                  className: 'category-item',
                              };
                    return <CategoryItem key={index} type={type} {...props} />;
                })}
            </div>
        </section>
    );
};

export default Category;
