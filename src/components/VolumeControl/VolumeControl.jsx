import { VolumnIcon } from "../Icons";

const VolumeControl = () => {
    return (
        <div className="flex items-center justify-center">
            <button className="w-8 h-8 flex items-center justify-center">
                <VolumnIcon />
            </button>
            <input
                type="range"
                min={0}
                max={100}
                step={1}
                name=""
                id=""
                className="flex-1"
            />
        </div>
    );
};

export default VolumeControl;
