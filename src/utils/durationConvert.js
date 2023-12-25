const durationConvert = (duration_ms) => {
    const time_s = Math.floor(duration_ms / 1000);
    const minute = Math.floor(time_s / 60);
    const second = time_s - minute * 60;
    return minute + ':' + (second - 10 < 0 ? '0' + second : second);
};
export default durationConvert
