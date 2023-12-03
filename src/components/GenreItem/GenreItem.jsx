const GenreItem = ({ title, color, thumbImg, className }) => {
    return (
        <div className={`aspect-square rounded-md ${color} ${className} relative overflow-hidden`}>
            <h3 className="p-4 text-2xl font-bold">{title}</h3>
            <div className="w-[100px] h-[100px] object-fill absolute bottom-0 right-0 rotate-[25deg] translate-x-[18%] translate-y-[4%]">
                <img src={thumbImg} alt="" />
            </div>
        </div>
    );
};

export default GenreItem;
