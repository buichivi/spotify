import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <Link to="/" target="_blank" className="w-full h-full pt-[11px] pr-[24px] pb-[7px] pl-[15px] bg-gradient-to-r from-[#af2896] to-[#509bf5] flex items-center justify-between">
            <div>
                <h5 className="uppercase text-sm font-thin">
                    Preview of spotify
                </h5>
                <p className="font-normal">
                    Sign up to get unlimited songs and podcasts with occasional
                    ads. No credit card needed.
                </p>
            </div>
            <button className="h-12 py-2 px-8 bg-white text-black rounded-full font-bold hover:scale-105">
                <span className="relative top-[1px]">Sign up free</span>
            </button>
        </Link>
    );
};

export default Footer;
