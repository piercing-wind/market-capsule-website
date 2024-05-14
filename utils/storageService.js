//here create storage type cookies, localstorage, sessionstorage

const getSessionStorage = (key) => {
    let data = sessionStorage.getItem(key) ? JSON.parse(decodeURIComponent(sessionStorage.getItem(key))) : false;
    return data;
}
const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, encodeURIComponent(JSON.stringify((value))))
}
const removeSessionStorage = (key) => {
    sessionStorage.removeItem(key)
}


const getLocalStorage = (key) => {
    let data = localStorage.getItem(key) ? JSON.parse(decodeURIComponent(localStorage.getItem(key))) : false;
    return data;
}
const setLocalStroage = (key, value) => {
    localStorage.setItem(key, encodeURIComponent(JSON.stringify((value))))
}
const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}

const getCookiesStorage = (key) => {
    var returnFlag = '';
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (key === cookiePair[0].trim()) {
            returnFlag = decodeURIComponent(cookiePair[1]);
        }
    }
    return returnFlag;
}

export const fetchCookie = (key, headers) => {
    var returnFlag = "";
    var cookieArr = headers?.cookie?.split(";");
    for (var i = 0; i < cookieArr?.length; i++) {
        var cookiePair = cookieArr[i]?.split("=");
        if (key === cookiePair[0].trim()) {
            returnFlag = decodeURIComponent(cookiePair[1]);
        }
    }
    return returnFlag;
};
const setCookiesStorage = (key, value) => {
    var days = 7;
    if (value === '') {
        days = 0;
    }
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires=" + days === 0 ? new Date(0) : date.toGMTString();
    if (process.env.MODE === 'production') {
        document.cookie = key + "=" + encodeURIComponent((value)) + ";" + expires + ";path=/;SameSite=Strict;Secure=true";
    } else {
        document.cookie = key + "=" + encodeURIComponent((value)) + ";" + expires + ";path=/;";
    }

}
export { getSessionStorage, setSessionStorage, removeSessionStorage, getLocalStorage, getCookiesStorage, setLocalStroage, setCookiesStorage, removeLocalStorage };