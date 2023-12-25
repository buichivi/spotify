const convertDateString = (date, style = 'long') => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: style,
        day: 'numeric',
    });
};

export default convertDateString