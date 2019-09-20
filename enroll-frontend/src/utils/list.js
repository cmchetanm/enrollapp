export const sortList = (list, key) => list.slice().sort((a, b) => {
    if (a[key] < b[key]) {
        return -1;
    }
    else if (a[key] > b[key]) {
        return 1;
    }

    return 0;
});

export const addToList = (list, item) => [...list, item];

export const editInlist = (list, item) => {
    const index = list.findIndex(o => o.id === item.id);
    return [...list.slice(0, index), item, ...list.slice(index + 1)];
};

export const removeFromList = (list, item) => list.filter(o => o.id !== item.id);