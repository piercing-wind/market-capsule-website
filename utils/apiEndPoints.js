

export const apiEndPoints = {
    endPointSignUp: `authentication/register`,
    endPointSignupOtpVerify: `authentication/verify-otp`,
    endPointSignIn: `authentication/login`,
    authUserDetail: `users/me`,
    updateUserDetail: `user/me`,
    getProfessionList: `professions?fields[0]=name`,
    resendOtp: `authentication/resendOtp`
};