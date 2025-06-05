function getMinMax(str) {
    const onlyNumbers = str
        .split(' ')
        .map(item => parseFloat(item))
        .filter(item => !isNaN(item));
    const max = Math.max(...onlyNumbers);
    const min = Math.min(...onlyNumbers);
    return {
        min: min,
        max: max,
    };
};
