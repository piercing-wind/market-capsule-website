import moment from "moment";

export const DEFAULT_LOCALE = 'en';
export const apiEndPoints = {

};

export const isValidSlug = (slug) => {
    // Define a regular expression pattern for a valid slug
    const slugPattern = /^[a-z0-9-]+$/;
    // Test the provided slug against the pattern
    return slugPattern.test(slug);
}

export const convertTo2DArray = (arr, cols) => {
    var result = arr.reduce(function (acc, obj, index) {
        var rowIndex = Math.floor(index / cols);
        if (!acc[rowIndex]) {
            acc[rowIndex] = [];
        }
        acc[rowIndex].push(Object.values(obj));
        return acc;
    }, []);
    return result;
}


export const getDiffDuration = (startTime, endTime) => {
    var startDate = new Date(endTime);
    var endDate = new Date(startTime);
    var duration = Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
    return duration;
}

export const addDurationInTimeStamp = (startTime, durationMinutes) => {
    var endTime = moment(startTime).add(durationMinutes, 'minutes').toISOString();
    return endTime;
}

export const findMaxValue = (arr) => {
    if (arr?.length === 0) {
        return undefined;
    }

    let maxValue = arr[0];
    for (let i = 1; i < arr?.length; i++) {
        if (arr[i] > maxValue) {
            maxValue = arr[i];
        }
    }

    return maxValue;
}


export const findEmptyKeys = (obj) => {
    const emptyKeys = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === '') {
            emptyKeys.push(key);
        }
    }
    return emptyKeys;
}


export const initializeRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};