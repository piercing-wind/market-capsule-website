

export const apiEndPoints = {
    endPointSignUp: `authentication/register`,
    endPointSignupOtpVerify: `authentication/verify-otp`,
    endPointSignIn: `authentication/login`,
    authUserDetail: `users/me?populate=summit_payments`,
    updateUserDetail: `user/me`,
    getProfessionList: `professions?fields[0]=name`,
    resendOtp: `authentication/resendOtp`,
    notificationList: `notification/list`,
    getTopGainerList: `top-gainers`,
    getTopLosersList: `top-losers`,
    getTrandingNewsList: `news`,
    getSummitList : `summits`,
    getSummitVideos :  `summit-videos`,

};


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
