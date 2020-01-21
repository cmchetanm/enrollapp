export const sortList = (list, key) => list.slice().sort((a, b) => {
    if (a[key] < b[key]) {
        return -1;
    }
    else if (a[key] > b[key]) {
        return 1;
    }

    return 0;
});

export const sortListAb = (list, key) => list.slice().sort((a, b) => {
    if (a[key].toLowerCase() < b[key].toLowerCase()) {
        return -1;
    }
    else if (a[key].toLowerCase() > b[key].toLowerCase()) {
        return 1;
    }

    return 0;
});

export const addToList = (list, item) => [...list, item];

export const editInlist = (list, item) => {
    const index = list.findIndex(o => o.id === item.id);
    const it = typeof item === 'object' && item !== null ? { ...list[index], ...item } : item;
    return [...list.slice(0, index), it, ...list.slice(index + 1)];
};

export const removeFromList = (list, item) => list.filter(o => o.id !== item.id);

export const print = (something, indent = 0) => {
    const prefix = '---'.repeat(indent);
    if (!!something && typeof something === "function") {
        console.log(prefix + 'function');
    } else if (Array.isArray(something)) {
        console.log(prefix + '[');
        something.forEach((s) => {
            print(s, indent + 1);
            console.log(prefix + ',');
        });
        console.log(prefix + ']');
    } else if (!!something && typeof something === 'object') {
        console.log(prefix + '{');
        Object.keys(something).forEach((s) => {
            console.log(prefix + s + ': ');
            print(something[s], indent + 1);
            console.log(prefix + ',');
        });
        console.log(prefix + '}');
    } else {
        console.log(prefix + something);
    }
};