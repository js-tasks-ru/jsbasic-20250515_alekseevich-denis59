function filterRange(arr, a, b) {
    let filteredResults = [];
    for (let value of arr) {
        if (value >= a && value <= b) {
            filteredResults.push(value);
        }
    }
    return filteredResults;
}
