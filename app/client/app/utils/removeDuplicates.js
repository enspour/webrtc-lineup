const removeDuplicates = (arr) => {
    const unique = [];
    const map = {};

    for (const item of arr) {
        if (map[item]) {
            continue;
        }

        map[item] = true;
        unique.push(item);
    }

    return unique;
}

export default removeDuplicates;