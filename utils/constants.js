
export const DEFAULT_LOCALE = 'en';
const TO_LOCALE_STRING = { en: "en-US", ar: "ar-EG" };

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


//handle paragarph text
export const truncateText = (text, maxLines) => {
    const words = text.split(' ');
    let truncatedText = '';
    for (let i = 0; i < words.length; i++) {
        if (i > 0 && i % maxLines === 0) {
            truncatedText += '...';
            break;
        }
        truncatedText += words[i] + ' ';
    }
    return truncatedText.trim();
}


//convert number to other langugage number
export const numberToLocaleString = (num, userLanguage = DEFAULT_LOCALE, leadingZero = false) => {
    let num1 = num?.toLocaleString(TO_LOCALE_STRING[userLanguage], { useGrouping: false })
    if (leadingZero && num >= 0 && num < 10) {
        return numberToLocaleString(0, userLanguage) + num1
    }
    return num1

}

export function getScreenWidth() {
    if (typeof window !== 'undefined') {
        return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }

    return undefined;
}

export function getScreenHeight() {
    if (typeof window !== 'undefined') {
        return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    }

    return undefined;
}

