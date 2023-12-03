import { Link } from 'react-router-dom';
import CategoryItem from '../CategoryItem';

const Category = ({ data = [], title, to, className }) => {
    return (
        <section className={`px-6 pt-2 ${className}`}>
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
                    return (
                        <CategoryItem
                            key={index}
                            to={`/playplist/${item.id}`}
                            title={item.name}
                            desc={item.description}
                            imgUrl={item.images[0].url}
                            className="category-item"
                        />
                    );
                })}
            </div>
        </section>
    );
};

export default Category;
