const removeDuplicates = <T> (list: T[]): T[] => {
    const unique: T[] = [];
    const map = new Map();

    for (const item of list) {
        if (map.has(item)) {
            continue;
        }

        map.set(item, true);
        unique.push(item);
    }

    return unique;
}

export default removeDuplicates;