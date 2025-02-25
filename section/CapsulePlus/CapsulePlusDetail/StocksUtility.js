const intervalDays = { value: 1 };
const intervalHours = { value: 0 };
const intervalMinutes = { value: 0 };

const priceStart = 200;
const priceRange = 1;
const volumeRange = 1000;
const volumeStart = 20000000;

export const getStocksFrom = (dateEnd, years) => {
    const dateStart = addYears(dateEnd, -years);
    return getStocksBetween(dateStart, dateEnd);
};

export const getStocksItems = (points) => {
    intervalDays.value = 0;
    intervalHours.value = 1;
    intervalMinutes.value = 0;

    const today = new Date();
    const year = today.getFullYear();
    const dateEnd = new Date(year, 11, 1);
    const dateStart = addHours(dateEnd, -points);
    return getStocksBetween(dateStart, dateEnd);
};

export const getStocksBetween = (dateStart, dateEnd) => {
    let interval = intervalDays.value * 24 * 60;
    interval += intervalHours.value * 60;
    interval += intervalMinutes.value;

    let time = addDays(dateStart, 0);
    let v = volumeStart;
    let o = priceStart;
    let h = o + (Math.random() * priceRange);
    let l = o - (Math.random() * priceRange);
    let c = l + (Math.random() * (h - l));

    const stock = [];
    while (time.getTime() < dateEnd.getTime()) {
        stock.push({ date: time, open: o, high: h, low: l, close: c, volume: v });

        o = c + ((Math.random() - 0.5) * priceRange);
        if (o < 0) {
            o = Math.abs(o) + 2;
        }
        h = o + (Math.random() * priceRange);
        l = o - (Math.random() * priceRange);
        c = l + (Math.random() * (h - l));
        v = v + ((Math.random() - 0.5) * volumeRange);
        if (v < 0) {
            v = Math.abs(v) + 10000;
        }

        o = Math.round(o * 100) / 100;
        h = Math.round(h * 100) / 100;
        l = Math.round(l * 100) / 100;
        c = Math.round(c * 100) / 100;
        v = Math.round(v * 100) / 100;

        time = addMinutes(time, interval);
    }
    // setting data intent for Series Title
    stock.__dataIntents = {
        close: ["SeriesTitle/Stock Prices"]
    };
    return stock;
};

export const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60 * 1000);
export const addHours = (date, hours) => new Date(date.getTime() + hours * 60 * 60 * 1000);
export const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
export const addYears = (date, years) => new Date(date.getFullYear() + years, date.getMonth(), date.getDate());

export const toShortString = (largeValue) => {
    let roundValue;

    if (largeValue >= 1000000) {
        roundValue = Math.round(largeValue / 100000) / 10;
        return roundValue + "M";
    }
    if (largeValue >= 1000) {
        roundValue = Math.round(largeValue / 100) / 10;
        return roundValue + "K";
    }

    roundValue = Math.round(largeValue);
    return roundValue + "";
};

export const getYear = (date) => date.getFullYear();
export const getQuarter = (date) => {
    const month = date.getMonth();
    return Math.round((month + 2) / 3);
};

export const getLastItem = (array) => {
    if (array.length === 0) {
        return null;
    }
    return array[array.length - 1];
};

export const getNewItem = (array, interval) => {
    const lastItem = getLastItem(array);

    if (interval === undefined) {
        interval = intervalDays.value * 24 * 60;
        interval += intervalHours.value * 60;
        interval += intervalMinutes.value;
    }

    const time = addMinutes(lastItem.date, interval);
    let v = lastItem.volume;
    let o = lastItem.open;
    let h = lastItem.high;
    let l = lastItem.low;
    let c = lastItem.close;

    o = c + ((Math.random() - 0.5) * priceRange);
    if (o < 0) {
        o = Math.abs(o) + 2;
    }
    h = o + (Math.random() * priceRange);
    l = o - (Math.random() * priceRange);
    c = l + (Math.random() * (h - l));
    v = v + ((Math.random() - 0.5) * volumeRange);
    if (v < 0) {
        v = Math.abs(v) + 10000;
    }

    const newValue = { date: time, open: o, high: h, low: l, close: c, volume: v };

    return newValue;
};
