const convertDurationToText = (duration_ms) => {
    const time_s = Math.floor(duration_ms / 1000);
    const hour = Math.floor(time_s / 3600);
    const minute = Math.floor((time_s - hour * 3600) / 60);
    const second = Math.floor(time_s - hour * 3600 - minute * 60);
    return `${hour > 0 ? hour + ' h' : ''} ${
        minute >= 0 ? (minute < 10 ? minute : minute) + ' min' : ''
    } ${second > 0 ? second + ' sec' : ''}`;
};
export default convertDurationToText;
